document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const drawer = document.getElementById("drawer");
  const sidebar = document.getElementById("sidebar");
  const pageTitle = document.getElementById("page-title");

  // Toggle Drawer
  menuButton.addEventListener("click", () => {
    drawer.classList.toggle("hidden");
  });

  // Centralized menu click handler
  function handleMenuClick(e) {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const page = e.target.getAttribute("href").substring(1);
      loadPage(page);

      // Update the browser URL
      history.pushState(null, null, `#${page}`);
    }
  }

  sidebar.addEventListener("click", handleMenuClick);
  drawer.addEventListener("click", handleMenuClick);
  function setActiveLink(page) {
    const links = document.querySelectorAll("#sidebar a, #drawer a");
    links.forEach((link) => {
      if (link.getAttribute("href").substring(1) === page) {
        link.classList.add("active-link");
      } else {
        link.classList.remove("active-link");
      }
    });
  }

  // Load page content based on navigation
  async function loadPage(page) {
    const content = document.getElementById("content");
    const rightContent = document.getElementById("right-content");

    content.innerHTML = `<p>Loading...</p>`; // Show a loading message
    rightContent.innerHTML = `<p>Loading...</p>`; // Show a loading message

    try {
      // Load main page content
      const pageModule = await import(`../pages/${page}.js`);
      const renderPageContent = pageModule.default;
      renderPageContent();

      // Load right section content
      const rightModule = await import(`../pages/${page}-right.js`);
      const renderRightContent = rightModule.default;
      renderRightContent();

      // Set the page title to uppercase
      const pageTitleText = page
        .replace(/-/g, " ")
        .replace(/^\w/, (c) => c.toUpperCase());
      pageTitle.textContent = pageTitleText;
      document.title = `${pageTitleText} - Waggy`;
      setActiveLink(page);
    } catch (error) {
      console.error(`Error loading page ${page}:`, error);
      content.innerHTML = `<p>Error loading page content. Check if ${page}.js exists and is exported correctly.</p>`;
    }
  }

  // Load initial page from URL or default to 'profile'
  const initialPage = location.hash ? location.hash.substring(1) : "profile";
  loadPage(initialPage);

  // Handle back/forward navigation
  window.addEventListener("popstate", () => {
    const page = location.hash ? location.hash.substring(1) : "profile";
    loadPage(page);
  });

  
});
