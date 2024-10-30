document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("blogForm");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get form field values
        const title = document.getElementById("title").value.trim();
        const category = document.getElementById("category").value.trim();
        const article = document.getElementById("article").value.trim();
        const imageInput = document.querySelector('input[type="file"]');
        const imageFile = imageInput.files[0]; // Get the selected file

        // Clear previous error messages
        document.getElementById("titleError").classList.add("hidden");
        document.getElementById("categoryError").classList.add("hidden");
        document.getElementById("articleError").classList.add("hidden");
        const imageError = document.getElementById("imageError");
        if (imageError) {
            imageError.classList.add("hidden");
        }

        // Validation checks
        let valid = true;

        if (!title) {
            valid = false;
            document.getElementById("titleError").classList.remove("hidden");
        }

        if (!category) {
            valid = false;
            document.getElementById("categoryError").classList.remove("hidden");
        }

        if (!article) {
            valid = false;
            document.getElementById("articleError").classList.remove("hidden");
        }

        // Validate image upload
        if (!imageFile) {
            valid = false;
            if (!imageError) {
                const errorSpan = document.createElement('span');
                errorSpan.id = "imageError";
                errorSpan.className = "text-red-500 text-xs";
                errorSpan.textContent = "Article Image is required.";
                imageInput.parentNode.appendChild(errorSpan); // Append the error message below the file input
            } else {
                imageError.classList.remove("hidden");
            }
        }

        // Show alert if validation fails
        if (valid) {
            alert("Blog created successfully!"); // Placeholder for successful submission
            
            // Reset form fields
            form.reset();
            
            // Optionally, clear the image error message if you don't need it anymore
            if (imageError) {
                imageError.classList.add("hidden");
            }
        }
    });
});
