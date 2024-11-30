// Start button function
document.getElementById('startbutton').addEventListener('click', function() {
    const game = document.querySelector('#game');

    game.height = 600;

    game.width = 500;

    let restartButton;

    var startTime, endTime;

    const ctx = game.getContext('2d');

    const keys = {};

    const rocket = {
        x: 240,
        y: 500, 
        width: 16,
        height: 23.5,
        // Sprite animation frames
        frameX: 2,
        frameY: 1,
    };
    // Grabbing sprite img
    const rocketSprite = new Image();
    rocketSprite.src = 'ship.png';

    // Drawing sprite image
    function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }

    // Rocket flame movement
    function handleRocketFrame() {
        if (rocket.frameY < 1) rocket.frameY++
        else rocket.frameY = 0;
    }
    // linking key movements to game movements
    document.addEventListener('keydown', function(evt) {
        if (evt.key === 'w') {
            keys['w'] = true;
        } else if (evt.key === 'a') {
            keys.a = true;
        } else if (evt.key === 's') {
        const theLetterS = 's';
        keys[theLetterS] = true;
        } else if (evt.key === 'd') {
            keys['d'] = true;
        }
    });

    document.addEventListener('keyup', function(evt) {
        if (evt.key === 'w') {
            keys['w'] = false;
        } else if (evt.key === 'a') {
            keys.a = false;
        } else if (evt.key === 's') {
        const theLetterS = 's';
        keys[theLetterS] = false;
        } else if (evt.key === 'd') {
            keys['d'] = false;
        }
    });

    // Movement of rocket 
    function rocketMovement () {
        if (keys.w) {
            if (rocket.y - 5 > 0){
                rocket.y -= 1.5
                rocket.frameX = 2;
            }
        } 
        if (keys.a) {
            if (rocket.x - 5 > 0){
                rocket.x -= 1.5
                rocket.frameX = 0;
            }
        } 
        if (keys.s) {
            if (rocket.y + rocket.height + 5 < game.height) {
                rocket.y += 1.5
                rocket.frameX = 2;
            }
        } 
        if (keys.d) {
            if (rocket.x + rocket.width + 5 < game.width) {
                rocket.x += 1.5
                rocket.frameX = 4;
            }
        }
    }

    // Astroid spawning variables
    var spawnLineY = 0;

    var spawnRate = 100;

    var spawnRateOfDescent = 1.5;

    var lastSpawn = -50;

    var astroids = [];

    var startTime = Date.now();

    var color;

    var stop;

    animate();

    // Random astroid spawning
    function spawnRandomAstroid() {
        color = "grey"
        const astroid = {
            type: color,
            x: Math.random() * (game.width - 30) + 15,
            y: spawnLineY,
            r: 10
        }
        astroids.push(astroid);
    }

    // Animation of canvas
    function animate() {
        var time = Date.now();
        if (time > (lastSpawn + spawnRate)) {
            lastSpawn = time;
            spawnRandomAstroid();
        }
        stop = requestAnimationFrame(animate);

        ctx.clearRect(0, 0, game.width, game.height);

        // Spawning astroids at the top of the canvas
        ctx.beginPath();

        ctx.moveTo(0, spawnLineY);

        ctx.lineTo(game.width, spawnLineY);

        ctx.stroke();
        
        // Itterating through astroids array 
        for (var i = 0; i < astroids.length; i++) {
            var astroid = astroids[i];

            // Spawning of astroids and moving them down the page
            astroid.y += spawnRateOfDescent;

            ctx.beginPath();

            ctx.arc(astroid.x, astroid.y, 12, 0, Math.PI * 2);

            ctx.closePath();

            ctx.fillStyle = astroid.type;

            ctx.fill();
        }
        // Itterating through astroids array for collision detection
        for (let i = 0; i < astroids.length; i++) {
            collisionDetection(astroids[i], rocket)
        }
        // Rendering sprite onto the canvas
        drawSprite(rocketSprite, rocket.width * rocket.frameX, rocket.height * rocket.frameY, rocket.width, rocket.height, rocket.x, rocket.y, rocket.width, rocket.height);

        // Rocket movement / animation functions
        handleRocketFrame();

        rocketMovement();
    }

    // Collision detection math for rockets and astriods
    function collisionDetection(astroid, rocket) {
        var distX = Math.abs(astroid.x - rocket.x - rocket.width / 2);  
        var distY = Math.abs(astroid.y - rocket.y - rocket.height / 2);

        if (distX <= (rocket.width / 1.1) && distY <= (rocket.height / 2)) {
        // Game over conditions
        document.getElementById('game-over').innerHTML = 'Game Over';

        document.getElementById('game-over-button').innerHTML = 'Restart';

        restartButton = document.getElementById('game-over-button');

        restartButton.addEventListener('click', gameRestart);

        end();

        cancelAnimationFrame(stop)

        document.getElementById('scoretext').innerHTML = 'Score';
        }
        
        // More collision detection math
        var dx = distX - rocket.width / 2;

        var dy = distY - rocket.height / 2;

        return (dx * dx + dy * dy <= (astroid.r * astroid.r));
    }

    // Restart button
    function gameRestart() {
        location.reload();
    }

    // Score keeping
    function end() {
        endTime = new Date();

        var timeDiff = endTime - startTime; 

        timeDiff /= 1000;

        let seconds = Math.round(timeDiff);

        // Displaying score
        document.getElementById('score').innerHTML = seconds;

        const finalScore = document.getElementById('score');

        // Highscore local data storing 
        const mostRecentScore = localStorage.getItem('mostRecentScore')

        let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

        finalScore.innerText = mostRecentScore;

        const score = { score: seconds };

        highScores.push(score);

        highScores.sort((a, b) => b.score - a.score);

        highScores.splice(3);

        localStorage.setItem('highScores', JSON.stringify(highScores));

        document.getElementById('score').innerHTML = seconds;
    }
});
    
// Highscore displaying 
const highScoreList = document.getElementById('highscore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoreList.innerHTML = highScores.map(score => {
    return `<li>${score.score}</li>`;
}).join('');






