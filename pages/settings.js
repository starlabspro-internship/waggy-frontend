export default function renderPageContent() {
    const content = document.querySelector('#content');
    const customCssLink = document.createElement("link");
    document.head.appendChild(customCssLink);
    const customStyles = document.createElement("style");
    customStyles.textContent = `
    .font-poppins {
        font-family: "Poppins", sans-serif;
    }
    .color {
        color: #70717b;
    }
    .bg-color {
        background: #157aff;
    }
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    `;
    document.head.appendChild(customStyles);
   
    content.innerHTML = `
    <div class="max-w-7xl mx-auto py-8 px-4">
        <!-- Most Visited Settings -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">Settings</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Reset your password -->
                <div id="resetPasswordCard" class="p-6 bg-white rounded-lg shadow-md cursor-pointer">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <img src="./assets/images/icons/resetPassword.png" alt="Reset Password">
                        </div>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Password Reset</h3>
                    <p class="text-sm text-gray-600">Reset your password.</p>
                </div>
                <!-- Activity Log -->
                <div class="p-6 bg-white rounded-lg shadow-md cursor-pointer">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <img src="./assets/images/icons/activity.png" alt="Activity Log Icon">
                        </div>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Activity Log</h3>
                    <p class="text-sm text-gray-600">View and manage your activity on the platform.</p>
                </div>
                <!-- Dark Mode -->
                <div class="p-6 bg-white rounded-lg shadow-md cursor-pointer">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <img src="./assets/images/icons/darkmode.png" alt="Dark Mode Icon">
                        </div>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Dark Mode</h3>
                    <p class="text-sm text-gray-600">Choose if you want to use dark mode.</p>
                </div>
            </div>
        </section>
        <div id="resetPasswordModal" class="fixed inset-0 bg-color bg-opacity-50  justify-center items-center hidden">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Reset Your Password</h2>
            <form id="reset-password-form">
                <label for="new-password" class="block text-sm text-gray-700">New Password:</label>
                <input type="password" id="new-password" class="w-full p-2 border rounded mb-4" required />

                <label for="confirm-password" class="block text-sm text-gray-700">Confirm Password:</label>
                <input type="password" id="confirm-password" class="w-full p-2 border rounded mb-4" required />

                <button type="submit" class="w-full bg-color text-white py-2 rounded-lg">Reset Password</button>
            </form>
            <button id="closeModalButton" class="mt-4 text-blue-500">Close</button>
        </div>
    </div>
        <!-- Looking for something else? -->
        <section>
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">Looking for something else?</h2>
            <div class="space-y-4">
                <!-- Privacy Centre -->
                <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md cursor-pointer">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <img src="./assets/images/icons/privacy.png" alt="Privacy Icon">
                        </div>
                        <div class="ml-4">
                            <h3 class="text-lg font-semibold text-gray-800">Privacy Centre</h3>
                            <p class="text-sm text-gray-600">Learn how to manage and control your privacy across products.</p>
                        </div>
                    </div>
                    <span class="text-custom-blue font-semibold text-lg">→</span>
                </div>
                <!-- Help Centre -->
                <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md cursor-pointer">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <img src="./assets/images/icons/helpcentre.png" alt="Help Icon">
                        </div>
                        <div class="ml-4">
                            <h3 class="text-lg font-semibold text-gray-800">Help Centre</h3>
                            <p class="text-sm text-gray-600">Learn more about our updated settings experience.</p>
                        </div>
                    </div>
                    <span class="text-custom-blue font-semibold text-lg">→</span>
                </div>
            </div>
        </section>
    </div>
    `;

    document.getElementById('resetPasswordCard').addEventListener('click', () => {
        const modal = document.getElementById('resetPasswordModal');
        modal.classList.remove('hidden'); // Show the modal by removing the 'hidden' class
    });
    
    // Close the modal when the close button is clicked
    document.getElementById('closeModalButton').addEventListener('click', () => {
        const modal = document.getElementById('resetPasswordModal');
        modal.classList.add('hidden'); // Hide the modal by adding the 'hidden' class
    });

    document.getElementById('reset-password-form').addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent form refresh
    
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
    
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        // Make the request to reset the password (assumes token is available)
        let token = localStorage.getItem("token");; // Replace with the actual token from the URL or state
        if (!token) {
            alert('No token found. Please request a password reset.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/password/reset/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({ password: newPassword }),
            });
    
            if (response.ok) {
                alert('Password reset successfully!');
                // Close the modal and redirect to login page
                document.getElementById('resetPasswordModal').classList.add('hidden');
                window.location.href = '/login.html';
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('An error occurred while resetting your password. Please try again later.');
        }
    });
}
