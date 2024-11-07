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
    glideScript.onload = initializeGlide; // Initialize Glide after script loads
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
                <h1 class="font-semibold text-3xl md:text-[26.11px] text-[#03063A]">Tirana, AL</h1>
            </div>
    
            <!-- Categories Section -->
            <div class="flex flex-col gap-2 mb-5 w-full">
                <h1 class="font-semibold text-[16.71px] text-[#03063A]">Categories</h1>
                <!-- Filters Section -->
                <div class="flex gap-6 w-full md:justify-between">
                    <!-- Filter Button -->
                    <button onclick="toggleFilters()" class=" rounded-[15.66px]  mb-[100px] md:mb-10 h-[58.48px] w-[58.48px] text-[15px] flex justify-center items-center">
                        <img src="./assets/images/icons/setting.png" alt="" class="">
                    </button>
    
                    <div class=" flex flex-col md:flex-row gap-6 w-full  px-4">
                        <!-- Default Categories -->
                        <div class="flex  justify-between md:gap-6">
                            <div class="bg-[#F0F0F0] rounded-[15.66px] h-[65px] hover:text-white hover:bg-blue w-[65px] md:text-[15px] flex justify-center items-center">Cat</div>
                            <div class="bg-[#F0F0F0] rounded-[15.66px] h-[65px] hover:text-white hover:bg-blue w-[65px] md:text-[15px] flex justify-center items-center">Dog</div>
                            <div class="bg-[#F0F0F0] rounded-[15.66px] h-[65px] hover:text-white hover:bg-blue w-[65px] md:text-[15px] flex justify-center items-center">Rabbit</div>
                        </div>
                        
                        <!-- Hidden Filter Options Container -->
                        <div id="extraFilters" class="hidden flex  justify-between  md:gap-6">
                        <!-- Breed Dropdown -->
                        <div class="relative inline-block dropdown">
                            <button class="dropdown-btn bg-[#F0F0F0] rounded-[15.66px] h-[65px] min-w-[65px] px-1 text-[15px] flex justify-center items-center transition-colors duration-300 w-50">
                                <span>Breed</span>
                            </button>
                            <div class="absolute z-100 bg-gray-200 rounded-[15.66px] shadow-lg dropdown-menu hidden text-sm w-max">
                                <a href="#" class="block px-4 py-3 z-100 hover:bg-blue hover:text-white hover:rounded-[15.66px]">Option 1</a>
                                <a href="#" class="block px-4 py-3 z-50 hover:bg-blue hover:text-white hover:rounded-[15.66px]">Option 2</a>
                            </div>
                        </div>
                        <!-- Gender Dropdown -->
                        <div class="relative inline-block dropdown">
                            <button class="dropdown-btn bg-[#F0F0F0] rounded-[15.66px] h-[65px] min-w-[65px] text-[15px] px-1 flex justify-center items-center transition-colors duration-300 w-50">
                                <span>Gender</span>
                            </button>
                            <div class="absolute z-100 bg-gray-200 rounded-[15.66px] shadow-lg dropdown-menu hidden text-sm w-max">
                                <a href="#" class="block px-4 py-3 hover:bg-blue hover:text-white hover:rounded-[15.66px]">Male</a>
                                <a href="#" class="block px-4 py-3 hover:bg-blue hover:text-white hover:rounded-[15.66px]">Female</a>
                            </div>
                        </div>
                        <!-- Age Input -->
                        <div class="relative inline-block dropdown">
                            <button class="dropdown-btn bg-[#F0F0F0] rounded-[15.66px] h-[65px] w-[65px] text-[15px] flex justify-center items-center transition-colors duration-300 w-50">
                                <span>Age</span>
                            </button>
                            <div class="absolute z-100 bg-gray-200 rounded-[15.66px] shadow-lg dropdown-menu hidden text-sm w-max">
                                <input type="number" min="0" max="100" id="ageInput" class="px-4 py-3 text-gray-700 bg-white rounded-[15.66px] w-full focus:outline-none" placeholder="Enter Age" />
                            </div>
                        </div>
                                        </div>
                    </div>
                </div>
            </div>
    
            <!-- Possible Match Section -->
            <div class="flex flex-col gap-4 md:mb-10 max-w-screen-lg w-full mx-auto overflow-hidden justify-center items-center">
                <h1 class="font-semibold text-[16.71px] text-[#03063A] self-start">Possible Match</h1>
                
                <!-- Glide Container with responsive constraints -->
                <div class="glide w-full">
                  <!-- Glide Track -->
                  <div class="glide__track" data-glide-el="track">
                    <ul class="glide__slides">
                      <!-- Slide 1 -->
                      <li class="glide__slide">
                        <div class="h-[200px] w-full md:h-[224px] md:w-[200.51px] bg-red-200 rounded-[20px] mx-2"></div>
                      </li>
                      <!-- Slide 2 -->
                      <li class="glide__slide">
                        <div class="h-[200px] w-full  md:h-[224px] md:w-[200.51px] bg-green-200 rounded-[20px] mx-2"></div>
                      </li>
                      <!-- Slide 3 -->
                      <li class="glide__slide">
                        <div class="h-[200px] w-full  md:h-[224px] md:w-[200.51px] bg-sky-200 rounded-[20px] mx-2"></div>
                      </li>
                      <!-- Slide 4 -->
                      <li class="glide__slide">
                        <div class="h-[200px] w-full  md:h-[224px] md:w-[200.51px] bg-green-200 rounded-[20px] mx-2"></div>
                      </li>
                      <!-- Slide 5 -->
                      <li class="glide__slide">
                        <div class="h-[200px] w-full  md:h-[224px] md:w-[200.51px] bg-slate-200 rounded-[20px] mx-2"></div>
                      </li>
                    </ul>
                  </div>
              
                  <!-- Glide Arrows -->
                  <div class="glide__arrows z-10" data-glide-el="controls">
                    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
                      <img src="./assets/images/icons/back-arrows.png" class="h-[20px]" alt="Previous">
                    </button>
                    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
                      <img src="./assets/images/icons/right-arrow.png" class="h-[20px]" alt="Next">
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
              
              
    
            <!-- Pagination Section -->
            <div class="hidden md:flex justify-around items-center mt-5 space-x-1 bg-[#F0F0F0] md:w-[402px] self-center rounded-[15.66px] py-2">
                <!-- Previous Button -->
                <button class="text-gray-500 hover:text-white hover:bg-blue-500 disabled:cursor-not-allowed" aria-label="Previous Page" disabled>
                    <img src="./assets/images/icons/back-arrows.png" class="h-[20px]" alt="">
                </button>
    
                <!-- Page Numbers -->
                <div class="flex gap-1">
                    <button class="px-3 py-1 rounded-[15.66px] text-white bg-blue w-[29.8px] h-[28px] flex justify-center items-center">1</button>
                    <button class="px-3 py-1 rounded-[15.66px] text-black h-[28px] flex justify-center items-center">2</button>
                    <button class="px-3 py-1 rounded-[15.66px] text-black h-[28px] flex justify-center items-center">3</button>
                </div>
    
                <!-- Next Button -->
                <button class="" aria-label="Next Page">
                    <img src="./assets/images/icons/right-arrow.png" class="h-[20px]" alt="">
                </button>
            </div>
        </div>
    `;
    initializeDropdowns();
    initializeFilters();

      function initializeGlide() {
    if (typeof Glide !== 'undefined') {
        const glide = new Glide('.glide', {
            type: 'carousel',
            startAt: 0,
            perView: 3,
            gap: 5,
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
    }
}

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