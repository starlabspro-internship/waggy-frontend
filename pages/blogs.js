
export default function renderPageContent() {
  const content = document.getElementById("content");
  const customCssLink = document.createElement("link");
  document.head.appendChild(customCssLink);
  const customStyles = document.createElement("style");
  customStyles.rel = "stylesheet";
  customStyles.href = "../styles/blog.css";
  document.head.appendChild(customStyles);
  const splideStyle = document.createElement("link");
  splideStyle.rel = "stylesheet";
  splideStyle.href =
    "https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css";
  document.head.appendChild(splideStyle);
  const splideScript = document.createElement("script");
  splideScript.src =
    "https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js";
  document.head.appendChild(splideScript);
  const gridStyle = document.createElement("script");
  gridStyle.src =
    "https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-grid@0.4.1/dist/js/splide-extension-grid.min.js";
  document.head.appendChild(gridStyle);
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

      
      `;
    document.head.appendChild(customStyles);
    const userId = localStorage.getItem("userId");
    const userIdNumber = parseInt(userId, 10);

  // Function to render the blog list
  const renderBlogsList = () => {
    content.innerHTML = `
      <div class="color blogs-list-container p-3  md:p-8">
       <div class="flex justify-center mb-10  mt-5 md:-mt-10  md:justify-start mb-10 md:mb-0 sm:-ml-10 ">
  <button id="create-blog-btn" class="p-4 py-2 rounded-2xl bg-color text-white hover:bg-blue-600 transition-all duration-200 w-full sm:w-auto">
    Publish a Blog
  </button>  
</div>
       <div id="splide" class="splide  z-0 w-full p-2 mt-5 md:w-[500px]  lg:w-[800px] mx-auto rounded-2xl overflow-hidden">
        <div class="splide__track ">
          <ul class = "splide__list grid gap-4 w-full"></ul> <!-- Apply grid here -->
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
        blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        blogsList.innerHTML = "";
        blogs.forEach((blog) => {
          const blogItem = document.createElement("li");
          blogItem.classList.add(
            "splide__slide",
            "p-1",
            "border",
            "bg-grey-100",
            "shadow-lg",
            "transition-transform",
            "transform",
            "hover:scale-105",
            "hover:shadow-2xl",
            "relative",
            "h-[260px]",
            "w-[90%]",
            "border",
            "cursor-pointer",
          );
          //src="http://localhost:3000${
          //  blog.articleImage
          // }
          blogItem.innerHTML = `
            <img src="http://localhost:3000${
              blog.articleImage
            }" alt="Blog Image" class="w-full h-[180px] mb-1 object-cover"/>
  <div class="flex justify-between items-start w-[90%] relative">
    <div class="flex flex-col justify-between">
     <div class="relative group">
  <h3 class="font-semibold text-lg text-black w-[180px] ml-1 line-clamp-2">
    ${blog.title}
  </h3>
  <div
    class="z-50 fixed left-3  bottom-10 w-[200px] max-w-[200px] p-2 bg-gray-500 text-white text-sm rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity text-xs"
    style=" white-space: normal; word-wrap: break-word;"
  >
    ${blog.title}
  </div>
    
  </div>
`;
          blogItem.addEventListener("click", () => {
            displayBlogDetails(blog);
          });
          blogsList.appendChild(blogItem);
        });
        initializeSplide();
        window.addEventListener("myBlogClicked", (event) => {
          const blogDetails = event.detail; // The blog object passed with the event
          console.log("Blog clicked:", blogDetails);
          displayBlogDetails(blogDetails);
        });
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
        grid: {
          rows: 2,
          cols: 1,
          gap: {
            row: "1rem",
            col: "1.5rem",
          },
        },
        gap: "10px",
        autoplay: true,
        interval: 3000,
        pagination: false,
        arrows: true,
        pauseOnHover: true,
        breakpoints: {
          640: {
            perPage: 1,
            grid: {
              rows: 3, // Adjust grid rows for small screens
              cols: 1, // Ensure only one column is used on small devices
            },
          },
          768: {
            perPage: 1,
            grid: {
              rows: 3,
              cols: 1,
            },
          },
          1024: {
            perPage: 3,
          },
        },
        easing: "ease-in-out",
        perMove: 1,
      });
      splide.mount(window.splide.Extensions); // Mount the Splide instance
    };
    const displayBlogDetails = (blog) => {
      content.innerHTML = `
   <div class="p-4 w-full bg-sky-100 rounded-3xl mx-auto">
  <div class="flex justify-between items-center mb-4">
    <!-- Back Button -->
    <button id="back-to-list-btn" class="p-2 rounded-lg bg-blue-500 text-white">
      <img src="../assets/images/icons/back-arrows.png" class="w-6 h-6 md:w-8 md:h-8">
    </button>
    <!-- Delete Button (hidden by default) -->
    <button data-blog-id=${blog.blogId}>
      <img class="delete-btn w-6 md:w-8 hidden" src="../assets/images/icons/delete.png" alt="Delete Icon">
    </button>
  </div>

  <!-- Blog Title -->
  <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">${blog.title}</h2>

  <!-- Blog Image -->
  <img src="http://localhost:3000${blog.articleImage}" alt="Blog Image" class="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover mb-4 rounded-lg"/>

  <!-- User Info and Date -->
  <div class="flex justify-between items-center mb-3">
    <!-- User Information -->
    <div class="flex items-center space-x-3">
      <img class="w-10 h-10 md:w-12 md:h-12 rounded-full" src="../assets/images/Waggy.png" alt="User Profile Picture">
      <p class="text-gray-500 text-sm md:text-base">Posted by ${blog.author.profile.firstName} ${blog.author.profile.lastName}</p>
    </div>
    <!-- Date -->
    <p class="text-gray-500 text-sm md:text-base">13 Nov 2024</p>
  </div>

  <!-- Blog Description -->
  <p class="text-gray-700 text-sm md:text-base leading-relaxed">
    <span class="font-semibold">Lorem Ipsum</span> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  </p>
</div>
  `;
      const deleteBtn = document.querySelector(".delete-btn");
      if (blog.userID === userIdNumber) {
        deleteBtn.classList.remove("hidden");
      } else {
        deleteBtn.classList.add("hidden");
      }
      deleteBtn.addEventListener("click", (event) => {
        const blogId = event.target.closest("button").dataset.blogId;
        // // const petId = event.target.getAttribute("data-blog-id")
        // console.log(petId);
        console.log(blogId);
        deleteBlog(blogId);
      });
      const backToListBtn = document.getElementById("back-to-list-btn");
      backToListBtn.addEventListener("click", renderBlogsList);
      const deleteBlog = async (blogId) => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/blogs/remove/${blogId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response.json());
          if (response.ok) {
            const blogDeleteEvent = new CustomEvent("blogDeleted", {
              bubbles: true,
            });
            window.dispatchEvent(blogDeleteEvent);
            showToast("Blog deleted succesfully" , 'success');
            renderBlogsList();

          } else {
            const result = await response.json();
            console.error("Error deleting pet:", result.error);
            alert("Failed to delete pet: " + result.error);
          }
        } catch (error) {
          console.error("Error deleting pet:", error);
          alert("Error deleting pet. Please try again later.");
        }
      };
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
                          <span class="text-red-500 text-xs ml-2 image-error hidden">Image is required</span>
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
    const fileError = document.querySelector('.image-error')
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
      displayError(fileInput, fileError);
      if (
        blogTitleInput.value.trim() &&
        descriptionInput.value.trim() &&
        fileInput.files.length > 0
      ) {
        createBlog();
      }
    };

    const createBlog = async () => {
      const blogData = new FormData();
      blogData.append(
        "title",
        blogTitleInput.value.at(0).toUpperCase() + blogTitleInput.value.slice(1)
      );
      blogData.append(
        "description",
        descriptionInput.value.at(0).toUpperCase() +
          descriptionInput.value.slice(1)
      );
      blogData.append("articleImage", fileInput.files[0]);
      blogData.append("userID", userIdNumber);

      try {
        const response = await fetch("http://localhost:3000/api/blogs/new", {
          method: "POST",
          body: blogData,
        });
        if (response.ok) {
          const blogCreatedEvent = new CustomEvent("blogCreated", {
            bubbles: true, // Enable event bubbling
          });
          window.dispatchEvent(blogCreatedEvent);
          console.log(blogCreatedEvent);
          resetForm();
          renderBlogsList();
          showToast("Blog created succesfully" , 'success');
        }
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
}
