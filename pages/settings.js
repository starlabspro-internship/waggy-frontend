export default function renderPageContent() {
    const content = document.querySelector('#content');
    const main = document.querySelector('#main-content');
    const customCssLink = document.createElement("link");
    document.head.appendChild(customCssLink);
    const customStyles = document.createElement("style");
    const customIconLink = document.createElement("link");
    customIconLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    customIconLink.rel = "stylesheet"
    document.head.appendChild(customIconLink);
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
     .blurred {
        filter: blur(2px);
        pointer-events: none; /* Prevent interaction with blurred content */
    }
    .modal {
        display: none; /* Initially hidden */
        position: fixed;
        inset: 0;
        z-index: 50; /* Ensure it's above all other content */
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        justify-content: center;
        align-items: center;
    }
    `;
    document.head.appendChild(customStyles);
   
    content.innerHTML = `
    <div  class="max-w-7xl mx-auto py-8 px-4">
        <!-- Most Visited Settings -->
        <section  class=" mainContent mb-12">
            <h2 class="text-2xl font-semibold mb-5">Settings</h2>
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
                <div id="setDarkMode" class= " p-6 bg-white rounded-lg shadow-md cursor-pointer">
                    <div class=" mb-4">
                        <div class="relative w-[90px] px-1 h-12 bg-gray-200 rounded-full flex items-center justify-between">
                           <img
                            id="light-icon"
                            class="absolute w-[40px] h-[40px] rounded-full left-1 transition-opacity ease-in duration-100 opacity-100"
                            src="./assets/images/icons/lightmode.png"
                            alt="Light Mode Icon"
                            />
                            <!-- Dark Mode Icon -->
                            <img
                            id="dark-icon"
                            class="absolute w-[40px] h-[40px] rounded-full right-1 transition-opacity ease-in duration-100 opacity-0 invisible"
                            src="./assets/images/icons/darkmode.png"
                            alt="Dark Mode Icon"
                            />
                        </div>
                    </div>
                    <h3 class="dark-mode-title text-lg font-semibold text-gray-800 mb-2">Dark Mode</h3>
                    <p class="dark-mode-text text-sm text-gray-600">Choose if you want to use dark mode.</p>
                </div>
            </div>
      
      
        <!-- Looking for something else? -->
      
           <div class="mt-[50px]">
             <h2 class="text-2xl font-semibold mb-6">Looking for something else?</h2>
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
           </div>
        </section>

          <div id="resetPasswordModal" class="modal">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
    <div class="flex justify-between items-start">
    <!-- Title -->
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Reset Your Password</h2>
    <!-- Close button -->
    <button id="closeModalButton" class="-py-5 rounded-2xl text-white">
        <img class="w-[40px] rounded-full" src="../assets/images/icons/x-icon.jpg" alt="Close">
    </button>
   </div>
      <form id="reset-password-form" class="grid gap-5">
    <fieldset class="relative border-[1px] border-sky-500 rounded-2xl">
        <legend class="text-sm text-gray-500 px-2 ml-2 labelName">
            Old Password <span class="text-red-500 text-sm old-password-error hidden">is required</span>
        </legend>
        <div class="relative">
            <input
                id="old-password"
                name="old-password"
                type="password"
                class="w-full px-3 pb-3 pt-1 text-sm rounded-2xl focus:outline-none"
                placeholder="Enter Old Password"
            />
               <span
                class="absolute right-3 top-[15px] transform -translate-y-1/2 text-sm text-gray-500 cursor-pointer"
              
            >
                <i
                  class="fas fa-eye-slash"
                    id="toggle-old-password"
                ></i>
            </span>
        </div>
    </fieldset>

    <fieldset class="relative border-[1px] border-sky-500 rounded-2xl">
        <legend class="text-sm text-gray-500 px-2 ml-2 labelName">
            New Password <span class="text-red-500 text-sm new-password-error hidden">is required</span>
        </legend>
        <div class="relative">
            <input
                id="new-password"
                name="new-password"
                type="password"
                class="w-full px-3 text-sm pb-3 pt-1 rounded-2xl focus:outline-none"
                placeholder="Enter New Password"
            />
            <span
                class="absolute right-3 top-[15px] transform -translate-y-1/2 text-sm text-gray-500 cursor-pointer"
                
            >
              <i
                  class="fas fa-eye-slash"
                  id="toggle-new-password"
                ></i>
            </span>
            
        </div>
    </fieldset>

    <fieldset class="relative border-[1px] border-sky-500 rounded-2xl">
        <legend class="text-sm text-gray-500 px-2 ml-2 labelName">
            Confirm Password <span class="text-red-500 text-sm confirm-password-error hidden">is required</span>
        </legend>
        <div class="relative">
            <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                class="w-full text-sm px-3 pb-3 pt-1 rounded-2xl focus:outline-none"
                placeholder="Confirm Password"
            />
            <span
                class="absolute right-3 top-[15px] transform -translate-y-1/2 text-sm text-gray-500 cursor-pointer"
                
            >
                  <i
                  class="fas fa-eye-slash"
                 id="toggle-confirm-password"
                ></i>
            </span>
        </div>
    </fieldset>

    <span class="match-error hidden ml-1 text-red-500 text-xs -mt-3">Confirm Password must match the New Password</span>

    <button id="submitPasswordChange" type="submit" class="w-full bg-color text-white py-2 rounded-xl mt-4">
        Reset Password
    </button>
</form>


        
    </div>
</div>
    </div>
    `;

    const resetPasswordCard = document.getElementById('resetPasswordCard');
    const resetPasswordModal = document.getElementById('resetPasswordModal');
    const closeModalButton = document.getElementById('closeModalButton');
    const mainContent = document.querySelector('.mainContent');
    const resetPasswordForm = document.getElementById('reset-password-form')
    const oldPasswordInput = document.getElementById('old-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const oldPasswordError = document.querySelector('.old-password-error')
    const newPasswordError = document.querySelector('.new-password-error')
    const confirmPasswordError = document.querySelector('.confirm-password-error')
    const matchError = document.querySelector('.match-error')
    const toggleOldPassword = document.getElementById('toggle-old-password');
    const toggleNewPassword = document.getElementById('toggle-new-password');
    const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
    const darkMode = document.querySelector('#setDarkMode')
    const darkModeTitle = document.querySelector('.dark-mode-title')
    const darkModeText = document.querySelector('.dark-mode-text')
    const darkIcon = document.querySelector('#dark-icon')
    const lightIcon = document.querySelector('#light-icon')


    const togglePasswordVisibility = (inputElement , toggleElement) => {
        if (inputElement.type === 'password') {
            inputElement.type = 'text';
            toggleElement.classList.remove('fa-eye-slash')
            toggleElement.classList.add('fa-eye')
        } else {
            inputElement.type = 'password';
            toggleElement.classList.remove('fa-eye')
            toggleElement.classList.add('fa-eye-slash')
        } }
    toggleOldPassword.addEventListener('click', () => togglePasswordVisibility(oldPasswordInput , toggleOldPassword));
    toggleNewPassword.addEventListener('click', () => togglePasswordVisibility(newPasswordInput , toggleNewPassword));
    toggleConfirmPassword.addEventListener('click', () => togglePasswordVisibility(confirmPasswordInput , toggleConfirmPassword));

    resetPasswordCard.addEventListener('click', () => {
        // Show modal and blur the main content
        resetPasswordModal.style.display = 'flex';
        mainContent.classList.add('blurred');
    });

    closeModalButton.addEventListener('click', () => {
        // Hide modal and remove blur from main content
        resetPasswordModal.style.display = 'none';
        mainContent.classList.remove('blurred');
    });
    const displayError = (input, error) => {
        if (!input) return; // Prevents error if input is null
        const fieldset = input.closest("fieldset");
        const label = fieldset ? fieldset.querySelector(".labelName") : null;
        console.log(fieldset);
        if (!input.value.trim()) {
          error?.classList.remove("hidden");
          // input.style.border = "1px solid red";
          if (label) label.style.color = "#ef4444"; // Using Tailwind's red-500 color
        } else {
          error?.classList.add("hidden");
          if (label) label.style.color = "#6b7280"; 
        }
      };
      // Validate inputs before submitting
      const validateInputs = (e) => {
        e.preventDefault();
       
        displayError(oldPasswordInput, oldPasswordError);
        displayError(newPasswordInput, newPasswordError);
        displayError(confirmPasswordInput, confirmPasswordError);
        if (
          oldPasswordInput.value.trim() &&
          newPasswordInput.value.trim() &&
          confirmPasswordInput.value.trim()
        ) {
        
          handleChangePassword();
        }
      };
    
    const handleChangePassword = async () => {
        
        const token = localStorage.getItem('token')
        const oldPassword = oldPasswordInput.value
        const newPassword = newPasswordInput.value
        const confirmPassword = confirmPasswordInput.value
        if (newPassword !== confirmPassword) {
           matchError.classList.remove('hidden');
           return
        } 
        const payload = {
            oldPassword,
            newPassword,
        };
    
        try {
            const response = await fetch("http://localhost:3000/api/password/change", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Add Authorization header
                },
                body: JSON.stringify(payload),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                resetForm()
                showToast("Password was changed successfully" , 'success');
                 resetPasswordModal.style.display = 'none'
                 matchError.classList.add('hidden')
            } else {
                showToast("Password failed to reset" , 'error')
            }
        } catch (error) {
            console.error('Error:', error);
              showToast("There was an error processing your request" , 'error')
        }
    }
    const handleDarkMode = () => {
        const isDarkMode = document.body.classList.toggle('dark-mode'); // Toggle the class on the body
        if (isDarkMode) {
            // Show Dark Mode Icon
            darkIcon.style.opacity = "1";
            darkIcon.style.visibility = "visible";
            lightIcon.style.opacity = "0";
            lightIcon.style.visibility = "hidden";
            darkModeText.innerHTML = "You are now on dark mode"
            darkModeTitle.innerHTML = "Dark Mode"
          } else {
            // Show Light Mode Icon
            darkIcon.style.opacity = "0";
            darkIcon.style.visibility = "hidden";
            lightIcon.style.opacity = "1";
            lightIcon.style.visibility = "visible";
            darkModeText.innerHTML = "You are now on light mode"
            darkModeTitle.innerHTML = "Light Mode"
          }
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled'); // Save preference
        
    };
    // Load the user's preference on page load
    document.addEventListener('DOMContentLoaded', () => {
        const darkModePreference = localStorage.getItem('darkMode');
        console.log("It is working");
        if (darkModePreference === 'enabled') {
            document.body.classList.add('dark-mode');
          
        }
    });
    const resetForm = () => {
        oldPasswordInput.value = "";
        newPasswordInput.value = "";
        confirmPasswordInput.value = "";
        mainContent.classList.remove('blurred')
        togglePasswordVisibility(oldPasswordInput , toggleOldPassword)
        togglePasswordVisibility(newPasswordInput , toggleNewPassword)
        togglePasswordVisibility(confirmPasswordInput , toggleConfirmPassword)
    };
    resetPasswordForm.addEventListener('submit' , validateInputs)
    darkMode.addEventListener('click' , handleDarkMode)
}
