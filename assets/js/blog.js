document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("blogForm");
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); // Change from 'accessToken' to 'token'


    console.log(userId)
    console.log(token)

    // Function to update UI elements
    const updateUserDisplay = (firstName, email) => {
      document.getElementById("firstName").textContent = firstName || "No Name Available";
      document.getElementById("email").textContent = email || "No Email Available";
    };
  
    // Fetch user data with proper error handling
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/view/${userId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             "Authorization": `Bearer ${token}`
          },

        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const user = await response.json();
        // dymamicly show user name or organization name
       let name = user.name === undefined ? user.profile.organisationName : user.name;
      
        updateUserDisplay(
          name,
          user.email
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
        updateUserDisplay("User not found", "No Email Available");
        
        // Optionally show an error notification to the user
        const errorMessage = error.message === 'Failed to fetch' 
          ? 'Network error. Please check your connection.'
          : 'Error loading user data. Please try again later.';
        
        // You could add a notification element to show this error
        const notification = document.createElement('div');
        notification.className = 'error-notification text-red-500 mb-4';
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
      console.warn('No userId found in localStorage');
      updateUserDisplay("Guest User", "Not Signed In");
    }
  
    // Handle form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const title = document.getElementById("title").value.trim();
      const category = document.getElementById("category").value.trim();
      const article = document.getElementById("article").value.trim();
      const imageInput = document.querySelector('input[type="file"]');
      const imageFile = imageInput.files[0];
  
      // Clear previous error states
      const errorFields = ["titleError", "categoryError", "articleError"];
      errorFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) element.classList.add("hidden");
      });
  
      const imageError = document.getElementById("imageError");
      if (imageError) {
        imageError.classList.add("hidden");
      }
  
      let valid = true;
  
      // Validation checks
      if (!title) {
        valid = false;
        document.getElementById("titleError").classList.remove("hidden");
      }
  
      if (!category) {
        valid = false;
        document.getElementById("categoryError").classList.remove("hidden");
      }
  
      if (!article) {
        valid = false;
        document.getElementById("articleError").classList.remove("hidden");
      }
  
      if (!imageFile) {
        valid = false;
        if (!imageError) {
          const errorSpan = document.createElement("span");
          errorSpan.id = "imageError";
          errorSpan.className = "text-red-500 text-xs";
          errorSpan.textContent = "Article Image is required.";
          imageInput.parentNode.appendChild(errorSpan);
        } else {
          imageError.classList.remove("hidden");
        }
      }
  
      if (valid) {
        alert("Blog created successfully!");
        form.reset();
        
        if (imageError) {
          imageError.classList.add("hidden");
        }
      }
    });
  });