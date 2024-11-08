// toast.js
window.showToast = function (message, type = 'info', duration = 3000) {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');

  const baseClasses = 'flex items-center p-4 mb-2 rounded-lg shadow-lg text-white';
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  toast.className = `${baseClasses} ${typeClasses[type] || 'bg-blue-500'}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
};
