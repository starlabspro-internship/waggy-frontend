// Toggle Friends Section Visibility
function toggleFriends() {
    const friendsSection = document.getElementById("friendsSection");
    const toggleButton = document.getElementById("toggleButton");
    const toggleIcon = document.getElementById("toggleIcon");

    if (friendsSection.style.display === "none" || friendsSection.style.display === "") {
        friendsSection.style.display = "block";
        toggleIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'; // Cross icon for close
    } else {
        friendsSection.style.display = "none";
        toggleIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />'; // Arrow icon for open
    }
}

// Filter Pet Cards by Category
function filterCategory(category) {
    const petCards = document.querySelectorAll('.pet-card');

    petCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
function toggleFriends() {
    const friendsSection = document.getElementById("friendsSection");
    const toggleIcon = document.getElementById("toggleIcon");

    if (friendsSection.style.display === "none" || friendsSection.style.display === "") {
        friendsSection.style.display = "block";
        toggleIcon.setAttribute("d", "M6 18L18 6M6 6l12 12"); // Cross icon for closing
    } else {
        friendsSection.style.display = "none";
        toggleIcon.setAttribute("d", "M18 12H6"); // Arrow icon for opening
    }
}
