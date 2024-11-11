document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  // Redirect if user is not logged in
  if (!userId || !token) {
    window.location.href = "/login.html"; 
  }

  // Function to handle logout
  function logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  }

  document.querySelector(".logoutLink").addEventListener("click", logout);


});
