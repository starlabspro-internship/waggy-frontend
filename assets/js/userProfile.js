document.getElementById('saveBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    
    let isValid = true;
    
    // Reset previous error messages
    document.querySelectorAll('.error-text').forEach((error) => {
        error.classList.add('hidden');
    });
    
    // Validate Name
    const userName = document.getElementById('user-name');
    if (!userName.value.trim()) {
        document.querySelector('.user-name-error').classList.remove('hidden');
        isValid = false;
    }

    // Validate Last Name
    const userLastName = document.getElementById('user-lastname');
    if (!userLastName.value.trim()) {
        document.querySelector('.user-lastname-error').classList.remove('hidden');
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById('emailaddress');
    if (!email.value.trim()) {
        document.querySelector('.emailaddress-error').classList.remove('hidden');
        isValid = false;
    }

    // Validate Phone Number
    const phoneNumber = document.getElementById('phonenumber');
    if (!phoneNumber.value.trim()) {
        document.querySelector('.phonenumber-error').classList.remove('hidden');
        isValid = false;
    }

    // Validate Location
    const location = document.getElementById('location');
    if (!location.value.trim()) {
        document.querySelector('.location-error').classList.remove('hidden');
        isValid = false;
    }

    // Validate File Upload
    const fileInput = document.getElementById('file-input');
    if (!fileInput.files.length) {
        document.querySelector('.file-error').classList.remove('hidden');
        isValid = false;
    }

    // If all fields are valid, submit the form
    if (isValid) {
        // Submit your form or perform further actions
        document.getElementById('pet-form').submit();
    }
});



//  fetch request per proflin 
