// profile.js
export default function renderPageContent() {
  const customCssLink = document.createElement("link");
  customCssLink.rel = "stylesheet";
  customCssLink.href = "../styles/petprofile.css";
  document.head.appendChild(customCssLink);
  const customStyles = document.createElement("style");
    customStyles.textContent = `
        .font-poppins {
            font-family: "Poppins", sans-serif;
        }
        .color {
            color: #70717b;
        }
        .bg-color {
            background: #157aff;
        }
    `;
    document.head.appendChild(customStyles);
    const content = document.getElementById("content");
     content.innerHTML = `
         <main class="flex-1 p-4 z-10 color">
        <div >
        <p class="text-green-500 font-bold hidden success-text"><span> &#9989;</span>Your Pet was created Succesfully </p>
        <p class="text-red-500 font-bold error-text hidden"> Cannot Create a Pet Profile Right Now!</p>
          <h1 id="heading" class="text-3xl font-bold mb-12 mt-2 text-gray-800">
            List your Pet
          </h1>

          <form id="pet-form" method="POST" enctype="multipart/form-data">
            <div class="grid gap-5">
              <div class="relative w-full">
                <label class="absolute -top-2 left-3 z-10 bg-white text-sm"
                  >Pet Name</label
                >
                <input
                  id="pet-name"
                  name="name"
                  type="text"
                  class="w-full border-2 rounded-2xl p-3 z-0"
                />
                <span class="text-red-500 text-xs ml-2 hidden pet-name-error">Pet Name is required</span>
              </div>

              <div class="relative w-full">
                <label class="absolute -top-2 left-3 z-10 bg-white text-sm">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  class="w-full border-2 rounded-2xl p-3 z-0"
                >
                  <option value="" disabled selected></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <span class="text-red-500 text-xs ml-2 hidden gender-error">
                  Gender is required
                </span>
              </div>

              <div class="relative w-full">
                <label class="absolute -top-2 left-3 z-10 bg-white text-sm"
                  >Category</label
                >
                <input
                id="category"
                name="category"
                  type="text"
                  class="w-full border-2 rounded-2xl p-3 z-0"
                />
                <span class="text-red-500 text-xs ml-2 ml-2 hidden category-error">Category is required</span>
              </div>

              <div class="flex flex-row space-x-4">
 
  <div class="relative w-1/2">
    <label class="absolute -top-2 left-3 z-10 bg-white text-sm">Breed</label>
    <input
      id="breed"
      name="breed"
      type="text"
      class="w-full border-2 rounded-2xl p-3 z-0"
    />
    <span class="text-red-500 text-xs ml-2 hidden breed-error">Breed is required</span>
  </div>

  <div class="relative w-1/2">
    <label class="absolute -top-2 left-3 z-10 bg-white text-sm">Age</label>
    <input
      id="age"
      name="age"
      type="text"
      class="w-full border-2 rounded-2xl p-3 z-0"
    />
    <span class="text-red-500 text-xs ml-2 hidden age-error">Age is required</span>
  </div>
</div>

              <div class="relative w-full">
                <label class="absolute -top-2 left-3 z-10 bg-white text-sm"
                  >Description</label
                >
                <textarea
                id="description"
                name="interests"
                  type="text"
                  class="w-full border-2 rounded-2xl p-3 z-0 resize-none"
                  rows="2"
                ></textarea>
                <span class="text-red-500 text-xs ml-2 hidden description-error">Description is required</span>
              </div>

              <div class="flex items-center -mb-3">
                <label
                  class="flex items-center justify-center bg-white text-red-500 px-4 py-2 mr-4 rounded cursor-pointer text-sm"
                  style="border: 1px solid #157aff"
                >
                  Choose File
                  <input type="file" class="hidden file" id="file-input" name="petPicture" accept="image/*"/>
                </label>
                <label class="ml-3 color text-sm" for="file-input">Select Pet image</label>
              </div>
              <span class="text-red-500 text-xs ml-2 hidden file-error">File is required</span>

              <button
                type="submit"
                class="mt-6 w-full py-2 rounded-2xl submit-btn"
                style="background-color: #157aff; color: #ffffff"
              >
                <span class="text-xs">Save Details</span>
              </button>
            </div>
          </form>
        </div>
      </main>


    `;

  const petNameInput = document.querySelector("#pet-name");
  const genderInput = document.querySelector("#gender");
  const categoryInput = document.querySelector("#category");
  const breedInput = document.querySelector("#breed");
  const descriptionTextArea = document.querySelector("#description");
  const fileInput = document.querySelector("#file-input");
  const ageInput = document.querySelector("#age");
  const petNameError = document.querySelector(".pet-name-error");
  const genderError = document.querySelector(".gender-error");
  const categoryError = document.querySelector(".category-error");
  const breedError = document.querySelector(".breed-error");
  const descriptionError = document.querySelector(".description-error");
  const fileError = document.querySelector(".file-error");
  const ageError = document.querySelector(".age-error");
  const submitButton = document.querySelector(".submit-btn");
  const petForm = document.getElementById("pet-form");
  const successText = document.querySelector(".success-text");
  const errorText = document.querySelector(".error-text");
  const heading = document.querySelector('#heading')

  /**
   * Displays an error message for the input field if it is empty.
   */
  const displayError = (input, error) => {
    if (!input.value.trim()) {
      error.classList.remove("hidden");
      input.style.border = "1px solid red";
    } else {
      error.classList.add("hidden");
      input.style.border = "";
    }
  };

  
  const validateInputs = (event) => {
    event.preventDefault(); // Prevents the form from submitting by default

    // Validate all inputs
    displayError(petNameInput, petNameError);
    displayError(genderInput, genderError);
    displayError(categoryInput, categoryError);
    displayError(breedInput, breedError);
    displayError(descriptionTextArea, descriptionError);
    displayError(fileInput, fileError);
    displayError(ageInput, ageError);

    // Check if all fields are valid before creating the pet
    if (
      petNameInput.value.trim() &&
      genderInput.value.trim() &&
      categoryInput.value.trim() &&
      breedInput.value.trim() &&
      descriptionTextArea.value.trim() &&
      fileInput.files.length > 0 &&
      ageInput.value.trim()
    ) {
        if (petNameInput.dataset.petId) {
            // Call updatePet with the pet ID
            updatePet(petNameInput.dataset.petId);
        } else {
            // Call createPet for a new pet
            createPet();
        }
    }
  };

 
  const userId = localStorage.getItem("userId");
  const createPet = async () => {
    const petData = new FormData();
    petData.append("name", petNameInput.value);
    petData.append("gender", genderInput.value);
    petData.append("species", categoryInput.value);
    petData.append("breed", breedInput.value);
    petData.append("age", ageInput.value);
    petData.append("interests", descriptionTextArea.value);
    petData.append("petPicture", fileInput.files[0]);
    petData.append("userId", 1);

    console.log([...petData]); 
    try {
      const response = await fetch("http://localhost:3000/api/pets/new", {
        method: "POST",
        body: petData,
      });

      if (response.ok) {
        successText.classList.remove("hidden");

        setTimeout(() => {
          successText.classList.add("hidden");
        }, 5000);
        resetForm(); // Reset the form if successful
        localStorage.setItem("petAdded", "true")
        const event = new CustomEvent('petAdded', { bubbles: true });
        document.dispatchEvent(event);
        
      } else {
        errorText.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Error creating pet:", error); // Log the error for debugging
      alert("Error creating pet. Please try again later."); // Display a generic error message
    }
  };
  const resetForm = () => {
    petNameInput.value = "";
    genderInput.value = "";
    categoryInput.value = "";
    breedInput.value = "";
    ageInput.value = "";
    descriptionTextArea.value = "";
    fileInput.value = "";
  };



  document.addEventListener('petEdited', (event) => {
    const petData = event.detail; // 
    if (petData) {
       
       submitButton.innerHTML = "<p class='text-xs m-1'>Save Changes</p>"
       submitButton.classList.add('py-2', 'w-full', 'rounded-2xl')
       heading.innerHTML = "Update Details"

        petNameInput.value = petData.name;
        genderInput.value = petData.gender;
        categoryInput.value = petData.species;
        breedInput.value = petData.breed;
        ageInput.value = petData.age;
        descriptionTextArea.value = petData.interests;
        petNameInput.dataset.petId = petData.id;
        console.log(petNameInput.dataset.petId);
    } 
    
});

const updatePet = async (petId) => {
    const petData = new FormData();
    petData.append("name", petNameInput.value);
    petData.append("gender", genderInput.value);
    petData.append("species", categoryInput.value);
    petData.append("breed", breedInput.value);
    petData.append("age", ageInput.value);
    petData.append("interests", descriptionTextArea.value);
    console.log(petId);
    console.log(petNameInput.value);
    if (fileInput.files.length > 0) {
        petData.append("petPicture", fileInput.files[0]); 
    }

    try {
        const response = await fetch(`http://localhost:3000/api/pets/edit/${petId}`, {
            method: "PUT",
            body: petData,
        });
        
        if (response.ok) {
            successText.classList.remove('hidden')
            setTimeout(() => successText.classList.add("hidden"), 5000);
            submitButton.innerHTML = "<p class='text-xs m-1'>Save Details</p>"
            submitButton.classList.add('py-2', 'w-full', 'rounded-2xl')
            heading.innerHTML = "List your pet"
            resetForm();
            petNameInput.removeAttribute('data-pet-id')
            localStorage.setItem("petUpdated", "true");
            console.log('Pet was updated succesfully');
        } else {
            errorText.classList.remove("hidden");
        }
    } catch (error) {
        console.error("Error updating pet:", error);
        alert("Error updating pet. Please try again later.");
    }
};
  petForm.addEventListener("submit", validateInputs);



  
}
