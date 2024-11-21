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



    async function fetchMatchingRequestStatus() {
        const senderPetId = sessionStorage.getItem("senderPetId");

    
        if (!senderPetId) {
            console.error("Receiver pet ID is missing.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/api/match-request/view-id/${senderPetId}`, {
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
      
         
            const status = data.data.status;
            const senderPetDetails = data.data.senderPet;
            const senderDetails = data.data.sender.profile;
            renderContent(senderPetDetails, senderDetails);

        } catch (error) {
            console.error("Error fetching matching request status:", error);
        }
    }
    
    async function handleMatchRequestUpdate(status) {
        const senderPetId = sessionStorage.getItem("senderPetId");
        const token = localStorage.getItem("token");
    
        if (!senderPetId) {
            console.error("Sender pet ID is missing.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/api/match-request/edit/${senderPetId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Error updating request status: ${errorData.message}`);
                showToast(`Failed to update request: ${errorData.message}`, "error");
                return;
            }
    
            const data = await response.json();
            console.log("Request updated successfully:", data);
    
            // Optionally, refresh the content or notify the user
            showToast(`Request ${status.toLowerCase()} successfully.`, "success");
            fetchMatchingRequestStatus(); // Refresh content if needed
        } catch (error) {
            console.error("Error handling match request update:", error);
            showToast("An error occurred while updating the request.", "error");
        }
    }
    
    // Add event listeners after the content is rendered
    function addEventListeners() {
        const acceptButton = document.getElementById("acceptMatchRequestButton");
        const refuseButton = document.getElementById("refuseMatchRequestButton");
    
        if (acceptButton) {
            acceptButton.addEventListener("click", () => handleMatchRequestUpdate("Accepted"));
        }
        if (refuseButton) {
            refuseButton.addEventListener("click", () => handleMatchRequestUpdate("Declined"));
        }
    }
    
    // Function to render content and initialize Glide
    function renderContent(pet, userDetails) {
 
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
                    <div class="flex justify-between w-full relative top-5 md:static z-[10] px-2">
                        <div class="bg-grey text-blue pr-2 text-blue rounded-full flex justify-center items-center gap-1">
                                <img 
                                  src="${userDetails.profilePicture ? `http://localhost:3000${userDetails.profilePicture}` : '../assets/images/icons/user.png'}" 
                                  class="h-10 w-10 rounded-full object-cover" 
                                   alt="Profile Picture">

                        <div>
                            <h1 class="text-sm font-semibold">${userDetails.firstName}</h1>
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
                    <img src="http://localhost:3000${pet.petPicture || "/assets/images/default-pet.jpg"}" class="w-full md:h-[250px] md:w-auto md:rounded-[16px]" alt="">

                        </div>
                    </div>
                </div>
                <!-- third row -->
                <div class="bg-white rounded-t-[40px] md:rounded-t-[0] relative -top-20 z-[60] md:static">
                    <div class="relative pl-5 pt-7 md:pt-1 md:pl-10">
                        <h1 class="font-semibold text-2xl md:text-3xl md:text-[26.11px] text-blue md:text-[#03063A]">${pet.name}</h1>
                        <div class="flex gap-1 items-center">
                            <img src="./assets/images/icons/location-pin.png" alt="" class="h-4">
                            <h2 class="text-xl md:text-sm text-[#70717B]">${userDetails.address || "Tirana, Albania"} </h2>
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
                <p>${pet.interests}</p>
                </div>
              <div class="flex justify-center gap-4 md:gap-8 pt-14"> 
                    <button id="acceptMatchRequestButton" class="bg-green-500 text-white py-2 px-2 rounded-[16px] text-sm">Accept Request</button>
                    <button id="refuseMatchRequestButton" class="bg-rose-500 text-white py-2 px-2 rounded-[16px] text-sm">Refuse Request</button>

                </div>
            </div>

            <!-- Overlay -->
    <div id="overlay" class="hidden fixed inset-0 bg-gray-800 opacity-50 z-[99]"></div>

            </div>
        `;
        addEventListeners();
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
    fetchMatchingRequestStatus().then(renderContent);
}