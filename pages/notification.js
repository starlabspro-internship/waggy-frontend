// profile.js
export default function renderPageContent() {
  const notificationPanel = document.querySelector('#notificationPanel')
const notificationDesktop = document.querySelector('.notification-desktop')
const notificationMobile = document.querySelector('.notification-mobile')


const toggleNotificationPanel = () => {
  if (notificationPanel.style.display = "hidden" || notificationPanel.style.display === "") {
    notificationPanel.classList.add('block')
    notificationPanel.classList.remove('hidden')
    console.log(notificationPanel);
  } else {
    notificationPanel.classList.remove('block')
    notificationPanel.classList.add('hidden')
    console.log(notificationPanel);
  }
}
notificationDesktop.addEventListener('click' , toggleNotificationPanel)
notificationMobile.addEventListener('click' , toggleNotificationPanel)
}
