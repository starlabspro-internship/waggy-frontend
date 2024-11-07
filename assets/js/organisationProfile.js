// assets/js/validation.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("organization-form");
  const saveBtn = document.getElementById("saveBtn");
  const fileInput = document.getElementById("file-input");
  const fileUrlSpan = document.querySelector(".file-url");

  function validateField(field, errorClass, errorMessage) {
      const errorSpan = document.querySelector(`.${errorClass}`);
      if (!field.value.trim()) {
          errorSpan.textContent = errorMessage;
          errorSpan.classList.remove("hidden");
          return false;
      } else {
          errorSpan.classList.add("hidden");
          return true;
      }
  }

  function validateForm() {
      let isValid = true;

      // Validate each field
      isValid &= validateField(
          document.getElementById("org-name"),
          "org-name-error",
          "Organization Name is required"
      );

      isValid &= validateField(
          document.getElementById("contact-email"),
          "contact-email-error",
          "Contact Email is required"
      );

      isValid &= validateField(
          document.getElementById("org-phonenumber"),
          "org-phonenumber-error",
          "Phone Number is required"
      );

      isValid &= validateField(
          document.getElementById("location"),
          "location-error",
          "Location is required"
      );

      isValid &= validateField(
          document.getElementById("description"),
          "description-error",
          "Description is required"
      );

      // Check if a file is selected for the logo
      const fileErrorSpan = document.querySelector(".file-error");
      if (!fileInput.files.length) {
          fileErrorSpan.textContent = "Logo is required";
          fileErrorSpan.classList.remove("hidden");
          isValid = false;
      } else {
          fileErrorSpan.classList.add("hidden");
      }

      return isValid;
  }

  // Display the selected file URL
  fileInput.addEventListener("change", function () {
      if (fileInput.files.length > 0) {
          fileUrlSpan.textContent = fileInput.files[0].name; // Display file name as URL
      } else {
          fileUrlSpan.textContent = "Select organization logo";
      }
  });

  // Attach event listener to the save button
  saveBtn.addEventListener("click", function () {
      if (validateForm()) {
          form.submit(); // Submit the form if valid
      }
  });
});