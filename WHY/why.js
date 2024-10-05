document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.sliding-section');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add class to trigger animation
                observer.unobserve(entry.target); // Stop observing the section
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section); // Observe each section
    });
});
