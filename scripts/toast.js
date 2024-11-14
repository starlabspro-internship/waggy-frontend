const toastContainer = document.getElementById('toast-container');

const createToast = (message, type = 'info', duration = 3000, onConfirm = null) => {
  const toast = document.createElement('div');
  toast.classList.add('toast', `toast--${type}`, 'animate__animated', 'animate__fadeInUp');

  const icon = document.createElement('div');
  icon.classList.add('toast__icon');
  icon.innerHTML = getIconHtml(type);

  const content = document.createElement('div');
  content.classList.add('toast__content');
  content.textContent = message;

  const closeButton = document.createElement('button');
  closeButton.classList.add('toast__close');
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => removeToast(toast));

  toast.appendChild(icon);
  toast.appendChild(content);

  // Add confirm buttons for "warning" type
  if (type === 'warning' && onConfirm) {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('toast__buttons');

    const yesButton = document.createElement('button');
    yesButton.textContent = 'Yes';
    yesButton.classList.add('toast__button', 'toast__button--yes');
    yesButton.addEventListener('click', () => {
      removeToast(toast);
      onConfirm(); // Call the confirm callback
    });

    const noButton = document.createElement('button');
    noButton.textContent = 'No';
    noButton.classList.add('toast__button', 'toast__button--no');
    noButton.addEventListener('click', () => removeToast(toast));

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
    toast.appendChild(buttonContainer);
  } else {
    toast.appendChild(closeButton);
  }

  toastContainer.appendChild(toast);

  // Adjust the position of the new toast
  adjustToastPositions();

  // Remove the toast after the duration (if not a warning)
  if (type !== 'warning') {
    setTimeout(() => removeToast(toast), duration);
  }

  return toast;
};

const removeToast = (toast) => {
  toast.classList.remove('animate__fadeInUp');
  toast.classList.add('animate__fadeOutDown');

  setTimeout(() => {
    toast.remove();
    adjustToastPositions();
  }, 300); // duration of the fadeOutDown animation
};

const adjustToastPositions = () => {
  const toasts = document.querySelectorAll('.toast');
  let currentY = 0;

  toasts.forEach((toast, index) => {
    toast.style.top = `${currentY + 20}px`;
    currentY += toast.offsetHeight + 20; // 20px spacing between toasts
  });
};

const getIconHtml = (type) => {
  switch (type) {
    case 'success':
      return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
    case 'error':
      return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
    case 'info':
      return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    case 'warning':
      return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856C19.763 20 21 18.761 21 17.295V6.705C21 5.239 19.763 4 18.294 4H5.706C4.237 4 3 5.239 3 6.705v10.59C3 18.761 4.237 20 5.706 20z"></path></svg>`;
    default:
      return '';
  }
};

window.showToast = createToast;
