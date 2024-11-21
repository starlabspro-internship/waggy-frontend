export default function renderPageContent() {
    ///api/adoption-listings/new - route for adoption listing
    // Add Glide.js CSS
    const customCssLink = document.createElement("link");
    customCssLink.rel = "stylesheet";
    customCssLink.href = "../styles/layout.css";
    document.head.appendChild(customCssLink);

    const glideCssLink = document.createElement("link");
    glideCssLink.rel = "stylesheet";
    glideCssLink.href = "https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/css/glide.core.min.css";
    document.head.appendChild(glideCssLink);

    const content = document.getElementById('content');
    const petId = sessionStorage.getItem("selectedPet");
    const token = localStorage.getItem("token");

    // Define background colors for carousel items
    const backgrounds = [
        'bg-[#E2F5CB]',
        'bg-[#FFE9C2]',
        'bg-[#FF8682]',
        'bg-[#C2EBFF]',
        'bg-[#E2F5CB]',
        'bg-[#FFE9C2]'
    ];

    const icons = [
        './assets/images/icons/green.png',
        './assets/images/icons/orange.png',
        './assets/images/icons/red.png',
        './assets/images/icons/blue.png',
        './assets/images/icons/green.png',
        './assets/images/icons/orange.png'
    ];



    // Function to fetch pet data from API
    async function fetchPetData() {
        try {
            const response = await fetch(API_URLS.PETS.VIEW(petId), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const pet = await response.json();
            renderContent(pet);
            await initializeButton();
        } catch (error) {
            console.error('Error fetching pet:', error);
            content.innerHTML = '<p>Error loading pet data</p>';
        }
    }
    window.deletePet = async function () {
        showToast("Are you sure you want to delete this pet?", "warning", 0, async () => {
            try {
                const response = await fetch(API_URLS.PETS.DELETE(petId), {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                showToast("Pet deleted successfully!", "success");
                // Redirect to the pet list or home page after successful deletion
                window.location.href = '#petprofile';
            } catch (error) {
                console.error('Error deleting pet:', error);
                showToast("Failed to delete the pet!", "error");
            }
        });
    };
    
    window.handleMatchingButtonClick = async function () {
        
        if (!token) {
            showToast("You must be logged in to perform this action!", "error");
            return;
        }

        const petId = sessionStorage.getItem("selectedPet");
        if (!petId) {
            showToast("No pet selected!", "error");
            return;
        }

        try {
            // Check the current status of the pet in the matching list
            const status = await getMatchingStatus(petId);
           
            if (status === "Not Found") {
                // Pet is not in the list, add it
                await addToMatchingList(petId);
            } else if (status === "Available") {
                // Pet is in the list and available, make it unavailable
                await updateMatchingList(petId, "Unavailable");
            } else if (status === "Unavailable") {
                // Pet is in the list and unavailable, make it available
                await updateMatchingList(petId, "Available");
            }
        } catch (error) {
            console.error("Error handling button click:", error);
            showToast("An error occurred while updating the pet status.", "error");
        }
    };

    // Function to add pet to matching list
    window.addToMatchingList = async function (petId) {
        
        try {
            const response = await fetch("http://localhost:3000/api/matching-list/new", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ petId, status: "Available" })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            showToast("Pet added to the matching list successfully!", "success");
            await initializeButton()
        } catch (error) {
            console.error('Error adding pet:', error);
            showToast("Failed to add the pet to the matching list!", "error");
        }
    };

    // Function to update the pet status in the matching list
    window.updateMatchingList = async function (petId, status) {
        console.log("this one")
        try {
            const response = await fetch(`http://localhost:3000/api/matching-list/edit/${petId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ petId, status })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            showToast(`Pet status updated to ${status}!`, "success");
            await initializeButton()
        } catch (error) {
            console.error('Error updating pet status:', error);
            showToast("Failed to update the pet status!", "error");
        }
    };

    // Function to get the matching status of the pet
    window.getMatchingStatus = async function (petId) {
        console.log(petId)
        console.log(token)
        console.log("hey 1")
        try {
            const response = await fetch(`http://localhost:3000/api/matching-list/view-pet/${petId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.status === 404) {
                return "Not Found";
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
         console.log(data)
            return data.status;
        } catch (error) {
            console.error('Error fetching matching status:', error);
            showToast("Failed to fetch matching status!", "error");
            return null;
        }
    };

    // Initialize button text based on the current pet status
    window.initializeButton = async function () {
        const petId = sessionStorage.getItem("selectedPet");
        const button = document.getElementById("matchingButton");

        if (!petId || !button) return;

        try {
            const status = await getMatchingStatus(petId);
            console.log(status , "statusi eshte");

            if (status === "Not Found") {
                button.textContent = "Add to Matching List";
            } else if (status === "Available") {
                button.textContent = "Remove from Matching List";
            } else if (status === "Unavailable") {
                button.textContent = "Make Available to Matching List";
            }
        } catch (error) {
            console.error("Error initializing button:", error);
        }
    };



    window.navigateToProfile = function() {
        window.location.href = '#petprofile';
    };
    window.navigateToProfileForUpdate = function() {
        window.location.href = '#petprofile';
        localStorage.setItem("petToUpdateId", petId);

    };
    // Function to render content and initialize Glide
    async function renderContent(pet) {

        const carouselSlides = `
            <li class="glide__slide h-[87px] w-[104px] rounded-[30.20px] ${backgrounds[0]} flex flex-col justify-center items-center overflow-hidden">
                <div class="flex flex-col justify-center items-center relative top-6 z-[50]">
                <h1>Age</h1>
                <p class="text-xs">${pet.age}</p>
                </div>
                <img src="${icons[0]}" class="relative top-0 right-0 left-3" alt="">
            </li>
            <li class="glide__slide h-[87px] w-[104px] rounded-[30.20px] ${backgrounds[1]} flex flex-col justify-center items-center overflow-hidden">
                <div class="flex flex-col justify-center items-center relative top-6 z-[50]">
                    <h1>Breed</h1>
                    <p class="text-xs">${pet.breed}</p>
            </div>
             <img src="${icons[1]}" class="relative top-0 right-0 left-3" alt="">
            </li>
                <li class="glide__slide h-[87px] w-[104px] rounded-[30.20px] ${backgrounds[2]} flex flex-col justify-center items-center overflow-hidden">
                <div class="flex flex-col justify-center items-center relative top-6 z-[50]">
                    <h1>Species</h1>
                <p class="text-xs">${pet.species}</p>
            </div>
             <img src="${icons[2]}" class="relative top-0 right-0 left-3" alt="">
            </li>
                       </li>
                <li class="glide__slide h-[87px] w-[104px] rounded-[30.20px] ${backgrounds[3]} flex flex-col justify-center items-center overflow-hidden">
                <div class="flex flex-col justify-center items-center relative top-6 z-[50]">
                    <h1>Gender</h1>
                <p class="text-xs">${pet.gender}</p>
            </div>
             <img src="${icons[3]}" class="relative top-0 right-0 left-3" alt="">
            </li>
           
        `;

        content.innerHTML = `
            <div class="flex flex-col w-full">
                <!-- First row -->
                <div class="">
                    <div  class="flex justify-between w-full relative top-5 md:static z-[10] px-2" >
                     <button class="bg-grey text-blue py-2 px-2 text-blue rounded-[16px] z-[100] relative" onclick="navigateToProfile()">
                         <img src="./assets/images/icons/pet-care.png" class="h-6 w-6" alt="">
                        </button>
                        <div class="flex gap-3">
                             <button class="bg-grey text-blue py-2 px-2 text-blue rounded-[16px] z-[100] relative" onclick="navigateToProfileForUpdate()">
                                <img src="./assets/images/icons/edit-text.png" class="h-6 w-6" alt="">
                            </button>
                                 <button class="bg-grey text-blue py-2 px-2 text-blue rounded-[16px] z-[100] relative"  onclick="deletePet()">
                                <img src="./assets/images/icons/delete.png" class="h-6 w-6" alt="">
                             
                            </button>
                        </div>
                    </div>
                    <!-- Second row -->
                    <div class="relative -top-10">
                        <div class="flex w-full justify-center md:static">
                            <img src="http://localhost:3000${pet.petPicture || "/assets/images/default-pet.jpg"}"
                                    class="w-full h-[280px] md:h-[250px] md:w-auto md:rounded-[16px] object-cover object-center"
                                     alt="${pet.name}">
                        </div>
                    </div>
                </div>
                
                <!-- third row -->
                <div class="bg-white rounded-t-[40px] md:rounded-t-[0] relative -top-20 z-[60] md:static">
                    <div class="relative pl-5 pt-7 md:pt-1 md:pl-10">
                        <h1 class="font-semibold text-2xl md:text-3xl md:text-[26.11px] text-blue md:text-[#03063A]">
                            ${pet.name}
                        </h1>
                        <div class="flex gap-1 items-center">
                            <img src="./assets/images/icons/location-pin.png" alt="" class="h-4">
                            <h2 class="text-xl md:text-sm text-[#70717B]">
                               Tirana
                            </h2>
                        </div>
                    </div>
                </div>

                <!-- forth row -->
                <div class="glide px-2 relative -top-10 md:-top-[0] md:static">
                    <div class="glide__track" data-glide-el="track">
                        <ul class="glide__slides">
                            ${carouselSlides}
                        </ul>
                    </div>
                </div>

                <!-- fifth row -->
                <div class="px-4 md:px-12 py-2 md:text-sm">
                    <p>${pet.interests || 'No description available.'}</p>
                </div>

                <div class="flex justify-center gap-4 md:gap-8 pt-14">
<button
    id="matchingButton"
    class="gap-4 bg-blue text-white py-2 px-2 rounded-[16px] text-sm"
    onclick="handleMatchingButtonClick()"
>
    Add to Matching List
</button>


                    <button class="gap-4 bg-blue text-white py-1 px-2 rounded-[16px] text-sm" >
                        Add to Adoption
                    </button>
                </div>
            </div>
        `;

        // Add Glide.js JavaScript after content is rendered
        const glideScript = document.createElement("script");
        glideScript.src = "https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/glide.min.js";
        glideScript.onload = () => {
            // Initialize Glide after script is loaded and content is rendered
            new Glide('.glide', {
                type: 'carousel',
                autoplay: 3000,
                hoverpause: true,
                perView: 4,
                gap: 10,
                breakpoints: {
                    768: { perView: 4 },
                    480: { perView: 3 }
                }
            }).mount();
        };
        document.body.appendChild(glideScript);
    }

    // Start the process by fetching pet data
    fetchPetData();
    // getMatchingStatus();
}