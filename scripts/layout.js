import { showToast } from './toast.js';

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

    content.innerHTML = `<p>Loading...</p>`;
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
      content.innerHTML = `<p>Error loading page content.</p>`;
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
showToast('U thek buka!!!', 'success');
 showToast('U dogj buka!', 'error');
