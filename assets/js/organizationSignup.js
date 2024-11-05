const organizationName = document.getElementById('organization-name');
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

organizationName.addEventListener('input', () => error.textContent = '');
emailInput.addEventListener('input', () => emailError.textContent = '');
passwordInput.addEventListener('input', () => passwordError.textContent = '');
confirmPasswordInput.addEventListener('input', () => confirmPasswordError.textContent = '');
termsInput.addEventListener('change', () => termsError.textContent = '');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const organization = organizationName.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Clear previous errors
    error.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    // Validation
    if (organization.length < 3 || organization.length > 30) {
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
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                organisationName: organization  // Changed to match backend spelling
            })
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            alert('Organization registered successfully!');
            // Clear form fields
            organizationName.value = '';
            emailInput.value = '';
            passwordInput.value = '';
            confirmPasswordInput.value = '';
            termsInput.checked = false;
         
            // Store tokens in localStorage
            console.log(data.userId);
            console.log(data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);

            // Redirect to organization dashboard
            window.location.href = '/blog.html';

        } else {
            // Display error message if registration fails
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration. Please try again.');
    }
});

// Toggle Password Visibility
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