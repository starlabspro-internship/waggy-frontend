// profile.js
export default function renderPageContent() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="p-4 rounded-lg">
        <div class=" bg-white text-white-800">
    <!-- About Section -->
    <section class="max-w-2xl mx-auto py-12 text-center">
        <h2 class="text-3xl font-bold mb-6">Our Story</h2>
        <p class="text-lg mb-6  text-lg mb-6 text-gray-700 leading-relaxed font-medium">
            Whether you're looking to find a companion for your furry friend, exchange tips and advice with other pet lovers, or offer or adopt a pet, our app provides the perfect space to do so. We believe in creating a supportive environment for both pets and their owners, making it easier to build lasting connections and ensure the happiness of every pet in our community. Join us today and be part of a growing network of pet enthusiasts!
        </p>
        <section class="max-w-9xl mx-auto py-18 px-10 text-center"> 
            <h2 class="text-3xl font-bold mb-6">Our Shelter Gallery</h2>
            <div class="relative">
                <!-- Slider Images -->
                <div class="slider-container overflow-hidden">
                    <div class="slider-images flex transition-transform duration-500 ease-in-out gap-x-6">
                        <!-- Image Set 1 -->
                        <img src="assets/images/DOGG.jpg" alt="Dog 1" class="w-1/3 object-cover rounded-lg flex-none">
                        <img src="assets/images/dog2.jpg" alt="Dog 2" class="w-1/3 object-cover rounded-lg flex-none">
                        <img src="assets/images/lovely-dog-with-cute-eyes-eating-bone.webp" alt="Dog 3" class="w-1/3 object-cover rounded-lg flex-none">
                        <img src="assets/images/a-happy-dog-with-a-nylon-collar.jpg" alt="Dog 4" class="w-1/3 object-cover rounded-lg flex-none">
                        <img src="assets/images/Waggy.png" alt="Dog 5" class="w-1/3 object-cover rounded-lg flex-none">
                        <img src="assets/images/landing-background.jpg" alt="Dog 6" class="w-1/3 object-cover rounded-lg flex-none">
                        <img src="assets/images/karsten-winegeart-BJaqPaH6AGQ-unsplash.webp" alt="Dog 7" class="w-1/3 object-cover rounded-lg flex-none">
                        <!-- Duplicate Image Set for Infinite Scroll Effect -->
                        <img src="assets/images/DOGG.jpg" alt="Dog 1" class="w-1/3 object-cover rounded-lg flex-none">
                        <img src="assets/images/dog2.jpg" alt="Dog 2" class="w-1/3 object-cover rounded-lg flex-none">
                        <img src="assets/images/lovely-dog-with-cute-eyes-eating-bone.webp" alt="Dog 3" class="w-1/3 object-cover rounded-lg flex-none">
                        <img src="assets/images/a-happy-dog-with-a-nylon-collar.jpg" alt="Dog 4" class="w-1/3 object-cover rounded-lg flex-none">
                        <img src="assets/images/Waggy.png" alt="Dog 5" class="w-1/3 object-cover rounded-lg flex-none">
                        <img src="assets/images/landing-background.jpg" alt="Dog 6" class="w-1/3 object-cover rounded-lg flex-none">
                        <img src="assets/images/karsten-winegeart-BJaqPaH6AGQ-unsplash.webp" alt="Dog 7" class="w-1/3 object-cover rounded-lg flex-none">
                    </div>
                </div>
        
                <!-- Navigation Buttons -->
                <button class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-200" id="prevBtn">
                    &#10094;
                </button>
                <button class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-200" id="nextBtn">
                    &#10095;
                </button>
            </div>
        </section>
        
    </section>

    <!-- Mission Section with Icons -->
    <section class="max-w-screen-xl mx-auto py-12 px-4">
        <h2 class="text-3xl font-bold text-center mb-8">Our Mission & Values</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg">
            <div class="bg-blue-400 p-6 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 text-center">
                <span class="text-4xl text-blue-600">💖</span>
                <h3 class="font-semibold text-xl mt-4 text-white">Compassion</h3>
                <p class="text-white">Our platform is built on compassion, connecting pet owners to ensure their pets have the love, care, and companionship they deserve. We’re here to foster a community where kindness and support come first.</p>
            </div>
            <div class="bg-blue-400 p-6 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 text-center">
                <span class="text-4xl text-blue-600">🌟</span>
                <h3 class="font-semibold text-xl mt-4 text-white">Dedication</h3>
                <p class="text-white">We are dedicated to creating a safe and supportive environment for pet owners. Our commitment is to continuously improve and provide valuable resources, helping pets and their owners thrive together. </p>
            </div>
            <div class="bg-blue-400 p-6 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 text-center">
                <span class="text-4xl text-blue-600">🤝</span>
                <h3 class="font-semibold text-xl mt-4 text-white">Community</h3>
                <p class="text-white"> We strive to connect pet owners, foster meaningful interactions, and create a space where advice, experiences, and love for pets are shared. Together, we grow, support one another, and make a positive impact on the lives of our pets and their families.</p>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="w-full py-12 px-4 text-center bg-blue-100 rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold mb-6">What Our Adopters Say</h2>
        <div class="flex overflow-x-scroll space-x-6 scrollbar-hide">
            <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 min-w-[300px]">
                <p class="italic">"Adopting Bella from this shelter was the best decision. She has brought so much joy to our lives!"</p>
                <p class="text-right mt-2 font-semibold">- Sarah & David</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 min-w-[300px]">
                <p class="italic">"The adoption process was so smooth, and the team truly cares about the animals."</p>
                <p class="text-right mt-2 font-semibold">- The Nguyen Family</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 min-w-[300px]">
                <p class="italic">"Our new pup has been an amazing addition to our family. We couldn’t be happier!"</p>
                <p class="text-right mt-2 font-semibold">- Alex and Jamie</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 min-w-[300px]">
                <p class="italic">"The shelter staff was so helpful, and our dog is just perfect. Thank you so much!"</p>
                <p class="text-right mt-2 font-semibold">- Morgan T.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 min-w-[300px]">
                <p class="italic">"We adopted two dogs, and they’re the best friends we could ever ask for!"</p>
                <p class="text-right mt-2 font-semibold">- Charlie & Sam</p>
            </div>
        </div>
    </section>

    <!-- Meet Our Team Section -->
    <section class="max-w-4xl mx-auto py-12 px-4">
        <h2 class="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div class="text-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-v2imCJd5Zr5KQo3OUCFlE4Bfk5aN7zAfw&s" alt="Team Member 1" class="rounded-full w-32 h-32 mx-auto mb-4 shadow-lg">
                <h3 class="font-semibold text-lg text-yellow-800 tracking-wide transform transition duration-300 hover:text-blue-500 hover:scale-105">
                    Erjona Rushiti
                </h3>
                <p class="text-sm font-serif text-gray-600 tracking-wider italic">Shelter Manager</p>
            </div>
            <div class="text-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5aBrXP8iKZp97NFLjG93twgVa-J0vhV_XTQ&s" alt="Team Member 2" class="rounded-full w-32 h-32 mx-auto mb-4 shadow-lg">
                <h3 class="font-semibold text-lg text-yellow-800 tracking-wide transform transition duration-300 hover:text-blue-500 hover:scale-105">
                    Jane Smith
                </h3>
                <p class="text-sm font-serif text-gray-600 tracking-wider italic">Veterinarian</p>
            </div>
            <div class="text-center">
                <img src="https://img.freepik.com/premium-photo/fun-unique-cartoon-profile-picture-that-represents-your-style-personality_1283595-14223.jpg" alt="Team Member 3" class="rounded-full w-32 h-32 mx-auto mb-4 shadow-lg">
                <h3 class="font-semibold text-lg text-yellow-800 tracking-wide transform transition duration-300 hover:text-blue-500 hover:scale-105">
                    Leon Rama
                </h3>
                <p class="text-sm font-serif text-gray-600 tracking-wider italic">Adoption Coordinator</p>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->       <!--rounded-xl shadow-2xl-->
    <section class="w-full mx-auto py-20 px-6 bg-white">
        <h2 class="text-4xl font-semibold text-center text-gray-800 mb-14">Frequently Asked Questions</h2>
        <div class="w-4/5 mx-auto space-y-8">
            <!-- FAQ Items -->
            <div class="bg-white border border-gray-200  shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <button class="w-full text-2xl font-semibold text-left p-6 focus:outline-none bg-gradient-to-r from-blue-50 to-blue-100 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 text-gray-800 transition-all duration-200 ease-in-out flex justify-between items-center" onclick="toggleAnswer('faq1')">
                    <span>How can I adopt a dog?</span>
                    <svg class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <p id="faq1" class="text-sm mt-2 hidden bg-gray-100 p-6 rounded-lg text-gray-700">To adopt a dog, click on the "Adopt Now" button. To fill out the adoption form, first you have to create an account, and our team will get in touch with you!</p>
            </div>

            <!-- FAQ Item 2 -->
        <div class="bg-white border border-gray-200  shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <button class="w-full text-2xl font-semibold text-left p-6 focus:outline-none bg-gradient-to-r from-blue-50 to-blue-100 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 text-gray-800 transition-all duration-200 ease-in-out flex justify-between items-center" onclick="toggleAnswer('faq2')">
                <span>What should I bring to adopt a dog?</span>
                <svg class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <p id="faq2" class="text-sm mt-2 hidden bg-gray-100 p-6 rounded-lg text-gray-700">You’ll need a valid ID, proof of address, and a completed adoption form.</p>
        </div>

        <!-- FAQ Item 3 -->
        <!-- <div class="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <button class="w-full text-2xl font-semibold text-left p-6 focus:outline-none bg-gradient-to-r from-blue-50 to-blue-100 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 text-gray-800 transition-all duration-200 ease-in-out flex justify-between items-center" onclick="toggleAnswer('faq3')">
                <span>Can I donate money or supplies?</span>
                <svg class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <p id="faq3" class="text-sm mt-2 hidden bg-gray-100 p-6 rounded-lg text-gray-700">Yes, we accept both monetary donations and supplies like food, toys, and bedding!</p>
        </div> -->

        <!-- FAQ Item 4 -->
        <div class="bg-white border border-gray-200  shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <button class="w-full text-2xl font-semibold text-left p-6 focus:outline-none bg-gradient-to-r from-blue-50 to-blue-100 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 text-gray-800 transition-all duration-200 ease-in-out flex justify-between items-center" onclick="toggleAnswer('faq4')">
                <span>Do I need to pay an adoption fee?</span>
                <svg class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <p id="faq4" class="text-sm mt-2 hidden bg-gray-100 p-6 rounded-lg text-gray-700">Yes, there is a nominal adoption fee that helps cover the costs of the dog's care, vaccinations, and spaying/neutering.</p>
        </div>

        <!-- FAQ Item 5 -->
        <div class="bg-white border border-gray-200  shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <button class="w-full text-2xl font-semibold text-left p-6 focus:outline-none bg-gradient-to-r from-blue-50 to-blue-100 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 text-gray-800 transition-all duration-200 ease-in-out flex justify-between items-center" onclick="toggleAnswer('faq5')">
                <span>Can I visit the shelter before adopting?</span>
                <svg class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <p id="faq5" class="text-sm mt-2 hidden bg-gray-100 p-6 rounded-lg text-gray-700">Yes, we encourage potential adopters to visit the shelter and meet the dogs before making a decision. Please contact us to schedule a visit.</p>
        </div>

        <!-- FAQ Item 6 -->
        <div class="bg-white border border-gray-200  shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <button class="w-full text-2xl font-semibold text-left p-6 focus:outline-none bg-gradient-to-r from-blue-50 to-blue-100 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 text-gray-800 transition-all duration-200 ease-in-out flex justify-between items-center" onclick="toggleAnswer('faq6')">
                <span>How can I volunteer at the shelter?</span>
                <svg class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <p id="faq6" class="text-sm mt-2 hidden bg-gray-100 p-6 rounded-lg text-gray-700">To volunteer, you can fill out the volunteer application form on our website, and our team will get in touch with you!</p>
        </div>
        </div>
    </section>

    <br> 

    <!-- Happy Stories Section -->       <!--rounded-xl shadow-2xl my-12-->
    <section class="w-3/4 mx-auto py-20 px-6 text-center bg-blue-400 rounded-xl">
        <h2 class="text-3xl font-semibold mb-6 text-white">Happy Stories</h2>
        <p class="text-lg mb-8 text-white">
            From successful adoptions to friendships blossoming between pets, these stories inspire and remind us of the joy and bond that pets bring into our lives.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Story Items -->
            <div class="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
                <img src="https://www.veterinarypracticenews.com/wp-content/uploads/2019/06/bigstock-Family-Sitting-In-Garden-Toget-13917122.jpg" alt="Happy Family 1" class="w-full h-48 object-cover rounded-lg mb-4">
                <h3 class="text-2xl font-semibold ">Buddy & The Johnson Family</h3>
                <p class="text-sm mt-2 text-gray-600 italic">
                    "Buddy has brought so much happiness to our home. We couldn’t imagine life without him!"
                </p>
            </div>

            <!-- Story 2 -->
        <div class="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
            <img src="https://img.freepik.com/premium-photo/family-with-dog-dog-background_1089043-32098.jpg" alt="Happy Family 2" class="w-full h-48 object-cover rounded-lg mb-4">
            <h3 class="text-2xl font-semibold ">Luna & The Ramirez Family</h3>
            <p class="text-sm mt-2 text-gray-600 italic">
                "Luna has completed our family. She is loved by everyone, especially the kids!"
            </p>
        </div>
        <!-- Story 3 -->
        <div class="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
            <img src="https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blt453a094161415bb3/6261d2e6c14129279e845f8a/best-breeds-for-families-kids_img_article-head.jpg" alt="Happy Family 3" class="w-full h-48 object-cover rounded-lg mb-4">
            <h3 class="text-2xl font-semibold ">Charlie & Emily’s New Friend</h3>
            <p class="text-sm mt-2 text-gray-600 italic">
                "Charlie has been the perfect companion. Adopting him was the best decision ever!"
            </p>
        </div>
        <!-- Story 4 -->
        <div class="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
            <img src="https://img.freepik.com/premium-photo/three-girls-dog-are-playing-with-dog_1307028-1756.jpg" alt="Happy Family 4" class="w-full h-48 object-cover rounded-lg mb-4">
            <h3 class="text-2xl font-semibold ">Max & The Kim Family</h3>
            <p class="text-sm mt-2 text-gray-600 italic">
                "Max brings us joy every day with his big heart and playful energy!"
            </p>
        </div> 

        </div>
    </section>
        </div>
    `;



    //FAQ 
    function toggleAnswer(faqId) {
        const answer = document.getElementById(faqId);
        answer.classList.toggle("hidden");
    }

    //slider
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const sliderImages = document.querySelector(".slider-images");
    const images = document.querySelectorAll(".slider-images img");
    const imageWidth = images[0].clientWidth + 24; // Image width + gap (adjust the gap if necessary)
    const totalImages = images.length / 2; // Original set of images without duplicates
    let currentIndex = 0;

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        sliderImages.style.transition = "transform 0.5s ease-in-out";
        updateSlider();

        if (currentIndex >= totalImages) {
            setTimeout(() => {
                sliderImages.style.transition = "none";
                currentIndex = 0;
                updateSlider();
            }, 500);
        }
    });

    prevBtn.addEventListener("click", () => {
        currentIndex--;
        sliderImages.style.transition = "transform 0.5s ease-in-out";
        updateSlider();

        if (currentIndex < 0) {
            setTimeout(() => {
                sliderImages.style.transition = "none";
                currentIndex = totalImages - 1;
                updateSlider();
            }, 500);
        }
    });

    function updateSlider() {
        const offset = currentIndex * imageWidth;
        sliderImages.style.transform = `translateX(-${offset}px)`;
    }

    


    // Initialize event listeners or any additional functionality
    // const profileContent = document.getElementById('profile-content');
    // if (profileContent) {
    //     profileContent.addEventListener('click', function () {
    //         alert('Profile content clicked');
    //     });
    // }

    // // Form submission event
    // const profileForm = document.getElementById('profile-form');
    // if (profileForm) {
    //     profileForm.addEventListener('submit', async function (e) {
    //         e.preventDefault();

    //         const formData = new FormData(profileForm);
    //         try {
    //             const response = await fetch('https://api.example.com/profile', {
    //                 method: 'POST',
    //                 body: formData
    //             });
    //             const result = await response.json();
    //             alert('Profile updated successfully!');
    //             console.log(result);
    //         } catch (error) {
    //             console.error('Error updating profile:', error);
    //             alert('Failed to update profile');
    //         }
    //     });
    // }
}
