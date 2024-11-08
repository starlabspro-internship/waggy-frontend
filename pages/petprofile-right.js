export default function renderRightContent() {
  const rightContent = document.getElementById("right-content");
  const searchInput = document.querySelector("#search-bar");
  rightContent.innerHTML = `
    <div class="p-4  rounded-lg">
        <hr />
        <div class="pet-list-container">
        <p class="text-gray-400 ml-3 text-sm" style="color: #157aff">
        No pet listed
        </p>
        </div>
        </div>
        `;

  const petListContainer = document.querySelector(".pet-list-container");
  let pets = [];

  const fetchPets = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/pets/list");
      const fetchedPets = await response.json();

      if (response.ok) {
        const pets = fetchedPets;
        displayPets(pets);
      } else {
        console.log("Failed to fetch pets:", fetchedPets.message);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  document.addEventListener("petCreated", fetchPets);

  const displayPets = (petsToDisplay) => {
    if (petsToDisplay.length === 0) {
      petListContainer.innerHTML =
        '<p class="text-gray-400 ml-3 text-sm" style="color: #157aff">No Pet Listed</p>';
      return;
    }

    petListContainer.innerHTML = "";

    petsToDisplay.forEach((pet) => {
      const petItem = document.createElement("div");
      petItem.classList.add("pet-item", "mb-5");

      petItem.innerHTML = `
        <div class="flex items-center justify-start space-x-5 cursor-pointer">
              <img src="http://localhost:3000${ pet.petPicture || "/assets/images/default-pet.jpg" }" alt="${pet.name}" class="w-14 h-14 rounded-full">  
               <div>
            <p class="font-bold text-color -mb-1">${pet.name}</p>
           <p class="text-xs text-red-500 -mb-1">${pet.breed} ${pet.species}</p>
              </div>
        </div>
            `;
      petListContainer.appendChild(petItem);
    });
  };

  fetchPets();

  //Edit pet details
  window.editPet = async (petId) => {
    
    try {
        const petToEdit = pets.find(pet => pet.id === petId);
        console.log(petToEdit);
        if (petToEdit) {
            console.log('Pet found with id' , petId);
          
        } else {
            console.log("Pet not found with ID:", petId);
        }
    } catch (error) {
        console.error("Error editing pet:", error);
    }
};
console.log(pets);
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
        fetchPets();
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

  // Search input event listener
  searchInput.addEventListener("input", (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredPets = pets.filter((pet) => {
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
