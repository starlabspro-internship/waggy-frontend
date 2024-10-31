const input = document.getElementById('organization-name');
const error = document.getElementById('username-error');
const termsInput = document.getElementById('terms');
const termsError = document.getElementById('terms-error');

const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordError = document.getElementById('password-error');   
const confirmPasswordError = document.getElementById('confirm-password-error');  

const form = document.getElementById('register-form');


input.addEventListener('input', () => error.textContent = '');
emailInput.addEventListener('input', () => emailError.textContent = '');
passwordInput.addEventListener('input', () => passwordError.textContent = '');
confirmPasswordInput.addEventListener('input', () => confirmPasswordError.textContent = '');
termsInput.addEventListener('change', () => termsError.textContent = '');


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = input.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    
    error.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    
    if (username.length < 3 || username.length > 30) {
        error.textContent = 'Organization name must be between 3 and 30 characters.';
        return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        return;
    }

    
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.textContent = 'Password must be at least 8 characters long and include at least one number.';
        return;
    }

   
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        return;
    }


    if (!termsInput.checked) {
        termsError.textContent = 'You must accept the terms and conditions.';
        event.preventDefault(); 
        return;
    } else {
      termsInput.checked = false;
      termsError.textContent = '';
    }


 
    alert('All fields are valid! Form submitted successfully.');

   
    input.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
});


  //Toggle password
  function togglePassword(fieldId, iconId) {
    const passInput = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(iconId);
    const type = passInput.type === 'password' ? 'text' : 'password';
    passInput.type = type;

    
    if (type === 'password') {
        eyeIcon.classList.remove('bi-eye');
        eyeIcon.classList.add('bi-eye-slash');
    } else {
        eyeIcon.classList.remove('bi-eye-slash');
        eyeIcon.classList.add('bi-eye');
    }
}
