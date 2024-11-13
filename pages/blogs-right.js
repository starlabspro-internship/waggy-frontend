export default function renderRightContent() {
    const searchInput = document.querySelector("#search-bar");
    const rightContent = document.getElementById('right-content');
    const customStyles = document.createElement("style");
    customStyles.rel = "stylesheet";
    customStyles.textContent = `
         .truncate-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;   /* Set the number of lines you want */
  overflow: hidden;        /* Hide the text overflow */
  text-overflow: ellipsis; /* Add ellipsis when overflowing */
}

  
}`
    rightContent.innerHTML = `
         <div class=" rounded-lg">
          <hr />
          <div class= "blog-list-container  h-[180px] cursor-pointer">
            <p class="text-gray-400 text-sm" style="color: #157aff">
              No blog listed
            </p>
          </div>
      </div>
    `;

    const blogListContainer = document.querySelector(".blog-list-container");
  
    // Declare pets array globally
    window.blogs = [];
  
    // Fetch blogs from the API
    const userId = localStorage.getItem("userId");
    const userIdNumber = parseInt(userId, 10);
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blogs/list");
        const fetchedBlogs = await response.json();
        
        if (response.ok) {
          window.blogs = fetchedBlogs.filter((fetchedBlog) => fetchedBlog.userID === userIdNumber); 
          window.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          displayBlogs(window.blogs);
        } else {
          console.log("Failed to fetch blogs:", fetchedBlogs.message);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    
  document.addEventListener('blogCreated' , fetchBlogs)
    const displayBlogs = (blogsToDisplay) => {
        if (blogsToDisplay.length === 0) {
          blogListContainer.innerHTML =
            '<p class="text-gray-400 ml-3 text-xs" style="color: #157aff">No Blogs Listed</p>';
          return;
        }
    
        blogListContainer.innerHTML = ""; // Clear the container
    
        blogsToDisplay.forEach((blog) => {
          const blogItem = document.createElement("div");
          blogItem.classList.add("blog-item");
    
          blogItem.innerHTML = `
<div class="bg-white mb-3 p-2">
  <div class="w-full flex-shrink-0">
    <img src="http://localhost:3000${blog.articleImage || '/assets/images/default-blog.jpg'}" 
         alt="${blog.title}" class="h-[100px] w-full object-cover mb-2">
  </div>

  <div class="w-full  flex flex-col justify-between items-start p-0 h-full">
    <div class="w-full">
      <h3 class="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 mb-1 truncate-lines">
        ${blog.title}
      </h3>
    </div>
    <div class="">
      <span class="text-xs text-gray-500 mb-5 ">
        ${new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
      </span>
    </div>
  </div>
</div>

        `;
        blogItem.addEventListener('click', () => {
          console.log('blog was clicked');
          const newEvent = new CustomEvent('myBlogClicked', {
            bubbles: true, 
            detail: {
              userID: 2,
              blogId: blog.blogId,
              title: blog.title,
              description: blog.description,
              articleImage: blog.articleImage
            }
          });
          window.dispatchEvent(newEvent);
        });
          blogListContainer.appendChild(blogItem);
        });
      };
    
     
      fetchBlogs();

    window.addEventListener('blogCreated' , fetchBlogs)
    window.addEventListener('blogDeleted' , fetchBlogs)
   
      searchInput.addEventListener("input", (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filteredBlogs = window.blogs.filter((blog) => {
          return (
            blog.title.toLowerCase().includes(searchQuery) ||
            blog.description.toLowerCase().includes(searchQuery) 
          );
        });
        displayBlogs(filteredBlogs); 
      });
}
