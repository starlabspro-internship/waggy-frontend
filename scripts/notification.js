const notificationPanel = document.querySelector('#notificationPanel');
const notificationDesktop = document.querySelector('.notification-desktop');
const notificationMobile = document.querySelector('.notification-mobile');
const notificationList = document.querySelector('#notificationList')
const closeNotificationIcon = document.querySelector('#closeNotification')
const userId = localStorage.getItem('userId')
const token = localStorage.getItem("token");
const pawIcon = document.querySelector('.paw-icon-notification')
// Function to toggle the notification panel
let hasOpenedPanel = false;
const toggleNotificationPanel = async (triggerElement) => {
  if (notificationPanel.style.opacity === "1") {
    // Hide the panel
    notificationPanel.style.opacity = "0";
    setTimeout(() => {
      notificationPanel.style.display = "none"; // Hide it after fade-out
    }, 300); // Match the transition duration
    triggerElement.style.color = 'white'
     if (pawIcon) pawIcon.style.display = "none"
  } else {
    // Show the panel
    notificationPanel.style.display = "block"; // Make it visible
    setTimeout(() => {
      notificationPanel.style.opacity = "1"; // Fade in
    }, 10); // Small delay to trigger the transition
    triggerElement.style.color = '#FF8682'
    if (pawIcon) pawIcon.style.display = "inline"
  }
  hasOpenedPanel = true;
 
  updateNotificationCount(0)
  await renderNotications();
};

// Initialize the styles
notificationPanel.style.opacity = "0";
notificationPanel.style.transition = "opacity 0.3s ease"; // Smooth fade-in/out

// Add event listeners
notificationDesktop?.addEventListener('click',  () => toggleNotificationPanel(notificationDesktop));
notificationMobile?.addEventListener('click', () => toggleNotificationPanel(notificationMobile));

closeNotificationIcon?.addEventListener('click', () => {
  if (pawIcon) pawIcon.style.display = "none"
  notificationMobile.style.color = "white"
  notificationPanel.style.opacity = "0";
  setTimeout(() => {
    notificationPanel.style.display = "none"; // Hide the panel after fade-out
  }, 300); // Match the transition duration
});
const SEEN_NOTIFICATIONS_KEY = 'seenNotifications';

const getSeenNotifications = () => {
  return JSON.parse(localStorage.getItem(SEEN_NOTIFICATIONS_KEY)) || []
}

const markNotificationsAsSeen = (notifications) => {
  const seenNotificationsIds = notifications.map((notification) => notification.id)
  const currentSeenNotifications = getSeenNotifications();

  // Add new notifications to seen list only if they weren't already marked
  const updatedSeenNotifications = [...new Set([...currentSeenNotifications, ...seenNotificationsIds])];
  
  localStorage.setItem(SEEN_NOTIFICATIONS_KEY , JSON.stringify(updatedSeenNotifications))
}

const updateNotificationCount = (count) => {
  // Update for Desktop
  const notificationBadgeDesktop = document.getElementById('notificationBadgeDesktop');
  if (notificationBadgeDesktop) {
    if (count === 0) {
      notificationBadgeDesktop.style.display = 'none'; // Hide when count is 0
    } else {
      notificationBadgeDesktop.textContent = count;
      notificationBadgeDesktop.style.display = 'flex'; // Show when count is greater than 0
    }
  }

  // Update for Mobile
  const notificationBadgeMobile = document.getElementById('notificationBadgeMobile');
  if (notificationBadgeMobile) {
    if (count === 0) {
      notificationBadgeMobile.style.display = 'none'; // Hide when count is 0
    } else {
      notificationBadgeMobile.textContent = count;
      notificationBadgeMobile.style.display = 'flex'; // Show when count is greater than 0
    }
  }
};


const fetchAdoptionRequests = async () => {

    try {
      const response = await fetch('http://localhost:3000/api/adoption-requests/list' , {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
      },
      })
      const adoptionRequests = await response.json()
      
      const myAdoptionRequests = adoptionRequests.filter((adoptionRequest) => adoptionRequest.owner.id == userId)
      myAdoptionRequests.sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt));

     return myAdoptionRequests;   
    } catch (error) {
    console.log('Could not fetch request' , error);
    notificationList.innerHTML = '<p class="text-red-500">Cannot display notifications for now</p>'
    return []
    }

}
const formatTimeAgo = (timestamp) => {
  const now = new Date();
  
  const requestedTime = new Date(timestamp);
  
  const diffInSeconds = Math.floor((now - requestedTime) / 1000);
  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
};

const renderNotications = async () => {
  const notifications = await fetchAdoptionRequests();

  if (notifications.length === 0) {
    notificationList.innerHTML = '<p>You have no notifications</p>';
    return;
  }
  notificationList.innerHTML = "";

  notifications.forEach((notification) => {
    const timeAgo = formatTimeAgo(notification.requestedAt);

    const isOwner = notification.owner.id === parseInt(userId, 10);
    const message = isOwner
      ? `You have a new adoption request from ${notification.requestingUser.profile.firstName} ${notification.requestingUser.profile.lastName}`
      : `The owner of ${notification.listing.pet.name} has ${notification.requestStatus === 'pending' ? 'not yet decided on your request' : notification.requestStatus + ' your adoption request'}`;

    const notificationItem = document.createElement('div');
    notificationItem.className = "bg-blue-400 p-4 rounded-md shadow-md mb-2";

    // Build the HTML dynamically
    notificationItem.innerHTML = `
      <p class="text-xs text-gray-500">${timeAgo}</p> <!-- Display time -->
      <div class="flex justify-between">
        <div>
          <p class="font-semibold text-sm">${message}</p>
          <p class="text-sm text-gray-600 flex items-center">
            <img src="./assets/images/icons/pet-profile.png" class="w-5 mr-1"> ${notification.listing.pet.name}
          </p>
        </div>
        <div>
          <img src="http://localhost:3000${notification.listing.pet.petPicture}" alt="${notification.listing.pet.name}" class="w-15 h-16 rounded-full" />
        </div>
      </div>
    `;

    // Add action buttons if the user is the owner and the status is pending
    if (isOwner && notification.requestStatus === "pending") {
      notificationItem.innerHTML += `
        <div class="flex gap-2">
         <button class="message-btn bg-blue text-white px-2 rounded cursor-pointer text-sm" data-id="1" data-status="accepted">Message</button>
          <button class="status-btn border border-blue text-blue px-2 rounded cursor-pointer text-sm" data-id="${notification.id}" data-status="accepted">Accept</button>
          <button class="status-btn text-red-500 border border-solid border-red-500 px-2 rounded cursor-pointer text-sm" data-id="${notification.id}" data-status="rejected">Reject</button>
        </div>
      `;
    } else if (!isOwner && notification.requestStatus !== "pending") {
      notificationItem.innerHTML = `
        <p class="text-sm font-semibold text-gray-700">
          The owner ${notification.owner.profile.firstName} ${notification.owner.profile.lastName} has ${notification.requestStatus} your request.
        </p>
      `;
    } else if (isOwner && notification.requestStatus !== "pending") {
      const uniqueId = `notification-${notification.id}`;
    notificationItem.id = uniqueId;

    // Check if this notification already exists in the DOM
    if (document.getElementById(uniqueId)) {
        return; // Skip rendering if it already exists
    }
      notificationItem.innerHTML = `
        <p class="text-sm font-semibold text-gray-700">
          You have ${notification.requestStatus} the adoption request from ${notification.requestingUser.profile.firstName} ${notification.requestingUser.profile.lastName}
        </p>
      `;
       // Keep the notification visible for 5 seconds
    }

    notificationList.appendChild(notificationItem);

    // Add event listeners for buttons
    const statusButtons = notificationItem.querySelectorAll('.status-btn');
    statusButtons.forEach((button) => {
      button.addEventListener('click', () =>
        handleStatusUpdate(button.dataset.id, button.dataset.status)
      );
    });
  });

  markNotificationsAsSeen(notifications);
};

const handleStatusUpdate = async (id , status) => {
  try {
     // Determine the new listing status based on the adoption status
     let listingStatus = '';
     let petStatus = ''
     if (status === 'accepted') {
       listingStatus = 'Adopted';
       petStatus = 'adopted' // Set to notAvailable when accepted
     } else if (status === 'rejected') {
       listingStatus = 'Available'
       petStatus = 'available'; // Set to available when rejected
     }
    const response = await fetch(`http://localhost:3000/api/adoption-requests/edit/${id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ requestStatus: status ,  listing: {adoptionStatus : listingStatus} ,  pet: { status: petStatus } }) // 'accepted' or 'rejected'
    });
    
    if (response.ok) {
      console.log('Adoption Status' , status , listingStatus , 'pet status' , petStatus);
     await refreshNotifications()
    } else {
      console.error(`Failed to ${status} the request`)
    }
  } catch (error) {
    console.error(`Error ${status} request:`, error);
  }
}
const refreshNotifications = async () => {
  const notifications = await fetchAdoptionRequests();
  const unseenNotifications = notifications.filter((notification) => !getSeenNotifications().includes(notification.id));
  updateNotificationCount(unseenNotifications.length);

  // Only call renderNotications if the panel is open
  if (hasOpenedPanel) {
    await renderNotications();
  }
  hasOpenedPanel = false
};
document.addEventListener('DOMContentLoaded', () => {
  refreshNotifications();
  setInterval(refreshNotifications, 30000); // Refresh every 30 seconds
});