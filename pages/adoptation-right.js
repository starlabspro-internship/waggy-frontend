export default function renderRightContent() {
    const token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");

    const fetchMyPetsForAdoption = async () => {
        const baseUrl = `http://localhost:3000/api/adoption-requests/list`;
        const params = new URLSearchParams();
        params.append("adoptionStatus", "Available");

        const url = `${baseUrl}?${params.toString()}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            });
            const pets = await response.json();
            console.log(pets);
            const items = pets.filter((pet) => pet?.requestUserID == userId);
            
            // Generate HTML dynamically for filtered pets
            const rightContent = document.getElementById('right-content');
            if (items.length === 0) {
                rightContent.innerHTML = `<p>No pets available for adoption.</p>`;
                return;
            }

            rightContent.innerHTML = `
                <div class="p-4 rounded-lg cursor-pointer">
                    <ul id="pets-list" class="space-y-3">
                        ${items
                            .map(
                                (pet) => `
                                <li class="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 shadow" data-pet-id="${pet.id}">
                                    <img src="http://localhost:3000${pet.listing.pet.petPicture}" alt="${pet.listing.pet.name}" class="w-10 h-10 rounded-full" />
                                    <div>
                                        <p class="text-md font-medium">${pet.listing.pet.name}</p>
                                        <p class="text-sm text-yellow-500"> ${pet.requestStatus}</p>
                                    </div>
                                </li>
                            `
                            )
                            .join('')}
                    </ul>
                </div>
            `;

            // Attach click event listener to each pet item
            const petItems = document.querySelectorAll('#pets-list li');
            petItems.forEach(item => {
                item.addEventListener('click', () => {
                    const petId = item.getAttribute('data-pet-id');
                    navigateToAdoptInfo(petId);
                });
            });

        } catch (error) {
            console.error("Error fetching pets:", error);
            rightContent.innerHTML = `<p class="text-red-500">Failed to load pets. Please try again later.</p>`;
        }
    };

    window.navigateToAdoptInfo = (id) => {
        localStorage.setItem('selectedPet', id);
        console.log(id);
        window.location.href = '#adopt-info';
    };

    // Call the function to fetch and display pets
    fetchMyPetsForAdoption();

    // Fetch additional info button
    window.addEventListener('adoptionRequestCreated', fetchMyPetsForAdoption);
}
