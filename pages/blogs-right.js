export default function renderRightContent() {
    const searchInput = document.querySelector("#search-bar");
    const rightContent = document.getElementById('right-content');
    rightContent.innerHTML = `
         <div class=" rounded-lg">
          <hr />
          <div class= "blog-list-container">
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
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blogs/list");
        const fetchedBlogs = await response.json();
        
        if (response.ok) {
          window.blogs = fetchedBlogs.filter((fetchedBlog) => fetchedBlog.userID === 2); // Update global blogs array
          displayBlogs(window.blogs);
        } else {
          console.log("Failed to fetch blogs:", fetchedBlogs.message);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    const displayBlogs = (blogsToDisplay) => {
        if (blogsToDisplay.length === 0) {
          blogListContainer.innerHTML =
            '<p class="text-gray-400 ml-3 text-sm" style="color: #157aff">No Blogs Listed</p>';
          return;
        }
    
        blogListContainer.innerHTML = ""; // Clear the container
    
        blogsToDisplay.forEach((blog) => {
          const blogItem = document.createElement("div");
          blogItem.classList.add("blog-item", "mb-5");
    
          blogItem.innerHTML = `
          
<div class="flex flex-col sm:flex-row items-center justify-between p-4 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 ease-in-out mb-6 cursor-pointer">
  <!-- Blog Content -->
  <div class="w-full flex flex-col items-center sm:items-start">
    <!-- Blog Image -->
    <img src="http://localhost:3000${blog.articleImage || '/assets/images/default-blog.jpg'}" 
         alt="${blog.title}" class="w-full h-25 sm:w-40 sm:h-40 rounded-xl object-cover mb-4 sm:mb-0">

    <!-- Blog Title -->
    <div class="flex flex-col justify-center items-center sm:items-start text-center sm:text-left p-2">
      <h3 class="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 mb-2">
        ${blog.title}
      </h3>
    </div>
  </div>
</div>
        `;
    
          blogListContainer.appendChild(blogItem);
        });
      };
    
     
      fetchBlogs();
      document.addEventListener("blogCreated", fetchBlogs);
     
     
   
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
