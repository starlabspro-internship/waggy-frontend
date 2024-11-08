export default function renderPageContent() {
    // Add required CSS
    const customCssLink = document.createElement("link");
    customCssLink.rel = "stylesheet";
    customCssLink.href = "../styles/matching.css";
    document.head.appendChild(customCssLink);

    // Add Glide.js CSS
    const glideCssLink = document.createElement("link");
    glideCssLink.rel = "stylesheet";
    glideCssLink.href = "https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/css/glide.core.min.css";
    document.head.appendChild(glideCssLink);

    // Add Glide.js JavaScript
    const glideScript = document.createElement("script");
    glideScript.src = "https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/glide.min.js";
    glideScript.onload = () => {
        fetchUsers().then(initializeGlide);
    }
    document.body.appendChild(glideScript);
    
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="flex flex-col md:pl-14 pt-5 w-full  md:w-max">
            <!-- Location Section -->
            <div class="mb-10 md:mb-5">
                <div class="flex gap-1 items-center">
                    <h2 class="text-xl md:text-sm text-[#70717B]">Location</h2>
                    <img src="./assets/images/icons/location-pin.png" alt="" class="h-4">
                </div>
                <h1 class="font-semibold text-3xl md:text-[26.11px] text-blue md:text-[#03063A]">Tirana, AL</h1>
            </div>
    
            <!-- Categories Section -->
            <div class="flex flex-col gap-2 mb-5 w-full">
                <h1 class="font-semibold text-[16.71px] text-[#03063A]">Categories</h1>
                <!-- Filters Section -->
                <div class="flex gap-6 w-full md:justify-between z-50">
                    <!-- Filter Button -->
                    <button onclick="toggleFilters()" class=" rounded-[15.66px]  mb-[100px] md:mb-10 h-[58.48px] w-[58.48px] text-[15px] flex justify-center items-center">
                        <img src="./assets/images/icons/setting.png" alt="" class="">
                    </button>
    
                    <div class=" flex flex-col md:flex-row gap-6 w-full  px-4">
                        <!-- Default Categories -->
                        <div class="flex  justify-between md:gap-6">
                            <div class="bg-[#F0F0F0]  text-blue rounded-[15.66px] h-[65px] hover:text-white hover:bg-blue w-[65px] md:text-[15px] flex justify-center items-center">Cat</div>
                            <div class="bg-[#F0F0F0] text-blue rounded-[15.66px] h-[65px] hover:text-white hover:bg-blue w-[65px] md:text-[15px] flex justify-center items-center">Dog</div>
                            <div class="bg-[#F0F0F0] text-blue rounded-[15.66px] h-[65px] hover:text-white hover:bg-blue w-[65px] md:text-[15px] flex justify-center items-center">Rabbit</div>
                        </div>
                        
                        <!-- Hidden Filter Options Container -->
                        <div id="extraFilters" class="hidden flex  justify-between  md:gap-6">
                        <!-- Breed Dropdown -->
                        <div class="relative inline-block dropdown">
                            <button class="dropdown-btn bg-[#F0F0F0] rounded-[15.66px] h-[65px] min-w-[65px] px-1 text-[15px] flex justify-center items-center transition-colors duration-300 w-50">
                                <span class="text-blue">Breed</span>
                            </button>
                            <div class="absolute z-100 bg-gray-200 rounded-[15.66px] shadow-lg dropdown-menu hidden text-sm w-max mt-3">
                                <a href="#" class="block text-blue px-4 py-3 z-100 hover:bg-blue hover:text-white hover:rounded-[15.66px]">Option 1</a>
                                <a href="#" class="block text-blue px-4 py-3 z-50 hover:bg-blue hover:text-white hover:rounded-[15.66px]">Option 2</a>
                            </div>
                        </div>
                        <!-- Gender Dropdown -->
                        <div class="relative inline-block dropdown">
                            <button class="dropdown-btn bg-[#F0F0F0] rounded-[15.66px] h-[65px] min-w-[65px] text-[15px] px-1 flex justify-center items-center transition-colors duration-300 w-50">
                                <span class="text-blue">Gender</span>
                            </button>
                            <div class="absolute z-100 bg-gray-200 rounded-[15.66px] shadow-lg dropdown-menu hidden text-sm w-max mt-3">
                                <a href="#" class="block  text-blue px-4 py-3 hover:bg-blue hover:text-white hover:rounded-[15.66px]">Male</a>
                                <a href="#" class="block text-blue px-4 py-3 hover:bg-blue hover:text-white hover:rounded-[15.66px]">Female</a>
                            </div>
                        </div>
                        <!-- Age Input -->
                        <div class="relative inline-block dropdown">
                            <button class="dropdown-btn bg-[#F0F0F0] rounded-[15.66px] h-[65px] w-[65px] text-[15px] flex justify-center items-center transition-colors duration-300 w-50">
                                <span class="text-blue">Age</span>
                            </button>
                            <div class="absolute z-100 bg-gray-200 rounded-[15.66px] shadow-lg dropdown-menu hidden text-sm w-max mt-3 text-blue ">
                                <input type="number" min="0" max="100" id="ageInput" class="px-4 py-3  bg-gray-200 text-blue rounded-[15.66px] w-full focus:outline-none" placeholder="Enter Age" />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    
            <!-- Possible Match Section -->
          
             <div class="flex flex-col pt-5 w-full md:w-max">
            <!-- Possible Match Section -->
            <div class="flex flex-col gap-4 md:mb-10 max-w-screen-md w-full mx-auto overflow-hidden justify-center items-center">
                <h1 class="font-semibold text-[16.71px] text-[#03063A] self-start">Possible Matches</h1>
                
                <!-- Glide Container with responsive constraints -->
                <div class="glide w-full">
                  <!-- Glide Track -->
                  <div class="glide__track" data-glide-el="track">
                    <ul class="glide__slides" id="userSlides">
                      <!-- Slides will be populated dynamically -->
                      <li class="glide__slide">
                        <div class="h-[200px] w-[90%] md:h-[224px] md:w-[200.51px] bg-gray-200 rounded-[20px] mx-2 flex items-center justify-center">
                          Loading...
                        </div>
                      </li>
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
              
                  <!-- Glide Bullets -->
                  <div class="glide__bullets" data-glide-el="controls[nav]">
                    <button class="glide__bullet" data-glide-dir="=0"></button>
                    <button class="glide__bullet" data-glide-dir="=1"></button>
                    <button class="glide__bullet" data-glide-dir="=2"></button>
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
            const response = await fetch('https://jsonplaceholder.typicode.com/users?_start=0&_limit=6');
            const users = await response.json();
            
            const slidesContainer = document.getElementById('userSlides');
            slidesContainer.innerHTML = users.map(user => `
                <li class="glide__slide">
                    <div class="h-[200px] w-[90%] md:h-[224px] md:w-[200.51px] bg-white rounded-[20px] mx-2 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                        <div>
                            <h3 class="font-bold text-lg text-[#03063A] truncate">${user.name}</h3>
                            <p class="text-sm text-gray-600 truncate">@${user.username}</p>
                            <p class="text-sm text-gray-500 mt-2 truncate">${user.email}</p>
                            <p class="text-sm text-gray-500 truncate">${user.company.name}</p>
                        </div>
                        <div class="mt-2">
                            <p class="text-xs text-gray-400 truncate">${user.address.city}</p>
                            <p class="text-xs text-gray-400 truncate">${user.phone}</p>
                            <a href="##profile/${user.username}" class="text-xs text-blue-500 hover:text-blue-600">View Profile</a>
                        </div>
                    </div>
                </li>
            `).join('');
        } catch (error) {
            console.error('Error fetching users:', error);
            const slidesContainer = document.getElementById('userSlides');
            slidesContainer.innerHTML = `
                <li class="glide__slide">
                    <div class="h-[200px] w-[90%] md:h-[224px] md:w-[200.51px] bg-red-100 rounded-[20px] mx-2 flex items-center justify-center text-red-500">
                        Error loading users
                    </div>
                </li>
            `;
        }
    }
    
    function initializeGlide() {
        if (typeof Glide !== 'undefined') {
            const glide = new Glide('.glide', {
                type: 'carousel',
                startAt: 0,
                perView: 3,
                gap: 0,
                breakpoints: {
                    1024: {
                        perView: 2
                    },
                    640: {
                        perView: 1
                    }
                },
                bound: true
            });
    
            // Update bullets
            glide.on('move', () => {
                const bullets = document.querySelectorAll('.glide__bullet');
                bullets.forEach((bullet, index) => {
                    if (index === glide.index) {
                        bullet.classList.add('glide__bullet--active');
                    } else {
                        bullet.classList.remove('glide__bullet--active');
                    }
                });
            });
    
            glide.mount();
        }}
// Initialize dropdowns
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-btn');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close all other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.querySelector('.dropdown-menu').classList.add('hidden');
                }
            });
            menu.classList.toggle('hidden');
        });

        // Handle option selection
        const options = menu.querySelectorAll('a');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                button.querySelector('span').textContent = option.textContent;
                menu.classList.add('hidden');
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.querySelector('.dropdown-menu').classList.add('hidden');
            });
        }
    });
}

// Initialize filters
function initializeFilters() {
    const filterButton = document.querySelector('button[onclick="toggleFilters()"]');
    const extraFilters = document.getElementById('extraFilters');

    // Remove inline onclick and add proper event listener
    filterButton.removeAttribute('onclick');
    filterButton.addEventListener('click', () => {
        extraFilters.classList.toggle('hidden');
    });

    // Initialize age input
    const ageInput = document.getElementById('ageInput');
    if (ageInput) {
        ageInput.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            if (value < 0) e.target.value = 0;
            if (value > 100) e.target.value = 100;
        });
    }
}}