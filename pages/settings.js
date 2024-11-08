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
          <div class="flex flex-col  w-full md:w-max">
            <!-- Possible Match Section -->
            <div class="flex flex-col gap-4 md:mb-10 max-w-screen-md w-full mx-auto overflow-hidden justify-center items-center">
                <h1 class="font-semibold text-[16.71px] text-[#03063A] self-start">User Profiles</h1>
                
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
        </div>
    `;
}

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
    }
}