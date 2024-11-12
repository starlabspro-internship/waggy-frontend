

export default function renderPageContent() {
  const content = document.getElementById("content");
  const customCssLink = document.createElement("link");
  document.head.appendChild(customCssLink);
  const customStyles = document.createElement("style");
  customStyles.rel = "stylesheet"
  customStyles.href = "../styles/blog.css"
  document.head.appendChild(customStyles)
  const splideStyle = document.createElement("link");
  splideStyle.rel = "stylesheet";
  splideStyle.href =
    "https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css";
  document.head.appendChild(splideStyle);
  const splideScript = document.createElement("script");
  splideScript.src =
    "https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js";
  document.head.appendChild(splideScript);
  customStyles.textContent = `
         
        .font-poppins {
  font-family: "Poppins", sans-serif;
}
.color {
  color: #70717b;
}
.bg-color {
  background: #157aff;
}
  .border {
  border: 1px solid #157aff;
  }
   #splide {
    display: grid;
   }
.splide__list {
  display: flex;
  justify-content: space-between;
  gap: 5px; /* Adjust the gap between slides */
  padding: 0;
  width: 100%;
}

.splide__slide {
  flex: 0 0 auto; 
  width: calc(33.3333% - 1rem); 
 
}

@media (max-width: 1024px) {
  .splide__slide {
    width: calc(50% - 1rem); /* Two items per page on smaller screens */
  }
}

@media (max-width: 640px) {
  .splide__slide {
    width: 100%; /* One item per page on very small screens */
  }
}
      
      `;

  // Function to render the blog list
  const renderBlogsList = () => {
    content.innerHTML = `
      <div class="color blogs-list-container p-6 md:p-8">
        <div class="flex justify-start items-end mb-6">
          <button id="create-blog-btn" class="p-4 py-2 rounded-2xl bg-color text-white hover:bg-blue-600 transition-all duration-200">
            Publish a Blog
          </button>  
        </div>
        
        <div id="splide" class="splide  w-full md:w-[800px] mt-[6rem] mx-auto rounded-2xl overflow-hidden">
          <div class="splide__track">
            <ul class="splide__list  flex justify-center gap-1  w-full"></ul>
          </div>
        </div>
      </div>
    `;
  
    const blogsList = document.querySelector(".splide__list");
    const createBlogBtn = document.querySelector("#create-blog-btn");
  
    // Fetch and display blogs
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blogs/list");
        const blogs = await response.json();
        blogsList.innerHTML = "";
        blogs.forEach((blog) => {
          const blogItem = document.createElement("div");
          blogItem.classList.add(
            "splide__slide",
            "p-4",
            "bg-sky-100",
            "rounded-2xl",
            "shadow-lg",
            "transition-transform",
            "transform",
            "hover:scale-105",
            "hover:shadow-2xl",
            "relative" ,
            "h-[380px]",
            "w-[90%]" ,
            "border"
          );
          blogItem.innerHTML = `
            <img src="http://localhost:3000${blog.articleImage}" alt="Blog Image" class="w-full h-[220px] mb-4 object-cover rounded-xl"/>
            <div class="flex justify-between items-start w-[90%]">
              <h3 class="font-bold text-xl text-[#157aff] w-[180px] ml-1">${blog.title}</h3>
              <img src="../assets/images/icons/diagonal-arrow.png" class="w-[20px] cursor-pointer fles justify-end"/>
              </div>
              <p class="truncate">${blog.description}</p>
          `;
          blogsList.appendChild(blogItem);
        });
        initializeSplide(); // Initialize Splide after loading blogs
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };
  
    const initializeSplide = () => {
      const splideElement = document.querySelector("#splide");
      if (splideElement && splideElement.splide) {
        splideElement.splide.destroy(); // Destroy previous instance if it exists
      }
      const splide = new Splide("#splide", {
        type: "slide",
        perPage: 3,
        splitter: 2,
        gap: "5px",
        autoplay: true,
        interval: 3000,
        pagination: false,
        arrows: true,
        pauseOnHover: true,
        breakpoints: {
          640: {
            perPage: 1,
          },
          768: {
            perPage: 2,
          },
          1024: {
            perPage: 4,
          },
        },
        easing: "ease-in-out",
        perMove: 1,
      });
      splide.mount(); // Mount the Splide instance
    };
  
    // Fetch blogs when the page loads
    
      fetchBlogs(); // Call fetchBlogs only after Splide is loaded
   
    createBlogBtn.addEventListener("click", redirectToCreateBlog);
};
  // Redirect to the Create Blog form
  const redirectToCreateBlog = () => {
    renderCreateBlogForm();
  };

  // Function to render the Create Blog form
  const renderCreateBlogForm = () => {
    content.innerHTML = `
        <div class="color blog-form-container">
            <div class="flex flex-row justify-end items-end">
                <button id="close-form-btn" class="mt-6 p-5 py-2 rounded-2xl bg-color text-white">X</button>
            </div>
            <h1 id="heading" class="text-3xl font-bold mb-4 mt-2 text-gray-800">
                Create a Blog
            </h1>
            <form id="blog-form" method="POST" enctype="multipart/form-data">
                <div class="grid gap-5">
                    <div class="relative w-full">
                        <label class="absolute -top-2 left-3 z-10 bg-white text-sm">Blog Title</label>
                        <input
                          id="blog-title"
                          name="title"
                          type="text"
                          class="w-full border-2 rounded-2xl p-3 -mb-1 z-0"
                        />
                        <span class="text-red-500 text-xs ml-2 blog-title-error hidden">Blog Title is required</span>
                    </div>
                    <div class="relative w-full">
                        <label class="absolute -top-2 left-3 z-10 bg-white text-sm">Article</label>
                        <textarea
                          id="description"
                          name="description"
                          class="w-full border-2 rounded-2xl p-3 -mb-3 z-0 resize-none"
                          rows="9"
                        ></textarea>
                        <span class="text-red-500 text-xs ml-2 description-error hidden">Article is required</span>
                    </div>
                    <div class="flex items-center -mb-3">
                        <label class="flex items-center justify-center bg-white text-red-500 px-4 py-2 mr-4 rounded cursor-pointer text-sm" style="border: 1px solid #157aff">
                          Choose File
                          <input type="file" class="hidden file" id="file-input" name="articleImage" accept="image/*"/>
                        </label>
                        <label class="ml-3 color text-sm file-label" for="file-input">Select Blog Image</label>
                        <img id="image-preview" src="" alt="Blog Image Preview" style="max-width: 100px; max-height: 100px; display: none; border-radius: 50%;" />
                    </div>
                    <span class="text-red-500 text-xs ml-2 -mt-2 file-error hidden">File is required</span>
                    <input type="hidden" id="blog-picture-src" name="blogPictureSrc" />
                    <div class="button-container mt-4">
                        <button type="submit" class="mt-0 w-full py-2 rounded-2xl submit-btn bg-color text-white">
                          <span class="text-xs">Save Blog</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
        `;

    const blogTitleInput = document.querySelector("#blog-title");
    const descriptionInput = document.querySelector("#description");
    const blogForm = document.querySelector("#blog-form");
    const blogTitleError = document.querySelector(".blog-title-error");
    const descriptionError = document.querySelector(".description-error");
    const fileInput = document.querySelector("#file-input");
    const fileLabel = document.querySelector(".file-label");
    const imagePreview = document.getElementById("image-preview");
    const closeFormBtn = document.querySelector("#close-form-btn");

    // Event listener for closing the form
    closeFormBtn.addEventListener("click", () => {
      renderBlogsList(); // Re-render the blog list when the form is closed
    });

    // File input change handler
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";
          fileLabel.classList.add("hidden");
        };
        reader.readAsDataURL(file);
      } else {
        imagePreview.style.display = "none";
      }
    });
    const displayError = (input, error) => {
      if (!input.value.trim()) {
        error.classList.remove("hidden");
        input.style.border = "1px solid red";
      } else {
        error.classList.add("hidden");
        input.style.border = "";
      }
    };
    // Validate inputs before submitting
    const validateInputs = (e) => {
      e.preventDefault();
      displayError(blogTitleInput, blogTitleError);
      displayError(descriptionInput, descriptionError);

      if (
        blogTitleInput.value.trim() &&
        descriptionInput.value.trim() &&
        fileInput.files.length > 0
      ) {
        createBlog();
      }
    };

    // Create blog request
    const createBlog = async () => {
      const blogData = new FormData();
      blogData.append("title", blogTitleInput.value);
      blogData.append("description", descriptionInput.value);
      blogData.append("articleImage", fileInput.files[0]);
      blogData.append("userID", 2);

      try {
        const response = await fetch("http://localhost:3000/api/blogs/new", {
          method: "POST",
          body: blogData,
        });
        const data = await response.json()
        if (response.ok) {
          alert("Blog was created successfully");
          resetForm();
          renderBlogsList();
          const blogCreatedEvent = new CustomEvent("blogCreated", {
            detail: {
              message: "A new blog has been created",
              data: data, // Pass the response data if needed
            },
            bubbles: true, // Enable event bubbling
          });
      window.dispatchEvent(blogCreatedEvent); }
      } catch (error) {
        alert("Error creating blog. Please try again later.");
      }
    };

    // Reset form after submission
    const resetForm = () => {
      blogTitleInput.value = "";
      descriptionInput.value = "";
      fileInput.value = "";
      imagePreview.style.display = "none";
      fileLabel.classList.remove("hidden");
    };
    blogForm.addEventListener("submit", validateInputs);
  };

  renderBlogsList(); // Initialize with the blog list
  document.addEventListener("DOMContentLoaded", renderPageContent)
}
