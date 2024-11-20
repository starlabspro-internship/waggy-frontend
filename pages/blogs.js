
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
      
      `;
    document.head.appendChild(customStyles);
    const userId = localStorage.getItem("userId");
    const userIdNumber = parseInt(userId, 10); 
    const token = localStorage.getItem('token');

    function initializeSplide() {
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
        interval: 2000,
        pagination: false,
        arrows: true,
        pauseOnHover: true,
        breakpoints: {
          640: {
            perPage: 1,
            grid: {
              rows: 2,
              cols: 1,
            },
          },
          768: {
            perPage: 1,
            grid: {
              rows: 2,
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


    }


    async function renderBlogsList() {
      content.innerHTML = `
        <div class="color blogs-list-container p-3 md:p-8">
          <div class="flex justify-center mb-10 mt-5 md:-mt-10 md:justify-start mb-10 md:mb-0 sm:-ml-10">
            <button id="create-blog-btn" class="p-4 mt-2 ml-2 py-2 rounded-2xl bg-color text-white hover:bg-blue-600 w-full md:w-[200px]">
              Publish a Blog
            </button>
          </div>
          <div id="splide" class="splide z-0 w-full p-2 mt-3  md:w-[500px] lg:w-[800px] mx-auto rounded-2xl overflow-hidden">
            <div class="splide__track">
              <ul class="splide__list grid gap-4 w-full"></ul> <!-- Apply grid here -->
            </div>
          </div>
        </div>
      `;
      
      const blogsList = document.querySelector(".splide__list");
      const createBlogBtn = document.querySelector("#create-blog-btn");
    
      // Fetch and display blogs
      await fetchBlogs(blogsList);
    
       createBlogBtn.addEventListener("click", renderCreateBlogForm);
    }
    
    async function fetchBlogs(blogsList) {
      try {
        const response = await fetch("http://localhost:3000/api/blogs/list", {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
        const blogs = await response.json();
        blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        blogsList.innerHTML = "";
        if (blogs.length === 0) {
          blogsList.innerHTML = `<p class="text-center text-gray-500">No blogs available yet. Be the first to publish!</p>`;
          return; // Skip initializing Splide if no blogs exist
        }
        blogs.forEach((blog) => {
          const blogItem = document.createElement("li");
          blogItem.classList.add("splide__slide", "p-1", "border", "bg-grey-100", "shadow-lg", "transition-transform", "transform", "hover:scale-105", "hover:shadow-2xl", "relative", "h-[260px]", "w-[90%]", "border", "cursor-pointer");
          blogItem.innerHTML = `
            <img src="http://localhost:3000${blog.articleImage}" alt="Blog Image" class="w-full h-[180px] mb-1 object-cover"/>
            <div class="flex justify-between items-start w-[90%] relative">
              <div class="flex flex-col justify-between">
                <div class="relative group">
                <h3 class="font-semibold text-lg text-black md:w-[180px] ml-1 md:line-clamp-2">
                  ${blog.title}
                </h3>
                <div
                  class="z-50 fixed left-3  bottom-10 w-[200px] max-w-[200px] p-2 bg-gray-500 text-white text-sm rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity text-xs"
                  style=" white-space: normal; word-wrap: break-word;"
                >
                  ${blog.title}
                </div>

              </div>
            </div>
          `;
          blogItem.addEventListener("click", () => displayBlogDetails(blog));
          blogsList.appendChild(blogItem);
        });
        initializeSplide();
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    }
    
    function displayBlogDetails(blog) {
      const fullName = (blog.author?.profile?.firstName && blog.author?.profile?.lastName) 
      ? blog.author.profile.firstName + " " + blog.author.profile.lastName 
      : blog.authorFullName || "Unknown Author"; // Fallback to "Unknown Author" if all else fails
  
    console.log(fullName);
      content.innerHTML = `

      <div class="p-6 w-full bg-sky-100 md:rounded-3xl mx-auto h-full">
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
      
        <!-- Image with Title Overlaid -->
        <div class="flex flex-col md:flex-row md:justify-between w-full mb-4  ">
          <!-- Title Over the Image -->
          <div class="flex flex-col justify-between mb-4 md:mb-0 w-full md:w-[45%]">
            <h2 class="w-[340px] text-black text-xl md:text-2xl lg:text-3xl font-bold  py-2 rounded-lg">
              ${blog.title} 
            </h2>
            <div class="flex flex-col justify-between items-start px-3">
              <!-- User Information -->
              <img class="w-10 h-10 md:w-12 md:h-12 rounded-full" src="../assets/images/Waggy.png" alt="User Profile Picture">
              <div class="flex  space-x-3">
                <p class="text-gray-500 text-sm md:text-base">By : ${fullName || blog.authorFullName} </p>
              </div>
              <!-- Date -->
             <div class="flex items-center">
              <img 
            src="../assets/images/icons/date-icon.png" 
            alt="Blog Image" 
            class="w-5 h-5"
          />
              <p class="text-gray-500 text-sm md:text-base"> ${new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p></div>
            </div>
          </div class="w-full md:w-[50%] lg:w-[60%]">
          <img 
            src=http://localhost:3000${blog.articleImage} 
            alt="Blog Image" 
            class="w-full max-w-[500px] h-[200px] md:h-[300px] lg:h-[300px] object-cover rounded-lg"
          />
        </div>
      
        <!-- User Info and Date Beneath the Image -->
      
        <!-- Blog Description -->
        <p class="text-gray-500 text-sm md:text-base leading-relaxed">
          <span class="font-semibold">${blog.description}   </span>
        </p>
      </div>
  
   
  </div>`
  
  
  ;
      
      const backToListBtn = document.getElementById("back-to-list-btn");
      backToListBtn.addEventListener("click", renderBlogsList);
      const deleteBtn = document.querySelector(".delete-btn");
      if (blog.userID === userIdNumber) {
        deleteBtn.classList.remove("hidden");
      } else {
        deleteBtn.classList.add("hidden");
      }
      deleteBtn.addEventListener("click", (event) => {
        const blogId = event.target.closest("button").dataset.blogId;
        console.log(blogId);
        deleteBlog(blogId);
      });

    }
    const deleteBlog = async (blogId) => {
        
      showToast("Are you sure you want to delete this Blog" , "warning" , 0 , async () => {
       try {
         const response = await fetch(
           `http://localhost:3000/api/blogs/remove/${blogId}`,
           {
             method: "DELETE",
             headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
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
           console.log('Deletet blog');
         } else {
           const result = await response.json();
           console.error("Error deleting pet:", result.error);
           alert("Failed to delete pet: " + result.error);
         }
       } catch (error) {
         console.error("Error deleting pet:", error);
         alert("Error deleting pet. Please try again later.");
       }
     })
     };
   
   
    window.addEventListener('myBlogClicked', (event) => {
      const { userID, blogId, title, description, articleImage, authorFullName, createdAt } = event.detail;
    console.log(authorFullName);
      displayBlogDetails({
        blogId,
        title,
        description,
        articleImage,
        authorFullName,
        createdAt,
        userID
      });

    });




    const renderCreateBlogForm = () => {
      content.innerHTML = `
          <div class="color blog-form-container p-4">
              <div class="flex flex-row justify-end items-end">
                  <button id="close-form-btn" class="mt-6 p-5 py-2 rounded-2xl text-white"><img class="w-[40px] rounded-full" src="../assets/images/icons/x-icon.jpg"></img></button>
              </div>
              <h1 id="heading" class="text-3xl font-bold mb-4 mt-2 text-gray-800">
                  Create a Blog
              </h1>
              <form id="blog-form" method="POST" enctype="multipart/form-data">
                  <div class="grid gap-5">
                   <fieldset class="relative border-[1px] border-sky-500 rounded-2xl">
        <legend class="text-sm text-gray-500 px-2 ml-2 lableName">
          Blog Title <span class="text-red-500 text-sm blog-title-error hidden">is required</span>
        </legend>
        <input
          id="blog-title"
          name="title"
          type="text"
          autocomplete="off"
          class="w-full px-3 pb-3 pt-1 rounded-2xl focus:outline-none "
          placeholder="Enter Title"
        />
      </fieldset>
                       <fieldset class="relative border-[1px] border-sky-500 rounded-2xl">
        <legend class="text-sm text-gray-500 px-2 ml-2 lableName">
          Description <span class="text-red-500 text-sm description-error hidden">is required</span>
        </legend>
        <textarea
          id="description"
          name="description"
          class="w-full px-3 pb-3 pt-1 rounded-2xl focus:outline-none  resize-none"
          rows="4"
          placeholder="Enter  Description"
        ></textarea>
      </fieldset>
                     
                      <div class="flex items-center -mb-3">
                          <label class="flex items-center justify-center bg-[#157aff] text-white px-4 py-2 mr-4 rounded cursor-pointer text-sm" style="border: 1px solid #157aff">
                            Choose File
                            <input type="file" class="hidden file" id="file-input" name="articleImage" accept="image/*"/>
                          </label>
                            <span class="text-red-500 text-xs ml-2 image-error hidden">Image is required</span>
                          <label class="ml-3 color text-sm file-label" for="file-input">Select Blog Image</label>
                          <img id="image-preview" class="w-10 h-10" src="" alt="Blog Image Preview" style="max-width: 100px; max-height: 100px; display: none; " />
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
        if (!input) return; // Prevents error if input is null
        const label = input.closest(".relative")?.querySelector(".lableName");
        if (!input.value.trim()) {
          error?.classList.remove("hidden");
          // input.style.border = "1px solid red";
          if (label) label.style.color = "#ef4444"; // Using Tailwind's red-500 color
        } else {
          error?.classList.add("hidden");
          if (label) label.style.color = "#6b7280"; 
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
            headers: {
             // Set the content type to JSON
              "Authorization": `Bearer ${token}`, // Include the Bearer token for authentication
            },
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
  
   
    renderBlogsList()
}
