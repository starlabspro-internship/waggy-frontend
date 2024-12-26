export default function renderRightContent() {
    const rightContent = document.getElementById('right-content');
    let userId = localStorage.getItem("userId");

    rightContent.innerHTML = `
        <div class="p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Messages</h3>
            <ul id="friends-list" class="space-y-3">
                </ul>
        </div>
    `;

    function fetchAndRenderFriends() {
        fetch(`${BASE_URL}/api/users/list`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const friendsList = document.getElementById('friends-list');
                friendsList.innerHTML = '';

                if (data && Array.isArray(data)) {
                    let filteredData = data.filter((user) => +user.id !== +userId);

                    filteredData.forEach(friend => {
                        const friendItem = document.createElement('li');
                        friendItem.className = "flex items-center space-x-3 p-2 rounded-lg bg-gray-100 shadow cursor-pointer";

                        // Set the data-friend-id attribute!
                        friendItem.dataset.friendId = friend.id; // Or friend._id if your ID is stored as _id

                        friendItem.innerHTML = `
                            <img src=http://localhost:3000${friend?.profile?.profilePicture} 
                                 alt="${friend?.profile?.firstName || 'Unknown User'}" 
                                 class="w-10 h-10 rounded-full" />
                            <div>
                                <p class="text-md font-medium">${friend?.profile?.firstName || 'Unknown User'} ${friend?.profile?.lastName}</p>
                                <p class="text-sm text-gray-600">${friend.status || 'Offline'}</p>
                            </div>
                        `;
                        friendsList.appendChild(friendItem);
                    });

                    friendsList.addEventListener('click', (event) => {
                        const clickedElement = event.target.closest('li'); // Use closest to handle clicks on inner elements

                        if (clickedElement) {
                            const friendId = clickedElement.dataset.friendId;
                            const friendName = clickedElement.querySelector('.text-md').textContent.trim();
                            const friendProfilePicture = clickedElement.querySelector('img').src;
                    
                            // Emit custom event with friend data
                            const friendSelectedEvent = new CustomEvent('friendSelected', {
                                detail: {
                                    id: friendId,
                                    name: friendName,
                                    profilePicture: friendProfilePicture
                                }
                            });
                            document.dispatchEvent(friendSelectedEvent);
                            console.log(friendSelectedEvent);
                        }
                    });
                } else {
                    friendsList.innerHTML = `<p class="text-gray-500">No users found.</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching friends:", error);
                const friendsList = document.getElementById('friends-list');
                friendsList.innerHTML = `<p class="text-red-500">Error loading friends.</p>`;
            });
    }

    fetchAndRenderFriends();
}