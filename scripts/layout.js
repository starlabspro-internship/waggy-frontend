document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const drawer = document.getElementById("drawer");
  const menuIcon = document.getElementById('menu-icon');
  const navLinks = document.querySelectorAll('.nav-link');
  let userId = localStorage.getItem('userId');
  let token = localStorage.getItem('token');
  let refreshToken = localStorage.getItem('refreshToken')
  console.log(userId);
  console.log(refreshToken);
  
 const updateUserDisplay = (firstName, email) => {
  document.querySelector(".user-name").textContent = firstName || "No Name Available";
  document.querySelector(".user-nameMobile").textContent = firstName || "No Name Available";
  document.querySelector(".user-email").textContent = email || "No Email Available";
  document.querySelector(".user-emailMobile").textContent = email || "No Email Available";


};

async function isTokenValid() {
  if (!refreshToken) {
    console.log("No refresh token available, user must log in again.");
    window.location.href = '/login.html'; // Redirect to login if no refresh token
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/refreshToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    const newAccessToken = data.accessToken;
    localStorage.setItem('token', newAccessToken); // Update the access token
    console.log('Access token refreshed');
    return newAccessToken;

  } catch (error) {
    console.error('Error refreshing token:', error);
    window.location.href = '/login.html'; // Redirect to login page on failure
  }
}

    // Fetch user data with proper error handling
    const fetchUserData = async () => {
      const isValid = await isTokenValid(token); // Validate token before making the API request
      if (!isValid) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        window.location.href = "/login.html"; // Redirect to login page
        return;
      }
    
      try {
        const response = await fetch(`http://localhost:3000/api/users/view/${userId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const user = await response.json();
        updateUserDisplay(user.profile.firstName, user.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
        updateUserDisplay("User not found", "No Email Available");
      }
    };
   
  
    // Execute the fetch
    if (userId) {
      fetchUserData();
    } else {
      console.warn('No userId found in localStorage');
      updateUserDisplay("Guest User", "Not Signed In");
    }
  

  // Toggle Drawer
  menuButton.addEventListener("click", () => {
    drawer.classList.toggle("hidden");
    menuIcon.src = drawer.classList.contains("hidden")
      ? './assets/images/icons/app.png'
      : './assets/images/icons/cancel.png';
  });

  // Function to close the drawer
  function closeDrawer() {
    drawer.classList.add("hidden");
    menuIcon.src = './assets/images/icons/app.png';
  }

  const routes = {
    "login": { protected: false, page: "/login.html" },
    "signup": { protected: false, page: "/signup.html" },
    "profile": { protected: true, page: "pages/profile.js" },
    "petprofile": { protected: true, page: "pages/petprofile.js" },
    "petview": { protected: true, page: "pages/petview.js" } ,
    "matching": { protected: true, page: "pages/matching.js" },
    "messages": { protected: true, page: "pages/messages.js" },
    "blogs": { protected: true, page: "pages/blogs.js" },
    "adoptation": { protected: true, page: "pages/adoptation.js" },
    "settings": { protected: true, page: "pages/settings.js" },
  };
  // Set active link function
  function setActiveLink(page) {
    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute("href").substring(1) === page) {

        link.classList.add('active-link');
      }
    });
  }

  // Handle link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();  // Prevent default link behavior
      const page = link.getAttribute("href").substring(1);

      // Load the page
      loadPage(page);

      // Update URL without reloading
      history.pushState(null, null, `${page}`);
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
 console.log(isProtected , pagePath , routes[page]);
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
 content.classList.remove('loaded');
 rightContent.classList.remove('loaded');

 // Display loading spinner
 content.innerHTML = `<div class="flex justify-center items-center h-screen md:h-[400px] bg-[#157AFF] md:bg-white">
     <div class="flex flex-col items-center gap-2">
         <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
         <p class="text-white text-lg font-semibold">Loading...</p>
     </div>
 </div>`;

 rightContent.innerHTML = `<p>Loading...</p>`;

 try {

  const pageTitle = document.getElementById('page-title');
  if (pageTitle && (page === 'petview' || page === 'petprofile')) {
    pageTitle.textContent = "Your Pets";
  } if (pageTitle && (page === 'blogs')){
    pageTitle.textContent = "Your Blogs";
  } if (pageTitle && (page === 'profile' || page === 'messages' || page === 'adoptation' || page === 'settings')){
    pageTitle.textContent = "Your Friends";
  } if (pageTitle && (page === 'matching')){
    pageTitle.textContent = "Your Matchings";
  } 
  
//const pageModule = await import(`../pages/${page}.js`);
   const pageModule = await import(`../${pagePath}`);
   const renderPageContent = pageModule.default;
   renderPageContent();

   let rightModule;
   if (page == 'petview') {
     rightModule = await import(`../pages/petprofile-right.js`);
   } else {
     rightModule = await import(`../pages/${page}-right.js`);
   }
   const renderRightContent = rightModule.default;
   renderRightContent();

   // After loading, apply fade-in transition
   content.classList.add('loaded');
   rightContent.classList.add('loaded');

   // Update title and active links
   document.title = `${page.charAt(0).toUpperCase() + page.slice(1)} - Waggy`;
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
