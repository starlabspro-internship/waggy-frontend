document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("blogForm");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const title = document.getElementById("title").value.trim();
        const category = document.getElementById("category").value.trim();
        const article = document.getElementById("article").value.trim();
        const imageInput = document.querySelector('input[type="file"]');
        const imageFile = imageInput.files[0]; 

        document.getElementById("titleError").classList.add("hidden");
        document.getElementById("categoryError").classList.add("hidden");
        document.getElementById("articleError").classList.add("hidden");
        const imageError = document.getElementById("imageError");
        if (imageError) {
            imageError.classList.add("hidden");
        }

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

        if (!imageFile) {
            valid = false;
            if (!imageError) {
                const errorSpan = document.createElement('span');
                errorSpan.id = "imageError";
                errorSpan.className = "text-red-500 text-xs";
                errorSpan.textContent = "Article Image is required.";
                imageInput.parentNode.appendChild(errorSpan);
            } else {
                imageError.classList.remove("hidden");
            }
        }

        if (valid) {
            alert("Blog created successfully!"); 
            
            form.reset();
            
            if (imageError) {
                imageError.classList.add("hidden");
            }
        }
    });
});
