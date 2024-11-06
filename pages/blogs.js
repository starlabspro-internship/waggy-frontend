// profile.js
export default function renderPageContent() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="p-4  rounded-lg">
            <h1 class="text-2xl font-bold mb-4">Blogs Page</h1>
            <button id="profile-content" class="bg-blue-500 text-red-500 px-4 py-2 rounded">Hey</button>
            <form id="profile-form" class="mt-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                
                <label for="email" class="block text-sm font-medium text-gray-700 mt-4">Email</label>
                <input type="email" id="email" name="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                
                <label for="profile-picture" class="block text-sm font-medium text-gray-700 mt-4">Profile Picture</label>
                <input type="file" id="profile-picture" name="profile-picture" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">Save</button>
            </form>
        </div>
    `;

    // Initialize event listeners or any additional functionality
    const profileContent = document.getElementById('profile-content');
    if (profileContent) {
        profileContent.addEventListener('click', function () {
            alert('Profile content clicked');
        });
    }

    // Form submission event
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(profileForm);
            try {
                const response = await fetch('https://api.example.com/profile', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                alert('Profile updated successfully!');
                console.log(result);
            } catch (error) {
                console.error('Error updating profile:', error);
                alert('Failed to update profile');
            }
        });
    }
}
