
const firstnameInput = document.getElementById('firstname');
const firstnameError = document.getElementById('firstname-error');

const lastnameInput = document.getElementById('lastname');
const lastnameError = document.getElementById('lastname-error');

const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');

const form = document.getElementById('register-form');

const termsInput = document.getElementById('terms');
const termsError = document.getElementById('terms-error');


firstnameInput.addEventListener('input', () => firstnameError.textContent = '');
lastnameInput.addEventListener('input', () => lastnameError.textContent = '');
emailInput.addEventListener('input', () => emailError.textContent = '');
passwordInput.addEventListener('input', () => passwordError.textContent = '');
confirmPasswordInput.addEventListener('input', () => confirmPasswordError.textContent = '');
termsInput.addEventListener('change', () => termsError.textContent = '');


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

  
    firstnameError.textContent = '';
    lastnameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

   
    if (firstname.length < 3 || firstname.length > 15) {
        firstnameError.textContent = 'Name must be between 3 and 15 characters.';
        return;
    }

    if (lastname.length < 3 || lastname.length > 15) {
        lastnameError.textContent = 'Lastname must be between 3 and 15 characters.';
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
       
        return;
    } else {
      termsInput.checked = false;
      termsError.textContent = '';
    }

  
    alert('All fields are valid! Form submitted successfully.');

   
    firstnameInput.value = '';
    lastnameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
});

//Toggle Password
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
