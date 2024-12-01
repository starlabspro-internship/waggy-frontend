export default function renderRightContent() {
    const token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    const fetchMyPetsForAdoption = async () => {
        const baseUrl = `http://localhost:3000/api/adoption-listings/list`;
        const params = new URLSearchParams();
        params.append("adoptionStatus", "Available");
        // for (const [key, value] of Object.entries(filters)) {
        //     if (value) {
        //         params.append(key, value);
        //     }
        // }
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
            const items = pets.filter((pet) => pet.adoptionStatus === "Available" && pet.user.id == userId);
            
            // Generate HTML dynamically for filtered pets
            const rightContent = document.getElementById('right-content');
            if (items.length === 0) {
                rightContent.innerHTML = `<p>No pets available for adoption.</p>`;
                return;
            }

            rightContent.innerHTML = `
                <div class="p-4 rounded-lg cursor-pointer ">
                  
                    <ul id="pets-list" class="space-y-3">
                        ${items
                            .map(
                                (pet) => `
                                <li class="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 shadow onclick="navigateToAdoptInfo(${pet.id})"">
                                    <img src="http://localhost:3000${pet.pet.petPicture}"" alt="${pet.pet.name}" class="w-10 h-10 rounded-full" />
                                    <div>
                                        <p class="text-md font-medium">${pet.pet.name}</p>
                                        <p class="text-sm ${pet.adoptionStatus === "Available" ? 'text-green-500' : 'text-red-600'}">${pet.adoptionStatus}</p>
                                    </div>
                                </li>
                            `
                            )
                            .join('')}
                    </ul>
                </div>
            `;
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
    const fetchInfoButton = document.getElementById('fetch-info');
    if (fetchInfoButton) {
        fetchInfoButton.addEventListener('click', async function () {
            try {
                const response = await fetch('https://api.example.com/info');
                const data = await response.json();
                alert('Info fetched successfully!');
                console.log(data);
            } catch (error) {
                console.error('Error fetching info:', error);
                alert('Failed to fetch info');
            }
        });
    }
}
