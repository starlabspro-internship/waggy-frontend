// forgotPassword.js

async function handlePasswordReset(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  try {
    // Call the forgot password API
    const response = await fetch('http://localhost:3000/api/password/forgot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    alert('An error occurred while processing your request.');
    console.error('Forgot password error:', error);
  }
}

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

document
  .getElementById('forgotPasswordForm')
  .addEventListener('submit', handlePasswordReset);
