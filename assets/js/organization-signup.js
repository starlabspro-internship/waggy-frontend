// Toggle Password Visibility
function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}

// Form Validation
document.getElementById('orgSignupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Add your validation logic here
    alert('Form submitted successfully!');
});
