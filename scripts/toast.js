export function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    const closeButton = document.createElement('span');
    closeButton.textContent = '✖';
    closeButton.className = 'close-btn';
    closeButton.onclick = () => toast.remove();

    const baseClasses = 'flex items-center p-4 mb-2 rounded-lg shadow-lg text-white';
    const typeClasses = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
    };
    
    toast.className = `toast ${baseClasses} ${typeClasses[type] || 'bg-blue-500'}`;
    toast.innerHTML = `<span class="toast-message">${message}</span>`;
    toast.appendChild(closeButton);
    
    toastContainer.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
}
