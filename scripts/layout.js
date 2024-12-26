document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const drawer = document.getElementById("drawer");
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.querySelectorAll(".nav-link");
  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");
  let refreshToken = localStorage.getItem("refreshToken");
  const notificationDesktop = document.querySelector('.notification-desktop');
const notificationMobile = document.querySelector('.notification-mobile');
const notificationPanel = document.querySelector('#notificationPanel');
  console.log(userId);
  console.log(refreshToken);
 
  // Profile click elements
  const profileClickableElements = document.querySelectorAll(
    ".user-name, .user-email, #indexUserProfilePicture"
  );

  profileClickableElements.forEach((element) => {
    element.style.cursor = "pointer";
    element.addEventListener("click", () => {
      window.location.hash = "#profile";
      loadPage("profile");
    });
  });

  const updateUserDisplay = (firstName, email, profilePicture) => {
    document.getElementById("indexUserProfilePicture").src = profilePicture;
    document.querySelector(".mobile-picture").src = profilePicture;
    document.querySelector(".user-name").textContent =
      firstName || "No Name Available";
    document.querySelector(".user-nameMobile").textContent =
      firstName || "No Name Available";
    document.querySelector(".user-email").textContent =
      email || "No Email Available";
      document.querySelector(".user-emailMobile").textContent =
      email || "No Email Available";
  };

  window.addEventListener("profileEdited", async () => {
    await fetchUserData();
  });

  async function isTokenValid() {
    if (!refreshToken) {
      console.log("No refresh token available, user must log in again.");
      window.location.href = "/login.html"; // Redirect to login if no refresh token
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/auth/refreshToken`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      const newAccessToken = data.accessToken;
      localStorage.setItem("token", newAccessToken); // Update the access token
      console.log("Access token refreshed");
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      window.location.href = "/login.html"; // Redirect to login page on failure
    }
  }
  
  //  let  isNotificationPanelVisible = false; // Track visibility state
  // console.log(isNotificationPanelVisible);
  //   const toggleNotificationPanel = () => {
  //     isNotificationPanelVisible = !isNotificationPanelVisible; 
  //     // Toggle state
  //     console.log(isNotificationPanelVisible);
  //     notificationPanel.style.display = isNotificationPanelVisible ? "block" : "none";
  //     console.log("Notification Panel:", notificationPanel.style.display);
  //   };
  
  //   notificationDesktop.addEventListener("click", toggleNotificationPanel);
  //   notificationMobile.addEventListener("click", toggleNotificationPanel);
  
  // Fetch user data with proper error handling
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/users/view/${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const user = await response.json();
      console.log(user.profile.organisationName);

      console.log("user format" ,user);
      // dymamicly show user name or organization name
      let name = !user.profile.firstName
        ? user.profile.organisationName
        : user.profile.firstName;

      let profilePictureSrc;

      if (!user.profile.profilePicture) {
        profilePictureSrc =
          "http://localhost:3000/uploads/defaultProfilePicture.jpg";
      } else {
        profilePictureSrc =
          `http://localhost:3000` + user.profile.profilePicture;
      }
      updateUserDisplay(name, user.email, profilePictureSrc);
    } catch (error) {
      console.error("Error fetching user data:", error);
      updateUserDisplay(
        "User not found",
        "No Email Available",
        "No Profile Picture"
      );

      // Optionally show an error notification to the user
      const errorMessage =
        error.message === "Failed to fetch"
          ? "Network error. Please check your connection."
          : "Error loading user data. Please try again later.";

      // You could add a notification element to show this error
      const notification = document.createElement("div");
      notification.className = "error-notification text-red-500 mb-4";
      notification.textContent = errorMessage;
      form.insertBefore(notification, form.firstChild);

      // Remove the notification after 5 seconds
      setTimeout(() => notification.remove(), 5000);
    }
  };

  // Execute the fetch
  if (userId) {
    fetchUserData();
  } else {
    console.warn("No userId found in localStorage");
    updateUserDisplay("Guest User", "Not Signed In");
  }
  const openDrawer = () => {
    drawer.classList.remove("hidden"); // Make the drawer visible
    setTimeout(() => {
      drawer.classList.remove("left-[-100%]"); // Slide in the drawer from the left
      drawer.classList.add("left-0"); // Set the drawer to its visible position
      drawer.classList.remove("opacity-0"); // Fade it in
      drawer.classList.add("opacity-100"); // Full opacity
    }, 200); // Small delay to trigger the transition
    menuIcon.src = "./assets/images/icons/cancel.png"; // Change icon to cancel
  };
  const closeDrawer = () => {
    drawer.classList.add("left-[-100%]"); // Slide the drawer out of view
    drawer.classList.remove("left-0"); // Remove the position for being visible
    drawer.classList.add("opacity-0"); // Fade it out
    setTimeout(() => {
      drawer.classList.add("hidden"); // Hide the drawer after the transition
    }, 200); // Match the transition duration
    menuIcon.src = "./assets/images/icons/app.png"; // Change icon to app
  };
  
  // Toggle Drawer
  menuButton.addEventListener("click", () => {
    if (drawer.classList.contains("left-0")) {
      closeDrawer(); // Close the drawer if it's open
    } else {
      openDrawer(); // Open the drawer if it's closed
    }
  });
  // Toggle Drawer
  // menuButton.addEventListener("click", () => {
  //   drawer.classList.toggle("hidden");
  //   menuIcon.src = drawer.classList.contains("hidden")
  //     ? "./assets/images/icons/app.png"
  //     : "./assets/images/icons/cancel.png";
  // });

  // // Function to close the drawer
  // function closeDrawer() {
  //   drawer.classList.add("hidden");
  //   menuIcon.src = "./assets/images/icons/app.png";
  // }

  const routes = {
    login: { protected: false, page: "/login.html" },
    signup: { protected: false, page: "/signup.html" },
    organisationSignup: { protected: false, page: "/organisationSignup.html" },
    profile: { protected: true, page: "pages/profile.js" },
    petprofile: { protected: true, page: "pages/petprofile.js" },
    petview: { protected: true, page: "pages/petview.js" },
    matching: { protected: true, page: "pages/matching.js" },
    messages: { protected: true, page: "pages/messages.js" },
    blogs: { protected: true, page: "pages/blogs.js" },
    adoptation: { protected: true, page: "pages/adoptation.js" },
    settings: { protected: true, page: "pages/settings.js" },
    aboutPage: { protected: true, page: "pages/aboutPage.js" },
    "match-info": { protected: true, page: "pages/match-info.js" },
    "match-action": { protected: true, page: "pages/match-action.js" },
    "adopt-info": { protected: true, page: "pages/adopt-info.js" },
    
  };
  // Set active link function
  function setActiveLink(page) {
    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      if (link.getAttribute("href").substring(1) === page) {
        link.classList.add("active-link");
      }
    });
   
  }

  // Handle link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior
      const page = link.getAttribute("href").substring(1);

      // Load the page
      loadPage(page);

      // Update URL without reloading
      history.pushState(null, null, `#${page}`);
      closeDrawer();
      setActiveLink(page); // Update active links
    });
  });
 
  // Load page content based on navigation
  async function loadPage(page) {
    if (localStorage.getItem("petToUpdateId")) {
      localStorage.removeItem("petToUpdateId");
    }
    const content = document.getElementById("content");
    const rightContent = document.getElementById("right-content");
   
    const { protected: isProtected, page: pagePath } = routes[page] || {};
    console.log(isProtected, pagePath, routes[page]);
    if (!pagePath) {
      console.error(`Page path not found for: ${page}`);
      return; // Exit if there's no valid page path
    }
    if (isProtected && (!userId || !token)) {
      window.location.href = "/login.html";
      return;
    }
    const isValid = await isTokenValid(token);
    if (!isValid) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      window.location.href = "/login.html";
      return;
    }

    // Initially set opacity to 0 for smooth transition
    // content.classList.remove("loaded");
    // rightContent.classList.remove("loaded");
    // content.style.transform = "translateX(-100%)";
    //  rightContent.style.transform = "translateX(-100%)";
    // // Display loading spinner
    content.innerHTML = `<div class="flex justify-center items-center h-screen md:h-[400px] bg-[#157AFF] md:bg-white">
     <div class="flex flex-col items-center gap-2">
         <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
         <p class="text-white text-lg font-semibold">Loading...</p>
     </div>
 </div>`;

    rightContent.innerHTML = `<p>Loading...</p>`;

    try {
      // notificationPanel.style.display = "none"
      // isNotificationPanelVisible = false;
      // console.log('notificaion changes page' , notificationPanel.style.display);
      const pageTitle = document.getElementById("page-title");
      if (pageTitle && (page === "petview" || page === "petprofile")) {
        pageTitle.textContent = "Your Pets";
      }
      if (pageTitle && page === "blogs") {
        pageTitle.textContent = "Your Blogs";
      }
      if (
        pageTitle &&
        (page === "profile" ||
          page === "messages" ||
          page === "adoptation" ||
          page === "settings")
      ) {
        pageTitle.textContent = "Your Friends";
      }
      if (pageTitle && page === "matching") {
        pageTitle.textContent = "Your Matchings";
      }  if (pageTitle && page === "adoptation") {
        pageTitle.textContent = "Your Adoptions";
      }

      //const pageModule = await import(`../pages/${page}.js`);
      const pageModule = await import(`../${pagePath}`);

      const renderPageContent = pageModule.default;
      renderPageContent();
      let rightModule;
      if (page == "petview") {
        rightModule = await import(`../pages/petprofile-right.js`);
      } else if (page == "match-info" || page == "match-action") {

        rightModule = await import(`../pages/matching-right.js`)
        rightModule = await import(`../pages/matching-right.js`) }
        else if (page == "adopt-info" || page == "adopt-info") {
          rightModule = await import(`../pages/adoptation-right.js`);
      } else {
        rightModule = await import(`../pages/${page}-right.js`);
      }
      console.log(rightModule);
      const renderRightContent = rightModule.default;
      renderRightContent();

      // After loading, apply fade-in transition
      content.classList.add("loaded");
      rightContent.classList.add("loaded");
      setTimeout(() => {
        content.style.transform = "translateX(0)";
        rightContent.style.transform = "translateX(0)";
      }, 200); // Delay to trigger the CSS transition
  
      // Update title and active links
      document.title = `${
        page.charAt(0).toUpperCase() + page.slice(1)
      } - Waggy`;
      setActiveLink(page);
      
    } catch (error) {
      console.error(`Error loading page ${page}:`, error);
      content.innerHTML = `<div class="flex justify-center items-center h-screen  bg-[#157AFF] md:bg-white">
       <div class="flex flex-col items-center gap-2">
           <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
           <p class="text-white text-lg font-semibold">Error loading...</p>
       </div>
   </div>`;
    }
  }
 
  // Load initial page or default to 'profile'
  const initialPage = location.hash ? location.hash.substring(1) : "profile";
  loadPage(initialPage);

  // Handle back/forward navigation
  window.addEventListener("popstate", () => {
    const route = location.hash ? location.hash.substring(1) : "profile";
    if (localStorage.getItem("petToUpdateId")) {
      localStorage.removeItem("petToUpdateId");
    }
    loadPage(route);
  });
});