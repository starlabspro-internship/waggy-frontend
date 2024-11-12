export default function renderRightContent() {
    const rightContent = document.getElementById("right-content");
    const searchInput = document.querySelector("#search-bar");

    // Initialize the right content area
    rightContent.innerHTML = `
      <div class="p-4 rounded-lg">
          <hr />
          <div class="pet-list-container">
            <p class="text-gray-400 ml-3 text-sm" style="color: #157aff">
              No pet listed
            </p>
          </div>
      </div>
    `;
  
    const petListContainer = document.querySelector(".pet-list-container");
  
    // Declare pets array globally
    window.pets = [];
    const userId = localStorage.getItem("userId");
  const userIdNumber = parseInt(userId, 10);
    // Fetch pets from the API
    const fetchPets = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/pets/list");
        const fetchedPets = await response.json();
  
        if (response.ok) {
          window.pets = fetchedPets.filter((fetchedPet) => fetchedPet.userId === userIdNumber ); // Update global pets array
          displayPets(window.pets);
        } else {
          console.log("Failed to fetch pets:", fetchedPets.message);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
  
    // Display the pets in the pet list container
    const displayPets = (petsToDisplay) => {
      if (petsToDisplay.length === 0) {
        petListContainer.innerHTML =
          '<p class="text-gray-400 ml-3 text-sm" style="color: #157aff">No Pet Listed</p>';
        return;
      }
  
      petListContainer.innerHTML = ""; // Clear the container
  
      petsToDisplay.forEach((pet) => {
        const petItem = document.createElement("div");
        petItem.classList.add("pet-item", "mb-5");
  
        petItem.innerHTML = `
         
          <div class="flex items-center justify-between space-x-5 cursor-pointer sm:justify-center ">
         <div class="flex flex-col md:flex-row md:space-x-5">
             
            <img src="http://localhost:3000${pet.petPicture || "/assets/images/default-pet.jpg"}" 
              alt="${pet.name}" class="w-16 h-16 rounded-full"> 
         
            <div>
              <p class="font-bold text-color -mb-1">${pet.name}</p>
              <p class="text-xs text-red-500 -mb-1">${pet.breed} ${pet.species}</p>
            </div>
         </div>
            <div class="flex flex-col space-y-2">
              <button 
                class="bg-[#157aff] text-white px-2 py-1 rounded-2xl delete-pet-btn" 
                data-pet-id="${pet.id}">
                X
              </button>
              <button 
                class="bg-[#157aff] text-white px-2 py-1 rounded-2xl edit-pet-btn" 
                data-pet-id="${pet.id}">
                &#9998; 
              </button>
            </div>
          </div>
        `;
  
        petListContainer.appendChild(petItem);
      });
    };
  
    // Fetch pets initially and on pet creation
    fetchPets();
    document.addEventListener("petCreated", fetchPets);
    document.addEventListener("petEdited", fetchPets);
    // Edit pet function
    window.editPet = async (petId) => {
        try {
            const petToEdit = pets.find(pet => pet.id === +petId);
            console.log(petToEdit);
            if (petToEdit) {
                const event = new CustomEvent('editPet', {
                    bubbles: true,  
                    detail: petToEdit    
                });
                document.dispatchEvent(event);
              
            } else {
                console.log("Pet not found with ID:", petId);
            }
        } catch (error) {
            console.error("Error editing pet:", error);
        }

    };
  
    // Delete pet function
    window.deletePet = async (petId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/pets/remove/${petId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.ok) {
          console.log("Pet deleted successfully");
          fetchPets(); // Refresh the pet list after deletion
        } else {
          const result = await response.json();
          console.error("Error deleting pet:", result.error);
          alert("Failed to delete pet: " + result.error);
        }
      } catch (error) {
        console.error("Error deleting pet:", error);
        alert("Error deleting pet. Please try again later.");
      }
    };
  
    // Event delegation for edit and delete buttons
    rightContent.addEventListener("click", (e) => {
      const petId = e.target.getAttribute("data-pet-id");
  
      if (e.target.classList.contains("edit-pet-btn")) {
        window.editPet(petId);
      }
  
      if (e.target.classList.contains("delete-pet-btn")) {
        window.deletePet(petId);
      }
    });
  
    // Search input event listener
    searchInput.addEventListener("input", (e) => {
      const searchQuery = e.target.value.toLowerCase();
      const filteredPets = window.pets.filter((pet) => {
        return (
          pet.name.toLowerCase().includes(searchQuery) ||
          pet.breed.toLowerCase().includes(searchQuery) ||
          pet.species.toLowerCase().includes(searchQuery) ||
          pet.age.toString().includes(searchQuery)
        );
      });
      displayPets(filteredPets); // Display filtered pets
    });
  }