

export default function renderPageContent() {
    const content = document.getElementById('content');
    const customCssLink = document.createElement("link");
    customCssLink.rel = "stylesheet";
    customCssLink.href = "../styles/messages.css";
    document.head.appendChild(customCssLink)
    let userId = localStorage.getItem("userId");
    const token = localStorage.getItem('token');
   
   
    let socket;
    let friendData = null
    const img = "../assets/images/dog2.jpg"
    content.innerHTML = `
        <div class="p-4 rounded-lg  h-[85vh] flex flex-col">
            <!-- Chat Header -->
            <div class="flex justify-between items-center bg-blue-500 text-black p-4 rounded-t-lg">
                <div class="flex items-center">
                    <img src=${img} class="profile-img w-10 h-10 rounded-full mr-3">  <h2 class="chat-header font-bold text-lg">Chat with John</h2>
                    <hr>
                </div>
            </div>
           <div id="message-container" class="flex-grow sm:p-4 overflow-y-auto space-y-4 mb-9 custom-scrollbar">
            <!-- Chat Messages Container (scrollable) -->
           
            </div>

            <!-- Message Input Box (fixed at the bottom) -->
            <div class="fixed bottom-0 left-1 right-1 bg-gray-200 p-1 rounded-3xl flex items-center  mt-[12px]">
                <textarea id="textarea" placeholder="Type a message..." 
                        class="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-tl-3xl  rounded-bl-3xl -mr-10 z-1 resize-none overflow-hidden pr-9 pl-3 py-2"
                        rows="1"></textarea>
                <button id="button" class="bg-[#002147] text-white px-3 py-3 hover:bg-blue-600 rounded-full mr-2">
                    <img src="../assets/images/icons/sendicon.png" class="w-4">
                </button>
            </div>
        </div>
    `;
    const messageContainer = document.querySelector('#message-container')
    const messageInput = document.querySelector('#textarea')
    const sendButton = document.querySelector('#button')
    const chatHeader = document.querySelector('.chat-header')
    const profileImg = document.querySelector('.profile-img')
    document.addEventListener('friendSelected', (event) => {
        const { id, name , profilePicture } = event.detail;
        friendData = { id, name, profilePicture };
        chatHeader.textContent = `${name}`;
        profileImg.src = profilePicture
        messageContainer.innerHTML = ""
        
        if (socket) socket.close();
        socket = new WebSocket(`ws://localhost:8080/chat/${userId}`);

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };
        
        //Listen for messages
        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                console.log('Received message:', message);
                console.log(message.receiverUserID);
                console.log(message.senderUserID);
                console.log(userId);
                console.log(friendData.id);
                // ***THIS IS THE KEY CHANGE: FILTER MESSAGES***
                if ((message.senderUserID === userId && message.receiverUserID === friendData.id) ||
                (message.receiverUserID === userId && message.senderUserID === friendData.id)) {
                displayMessage(message);
            } else{
                    console.log("message is not for you")
                }
            } catch (error) {
                console.error("Error parsing message:", error);
            }
        };
        

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        getConversation()
        function sendMessage() {
            const messageText = messageInput.value.trim();
            if (messageText !== '') {
                const message = {
                    senderUserID: localStorage.getItem("userId"),
                    receiverUserID: friendData.id,
                    content: messageText, 
                    chatRoomId: userId + friendData.id,
                    sentAt: new Date().toISOString(),
                };
                console.log('message' , message , typeof message.chatRoomId);
                // Send through WebSocket for real-time
                socket.send(JSON.stringify(message));
                displayMessage(message); // Display the message immediately after sending
                messageInput.value = '';
               // Save to database via POST request
                fetch(`${BASE_URL}/api/messages/send`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your auth token
                    },
                    body: JSON.stringify(message)
                })
                .then(response => response.json())
                .catch(error => console.error('Error saving message:', error));
        
                
            }
        }
        sendButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                sendMessage();
            }
        });
    });
 
    function displayMessage(message) {
        const messageContainer = document.querySelector('#message-container');
        const messageElement = document.createElement('div');
        const isSender = +message.senderUserID === +userId
        console.log(typeof +message.senderUserID);
        console.log(typeof userId);
        console.log(isSender);
        messageElement.classList.add(
            'flex',
           isSender ? 'justify-end' : 'justify-start',
            'gap-1' , 'mt-10'
        );
    
        const formattedSentAt = formatSentAt(message.sentAt);
    
        const messageContent = `
    ${!isSender ?  
        `<img src=${friendData ? friendData.profilePicture : '../assets/images/dog2.jpg'} class="w-10 h-10 rounded-full object-cover">` : ''}
    <div class="flex flex-col ">
    
    
        <div class="bg-${isSender? 'blue' : 'gray-300'} text-${isSender? 'white ml-[100px]' : 'black mr-[100px]'} px-3 py-1 rounded-xl break-words max-w-[250px] sm:max-w-[500px] md:max-w-[550px]">
            ${message.content}
        </div>
    
    
    <div class="flex ${isSender? 'justify-end' : 'justify-start'}">
        <span class="text-gray-500 text-xs "> ${formattedSentAt}</span>
    </div>
    </div>
`;

    
        messageElement.innerHTML = messageContent;
        messageContainer.appendChild(messageElement);
        setTimeout(() => {
            messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to the latest message
        }, 0); // 0ms delay  // Scroll to the latest message
    }
    
    function formatSentAt(sentAt) {
        const sentDate = new Date(sentAt);
        const now = new Date();
        const diffInSeconds = Math.floor((now - sentDate) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
    
        if (diffInSeconds < 60) {
            return 'Just now'; // Less than a minute ago
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`; // Less than 1 hour ago
        } else if (diffInHours < 6) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`; // Less than 6 hours ago
        } else {
            return sentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // More than 6 hours ago, show HH:MM
        }
    }
    function getConversation() {
        if (!friendData) {
            console.log("No friend selected yet.");
            return;
        }
        console.log(friendData);
        // Create the two possible chatRoomIds (12 or 21)
        const chatRoomId1 = userId + friendData.id;
        const chatRoomId2 = friendData.id + userId;
        
        // Fetch messages for both chatRoomIds
        Promise.all([
            fetchMessages(chatRoomId2),
            fetchMessages(chatRoomId1),
        ])
        .then(([messages1, messages2]) => {
            // Combine both message arrays
            const allMessages = [...messages1, ...messages2];
    
            // Sort all messages by timestamp (if needed)
            allMessages.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));
    
            // Display all messages
            allMessages.forEach(message => {
                displayMessage(message);
            });
        })
        .catch(error => {
            console.error('Error fetching conversations:', error);
        });
    }
    
    function fetchMessages(chatRoomId) {
        return fetch(`${BASE_URL}/api/messages/view/${chatRoomId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(messages => {
            console.log('All mesages from' , userId ,messages);
            return messages;
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
            return [];
        });
    }
    
}
    
    

