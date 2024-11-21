export default function renderPageContent() {
    // Add Glide.js CSS
    const customCssLink = document.createElement("link");
    customCssLink.rel = "stylesheet";
    customCssLink.href = "../styles/layout.css";
    document.head.appendChild(customCssLink);
    
    const glideCssLink = document.createElement("link");
    glideCssLink.rel = "stylesheet";
    glideCssLink.href = "https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/css/glide.core.min.css";
    document.head.appendChild(glideCssLink);


    const petToMatchId = sessionStorage.getItem("petToMatchId");
    const content = document.getElementById('content');
    const token = localStorage.getItem("token");
    
    // Define background colors and icons for carousel items
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

    // Function to fetch pet of the OTHER USER
    async function fetchPetData() {
        try {
            const response = await fetch(`http://localhost:3000/api/matching-list/view/${petToMatchId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
         
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const pet = await response.json();
            sessionStorage.setItem('otherPetToMatchId', pet.id);

            console.log(pet.id, "Pet  Id of the other user is fetched")
            
            renderContent(pet);
        } catch (error) {
            console.error('Error fetching pet:', error);
            content.innerHTML = '<p>Error loading pet data</p>';
        }
    }
       // Function to fetch our pets
    window.fetchUserPets = async function () {
        try {
            const response = await fetch(window.API_URLS.PETS.ALL, {
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
    
            const pets = await response.json();
            // Display pets in the popup
            displayPetsInPopup(pets);
        } catch (error) {
            console.error('Error fetching pets:', error);
        }
    };
    
    function displayPetsInPopup(pets) {
        const petsListContainer = document.getElementById('petsList');
        petsListContainer.innerHTML = ''; // Clear previous list
    
        // Populate the list with pet names and store pet IDs
        pets.forEach(pet => {
            const petElement = document.createElement('div');
            petElement.classList.add('pet-item', 'cursor-pointer', 'py-2', 'px-4', 'hover:bg-blue','hover:text-white', 'rounded-lg', 'my-1');
            petElement.textContent = pet.name;
            
            // Add click event to handle selecting the pet
            petElement.onclick = function () {
                // Remove 'active' class from all pet items
                const allPets = petsListContainer.querySelectorAll('.pet-item');
                allPets.forEach(item => item.classList.remove('bg-blue' , 'text-white')); // Reset all items
    
                // Add 'active' class to the clicked pet item
                petElement.classList.add('bg-blue', 'text-white'); // Highlight active pet
    
                // Save the pet ID to session storage
                sessionStorage.setItem('ourPetToMatchId', pet.id);
                console.log(pet.id, "our pet to match")
            };
    
            petsListContainer.appendChild(petElement);
        });
        let petId = sessionStorage.getItem('ourPetToMatchId');

        console.log(petId, "iddd");  // This will log the pet.id stored in sessionStorage
        // Show the popup and overlay
        const popup = document.getElementById('myPets');
        const overlay = document.getElementById('overlay');
        popup.classList.remove('hidden'); // Make the popup visible
        overlay.classList.remove('hidden'); // Show the overlay
    
        // Disable scrolling on the body
        document.body.style.overflow = 'hidden';
    }

    // send match request.
    window.sendMatchRequest = async function () {
        let senderPetId = sessionStorage.getItem('ourPetToMatchId');
        const receiverPetId = sessionStorage.getItem("petToMatchId");
        console.log(receiverPetId, senderPetId,"pet id ne match request")


        if (!senderPetId || !receiverPetId) {
            showToast("Please select both your pet and the pet to match with.", "info");
            return;
        }
        try {
            // Send match request to the API
            const response = await fetch("http://localhost:3000/api/match-request/new", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    senderPetId,
                    receiverPetId,

                })
            });
    
            // Handle the response
            const data = await response.json();
    
            if (response.ok) {
                showToast("Match request sent successfully!", "success");
            } else {
                showToast("Failed to send match request.", "error");
            }
        } catch (error) {
            console.error("Error sending match request:", error);
            showToast("An error occurred while sending the match request. Please try again.", "error");
        }
        // Hide the popup and overlay
        const popup = document.getElementById('myPets');
        const overlay = document.getElementById('overlay');
        
        popup.classList.add('hidden'); // Hide the popup
        overlay.classList.add('hidden'); // Hide the overlay
    
        // Enable scrolling on the body
        document.body.style.overflow = '';
        fetchMatchingRequestStatus();
    };


    async function fetchMatchingRequestStatus() {
        const receiverPetId = sessionStorage.getItem('petToMatchId');
    
        if (!receiverPetId) {
            console.error("Receiver pet ID is missing.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/api/match-request/view/${receiverPetId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data)
            const status = data.data.status;
            const senderPetId = data.data.senderPetName;
            const receiverPetName = data.data.receiverPetName;

                 console.log(receiverPetName)
            updateMatchButton(status, senderPetId, receiverPetName);

        } catch (error) {
            console.error("Error fetching matching request status:", error);
        }
    }
    
    function updateMatchButton(status, senderPetId, receiverPetName) {
        const matchButton = document.getElementById('matchRequestButton');
    
        if (!matchButton) {
            console.error("Match request button not found.");
            return;
        }
    
        // Update button text and styling based on status
        switch (status) {
            case 'Pending':
                matchButton.textContent = `Request to Match ${senderPetId} with ${receiverPetName}  is Pending`;
                matchButton.classList.add('bg-yellow-500');
                break;
            case 'Accepted':
                matchButton.textContent = 'Request Accepted';
                matchButton.classList.add('bg-green-500');
                break;
            case 'Refused':
                matchButton.textContent = 'Request Refused';
                matchButton.classList.add('bg-red-500');
                break;
            default:
                matchButton.textContent = 'Send Match Request';
                matchButton.classList.remove('bg-yellow-500', 'bg-green-500', 'bg-red-500');
                break;
        }
    
        matchButton.disabled = ['Pending', 'Accepted', 'Refused'].includes(status);
    }

    window.closePopUp = function () {
        // Hide the popup and overlay
        const popup = document.getElementById('myPets');
        const overlay = document.getElementById('overlay');
        
        popup.classList.add('hidden'); // Hide the popup
        overlay.classList.add('hidden'); // Hide the overlay

        // Enable scrolling on the body
        document.body.style.overflow = '';
    };
   
    // Function to render content and initialize Glide
    function renderContent(pet) {
        console.log(pet.owner.profile.profilePicture)
        const carouselSlides = `
            <li class="glide__slide h-[87px] w-[104px] rounded-[30.20px] ${backgrounds[0]} flex flex-col justify-center items-center overflow-hidden">
                <div class="flex flex-col justify-center items-center relative top-6 z-[50]">
                <h1>Age</h1>
                <p class="text-xs">${pet?.pet.age}</p>
                </div>
                <img src="${icons[0]}" class="relative top-0 right-0 left-3" alt="">
            </li>
            <li class="glide__slide h-[87px] w-[104px] rounded-[30.20px] ${backgrounds[1]} flex flex-col justify-center items-center overflow-hidden">
                <div class="flex flex-col justify-center items-center relative top-6 z-[50]">
                    <h1>Breed</h1>
                    <p class="text-xs">${pet?.pet.breed}</p>
            </div>
             <img src="${icons[1]}" class="relative top-0 right-0 left-3" alt="">
            </li>
                <li class="glide__slide h-[87px] w-[104px] rounded-[30.20px] ${backgrounds[2]} flex flex-col justify-center items-center overflow-hidden">
                <div class="flex flex-col justify-center items-center relative top-6 z-[50]">
                    <h1>Species</h1>
                <p class="text-xs">${pet?.pet.species}</p>
            </div>
             <img src="${icons[2]}" class="relative top-0 right-0 left-3" alt="">
            </li>
                       </li>
                <li class="glide__slide h-[87px] w-[104px] rounded-[30.20px] ${backgrounds[3]} flex flex-col justify-center items-center overflow-hidden">
                <div class="flex flex-col justify-center items-center relative top-6 z-[50]">
                    <h1>Gender</h1>
                <p class="text-xs">${pet?.pet.gender}</p>
            </div>
             <img src="${icons[3]}" class="relative top-0 right-0 left-3" alt="">
            </li>
           
        `;

        content.innerHTML = `
            <div class="flex flex-col w-full">
                <!-- First row -->
                <div class="">
                    <div class="flex justify-between w-full relative top-5 md:static z-[10] px-2">
                        <div class="bg-grey text-blue pr-2 text-blue rounded-full flex justify-center items-center gap-1">
                    <img 
    src="${pet?.owner?.profile?.profilePicture ? `http://localhost:3000${pet.owner.profile.profilePicture}` : '../assets/images/icons/user.png'}" 
  class="h-10 w-10 rounded-full object-cover" 
  alt="Profile Picture">



                            <div>
                            <h1 class="text-sm font-semibold">${pet?.owner.profile.firstName}</h1>
                            <p class="text-sm">Owner</p>
                             </div>

                        </div>
                        <div class="flex gap-3">
                            <button class="gap-4 bg-grey py-1 px-2 rounded-[16px]">
                                <img src="./assets/images/icons/add-user.png" class="h-6 w-6" alt="">
                            </button>
                            <button class="gap-4 bg-grey py-1 px-2 rounded-[16px]">
                                <img src="./assets/images/icons/chat.png" class="h-6 w-6" alt="">
                            </button>
                        </div>
                    </div>
                    <!-- Second row -->
                    <div class="relative -top-10">
                        <div class="flex w-full justify-center md:static">
                          <img src="http://localhost:3000${pet?.pet.petPicture || "/assets/images/default-pet.jpg"}" class="w-full md:h-[250px] md:w-auto md:rounded-[16px]" alt="">
                        </div>
                    </div>
                </div>
                <!-- third row -->
                <div class="bg-white rounded-t-[40px] md:rounded-t-[0] relative -top-20 z-[60] md:static">
                    <div class="relative pl-5 pt-7 md:pt-1 md:pl-10">
                        <h1 class="font-semibold text-2xl md:text-3xl md:text-[26.11px] text-blue md:text-[#03063A]">${pet?.pet.name}</h1>
                        <div class="flex gap-1 items-center">
                            <img src="./assets/images/icons/location-pin.png" alt="" class="h-4">
                            <h2 class="text-xl md:text-sm text-[#70717B]">${pet?.owner.profile.address || "Tirana, Albania"} </h2>
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
                <p>${pet.pet.interests}</p>
                </div>
              <div class="flex justify-center gap-4 md:gap-8 pt-14"> 
                    <button id="matchRequestButton" class="bg-blue text-white py-2 px-2 rounded-[16px] text-sm" onclick="fetchUserPets()">Matching Request</button>
                </div>
               <div id="myPets" class="absolute z-[100] hidden bg-white md:shadow-lg rounded-lg p-4 w-full md:w-1/3 bottom-24 md:bottom-10 md:left-1/3">
               <div class="flex w-full items-center mb-4">
                   <h2 class="font-semibold text-xl flex-1 text-center  text-blue">Select a Pet</h2>
                   <button onclick="closePopUp()"> <img src="./assets/images/icons/close.png" alt="" class="h-5"></button>
               </div>
               <div id="petsList" class="overflow-y-auto max-h-60 mb-4"></div>
               <div class="flex justify-center">
                 <button id="sendRequest" class="bg-blue text-white py-2 px-4 rounded-[16px] text-sm" onclick="sendMatchRequest()">Send Request</button>
               </div>
            </div>

            <!-- Overlay -->
    <div id="overlay" class="hidden fixed inset-0 bg-gray-800 opacity-50 z-[99]"></div>

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
                    768: {
                        perView: 4
                    },
                    480: {
                        perView: 3
                    }
                }
            }).mount();
        };
        document.body.appendChild(glideScript);
    }

    // Start the process
    fetchPetData().then(renderContent);
    fetchMatchingRequestStatus();
    // Call this function after rendering the content

}