document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  // Redirect if user is not logged in
//   if (!userId || !token) {
//       window.location.href = "/login.html";
//   }

  // Function to handle logout
  function logout() {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem('SEEN_NOTIFICATIONS_KEY');
      window.location.href = "/login.html";
  }

  // Handle logout for the sidebar
  const sidebarLogoutButton = document.querySelector(".logoutLink");
  if (sidebarLogoutButton) {
      sidebarLogoutButton.addEventListener("click", logout);
  }

  // Handle logout for mobile navbar
  const mobileLogoutButton = document.querySelector(".logoutLink.mobile");
  if (mobileLogoutButton) {
      mobileLogoutButton.addEventListener("click", logout);
  }
});
