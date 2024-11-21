// profile.js
export default function renderPageContent() {
  const content = document.getElementById("content");
  content.innerHTML = `
         
  <div class="bg-white p-6">
  <h1 id="header" class="text-3xl font-bold mb-4 text-blue md:text-[#03063A]">List your Pet</h1>
  
  <form id="pet-form" method="POST" enctype="multipart/form-data" class="space-y-4">
    <fieldset class="relative border-[1px] border-sky-500 rounded-2xl">
      <legend class="text-sm text-gray-500 px-2 ml-2 lableName">
        Pet Name <span class="text-red-500 text-sm pet-name-error hidden">is required</span>
      </legend>
      <input
        id="pet-name"
        name="name"
        type="text"
        autocomplete="off"
        class="w-full px-3 pb-3 pt-1 rounded-2xl focus:outline-none "
        placeholder="Enter Pet Name"
      />
    </fieldset>

    <fieldset class="relative border-[1px] border-sky-500 rounded-2xl ">
      <legend class="text-sm text-gray-500 px-2 ml-2 lableName">
        Category <span class="text-red-500 text-sm category-error hidden">is required</span>
      </legend>
      <select
        id="category"
        name="category"
        class="w-full px-3 pb-3 pt-1 rounded-2xl focus:outline-none "
      >
        <option value=""disabled selected><span">Select a Category</span></option>
        <option value="Cat">Cat</option>
        <option value="Dog">Dog</option>
      </select>
    </fieldset>

    <div class="grid grid-cols-2 gap-4">
      <fieldset class="relative border-[1px] border-sky-500 rounded-2xl ">
        <legend class="text-sm text-gray-500 px-2 ml-2 lableName">
          Breed <span class="text-red-500 text-sm breed-error hidden">is required</span>
        </legend>
        <select
          id="breed"
          name="breed"
          class="w-full px-3 pb-3 pt-1 rounded-2xl focus:outline-none "
        >
          <option value="" disabled selected>Select a category first</option>
        </select>
      </fieldset>

      <fieldset class="relative border-[1px] border-sky-500 rounded-2xl ">
        <legend class="text-sm text-gray-500 px-2 ml-2 lableName">
          Age <span class="text-red-500 text-sm  age-error hidden">is required</span>
        </legend>
        <input
          id="age"
          name="age"
          type="number"
          autocomplete="off"
          min="0"
          class="w-full px-3 pb-3 pt-1 bg-white rounded-2xl focus:outline-none"
          placeholder="Enter age in years"
        />
      </fieldset>
    </div>

    <fieldset class="relative border-[1px] border-sky-500 rounded-2xl ">
      <legend class="text-sm text-gray-500 px-2 ml-2 lableName">
        Gender <span class="text-red-500 text-sm gender-error hidden">is required</span>
      </legend>
      <select
        id="gender"
        name="gender"
        class="w-full px-3 pb-3 pt-1 rounded-2xl focus:outline-none "
      >
        <option value="" disabled selected>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </fieldset>

    <fieldset class="relative border-[1px] border-sky-500 rounded-2xl ">
      <legend class="text-sm text-gray-500 px-2 ml-2 lableName">
        Description <span class="text-red-500 text-sm description-error hidden">is required</span>
      </legend>
      <textarea
        id="description"
        name="interests"
        class="w-full px-3 pb-3 pt-1 rounded-2xl focus:outline-none  resize-none"
        rows="2"
        placeholder="Enter Pet Description"
      ></textarea>
    </fieldset>

    <div class="flex items-center">
      <label
        class="flex items-center justify-center bg-blue text-white px-4 py-2 mr-4 rounded cursor-pointer text-sm"
      >
        Choose File
        <input type="file" class="hidden file" id="file-input" name="petPicture" accept="image/*"/>
      </label>
      <label class="text-sm file-label" for="file-input">Select Pet image     <span class="text-red-500 text-sm ml-2 -mt-2 file-error hidden">File is required</span></label>
      <img id="image-preview" src="" alt="Current Pet Image" class="ml-4  h-10 w-10 object-cover object-center hidden" />
    </div>
    <span class="text-red-500 text-xs ml-2 -mt-2 file-error hidden">File is required</span>
    <input type="hidden" id="pet-picture-src" name="petPictureSrc" />
    <div class="mt-4 flex w-full justify-center">
      <button
        type="submit"
        class="w-1/3 py-2 rounded-2xl bg-blue text-white hover:bg-sky-700 focus:outline-none "
      >
        <span class="text-sm">Save Details</span>
      </button>
    </div>
  </form>
</div>
    `;

  const petNameInput = document.querySelector("#pet-name");
  const genderInput = document.querySelector("#gender");
  const categoryInput = document.querySelector("#category");
  const breedInput = document.querySelector("#breed");
  const descriptionTextArea = document.querySelector("#description");
  const fileInput = document.querySelector("#file-input");
  const ageInput = document.querySelector("#age");
  const petNameError = document.querySelector(".pet-name-error");
  const categoryError = document.querySelector(".category-error");
  const breedError = document.querySelector(".breed-error");
  const descriptionError = document.querySelector(".description-error");
  const fileError = document.querySelector(".file-error");
  const ageError = document.querySelector(".age-error");
  const genderError = document.querySelector(".gender-error");
  const petForm = document.getElementById("pet-form");
  const successText = document.querySelector(".success-text");
  const errorText = document.querySelector(".error-text");
  const fileLabel = document.querySelector(".file-label");
  const header = document.querySelector("#header");
  const imagePreview = document.querySelector("#image-preview");
  const petIdForUpdate = localStorage.getItem("petToUpdateId");
  const token = localStorage.getItem("token");
  const catBreeds = ["Persian", "Maine Coon", "Siamese", "Bengal", "Sphynx"];
  const dogBreeds = ["Labrador Retriever", "German Shepherd", "Golden Retriever", "Bulldog", "Poodle"];


if(petIdForUpdate){
  header.textContent  = "Update your pet";
}
  async function fetchPetData(petId) {
    try {
      const response = await fetch(API_URLS.PETS.VIEW(petId), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        console.error("Failed to fetch pet data");
        return;
      }
  
      const petData = await response.json();
  
      // Populate the form with fetched pet data
      if (petNameInput) petNameInput.value = petData.name || "";
      if (genderInput) genderInput.value = petData.gender || "";
      if (descriptionTextArea) descriptionTextArea.value = petData.interests || "";
      if (ageInput) ageInput.value = petData.age || "";
      
  
      // Set the image preview if there is a picture URL
      const defaultImage = "/assets/images/default-pet.jpg";
      const petPictureSrc = petData.petPicture ? `http://localhost:3000${petData.petPicture}` : defaultImage;
      
      imagePreview.src = petPictureSrc;
      imagePreview.style.display = "block";
      fileLabel.style.display = "none";
  
      // Set category and update breed options
      if (categoryInput) {
        categoryInput.value = petData.species || "";
  
        // Trigger change event to populate the breed options
        const event = new Event("change");
        categoryInput.dispatchEvent(event);
  
        // Set breed value after options are populated
        if (breedInput) {
          setTimeout(() => {
            breedInput.value = petData.breed || "";
          }, 0);
        }
      }
    } catch (error) {
      console.error("Error fetching pet data:", error);
    }
  }
  
  // Update breed options based on the selected category
    document.getElementById("category").addEventListener("change", function() {
    const breedSelect = document.getElementById("breed");
    breedSelect.innerHTML = '<option value="" disabled selected>Select a category first</option>'; // Reset options
  
    const category = this.value;
    let breeds = [];
    if (category === "Cat") {
      breeds = catBreeds;
    } else if (category === "Dog") {
      breeds = dogBreeds;
    }
  
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed;
      option.textContent = breed;
      breedSelect.appendChild(option);
    });
  });
  
  // Check if petId exists in local storage and fetch data if present
  if (petIdForUpdate) {
    fetchPetData(petIdForUpdate);
  }
  
    
      categoryInput.addEventListener("change", () => {
      const selectedCategory = categoryInput.value;
      
      // Reset the breed options
      breedInput.innerHTML = '<option value="" disabled selected>Select a breed</option>';
    
      // Determine the correct breed list based on the selected category
      let breeds = [];
      if (selectedCategory === "Cat") {
        breeds = catBreeds;
      } else if (selectedCategory === "Dog") {
        breeds = dogBreeds;
      }
    
      // Populate the breed input with options
      breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed;
        option.textContent = breed;
        breedInput.appendChild(option);
      });
    });


if (ageInput) {
  ageInput.addEventListener("input", () => {
    ageInput.value = ageInput.value.replace(/[^0-9]/g, "");
  });
}
  /**
   * Displays an error message for the input field if it is empty.
   */

  const displayError = (input, error) => {
    if (!input) return; // Prevents error if input is null
    const label = input.closest(".relative")?.querySelector(".lableName");
    if (!input.value.trim()) {
      error?.classList.remove("hidden");
      // input.style.border = "1px solid red";
      if (label) label.style.color = "#ef4444"; // Using Tailwind's red-500 color
    } else {
      error?.classList.add("hidden");
      if (label) label.style.color = "#6b7280"; 
    }
  };
  

  
  //Event listener for file input
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
  
      reader.onload = function (e) {

        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
        fileLabel.style.display = "none"
      };
  
      reader.readAsDataURL(file);
    } else {
      imagePreview.style.display = "none";
      fileLabel.style.display = "block" 
    }
  });
  const validateInputs = (event) => {
    event.preventDefault();
  
    if (petNameInput) displayError(petNameInput, petNameError);
    if (genderInput) displayError(genderInput, genderError);
    if (categoryInput) displayError(categoryInput, categoryError);
    if (breedInput) displayError(breedInput, breedError);
    if (descriptionTextArea) displayError(descriptionTextArea, descriptionError);
    if (fileInput && !petIdForUpdate) displayError(fileInput, fileError);
    if (ageInput) displayError(ageInput, ageError);
  
    if (
      petNameInput.value.trim() &&
      genderInput.value.trim() &&
      categoryInput.value.trim() &&
      breedInput.value.trim() &&
      descriptionTextArea.value.trim() &&
      ageInput.value.trim() &&
      (fileInput.files.length > 0 || petIdForUpdate) // File is optional if updating
    ) {
      if (petIdForUpdate) {
        updatePet(petIdForUpdate);
      } else {
        createPet();
      }
    }
  };
  
  const userId = localStorage.getItem("userId");

  const userIdNumber = parseInt(userId, 10);
  const createPet = async () => {
  
    const petData = new FormData();
    petData.append("name", petNameInput.value);
    petData.append("gender", genderInput.value);
    petData.append("species", categoryInput.value);
    petData.append("breed", breedInput.value);
    petData.append("age", ageInput.value);
    petData.append("interests", descriptionTextArea.value);
    petData.append("petPicture", fileInput.files[0]);
    petData.append("userId", userIdNumber);


    try {
      const response = await fetch(API_URLS.PETS.CREATE, {
        method: "POST",
        body: petData,
        headers: {
        Authorization: `Bearer ${token}`,

        },
      });
      await response.json()

      if (response.ok) {
        const createPetEvent = new CustomEvent('petCreated' , {bubbles: true})
        document.dispatchEvent(createPetEvent)

        showToast("Pet created successfully", "success");
        resetForm();
    } else {
        errorText.classList.remove("hidden");
    }
} catch (error) {
    console.error("Error creating pet:", error);
    alert("Error creating pet. Please try again later."); 
    showToast("Error creating pet", "error");
}
};
const updatePet = async (petId) => {
  const petData = new FormData();
  petData.append("name", petNameInput.value);
  petData.append("gender", genderInput.value);
  petData.append("species", categoryInput.value);
  petData.append("breed", breedInput.value);
  petData.append("age", ageInput.value);
  petData.append("interests", descriptionTextArea.value);
  if (fileInput.files.length > 0) {
    petData.append("petPicture", fileInput.files[0]);
  }
  petData.append("userId", userIdNumber);

  try {
    const response = await fetch(API_URLS.PETS.UPDATE(petId), {
      method: "PUT",
      body: petData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      await response.json();

    if (response.ok) {
      const updatePetEvent = new CustomEvent("petCreated", { bubbles: true });
      document.dispatchEvent(updatePetEvent);

      showToast("Pet updated successfully", "success");
      setTimeout(() => {
        successText.classList.add("hidden");
      }, 5000);

      // resetForm();
    } else {
      errorText.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error updating pet:", error);
    showToast("Error updating pet", "error");
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
    fileLabel.style.display = "block" 
    imagePreview.style.display = "none";
  };

  petForm.addEventListener("submit", validateInputs);

}
