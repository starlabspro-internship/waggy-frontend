const sidebar = document.querySelector('.sidebar');
const toggler = document.querySelector('.sidebar-toggler');


function handleResize() {
  if (window.innerWidth >= 768) {
    
    sidebar.classList.remove('collapsed');
  } else {
    
    sidebar.classList.add('collapsed');
  }
}

window.addEventListener('resize', handleResize);
handleResize(); 

toggler.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});
