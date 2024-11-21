const toastifyCSS = document.createElement("link");
toastifyCSS.rel = "stylesheet";
toastifyCSS.href =
  "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css";
document.head.appendChild(toastifyCSS); // Add to <head>

// Dynamically add Toastify JS
const toastifyJS = document.createElement("script");
toastifyJS.src = "https://cdn.jsdelivr.net/npm/toastify-js";
document.body.appendChild(toastifyJS); // Add to <body> (usually better for script loading)

const content = document.getElementById("content");
content.innerHTML = `
    <!-- Your HTML content here -->
  `;
export default async function renderPageContent() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <div class="py-50">
      <p class="text-green-500 font-bold hidden success-text">
        <span> &#9989;</span>Your info is updated successfully!
      </p>
      <p class="text-red-500 font-bold error-text hidden">
        Cannot edit a User Profile right now!
      </p>
      <h1 class="text-3xl font-bold mb-6 mt-2 text-gray-800">
        Edit Profile
      </h1>

      <form id="profile-form" method="POST" enctype="multipart/form-data">
        <div class="grid gap-5">
          <!-- Form fields for first name, last name, organization name, etc. -->
          <div class="relative w-full">
            <label class="absolute -top-2 left-3 z-10 bg-white text-sm"> First Name</label>
            <input id="user-name" name="name" type="text" class="w-full border-2 rounded-2xl p-3 z-0" />
            <span class="text-red-500 text-xs ml-2 hidden user-name-error">User Name is required</span>
          </div>

          <div class="relative w-full">
            <label class="absolute -top-2 left-3 z-10 bg-white text-sm"> Last Name</label>
            <input id="user-lastname" name="lastname" type="text" class="w-full border-2 rounded-2xl p-3 z-0" />
            <span class="text-red-500 text-xs ml-2 hidden user-lastname-error">User Last Name is required</span>
          </div>

          <div class="relative w-full">
            <label class="absolute -top-2 left-3 z-10 bg-white text-sm"> Organization Name</label>
            <input id="organisationname" name="organisationName" type="text" class="w-full border-2 rounded-2xl p-3 z-0" />
            <span class="text-red-500 text-xs ml-2 hidden organisationname-error">Organization Name is required</span>
          </div>

          <div class="relative w-full">
            <label class="absolute -top-2 left-3 z-10 bg-white text-sm">Email Address</label>
            <input id="emailaddress" name="emailaddress" type="email" class="w-full border-2 rounded-2xl p-3 z-0" />
            <span class="text-red-500 text-xs ml-2 hidden emailaddress-error">Email Address is required</span>
          </div>

          <div class="relative w-full">
            <label class="absolute -top-2 left-3 z-10 bg-white text-sm">Phone Number</label>
            <input id="phonenumber" name="phonenumber" type="text" class="w-full border-2 rounded-2xl p-3 z-0" pattern="\\d*" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9]/g, '')" />
            <span class="text-red-500 text-xs ml-2 hidden phonenumber-error">Phone Number is required</span>
          </div>

          <div class="relative w-full">
            <label class="absolute -top-2 left-3 z-10 bg-white text-sm">Location</label>
            <input id="location" name="location" type="text" class="w-full border-2 rounded-2xl p-3 z-0" />
            <span class="text-red-500 text-xs ml-2 hidden location-error">Location is required</span>
          </div> 

          <div class="flex items-center -mb-3">
            <label class="flex items-center justify-center bg-white text-red-500 px-4 py-2 mr-4 rounded cursor-pointer text-sm" style="border: 1px solid #157aff">
              Choose File
              <input type="file" class="hidden file" id="file-input" name="profilePicture" accept="image/*" />
            </label>
            <span class="file-url ml-3 color text-sm file-label" for="file-input">Select user image</span>
            <img id="image-preview" src="" alt="Current Pet Image" style="max-width: 100px; max-height: 100px; display: none;"/>
          </div>
          <span class="text-red-500 text-xs ml-2 hidden file-error">File is required</span>

          <button type="submit" id="saveBtn" class="mt-6 py-2 rounded-2xl submit-btn" style="background-color: #157aff; color: #ffffff; width: 11em;">
            <span class="text-xs mx-4">Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  `;

  // References to form fields and error messages
  const firstNameInput = document.querySelector("#user-name");
  const lastNameInput = document.querySelector("#user-lastname");
  const organisationNameInput = document.querySelector("#organisationname");
  const emailaddressInput = document.querySelector("#emailaddress");
  const phonenumberInput = document.querySelector("#phonenumber");
  const locationInput = document.querySelector("#location");
  const fileInput = document.querySelector("#file-input");
  const userNameError = document.querySelector(".user-name-error");
  const lastNameError = document.querySelector(".user-lastname-error");
  const organisationNameError = document.querySelector(
    ".organisationname-error"
  );
  const emailaddressError = document.querySelector(".emailaddress-error");
  const phonenumberError = document.querySelector(".phonenumber-error");
  const locationError = document.querySelector(".location-error");
  const fileInputError = document.querySelector(".file-error");
  const submitButton = document.querySelector("#saveBtn");
  const profileForm = document.querySelector("#profile-form");
  const successText = document.querySelector(".success-text");
  const errorText = document.querySelector(".error-text");
  const fileLabel = document.querySelector(".file-label");
  const imagePreview = document.querySelector("#image-preview");

  // Event listener for file input change
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
        imagePreview.style.width = "50px";
        imagePreview.style.borderRadius = "50%";
        fileLabel.style.display = "none";
      };

      reader.readAsDataURL(file);
    } else {
      imagePreview.style.display = "none";
      fileLabel.style.display = "block";
    }
  });

  // Populate form fields with user data on page load
  const userId = localStorage.getItem("userId");
  let hasOrganisationName;
  try {
    const response = await fetch(
      `http://localhost:3000/api/profiles/view/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    const user = await response.json();
    console.log(user.profile.address, "sdasdadsadasd")

    localStorage.setItem("userLocation", user.profile.address)

    // Check if the user has an organisationName
    hasOrganisationName = Boolean(user.profile.organisationName);

    if (response.ok) {
      firstNameInput.value = user.profile.firstName || "";
      lastNameInput.value = user.profile.lastName || "";
      organisationNameInput.value = user.profile.organisationName || "";
      emailaddressInput.value = user.email || "";
      phonenumberInput.value = user.profile.phoneNumber || "";
      locationInput.value = user.profile.address || "";

      if (user.profile.profilePicture) {
        imagePreview.src = `http://localhost:3000${user.profile.profilePicture}`;
        imagePreview.style.display = "block";
        imagePreview.style.width = "50px";
        imagePreview.style.borderRadius = "50%";
        fileLabel.style.display = "none";
      } else {
        imagePreview.style.display = "none";
        fileLabel.style.display = "block";
      }

      if (hasOrganisationName) {
        firstNameInput.parentElement.style.display = "none";
        lastNameInput.parentElement.style.display = "none";
        organisationNameInput.parentElement.style.display = "block";
      } else {
        firstNameInput.parentElement.style.display = "block";
        lastNameInput.parentElement.style.display = "block";
        organisationNameInput.parentElement.style.display = "none";
      }
    } else {
      console.error("Failed to load user data:", user);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  // ---------- UPDATE PROFILE ----------
  // Adding file validation conditionally based on user input
  profileForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Reset previous error messages
    const resetErrors = () => {
      document.querySelectorAll("label").forEach((label) => {
        label.style.color = ""; // Reset label color
        if (label.getAttribute("data-original-text")) {
          label.textContent = label.getAttribute("data-original-text");
        }
      });

      // Reset the file input label and error state
      const fileLabel = document.querySelector(".file-label");
      const fileInputError = document.querySelector(".file-error");
      if (fileLabel) {
        fileLabel.style.color = ""; // Reset label color
        fileLabel.textContent = "Select user image"; // Restore original text
      }
      if (fileInputError) {
        fileInputError.classList.add("hidden"); // Hide error message
      }
    };

    resetErrors();

    let hasError = false;

    // Validation rules
    const validateField = (inputElement, errorMessage) => {
      const label = inputElement.previousElementSibling;
      if (!inputElement.value.trim()) {
        hasError = true;

        // Store the original label text if not already stored
        if (!label.getAttribute("data-original-text")) {
          label.setAttribute("data-original-text", label.textContent);
        }

        // Replace the label text with the error message and make it red
        label.textContent = errorMessage;
        label.style.color = "#dc3545"; // Red color for the label
      } else {
        label.style.color = ""; // Reset label color
      }
    };

    // Apply validation for other fields
    if (hasOrganisationName) {
      validateField(organisationNameInput, "Organization Name is required");
    } else {
      validateField(firstNameInput, "First Name is required");
      validateField(lastNameInput, "Last Name is required");
    }
    validateField(emailaddressInput, "Email Address is required");
    validateField(phonenumberInput, "Phone Number is required");
    validateField(locationInput, "Location is required");

    // File validation - check if a new file is selected
    if (fileInput.files.length > 0) {
      // If a file is selected, check if it's valid
      if (!fileInput.files[0]) {
        hasError = true;
        fileLabel.style.color = "#dc3545"; // Red color for the label
        fileLabel.textContent = "Profile picture is required"; // Set the error text
      }
    }

    // If no new file is selected, skip the file validation
    else if (fileInput.files.length === 0 && imagePreview.src !== "") {
      // If there's an existing profile picture, don't require it
      fileLabel.textContent = "Select user image"; // Restore original text
    }

    // Stop submission if errors exist
    if (hasError) {
      return;
    }

    // Proceed with submission if validation passes
    const userData = new FormData();
    userData.append("name", firstNameInput.value);
    userData.append("lastname", lastNameInput.value);
    userData.append("organisationName", organisationNameInput.value);
    userData.append("emailaddress", emailaddressInput.value);
    userData.append("phonenumber", phonenumberInput.value);
    userData.append("location", locationInput.value);

    // Append the file if one is selected
    if (fileInput.files.length > 0) {
      userData.append("profilePicture", fileInput.files[0]);
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/profiles/edit/${userId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: userData,
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const newEvent = new CustomEvent("profileEdited", {
          bubbles: true,
          detail: {
            firstName: data.profile.firstName,
            email: data.email,
            profilePicture: data.profile.profilePicture,
          },
        });
        window.dispatchEvent(newEvent);
        console.log("CustomEvent dispatched:", newEvent);

        Toastify({
          text: "Your info is updated successfully!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          style: {
            background: "#28a745",
          },
        }).showToast();
      } else {
        Toastify({
          text: "Failed to update profile!",
          style: {
            background: "#dc3545",
          },
          duration: 3000,
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "An error occurred while updating your profile!",
        style: {
          background: "#dc3545",
        },
        duration: 3000,
      }).showToast();
    }
    console.log("Form submitted");
  });
}
