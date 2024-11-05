document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  // Redirect if user is not logged in
  if (!userId || !token) {
    window.location.href = "/login.html"; 
  }

  const form = document.getElementById("blogForm");

  // Function to handle logout
  function logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  }

  // Assign the logout function to your log-out link
  document.getElementById("logoutLink").addEventListener("click", logout);

  // The rest of your code goes here...

});
