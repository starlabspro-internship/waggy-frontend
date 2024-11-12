// Toggle password visibility
function togglePassword() {
    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");
    if (password.type === "password") {
      password.type = "text";
      eyeIcon.setAttribute("fill", "#4A5568");
    } else {
      password.type = "password";
      eyeIcon.setAttribute("fill", "currentColor");
    }
  }
  
  // Hide error message on input focus
  function hideError(errorId) {
    const errorMessage = document.getElementById(errorId);
    errorMessage.classList.remove("visible");
  }
  
  // Form validation and login function
  function validateForm(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
  
    // Reset error messages
    emailError.classList.remove("visible");
    passwordError.classList.remove("visible");
  
    let isValid = true;
  
    // Validate email
    if (!email) {
      emailError.classList.add("visible");
      isValid = false;
    }
  
    // Validate password
    if (!password) {
      passwordError.classList.add("visible");
      isValid = false;
    }
  
    // If form is valid, call the login function
    if (isValid) {
      loginUser(email, password);
    }
  }
  
  // Login function to call API and store tokens
  async function loginUser(email, password) {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }
  
      const data = await response.json();
      const { accessToken, userId } = data;
      
      // Store tokens in localStorage
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', accessToken);
      window.location.href = '/index.html'; 

    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  