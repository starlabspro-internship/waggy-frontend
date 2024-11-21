export default function renderPageContent() {
  // Add required CSS
  const customCssLink = document.createElement("link");
  customCssLink.rel = "stylesheet";
  customCssLink.href = "../styles/matching.css";
  document.head.appendChild(customCssLink);
  const userLocation = localStorage.getItem("userLocation");

  const content = document.getElementById("content");
  content.innerHTML = `
        <div class="flex flex-col md:pl-14  w-full  md:w-full ">
            <!-- Location Section -->
            <div class="mb-10 md:mb-5 flex flex-col justify-center items-center md:items-start bg-blue md:bg-transparent">
                <div class="hidden md:flex gap-1 items-center pt-1 w-full">
                    <h2 class="text-sm text-slate-400  font-mono">Location</h2>
                    <img src="./assets/images/icons/location-pin.png" alt="" class="h-4">
                    <h1 class="relative text-center text-[#03063A] w-full text-2xl font-semibold right-5">Matching <span class="text-rose-400">Center</span></h1>
                </div>
                <h1 class="font-semibold text-sm text-slate-50 md:text-xl md:text-[26.11px] text-white md:text-[#03063A] mt-2 md:mt-0">${userLocation}</h1>
                <h1 class="md:hidden font-semibold text-slate-50 text-2xl md:text-3xl md:text-[26.11px] text-white md:text-[#03063A]">Matching <span class="text-rose-400">Center</span></h1>

            </div>
    
            <!-- Categories Section -->
    <div class="flex flex-col gap-2 mb-2 w-full pl-3">
    <h1 class="font-semibold text-[16.71px] text-[#03063A]">Your Preferences</h1>
    <!-- Filters Section -->
    <div class="flex flex-col md:flex-row gap-3 w-full z-50">
        <!-- Filter Button -->
        <div class="flex">
            <button onclick="toggleFilters()" class="rounded-[15.66px] md:mb-10 h-[58.48px] w-[58.48px] text-[15px] flex justify-center items-center">
                <img src="./assets/images/icons/setting.png" alt="" class="">
            </button>
            <div class="flex flex-col md:flex-row gap-3 w-full px-4">
                <!-- Default Categories -->
                <div class="flex justify-between gap-3 md:gap-6">
                    <div class="bg-sky-200 text-sky-600 rounded-[15.66px] h-[60px] md:h-[65px] hover:text-white hover:bg-blue w-full md:w-[65px] md:text-[15px] flex justify-center items-center" onclick="filterSpecies('Cat')">Cat</div>
                    <div class="bg-sky-200 text-sky-600 rounded-[15.66px] h-[60px] md:h-[65px] hover:text-white hover:bg-blue  w-full md:w-[65px] md:text-[15px] flex justify-center items-center" onclick="filterSpecies('Dog')">Dog</div>
                </div>
                <!-- Hidden Filter Options Container -->
            </div>
        </div>
                    <div id="extraFilters" class="hidden flex justify-between gap-2 md:gap-6 pr-4 transition-all duration-500 ease-in-out">
                <!-- Breed Dropdown -->
                <div class="relative inline-block dropdown w-full md:auto">
                    <button class="dropdown-btn bg-rose-200 text-rose-600 hover:bg-blue hover:text-white rounded-[15.66px] h-[60px] md:h-[65px] w-full md:min-w-[65px] px-1 text-[15px] flex justify-center items-center transition-colors duration-300 w-50">
                        <span>Breed</span>
                    </button>
                    <div id="renderBreeds" class="absolute z-100 bg-gray-200 rounded-[15.66px] shadow-lg dropdown-menu text-sm w-max mt-3">
                        <a href="#" class="block text-blue px-4 py-3 z-100 hover:bg-blue hover:text-white hover:rounded-[15.66px]">Select a Category</a>
                    </div>
                </div>

                <!-- Gender Dropdown -->
                <div class="relative inline-block dropdown w-full md:auto">
                    <button class="dropdown-btn bg-rose-200 hover:bg-blue hover:text-white text-rose-600 rounded-[15.66px] h-[60px] md:h-[65px] w-full md:min-w-[65px] text-[15px] px-1 flex justify-center items-center transition-colors duration-300 w-50">
                        <span>Gender</span>
                    </button>
                    <div class="absolute z-100 bg-gray-200 rounded-[15.66px] shadow-lg dropdown-menu hidden text-sm w-max mt-3">
                        <a href="#" class="block text-blue px-4 py-3 hover:bg-blue hover:text-white hover:rounded-[15.66px]"  onclick="filterGender('Male')">Male</a>
                        <a href="#" class="block text-blue px-4 py-3 hover:bg-blue hover:text-white hover:rounded-[15.66px]"  onclick="filterGender('Female')">Female</a>
                    </div>
                </div>

                <!-- Age Input -->
                <div class="relative inline-block dropdown w-full md:auto">
                    <button class="dropdown-btn  bg-rose-200 hover:bg-blue hover:text-white text-rose-600 rounded-[15.66px] h-[60px] md:h-[65px] w-full md:min-w-[65px] text-[15px] flex justify-center items-center transition-colors duration-300 w-50">
                        <span id="ageInputSpan">Age</span>
                    </button>
                    <div class="absolute z-100 bg-gray-200 right-[1px] rounded-[15.66px] shadow-lg dropdown-menu hidden text-sm w-max mt-3 text-blue ">
                        <input type="number" min="0" max="100" id="ageInput" oninput="filterAge(this.value)"  class="px-4 py-3 bg-gray-200 text-blue rounded-[15.66px] w-full focus:outline-none" placeholder="Enter Age" />
                    </div>
                </div>
            </div>
    </div>
</div>
    
            <!-- Possible Match Section -->
          
             <div class="flex flex-col pt-5 w-full md:w-full ">
            <!-- Possible Match Section -->
            <div class="flex flex-col gap-6 md:mb-10  w-full  overflow-hidden justify-center items-center">
                <h1 class="font-semibold text-[16.71px] text-[#03063A] self-start pl-3">Possible Matches</h1>
                  <div class="relative w-full px-2 md:px-0 ">
                        <!-- Main carousel wrapper -->
                        <div class="overflow-hidden relative">
                            <div id="carousel-container" class="flex transition-transform duration-300 ease-in-out">
                                <!-- Slides will be inserted here dynamically -->
                                <div class="flex justify-center items-center h-[220px] md:h-40 w-full text-gray-600">
                                   <p>No matching results found.</p>
                               </div>
                            </div>
                        </div>
                        <!-- Navigation Buttons -->
                        <button id="prevBtn" class="absolute -left-0 top-2/3  -translate-y-1/2  md:hover:bg-white/80 p-1 rounded-full  shadow-lg z-10 ">
                            <img src="./assets/images/icons/left-arrow.png" class="h-[24px]" alt="Previous">
                        </button>
                        <button id="nextBtn" class="absolute right-0 top-2/3  -translate-y-1/2  md:hover:bg-white/80 rounded-full shadow-lg z-10 p-1">
                            <img src="./assets/images/icons/right-arrow.png" class="h-[24px]" alt="Next">
                        </button>
                    </div>
        </div>
    </div>
</div>
    `;
  const token = localStorage.getItem("token");
  initializeDropdowns();
  initializeFilters();
//   get id of the pet listed save it for use in match-info page
  window.navigateToMatchInfo = (id) => {
    sessionStorage.setItem('petToMatchId', id);
    window.location.href = '#match-info';
};

  const speciesBreeds = {
    Cat: ["Bengal", "Maine Coon", "Siamese", "Persian"],
    Dog: ["Labrador", "Bulldog", "German Shepherd", "Beagle"],
  };

  // Centralized filter state
  const breedButton = document.querySelector(".dropdown-btn span");
  const filters = {
    species: "cat",
    age: "",
    breed: "",
    gender: "",
    address: userLocation,
  };

  // Function to update filters and call fetchUsers
  function updateFilter(key, value) {
    filters[key] = value;
    currentIndex = 0;
    fetchUsers();

    if (key === "species") {
      updateBreedDropdown(value);
    }
  }
  const breedDropdown = document.getElementById("renderBreeds");
  function updateBreedDropdown(selectedSpecies) {
    if (!breedDropdown) return;

    // Clear existing breeds
    breedDropdown.innerHTML = "";

    // Get breeds for selected species
    const breeds = speciesBreeds[selectedSpecies] || [];

    // Add new breed options
    breeds.forEach((breed) => {
      const breedLink = document.createElement("a");
      breedLink.className =
        "block text-blue px-4 py-3 z-100 hover:bg-blue hover:text-white hover:rounded-[15.66px]";
      breedLink.textContent = breed;
      breedLink.onclick = () => filterBreed(breed);
      breedDropdown.appendChild(breedLink);
    });

    // Reset breed filter and dropdown button text
    filters.breed = "";
    if (breedButton) {
      breedButton.textContent = "Breed";
    }
  }
  window.filterSpecies = (type) => {
    updateFilter("species", type);
    // Reset breed when species changes
    updateFilter("breed", "");
  };
  // Filter functions
  //   window.filterSpecies = (type) => updateFilter("species", type);
  window.filterBreed = (breedType) => {
    updateFilter("breed", breedType);
    breedButton.textContent = breedType;
    breedDropdown.classList.add("hidden");

    //   breedButton
  };
  window.filterGender = (genderType) => updateFilter("gender", genderType);

  window.filterAge = (ageValue) => {
    updateFilter("age", ageValue);
    const ageInputSpan = document.getElementById("ageInputSpan");
    ageInputSpan.textContent = ageValue;
  };

  let currentIndex = 0;
let items = [];
let itemsPerPage = window.innerWidth >= 768 ? 3 : 1;
let startX = 0;
let currentTranslate = 0;
let isDragging = false;
let previousTranslate = 0;

async function fetchUsers() {
  const baseUrl = `http://localhost:3000/api/matching-list/list`;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      params.append(key, value);
    }
  }
  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    },
    });
    const pets = await response.json();
    items = pets;
    console.log(items[0].pet.id, "pet Id Dua")
    renderCarousel();
    updateCarouselPosition();
  } catch (error) {
    console.error("Error fetching pets:", error);
    const container = document.getElementById("carousel-container");
    container.innerHTML = `
     <div class="flex justify-center items-center h-[300px] md:h-40 w-full text-gray-600">
              <p>No matching results found.</p>
      </div>
    `;
  }
}

function renderCarousel() {

    const container = document.getElementById("carousel-container");

    if (!items || items.length === 0) {
      container.innerHTML = `
          <div class="flex justify-center items-center h-[300px] md:h-40 w-full text-gray-600">
              <p>No matching results found.</p>
          </div>
      `;
      return;
  }

    container.innerHTML = items
      .map(
        (pet, index) => `
          <div class="w-full md:w-1/3 flex-shrink-0 px-2">
            <div class="relative rounded-[16px] shadow-lg hover:shadow-2xl  transition-all duration-300 ${
              pet.pet.gender === "Female" ? "bg-rose-300" : " bg-sky-300"
            }">
              ${
                index === 0
                  ? `
                  <div class="absolute top-4 right-4 z-10">
                    <div class="bg-yellow-400 text-white px-3 py-1.5  rounded-[16px] flex items-center gap-1.5 shadow-lg">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span class="font-semibold text-sm">Best Match</span>
                    </div>
                  </div>
                `
                  : ""
              }
              <div class="relative">
                <div class="h-[220px] md:h-40 w-full">
                  <div class="absolute inset-0 rounded-t-2xl overflow-hidden">
                    <div class="bg-cover bg-center h-full w-full"
                      style="background-image: url('http://localhost:3000${
                        pet.pet.petPicture
                      }')">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>
                <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 class="font-bold text-lg mb-1">${pet.pet.name}</h3>
                  <p class="text-sm opacity-90">@${pet.pet.breed}</p>
                </div>
              </div>
              <div class="p-3 space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex justify-around gap-2 w-full">
                    <span class="px-3 py-1 text-white  ${
                        pet.pet.gender === "Female" ? "bg-rose-500" : "bg-sky-500"
                      }  rounded-[16px] text-sm font-medium flex items-center gap-1">
                     <img src="./assets/images/icons/location-pin.png" alt="" class="h-4">
                    ${pet.owner.profile.address}
                    </span>
                    <span class="px-3 py-1 text-white ${
                        pet.pet.gender === "Female" ? "bg-rose-500" : "bg-sky-500"
                      }  rounded-[16px] text-sm font-medium flex items-center gap-1">
                      Age: ${pet.pet.age}
                    </span>
                  </div>
                </div>
                <div class="pt-2 text-black">
                  <button onclick="navigateToMatchInfo(${pet.id})"
                    class="block w-full text-center ${
                      pet.pet.gender === "Female" ? "bg-rose-500" : "bg-sky-500"
                    } text-white hover:bg-blue-700 font-semibold px-4 py-2.5  rounded-[16px] transition-colors duration-200">
                    See more
                  </button>
                </div>
              </div>
            </div>
          </div>
        `
      )
      .join("");
    

  // Add touch event listeners after rendering
  setupTouchHandlers();
}

function updateCarouselPosition(animation = true) {
  const container = document.getElementById("carousel-container");
  const slideWidth = 100 / itemsPerPage;
  const translate = -currentIndex * slideWidth;
  
  container.style.transition = animation ? 'transform 300ms ease-out' : 'none';
  container.style.transform = `translateX(${translate}%)`;
  currentTranslate = translate;
  previousTranslate = translate;
}

function setupTouchHandlers() {
  const container = document.getElementById("carousel-container");
  
  // Touch events
  container.addEventListener('touchstart', touchStart);
  container.addEventListener('touchmove', touchMove);
  container.addEventListener('touchend', touchEnd);
  
  // Mouse events for desktop
  container.addEventListener('mousedown', touchStart);
  container.addEventListener('mousemove', touchMove);
  container.addEventListener('mouseup', touchEnd);
  container.addEventListener('mouseleave', touchEnd);
}

function unify(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}

function touchStart(e) {
  const touch = unify(e);
  startX = touch.clientX;
  isDragging = true;
  
  const container = document.getElementById("carousel-container");
  container.style.transition = 'none';
  
  // Prevent default when using mouse to avoid text selection
  if (e.type === 'mousedown') {
    e.preventDefault();
  }
}

function touchMove(e) {
  if (!isDragging) return;
  
  const touch = unify(e);
  const currentX = touch.clientX;
  const diff = currentX - startX;

  // Calculate the desired position
  const translate = previousTranslate + (diff / window.innerWidth * 100);
  
  // Add resistance at the edges
  if (
    (currentIndex === 0 && translate > 0) || 
    (currentIndex >= items.length - itemsPerPage && translate < previousTranslate)
  ) {
    currentTranslate = previousTranslate + (diff / window.innerWidth * 50); // Reduced movement
  } else {
    currentTranslate = translate;
  }
  
  const container = document.getElementById("carousel-container");
  container.style.transform = `translateX(${currentTranslate}%)`;
}

function touchEnd(e) {
  if (!isDragging) return;
  
  isDragging = false;
  const diff = currentTranslate - previousTranslate;
  
  // Determine if we should change slides
  if (Math.abs(diff) > 20) { // 20% threshold for slide change
    if (diff > 0 && currentIndex > 0) {
      currentIndex--;
    } else if (diff < 0 && currentIndex < items.length - itemsPerPage) {
      currentIndex++;
    }
  }
  
  updateCarouselPosition(true);
}

// Event Listeners for Navigation Buttons
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarouselPosition();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentIndex < items.length - itemsPerPage) {
    currentIndex++;
    updateCarouselPosition();
  }
});

// Update carousel on window resize
window.addEventListener('resize', () => {
  const newItemsPerPage = window.innerWidth >= 768 ? 3 : 1;
  if (newItemsPerPage !== itemsPerPage) {
    itemsPerPage = newItemsPerPage;
    currentIndex = 0; // Reset position when layout changes
    renderCarousel();
    updateCarouselPosition();
  }
});

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
  fetchUsers();
}
