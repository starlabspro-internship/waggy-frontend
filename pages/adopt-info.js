export default function renderPageContent() {
    const customCssLink = document.createElement("link");
    customCssLink.rel = "stylesheet";
    customCssLink.href = "../styles/layout.css";
    document.head.appendChild(customCssLink);
    const storedId = JSON.parse(localStorage.getItem('selectedListing'));
    const petId = localStorage.getItem("selectedPet")
    console.log(petId);
    console.log(storedId);
    const token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    const customStyles = document.createElement("style");
    customStyles.rel = "stylesheet";
    customStyles.textContent = `
         
    .font-poppins {
    font-family: "Poppins", sans-serif;
  }
  .blue {
    color: #70717b;
  }
  .bg-color {
    background: #157aff;
  }
    console.log(storedId);
`
        try {
            if (!storedId || !petId || Date.now() - storedId.timestamp > 3600000) {
                throw new Error('Data expired or invalid');
            }
            

            
            
            const customCssLink = document.createElement("link");
            customCssLink.rel = "stylesheet";
            customCssLink.href = "../styles/layout.css";
            document.head.appendChild(customCssLink);
            
            const glideCssLink = document.createElement("link");
            glideCssLink.rel = "stylesheet";
            glideCssLink.href = "https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/css/glide.core.min.css";
            document.head.appendChild(glideCssLink);
        
            const content = document.getElementById('content');
            
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
        
            // Function to fetch users from API
             window.fetchPetInfo = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/adoption-listings/view/${storedId}`, {
                        method: "GET",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${token}`
                        },
                    });

                    const pet = await response.json();
                  //  await initializeButton()
                    console.log(pet);
                    return pet;
                } catch (error) {
                    console.error('Error fetching pet:', error);
                    return [];
                }
            }
        
            // Function to render content and initialize Glide
            function renderContent(pet) {
                content.innerHTML = `
                    <div class="flex flex-col w-full">
                        <!-- First row -->
                        <div class="">
                            <div class="flex justify-between w-full relative top-5 md:static z-[10] px-2">
                                <div class="bg-grey text-blue pr-2  rounded-full flex justify-center items-center gap-1">
                                    <img src="http://localhost:3000${pet.user.profile.profilePicture}" class="h-10 w-10 rounded-full" alt="">
                                    <div>
                                    <h1 class="text-sm font-semibold">${pet?.user?.profile?.firstName}</h1>
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
                                    <img src="http://localhost:3000${pet.pet.petPicture}" class="w-full md:h-[250px] md:w-auto md:rounded-[16px]"  alt="">
                                </div>
                            </div>
                        </div>
                        <!-- third row -->
                        <div class="bg-white rounded-t-[40px] md:rounded-t-[0] relative -top-20 z-[60] md:static">
                            <div class="relative pl-5 pt-7 md:pt-1 md:pl-10">
                                <h1 class="font-semibold text-2xl md:text-3xl md:text-[26.11px] text-blue">${pet.pet.name}</h1>
                                <div class="flex gap-1 items-center">
                                    <img src="./assets/images/icons/location-pin.png" alt="" class="h-4">
                                    <h2 class="text-xl md:text-sm text-[#70717B]">${pet.user.profile.address}</h2>
                                </div>
                            </div>
                        </div>
                        <!-- forth row -->     
                        <div class="glide px-2 relative -top-10 md:-top-[0] md:static">
                            <div class="glide__track" data-glide-el="track">
                                <ul class="glide__slides">
                                 
                                </ul>
                            </div>
                        </div>
                        <!-- fifth row -->
                        <div class="px-4 md:px-12 py-2 md:text-sm text-gray">
                            <p>${pet.pet.interests}</p>
                        </div>
                        <div class="flex justify-center gap-4 md:gap-8 pt-14">
                            <button id="requestButton" class="gap-4 bg-blue text-white py-2 px-2 rounded-[16px] text-sm" onClick="makeAdoptRequest()">Adopt Request</button>
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
            fetchPetInfo().then(renderContent);
            
        } catch (error) {
            console.error('Error retrieving user data:', error);
            window.location.href = '#adoptation';
        }


        window.makeAdoptRequest  = async () => {
            const pet =await fetchPetInfo()
            console.log(pet);
            try {
                const response = await fetch(`http://localhost:3000/api/adoption-requests/new`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                       userID: pet.user.id,
                       listingID: pet.id ,
                       requestStatus: "pending",
                       requestUserID: userId,
                    }),
                });
            
                const result = await response.json();
                console.log(result);
                await initializeButton()
                showToast("Adoption Request was succesfully sent" , 'success')
                return result;
            } catch (error) {
                console.error('Error requesting an adoption :', error);
                return [];
            }
        }
     
        window.initializeButton = async function () {
            const pet = await fetchPetInfo()
            const petId = sessionStorage.getItem("selectedPet");
            console.log(petId);
            const button = document.getElementById("requestButton");
            console.log(button);
            console.log('it is working ' , pet);
           
    
            try {
                const status = await pet.requestStatus;
                console.log(status , "statusi eshte");
    
                if (status === "Not Found") {
                    button.textContent = "Adopt Request";
                } else if (status === "Pending") {
                    button.textContent = "Remove Adoptation Request";
                } else if (status === "Unavailable") {
                    button.textContent = "Make Available to Matching List";
                }
            } catch (error) {
                console.error("Error initializing button:", error);
            }
        };
     
}