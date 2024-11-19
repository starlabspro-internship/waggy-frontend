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
    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users?_start=0&_limit=6');
            const users = await response.json();
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    // Function to render content and initialize Glide
    function renderContent(users) {
        const carouselSlides = users.map((user, index) => `
            <li class="glide__slide h-[87px] w-[104px] rounded-[30.20px] ${backgrounds[index]} flex flex-col justify-center items-center overflow-hidden">
                <div class="flex flex-col justify-center items-center relative top-6 z-[50]">
                    <h1>${user.name.split(' ')[0]}</h1>
                    <p>${user.id}</p>
                </div>
                <img src="${icons[index]}" class="relative top-0 right-0 left-3" alt="">
            </li>
        `).join('');

        content.innerHTML = `
            <div class="flex flex-col w-full">
                <!-- First row -->
                <div class="">
                    <div class="flex justify-between w-full relative top-5 md:static z-[10] px-2">
                        <button class="bg-grey text-blue py-2 px-2 text-blue rounded-[16px]">
                            <img src="./assets/images/icons/pet-care.png" class="h-6 w-6" alt="">
                        </button>
                        <div class="flex gap-3">
                            <button class="gap-4 bg-grey py-1 px-2 rounded-[16px]">
                                <img src="./assets/images/icons/edit-text.png" class="h-6 w-6" alt="">
                            </button>
                            <button class="gap-4 bg-grey py-1 px-2 rounded-[16px]">
                                <img src="./assets/images/icons/delete.png" class="h-6 w-6" alt="">
                            </button>
                        </div>
                    </div>
                    <!-- Second row -->
                    <div class="relative -top-10">
                        <div class="flex w-full justify-center md:static">
                            <img src="./assets/images/dog2.jpg" class="w-full md:h-[250px] md:w-auto md:rounded-[16px]" alt="">
                        </div>
                    </div>
                </div>
                <!-- third row -->
                <div class="bg-white rounded-t-[40px] md:rounded-t-[0] relative -top-20 z-[60] md:static">
                    <div class="relative pl-5 pt-7 md:pt-1 md:pl-10">
                        <h1 class="font-semibold text-2xl md:text-3xl md:text-[26.11px] text-blue md:text-[#03063A]">Shiro</h1>
                        <div class="flex gap-1 items-center">
                            <img src="./assets/images/icons/location-pin.png" alt="" class="h-4">
                            <h2 class="text-xl md:text-sm text-[#70717B]">Tirana, Albania</h2>
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
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, ullam doloremque in voluptatem architecto a ab mollitia iusto corrupti eligendi nihil necessitatibus voluptates molestias ut blanditiis ipsum, pariatur ad facilis!</p>
                </div>
                <div class="flex justify-center gap-4 md:gap-8 pt-14">
                    <button class="gap-4 bg-blue text-white py-2 px-2 rounded-[16px] text-sm">Add to Matching</button>
                    <button class="gap-4 bg-blue text-white py-1 px-2 rounded-[16px] text-sm">Add to Adoption</button>
                    <button class="gap-4 bg-blue text-white py-1 px-2 rounded-[16px] text-sm" onclick="window.location.href='http://127.0.0.1:5500/forgetPassword.html';" >
                    Reset your password </button>
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
    fetchUsers().then(renderContent);
}