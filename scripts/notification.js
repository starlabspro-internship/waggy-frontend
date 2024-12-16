const notificationPanel = document.querySelector('#notificationPanel');
const notificationDesktop = document.querySelector('.notification-desktop');
const notificationMobile = document.querySelector('.notification-mobile');
const notificationList = document.querySelector('#notificationList')
const closeNotificationIcon = document.querySelector('#closeNotification')
const userId = localStorage.getItem('userId')
const token = localStorage.getItem("token");
const pawIcon = document.querySelector('.paw-icon-notification')
// Function to toggle the notification panel
const toggleNotificationPanel = (triggerElement) => {
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
const updateNotificationCount = (count) => {
  // Update for Desktop
  const notificationBadgeDesktop = document.getElementById('notificationBadgeDesktop');
  if (notificationBadgeDesktop) {
    notificationBadgeDesktop.textContent = count;
  }

  // Update for Mobile
  const notificationBadgeMobile = document.getElementById('notificationBadgeMobile');
  if (notificationBadgeMobile) {
    notificationBadgeMobile.textContent = count;
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
      console.log(myAdoptionRequests);
      updateNotificationCount(myAdoptionRequests.length);
     // renderNotications(myAdoptionRequests)
      return myAdoptionRequests
    } catch (error) {
    console.log('Could not fetch request' , error);
    notificationList.innerHTML = '<p class="text-red-500">Cannot display notifications for now</p>'
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

const renderNotications =async () => {
  const notifications =await fetchAdoptionRequests()
  console.log(notifications);
  if (notifications.length === 0) {
    notificationList.innerHTML = '<p>You have no notifications</p>'
  }
  notificationList.innerHTML = "";
 
  notifications.forEach((notification) => {
    const timeAgo = formatTimeAgo(notification.requestedAt)
    const notificationItem = document.createElement('div');
    notificationItem.className = "bg-blue-400 p-4 rounded-md shadow-md mb-2  "
    notificationItem.innerHTML = `
    <p class="text-xs text-gray-500">${timeAgo}</p> <!-- Display time -->
    <div class="flex">
    <div>
    <p class="font-semibold text-sm">You have a new adoption request from ${notification.requestingUser.profile.firstName} ${notification.requestingUser.profile.lastName}</p>
    <p class="text-sm text-gray-600 flex "> <img src="./assets//images/icons/pet-profile.png" class="w-5"> : ${notification.listing.pet.name}</p>
    
    </div>
    <div>
    <img src="http://localhost:3000${notification.listing.pet.petPicture}"" alt="${notification.listing.pet.name}" class="w-15 h-16 rounded-full" />
   </div>
   </div>
   <div class="flex gap-2"><button class="bg-blue text-white px-1 rounded cursor-pointer text-sm">Message</button>
   <button class="border border-blue text-blue px-2 rounded cursor-pointer text-sm">Accept</button>
   <button class=" text-red-500 border-[1px] border-solid border-red-500 px-3 rounded cursor-pointer text-sm">Reject</button></div>
   
  `;

  notificationList.appendChild(notificationItem);
  })
 
}
renderNotications()