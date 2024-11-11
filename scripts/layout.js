document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const drawer = document.getElementById("drawer");
  const menuIcon = document.getElementById('menu-icon');
  const navLinks = document.querySelectorAll('.nav-link');

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
      history.pushState(null, null, `#${page}`);
      closeDrawer();
      setActiveLink(page); // Update active links
    });
  });

  // Load page content based on navigation
  async function loadPage(page) {
    const content = document.getElementById("content");
    const rightContent = document.getElementById("right-content");

    content.innerHTML = `<div class="flex justify-center items-center h-screen md:h-[400px] bg-[#157AFF] md:bg-white">
    <div class="flex flex-col items-center gap-2">
        <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
        <p class="text-white text-lg font-semibold">Loading...</p>
    </div>
</div>`;
    rightContent.innerHTML = `<p>Loading...</p>`;

    try {
      const pageModule = await import(`../pages/${page}.js`);
      const renderPageContent = pageModule.default;
      renderPageContent();

      const rightModule = await import(`../pages/${page}-right.js`);
      const renderRightContent = rightModule.default;
      renderRightContent();

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
    const page = location.hash ? location.hash.substring(1) : "profile";
    loadPage(page);
  });
});

