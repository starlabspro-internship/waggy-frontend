// profile.js
export default function renderPageContent() {
  const content = document.getElementById("content");
  content.innerHTML = `
        <div class="py-50">
        <p class="text-green-500 font-bold hidden success-text">
          <span> &#9989;</span>Your infos are updated Succesfully
        </p>
        <p class="text-red-500 font-bold error-text hidden">
          Cannot edit a User Profile Right Now!
        </p>
        <h1 class="text-3xl font-bold mb-6 mt-2 text-gray-800">
          Edit User Profile
        </h1>
  
        <form id="pet-form" method="POST" enctype="multipart/form-data">
          <div class="grid gap-5">
            <div class="relative w-full">
              <label class="absolute -top-2 left-3 z-10 bg-white text-sm"> Name</label>
              <input
                id="user-name"
                name="name"
                type="text"
                class="w-full border-2 rounded-2xl p-3 z-0"
              />
              <span class="text-red-500 text-xs ml-2 hidden user-name-error">User Name is required</span>
            </div>
  
            <div class="relative w-full">
              <label class="absolute -top-2 left-3 z-10 bg-white text-sm"> Last Name</label>
              <input
                id="user-lastname"
                name="lastname"
                type="text"
                class="w-full border-2 rounded-2xl p-3 z-0"
              />
              <span class="text-red-500 text-xs ml-2 hidden user-lastname-error">User Last Name is required</span>
            </div>
  
            <div class="relative w-full">
              <label class="absolute -top-2 left-3 z-10 bg-white text-sm"> Organizate Name</label>
              <input
                id="organizate-name"
                name="organizateName"
                type="text"
                class="w-full border-2 rounded-2xl p-3 z-0"
              />
              <span class="text-red-500 text-xs ml-2 hidden organizate-name-error">Organizate Name is required</span>
            </div>
  
            <div class="relative w-full">
              <label class="absolute -top-2 left-3 z-10 bg-white text-sm">Email address</label>
              <input
                id="emailaddress"
                name="emailaddress"
                type="email"
                class="w-full border-2 rounded-2xl p-3 z-0"
              />
              <span class="text-red-500 text-xs ml-2 hidden emailaddress-error">Email address is required</span>
            </div>
  
            <div class="relative w-full">
              <label class="absolute -top-2 left-3 z-10 bg-white text-sm">Phone Number</label>
              <input
                id="phonenumber"
                name="phonenumber"
                type="text"
                class="w-full border-2 rounded-2xl p-3 z-0"
                pattern="\\d*"
                inputmode="numeric"
                oninput="this.value = this.value.replace(/[^0-9]/g, '')"
              />
              <span class="text-red-500 text-xs ml-2 hidden phonenumber-error">Phone Number is required</span>
            </div>
  
            <div class="relative w-full"> 
              <label class="absolute -top-2 left-3 z-10 bg-white text-sm">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                class="w-full border-2 rounded-2xl p-3 z-0"
              />
              <span class="text-red-500 text-xs ml-2 hidden location-error">Location is required</span>
            </div>              
  
            <div class="flex items-center -mb-3">
              <label
                class="flex items-center justify-center bg-white text-red-500 px-4 py-2 mr-4 rounded cursor-pointer text-sm"
                style="border: 1px solid #157aff"
              >
                Choose File
                <input
                  type="file"
                  class="hidden file"
                  id="file-input"
                  name="petPicture"
                  accept="image/*"
                />
              </label>
              <span class="file-url ml-3 color text-sm">Select user image</span>
            </div>
            <span class="text-red-500 text-xs ml-2 hidden file-error">File is required</span>
  
            <button
              type="button" id="saveBtn"
              class="mt-6 w-full py-2 rounded-2xl submit-btn"
              style="background-color: #157aff; color: #ffffff"
            >
              <span class="text-xs mx-4">Save Details</span>
            </button>
          </div>
        </form>
      </div>
    `;

  // Initialize event listeners or any additional functionality
  document
    .getElementById("saveBtn")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission

      let isValid = true;

      // Reset previous error messages
      document.querySelectorAll(".error-text").forEach((error) => {
        error.classList.add("hidden");
      });

      // Validate Name
      const userName = document.getElementById("user-name");
      if (!userName.value.trim()) {
        document.querySelector(".user-name-error").classList.remove("hidden");
        isValid = false;
      }

      // Validate Last Name
      const userLastName = document.getElementById("user-lastname");
      if (!userLastName.value.trim()) {
        document
          .querySelector(".user-lastname-error")
          .classList.remove("hidden");
        isValid = false;
      }

      // Validate Email
      const email = document.getElementById("emailaddress");
      if (!email.value.trim()) {
        document
          .querySelector(".emailaddress-error")
          .classList.remove("hidden");
        isValid = false;
      }

      // Validate Phone Number
      const phoneNumber = document.getElementById("phonenumber");
      if (!phoneNumber.value.trim()) {
        document.querySelector(".phonenumber-error").classList.remove("hidden");
        isValid = false;
      }

      // Validate Location
      const location = document.getElementById("location");
      if (!location.value.trim()) {
        document.querySelector(".location-error").classList.remove("hidden");
        isValid = false;
      }

      // Validate File Upload
      const fileInput = document.getElementById("file-input");
      if (!fileInput.files.length) {
        document.querySelector(".file-error").classList.remove("hidden");
        isValid = false;
      }

      // If all fields are valid, submit the form
      if (isValid) {
        // Submit your form or perform further actions
        document.getElementById("pet-form").submit();
      }
    });

  //  fetch request per profile

  const profileContent = document.getElementById("profile-content");
  if (profileContent) {
    profileContent.addEventListener("click", function () {
      alert("Profile content clicked");
    });
  }

  showToast("This is a test toast!", "success");

  // Form submission event
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(profileForm);
      try {
        const response = await fetch("https://api.example.com/profile", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        alert("Profile updated successfully!");
        console.log(result);
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      }
    });
  }
}
