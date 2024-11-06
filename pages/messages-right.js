export default function renderRightContent() {
    const rightContent = document.getElementById('right-content');
    rightContent.innerHTML = `
        <div class="p-4  rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Messages</h3>
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

    // onLoad function to be called after rendering content
    function onLoad() {
        console.log("Right content loaded successfully!");

        // Optional: Fetch friends or additional info on load
        fetch('https://api.example.com/friends')
            .then(response => response.json())
            .then(data => {
                const friendsList = document.getElementById('friends-list');
                friendsList.innerHTML = ''; // Clear existing list

                // Populate with new data
                data.forEach(friend => {
                    const friendItem = document.createElement('li');
                    friendItem.className = "flex items-center space-x-3 p-2 rounded-lg bg-gray-100 shadow";
                    friendItem.innerHTML = `
                        <img src="${friend.imageUrl || 'https://via.placeholder.com/40'}" alt="${friend.name}" class="w-10 h-10 rounded-full" />
                        <div>
                            <p class="text-md font-medium">${friend.name}</p>
                            <p class="text-sm text-gray-600">${friend.status}</p>
                        </div>
                    `;
                    friendsList.appendChild(friendItem);
                });
            })
            .catch(error => console.error("Error fetching friends:", error));
    }

    // Call the onLoad function immediately
    onLoad();
}
