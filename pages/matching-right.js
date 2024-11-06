export default function renderRightContent() {
    const rightContent = document.getElementById('right-content');
    rightContent.innerHTML = `
        <div class="p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Matching</h3>
            <ul id="friends-list" class="space-y-3">
                <li class="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 shadow">
                    <img src="https://via.placeholder.com/40" alt="Friend 1" class="w-10 h-10 rounded-full" />
                    <div>
                        <p class="text-md font-medium">Friend 1</p>
                        <p class="text-sm text-gray-600">Online</p>
                    </div>
                </li>
                <li class="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 shadow">
                    <img src="https://via.placeholder.com/40" alt="Friend 2" class="w-10 h-10 rounded-full" />
                    <div>
                        <p class="text-md font-medium">Friend 2</p>
                        <p class="text-sm text-gray-600">Offline</p>
                    </div>
                </li>
                <li class="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 shadow">
                    <img src="https://via.placeholder.com/40" alt="Friend 3" class="w-10 h-10 rounded-full" />
                    <div>
                        <p class="text-md font-medium">Friend 3</p>
                        <p class="text-sm text-gray-600">Busy</p>
                    </div>
                </li>
            </ul>
        </div>
    `;

    // Fetch additional info button
    const fetchInfoButton = document.getElementById('fetch-info');
    if (fetchInfoButton) {
        fetchInfoButton.addEventListener('click', async function () {
            try {
                const response = await fetch('https://api.example.com/info');
                const data = await response.json();
                alert('Info fetched successfully!');
                console.log(data);
            } catch (error) {
                console.error('Error fetching info:', error);
                alert('Failed to fetch info');
            }
        });
    }
}
