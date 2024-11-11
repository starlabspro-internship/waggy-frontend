export default function renderPageContent() {
    // Add required CSS
    const customCssLink = document.createElement("link");
    customCssLink.rel = "stylesheet";
    customCssLink.href = "../styles/matching.css";
    document.head.appendChild(customCssLink);

    // Add Glide.js CSS
    const glideCssLink = document.createElement("link");
    glideCssLink.rel = "stylesheet";
    glideCssLink.href =
        "https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/css/glide.core.min.css";
    document.head.appendChild(glideCssLink);

    // Add Glide.js JavaScript
    const glideScript = document.createElement("script");
    glideScript.src =
        "https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/glide.min.js";
    glideScript.onload = () => {
        fetchUsers().then(initializeGlide);
    };
    document.body.appendChild(glideScript);

    const content = document.getElementById("content");
    content.innerHTML = `
        <div class="flex flex-col md:pl-14  w-full  md:w-full ">
            <!-- Location Section -->
            <div class="mb-10 md:mb-5 flex flex-col justify-center items-center md:items-start bg-blue md:bg-transparent">
                <div class="hidden md:flex gap-1 items-center pt-1 w-full">
                    <h2 class="text-sm text-slate-400  font-mono">Location</h2>
                    <img src="./assets/images/icons/location-pin.png" alt="" class="h-4">
                    <h1 class="relative text-center text-[#03063A] w-full text-2xl font-semibold right-5">Adoption <span class="text-rose-400">Center</span></h1>
                </div>
                <h1 class="font-semibold text-sm text-slate-50 md:text-xl md:text-[26.11px] text-white md:text-[#03063A] mt-2 md:mt-0">Tirana, <span class="text-rose-400">AL</span></h1>
                <h1 class="md:hidden font-semibold text-slate-50 text-2xl md:text-3xl md:text-[26.11px] text-white md:text-[#03063A]">Adoption Center</h1>

            </div>
    
            <!-- Categories Section -->
            <div class="flex flex-col gap-2 mb-5 w-full pl-3">
                <h1 class="font-semibold text-[16.71px] text-[#03063A]">Categories</h1>
                <!-- Filters Section -->
                <div class="flex gap-6 w-full md:justify-between z-50">
                    <!-- Filter Button -->
                    <button onclick="toggleFilters()" class=" rounded-[15.66px]  md:mb-10 h-[58.48px] w-[58.48px] text-[15px] flex justify-center items-center">
                        <img src="./assets/images/icons/setting.png" alt="" class="">
                    </button>
    
                    <div class=" flex flex-col md:flex-row gap-6 w-full  px-4">
                        <!-- Default Categories -->
                        <div class="flex  justify-between md:gap-6">
                            <div class="bg-sky-200 text-sky-600 rounded-[15.66px] h-[65px] hover:text-white hover:bg-blue w-[65px] md:text-[15px] flex justify-center items-center">Cat</div>
                            <div class="bg-rose-200 text-rose-600 rounded-[15.66px] h-[65px] hover:text-white hover:bg-blue w-[65px] md:text-[15px] flex justify-center items-center">Dog</div>
                            <div class="bg-green-200 text-green-600 rounded-[15.66px] h-[65px] hover:text-white hover:bg-blue w-[65px] md:text-[15px] flex justify-center items-center">Rabbit</div>
                        </div>
                        
                        <!-- Hidden Filter Options Container -->
                        <div id="extraFilters" class="hidden flex  justify-between  md:gap-6 transition-all duration-500 ease-in-out">
                        <!-- Breed Dropdown -->
                        <div class="relative inline-block dropdown">
                            <button class="dropdown-btn bg-sky-200 text-sky-600 hover:bg-blue hover:text-white rounded-[15.66px] h-[65px] min-w-[65px] px-1 text-[15px] flex justify-center items-center transition-colors duration-300 w-50">
                                <span>Breed</span>
                            </button>
                            <div class="absolute z-100 bg-gray-200 rounded-[15.66px] shadow-lg dropdown-menu  text-sm w-max mt-3">
                                <a href="#" class="block text-blue px-4 py-3 z-100 hover:bg-blue hover:text-white hover:rounded-[15.66px]">Option 1</a>
                                <a href="#" class="block text-blue px-4 py-3 z-50 hover:bg-blue hover:text-white hover:rounded-[15.66px]">Option 2</a>
                            </div>
                        </div>
                        <!-- Gender Dropdown -->
                        <div class="relative inline-block dropdown">
                            <button class="dropdown-btn bg-rose-200  hover:bg-blue hover:text-white text-rose-600 rounded-[15.66px] h-[65px] min-w-[65px] text-[15px] px-1 flex justify-center items-center transition-colors duration-300 w-50">
                                <span>Gender</span>
                            </button>
                            <div class="absolute z-100 bg-gray-200 rounded-[15.66px] shadow-lg dropdown-menu hidden text-sm w-max mt-3">
                                <a href="#" class="block  text-blue px-4 py-3 hover:bg-blue hover:text-white hover:rounded-[15.66px]">Male</a>
                                <a href="#" class="block text-blue px-4 py-3 hover:bg-blue hover:text-white hover:rounded-[15.66px]">Female</a>
                            </div>
                        </div>
                        <!-- Age Input -->
                        <div class="relative inline-block dropdown">
                            <button class="dropdown-btn bg-green-200 hover:bg-blue hover:text-white text-green-600 rounded-[15.66px] h-[65px] w-[65px] text-[15px] flex justify-center items-center transition-colors duration-300 w-50">
                                <span>Age</span>
                            </button>
                            <div class="absolute z-100 bg-gray-200 right-[1px] rounded-[15.66px] shadow-lg dropdown-menu hidden text-sm w-max mt-3 text-blue ">
                                <input type="number" min="0" max="100" id="ageInput" class="px-4 py-3  bg-gray-200 text-blue rounded-[15.66px] w-full focus:outline-none" placeholder="Enter Age" />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    
            <!-- Possible Match Section -->
          
             <div class="flex flex-col pt-5 w-full md:w-full">
            <!-- Possible Match Section -->
            <div class="flex flex-col gap-6 md:mb-10  w-full  overflow-hidden justify-center items-center">
                <h1 class="font-semibold text-[16.71px] text-[#03063A] self-start pl-3">Pets for Adoption</h1>
                
                <!-- Glide Container with responsive constraints -->
                <div class="glide w-full">
                  <!-- Glide Track -->
                  <div class="glide__track w-full" data-glide-el="track">
                    <ul class="glide__slides w-full flex " id="userSlides">
               
                    </ul>
                  </div>
              
                  <!-- Glide Arrows -->
                  <div class="glide__arrows z-10" data-glide-el="controls">
                    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
                      <img src="./assets/images/icons/back-arrows.png" class="h-[20px]" alt="Previous">
                    </button>
                    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
                      <img src="./assets/images/icons/right-arrow.png" class="h-[24px]" alt="Next">
                    </button>
                  </div>
                </div>
              </div>
        </div>
    </div>
</div>
    `;
    initializeDropdowns();
    initializeFilters();

    async function fetchUsers() {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users?_start=0&_limit=6"
            );
            const users = await response.json();

            const slidesContainer = document.getElementById("userSlides");
            slidesContainer.innerHTML = users
                .map(
                    (user) => `
                <li class="glide__slide ">
                    <div class="h-[300px] bg-sky-200 w-full md:h-[214px] md:w-[180px] bg-white rounded-[20px] p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                        <div>
                            <h3 class="font-bold text-lg text-[#03063A] truncate">${user.name}</h3>
                            <p class="text-sm text-gray-600 truncate">@${user.username}</p>
                            <p class="text-sm text-gray-500 mt-2 truncate">${user.email}</p>
                            <p class="text-sm text-gray-500 truncate">${user.company.name}</p>
                        </div>
                        <div class="mt-2">
                            <p class="text-xs text-gray-400 truncate">${user.address.city}</p>
                            <p class="text-xs text-gray-400 truncate">${user.phone}</p>
                            <a href="#/adopt-info" class="text-xs text-blue-500 hover:text-blue-600">View Profile</a>
                               <button 
                                onclick="navigateToAdoptInfo('${user.name}')" 
                                    class="text-xs text-blue-500 hover:text-blue-600 cursor-pointer" > View Profile </button>
                        </div>
                    </div>
                </li>
            `
                )
                .join("");

                window.navigateToAdoptInfo = (userData) => {
                    sessionStorage.setItem('selectedUser', JSON.stringify({
                        data: userData,
                        timestamp: Date.now()
                    }));
                    window.location.href = '#/adopt-info';
                };
        } catch (error) {
            console.error("Error fetching users:", error);
            const slidesContainer = document.getElementById("userSlides");
            slidesContainer.innerHTML = `
                <li class="glide__slide">
                    <div class="h-[300px] w-[full] md:h-[224px] md:w-[200.51px] bg-red-100 rounded-[20px] mx-2 flex items-center justify-center text-red-500">
                        Error loading users
                    </div>
                </li>
            `;
        }
    }

    function initializeGlide() {
        if (typeof Glide !== "undefined") {
            const glide = new Glide(".glide", {
                type: "carousel",
                startAt: 0,
                perView: 3,
                gap: 10,
                breakpoints: {
                    640: {
                        perView: 1,
                    },
                },
                bound: true,
            });

            // Update bullets
            glide.on("move", () => {
                const bullets = document.querySelectorAll(".glide__bullet");
                bullets.forEach((bullet, index) => {
                    if (index === glide.index) {
                        bullet.classList.add("glide__bullet--active");
                    } else {
                        bullet.classList.remove("glide__bullet--active");
                    }
                });
            });

            glide.mount();
        }
    }
    // Initialize dropdowns
    function initializeDropdowns() {
        const dropdowns = document.querySelectorAll(".dropdown");

        dropdowns.forEach((dropdown) => {
            const button = dropdown.querySelector(".dropdown-btn");
            const menu = dropdown.querySelector(".dropdown-menu");

            button.addEventListener("click", (e) => {
                e.stopPropagation();
                // Close all other dropdowns
                dropdowns.forEach((otherDropdown) => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown
                            .querySelector(".dropdown-menu")
                            .classList.add("hidden");
                    }
                });
                menu.classList.toggle("hidden");
            });

            // Handle option selection
            const options = menu.querySelectorAll("a");
            options.forEach((option) => {
                option.addEventListener("click", (e) => {
                    e.preventDefault();
                    button.querySelector("span").textContent = option.textContent;
                    menu.classList.add("hidden");
                });
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".dropdown")) {
                dropdowns.forEach((dropdown) => {
                    dropdown.querySelector(".dropdown-menu").classList.add("hidden");
                });
            }
        });
    }

    // Initialize filters
    function initializeFilters() {
        const filterButton = document.querySelector(
            'button[onclick="toggleFilters()"]'
        );
        const extraFilters = document.getElementById("extraFilters");

        // Remove inline onclick and add proper event listener
        filterButton.removeAttribute("onclick");
        filterButton.addEventListener("click", () => {
            extraFilters.classList.toggle("hidden");
        });

        // Initialize age input
        const ageInput = document.getElementById("ageInput");
        if (ageInput) {
            ageInput.addEventListener("input", (e) => {
                const value = parseInt(e.target.value);
                if (value < 0) e.target.value = 0;
                if (value > 100) e.target.value = 100;
            });
        }
    }
}
