let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = function() {
    showSlider('next');
};
prevButton.onclick = function() {
    showSlider('prev');
};

let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if (type === 'next') {
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    } else {
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }

    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(() => {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000);

    updateClickOnSilhouette();  // Update click listeners on silhouettes
};

// Handle "see more" button clicks
seeMoreButtons.forEach((button) => {
    button.onclick = function() {
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    };
});

// Handle back button click
backButton.onclick = function() {
    carousel.classList.remove('showDetail');
};

// Variables for swipe handling
let startX = 0;
let endX = 0;

// Add touchstart event to detect when the user touches the screen
carousel.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

// Add touchmove event to detect the swipe movement
carousel.addEventListener('touchmove', function(e) {
    endX = e.touches[0].clientX;
});

// Add touchend event to detect when the user finishes the swipe
carousel.addEventListener('touchend', function() {
    handleSwipe();
});

const handleSwipe = () => {
    if (startX > endX + 50) {
        // Swipe left to show the next planet
        showSlider('next');
    } else if (startX < endX - 50) {
        // Swipe right to show the previous planet
        showSlider('prev');
    }
};

// Function to add click listeners to the silhouettes (next and previous planets)
const updateClickOnSilhouette = () => {
    let items = document.querySelectorAll('.carousel .list .item');
    
    // Clear previous event listeners
    items.forEach(item => {
        item.querySelector('img').onclick = null;
    });

    // First visible planet is the next silhouette
    let nextSilhouette = items[1].querySelector('img');
    // Last visible planet is the previous silhouette
    let prevSilhouette = items[items.length - 1].querySelector('img');

    // Add click events to silhouettes
    nextSilhouette.onclick = function() {
        showSlider('next');
    };
    prevSilhouette.onclick = function() {
        showSlider('prev');
    };
};

// Initialize silhouette click listeners
updateClickOnSilhouette();
