// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load the rocket, enemy images, and background image
const rocketImage = new Image();
const enemyImage = new Image();
rocketImage.src = 'images/rocket1.png'; // Replace with your rocket image path
enemyImage.src = 'images/ufo.gif'; // Replace with your enemy image path

// Background image (for reference)
const backgroundImage = new Image();
backgroundImage.src = 'images/space1.jpg'; // Replace with your background image path

// Rocket position
let rocketX = canvas.width / 2 - 25; // Centering the rocket
let rocketY = canvas.height / 2 - 25; // Centering the rocket
const rocketSpeed = 15; // Increased speed of the rocket

// Enemy position
let enemyX = Math.random() * (canvas.width - 50); // Random position
let enemyY = Math.random() * (canvas.height - 50); // Random position
const enemySpeed = 3; // Speed of the enemy

// Game state
let gameOver = false;

// Draw the rocket, enemy, and background on the canvas
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Draw background image
    ctx.drawImage(rocketImage, rocketX, rocketY, 50, 100); // Draw the rocket
    ctx.drawImage(enemyImage, enemyX, enemyY, 50, 50); // Draw the enemy

    // Move enemy towards the rocket
    if (!gameOver) {
        moveEnemy();
    }

    // Check for collision
    if (
        rocketX < enemyX + 50 &&
        rocketX + 50 > enemyX &&
        rocketY < enemyY + 50 &&
        rocketY + 100 > enemyY
    ) {
        gameOver = true;
        showGameOverScreen();
    }
}

// Move enemy towards the rocket
function moveEnemy() {
    if (enemyX < rocketX) {
        enemyX += enemySpeed; // Move right
    } else {
        enemyX -= enemySpeed; // Move left
    }
    if (enemyY < rocketY) {
        enemyY += enemySpeed; // Move down
    } else {
        enemyY -= enemySpeed; // Move up
    }
}

// Control the rocket with arrow keys
window.addEventListener('keydown', (e) => {
    if (!gameOver) {
        switch (e.key) {
            case 'ArrowUp':
                rocketY -= rocketSpeed; // Move up
                break;
            case 'ArrowDown':
                rocketY += rocketSpeed; // Move down
                break;
            case 'ArrowLeft':
                rocketX -= rocketSpeed; // Move left
                break;
            case 'ArrowRight':
                rocketX += rocketSpeed; // Move right
                break;
        }
        drawGame(); // Redraw the game state at the new position
    }
});

// Show the game over screen
function showGameOverScreen() {
    const gameOverDiv = document.createElement('div');
    gameOverDiv.id = 'gameOver';
    gameOverDiv.innerHTML = `
        <h1>Game Over</h1>
        <p>Click "Retry" to restart the game!</p>
        <button id="retryButton">Retry</button>
    `;
    document.body.appendChild(gameOverDiv);

    // Add event listener for the retry button
    document.getElementById('retryButton').addEventListener('click', restartGame);
}

// Restart the game
function restartGame() {
    document.getElementById('gameOver').remove(); // Remove game over screen
    rocketX = canvas.width / 2 - 25; // Reset rocket position
    rocketY = canvas.height / 2 - 25; // Reset rocket position
    enemyX = Math.random() * (canvas.width - 50); // Reset enemy position
    enemyY = Math.random() * (canvas.height - 50); // Reset enemy position
    gameOver = false; // Reset game over state
    drawGame(); // Draw the rocket and enemy again
}

// Initial draw
rocketImage.onload = () => {
    backgroundImage.onload = drawGame; // Draw game when images are loaded
    setInterval(drawGame, 1000 / 60); // 60 FPS
};
