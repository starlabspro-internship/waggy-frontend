// setNewPassword.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newPasswordForm');
  const newPasswordInput = document.getElementById('newPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      alert('Invalid password reset link.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/password/reset/${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        window.location.href = '/login.html';
      } else {
        alert(result.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to reset password.');
    }
  });
});
