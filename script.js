// Function to open the modal with animation
function openModal(planetId) {
    const modal = document.getElementById("planetModal");
    const planetName = document.getElementById("planet-name");
    const planetImage = document.getElementById("planet-image");
    const planetDescription = document.getElementById("planet-description");

    // Exoplanet data
    const planetData = {
        'planet1': {
            name: "Exoplanet 1",
            image: "planet1.jpg",
            description: "Exoplanet 1 is located 450 light-years from Earth. It's a gas giant with an atmosphere rich in hydrogen and helium."
        },
        'planet2': {
            name: "Exoplanet 2",
            image: "planet2.jpg",
            description: "Exoplanet 2 is located 600 light-years from Earth. It has a rocky surface and may contain water in its atmosphere."
        }
    };

    // Set modal content
    const planet = planetData[planetId];
    planetName.textContent = planet.name;
    planetImage.src = planet.image;
    planetDescription.textContent = planet.description;

    // Display the modal with animation
    modal.classList.add('show');
}

// Function to close the modal with animation
function closeModal() {
    const modal = document.getElementById("planetModal");

    // Hide the modal after the fade-out animation completes
    modal.classList.remove('show');
}

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("planetModal");
    if (event.target == modal) {
        closeModal();
    }
};
