export default function renderRightContent() {
    const rightContent = document.getElementById("right-content");
    const searchInput = document.querySelector('#search-bar');
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
    let pets = []; // Define the pets array in the correct scope

    // Fetch pets from the API
    const fetchPets = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/pets/list");
            const fetchedPets = await response.json();
            
            if (response.ok) {
                pets = fetchedPets; // Assign the fetched pets to the global array
                console.log(pets);
                displayPets(pets); // Display all pets initially
            } else {
                console.log("Failed to fetch pets:", fetchedPets.message);
            }
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    // Display pet items in the list
    const displayPets = (petsToDisplay) => {
        if (petsToDisplay.length === 0) {
            petListContainer.innerHTML =
            '<p class="text-gray-400 ml-3 text-sm" style="color: #157aff">No Pet Listed</p>';
            return;
        }
        
        petListContainer.innerHTML = ""; // Clear previous content
        
        petsToDisplay.forEach((pet) => {
            const petItem = document.createElement("div");
            petItem.classList.add("pet-item", "mb-5");
            
            petItem.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <img src="http://localhost:3000${pet.petPicture || "/assets/images/default-pet.jpg"}" alt="${pet.name}" class="w-14 h-14 rounded-full">
                    <div>
                        <p class="font-bold">${pet.name}</p>
                        <p class="text-sm text-gray-500">${pet.breed} | ${pet.species} | ${pet.age}</p>
                    </div>
                </div>
                
                <div class="flex flex-col space-y-2">
                    <button 
                        class="bg-[#157aff] text-white px-2 py-1 rounded-2xl" 
                        onclick="deletePet(${pet.id})">
                        X
                    </button>
                    <button 
                        data-pet-id="edit-${pet.id}"
                        class="bg-[#157aff] text-white px-2 py-1 rounded-2xl" 
                        onclick="editPet(${pet.id})">
                        &#9998; 
                    </button>
                </div>
            </div>
            `;
            petListContainer.appendChild(petItem);
        });
    };

    document.addEventListener('petAdded', fetchPets); // Refresh when a new pet is added
    

    // Refresh the pet list if the "petAdded" flag is set
    if (localStorage.getItem("petAdded") === "true") {
        fetchPets();
        localStorage.removeItem("petAdded");
    }

    fetchPets(); 

    // window.location.href = 'petProfile.html'; 
    window.editPet = async (petId) => {
        try {
            const petToEdit = pets.find(pet => pet.id === petId);
            console.log(petToEdit);
            if (petToEdit) {
                
                // localStorage.setItem('editPetData', JSON.stringify(petToEdit));
                const event = new CustomEvent('petEdited', {
                    bubbles: true,       // Allow the event to bubble up
                    detail: petToEdit    // Pass the pet data as event details
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
    searchInput.addEventListener('input', (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filteredPets = pets.filter(pet => {
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