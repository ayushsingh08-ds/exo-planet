// Landing page "Launch" button click event
document.querySelector('.show-more').addEventListener('click', function() {
    // Add slide-out animation to landing page
    document.getElementById('landing-page').style.transform = 'translateX(-100%)'; // Slide out to the left

    // Wait for the animation to finish before showing the planet page
    setTimeout(function() {
        // Remove active class from landing page and add to planet page
        document.getElementById('landing-page').classList.remove('active');
        document.getElementById('planet-page').classList.add('active');
        
        // Reset transform to allow for smooth future transitions
        document.getElementById('landing-page').style.transform = 'translateX(0)';
    }, 500); // Small delay to match the animation duration
});

// Add event listeners for planet sections to slide out and redirect to pages
document.querySelectorAll('.planet-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default href action
        const targetUrl = this.getAttribute('href'); // Get href URL

        // Add a slide-out animation for planet page
        document.getElementById('planet-page').style.transform = 'translateX(-100%)';
        
        // Redirect after animation
        setTimeout(function() {
            window.location.href = targetUrl;
        }, 800); // Delay to allow slide-out effect
    });
});
document.querySelector('.show-more').addEventListener('click', function() {
    // Unmute the audio and play
    const audio = document.getElementById('background-audio');
    audio.muted = false;
    audio.play();
});

