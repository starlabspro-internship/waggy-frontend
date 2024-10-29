// Toggle Password Visibility
function togglePassword() {
    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");
    if (password.type === "password") {
        password.type = "text";
        eyeIcon.setAttribute("fill", "#4A5568");
    } else {
        password.type = "password";
        eyeIcon.setAttribute("fill", "currentColor");
    }
}

// Form Validation
// function validateForm(event) {
//     event.preventDefault();
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     if (!email || !password) {
//         alert("Please fill out both fields.");
//     } else {
//         alert("Logged in successfully!");
//     }
// }
