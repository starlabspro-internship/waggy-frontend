export default function renderRightContent() {
    const rightContent = document.getElementById("right-content");

    // Initialize the right content area
    rightContent.innerHTML = `
        <div class="p-1 rounded-lg">
            <div class="pet-list-container space-y-2">
                <p class="text-gray-400 ml-3 text-sm" id="no-requests-message" style="color: #157aff">
                    No pet requests
                </p>
            </div>
        </div>
    `;

    const petListContainer = document.querySelector(".pet-list-container");
    const noRequestsMessage = document.getElementById("no-requests-message");

    // Fetch requests from the API
    const fetchRequests = async (endpoint, title, type) => {
        let token = localStorage.getItem('token');

        if (!token) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/match-request/${endpoint}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const { data: fetchedRequests } = await response.json();


            // Hide no requests message if there are requests
            if (fetchedRequests.length > 0) {
                noRequestsMessage.style.display = 'none';
            }
            // Use map to display response data
            const requestItems = fetchedRequests.map(request => {
                // Define status colors
                const statusColors = {
                    'Pending': 'text-yellow-600',
                    'Accepted': 'text-green-600',
                    'Declined': 'text-red-600'
                };

                let idToPass;
                let sessionStorageName;
                if (type === 'sent') {
                    idToPass = request.receiverPetId;
                    sessionStorageName = "petToMatchId"
                } else if (type === 'received') {
                    idToPass = request.id; // Ensure this variable is correctly set
                    sessionStorageName = "senderPetId"
                } else if (type === 'accepted') {
                    idToPass = request.id;
                    sessionStorageName = "matchAcceptedId"
                }

                const requestItem = document.createElement('div');
                requestItem.className = 'request-item mb-2 bg-white shadow-sm rounded-lg p-3';
                requestItem.innerHTML = `
                    <div class="flex items-center space-x-2 w-full cursor-pointer" onclick="navigateToMatchAction(${idToPass}, '${type}', '${sessionStorageName}')">
                        <div class="flex-1">
                            <p class="font-bold text-blue">${title}</p>
                            <p class="text-sm text-thin text-gray-400">${request.senderPet.name} with ${request.receiverPet.name}</p>
                            <p class="text-sm text-thin ${statusColors[request.status] || 'text-gray-500'}">
                            ${request.status}
                            </p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                `;
                return requestItem;
            });

            // Append all request items to the container
            requestItems.forEach(item => petListContainer.appendChild(item));

        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    window.navigateToMatchAction = (id, type, sessionStorageName) => {
        sessionStorage.setItem(sessionStorageName, id);
        let route = '';

        // Determine the route based on the type of request
        if (type === 'sent') {
            route = '#match-info';
        } else if (type === 'received') {
            route = '#match-action';
        } else if (type === 'accepted') {
            route = '#match-profile';
        }

        window.location.href = route;
    };

    // Fetch all types of requests
    fetchRequests("list-sender", "Request I Have Sent:", "sent");
    fetchRequests("list-received", "Invitation:", "received");
    fetchRequests("list-accepted", "Match:", "accepted");
}
