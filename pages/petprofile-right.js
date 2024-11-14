export default function renderRightContent() {
  const rightContent = document.getElementById("right-content");
  const searchInput = document.querySelector("#search-bar");
  // Initialize the right content area
  rightContent.innerHTML = `
    <div class="p-1 rounded-lg">
        <div class="pet-list-container space-y-4">
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
    let token = localStorage.getItem('token'); 

    if (!token) {
        console.log("User is not authenticated.");
        return; 
    }

    try {
        const response = await fetch(API_URLS.PETS.ALL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });

        const fetchedPets = await response.json();

        if (response.ok) {
            // Assuming 'userIdNumber' is the user ID of the currently authenticated user
            window.pets = fetchedPets.filter((fetchedPet) => fetchedPet.userId === userIdNumber); // Filter pets by userId
            displayPets(window.pets); // Update the displayed pets
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
          petItem.classList.add("pet-item", "mb-4", "bg-white", "p-2", "rounded-lg", "shadow-md", "flex", "items-center", "space-x-4", "hover:bg-blue-50", "cursor-pointer");
  
          petItem.innerHTML = `
              <div class="flex items-center space-x-4  w-full" onclick="navigateToAdoptInfo(${pet.id})">
                  <img src="http://localhost:3000${pet.petPicture || "/assets/images/default-pet.jpg"}" 
                  alt="${pet.name}" class="w-12 h-12 rounded-full object-cover object-center">
                  <div class="flex-1">
                      <p class="font-bold text-gray-800">${pet.name}</p>
                      <p class="text-sm text-thin text-gray-400"> ${pet.species}</p>
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

  window.navigateToAdoptInfo = (id) => {
      sessionStorage.setItem('selectedPet', id);
      window.location.href = '#petview';
  };

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
