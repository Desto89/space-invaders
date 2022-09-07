let musicNumber = 100;
let laserVol = 100;
document.getElementById("musicVol").textContent = musicNumber
document.getElementById("effectVol").textContent = laserVol

let shipImg = document.getElementById("ship");
let alienImg = document.getElementById("alien");
let rocketImg = document.getElementById("rocket");
let bg = document.getElementById("bg");
let exp1 = document.getElementById("exp1");
let exp2 = document.getElementById("exp2");
let exp3 = document.getElementById("exp3");


function changeEffectVol(dir) {
    if (dir === 0 && laserVol > 0) {
        laserVol -= 10
        document.getElementById('laser').volume -= 0.1
        document.getElementById("effectVol").textContent = laserVol
    } else if (dir === 1 && laserVol < 100) {
        laserVol += 10
        document.getElementById('laser').volume += 0.1
        document.getElementById("effectVol").textContent = laserVol
    } 
}

function changeMusicVol(dir) {
    if (dir === 0 && musicNumber > 0) {
        musicNumber -= 10
        document.getElementById('music').volume -= 0.1
        document.getElementById("musicVol").textContent = musicNumber
    } else if (dir === 1 && musicNumber < 100) {
        musicNumber += 10
        document.getElementById('music').volume += 0.1
        document.getElementById("musicVol").textContent = musicNumber
    } 
}

function openOptions() {
    document.getElementsByClassName("mainMenu")[0].style.display = 'none';
    document.getElementsByClassName("options")[0].style.display = 'flex';
}

function backBtn() {
    document.getElementsByClassName("mainMenu")[0].style.display = 'flex';
    document.getElementsByClassName("options")[0].style.display = 'none';
    document.getElementsByClassName("game")[0].style.display = 'none';
    document.getElementsByClassName("victory")[0].style.display = 'none';
    isPlaying = false;
    
    isMoving = false
    score = 0
    missles = []
    aliens = [{x: 100, y:50},
        {x: 200, y:50},{x: 300, y:50},{x: 400, y:50},
        {x: 500, y:50},{x: 100, y:100},{x: 200, y:100},{x: 300, y:100},
        {x: 400, y:100},{x: 500, y:100},{x: 100, y:150},{x: 200, y:150},{x: 300, y:150},
    {x: 400, y:150},{x: 500, y:150}
    ]
    alienDir = 0
    document.getElementsByClassName("score")[0].textContent = 0
}

// GAME

isMoving = false
let score = 0;
document.getElementsByClassName("score")[0].textContent = score;

function moveLeft() {
    if (isMoving && player.x > 40) {
        player.x -= 4
}}

function moveRight() {
    if (isMoving && player.x < 480) {
        player.x += 4
}}

document.addEventListener("keydown", (event)=>{
    if (event.keyCode === 37 && isMoving === false) {
        isMoving = true
        startMoving = setInterval(moveLeft, 30)
    } else if (event.keyCode === 39 && isMoving === false) {
        isMoving = true
        startMoving = setInterval(moveRight, 30)
    }
})

document.addEventListener("keyup", (event) => {
    if (event.keyCode === 37 || event.keyCode === 39) {
        isMoving = false
        clearInterval(startMoving)
    }
});

let recentlyFired = false

document.addEventListener("keydown", (event)=> {
    if (event.keyCode === 32 && recentlyFired === false) {
        recentlyFired = true
        var audio = new Audio('laser.mp3');
        audio.volume = laserVol / 100
        audio.play();
        missles.push({x: player.x + 10, y: player.y})
        setTimeout(()=>{recentlyFired = false}, 500)
    }
})

let player = {x: 275, y: 450};
let missles = [];
let aliens = [
    {x: 100, y:50},
    {x: 200, y:50},{x: 300, y:50},{x: 400, y:50},
    {x: 500, y:50},{x: 100, y:100},{x: 200, y:100},{x: 300, y:100},
    {x: 400, y:100},{x: 500, y:100},
    {x: 100, y:150},{x: 200, y:150},{x: 300, y:150},
    {x: 400, y:150},{x: 500, y:150}
];

let canvastx = document.getElementById("gameCanvas").getContext("2d");

let isPlaying = false

function play() {
    isPlaying = true 
    document.getElementsByClassName("mainMenu")[0].style.display = 'none';
    document.getElementsByClassName("game")[0].style.display = 'flex';
    document.getElementById('music').play();
    window.requestAnimationFrame(gameLoop)

}

let alienDir = 0;

let deadAlienCounter = 0;
let deadAlien = false;

function gameLoop() {

    canvastx.clearRect(0, 0, 550, 500)
    canvastx.drawImage(bg, 0, 0, 550, 550)

    if (deadAlien !== false) {
        if (deadAlienCounter === 0 || deadAlienCounter === 1 || deadAlienCounter === 2) {
            canvastx.drawImage(exp1, deadAlien.x, deadAlien.y, 40, 40);
            deadAlienCounter += 1
        } else if (deadAlienCounter === 3 || deadAlienCounter === 4 || deadAlienCounter === 5) {
            canvastx.drawImage(exp2, deadAlien.x, deadAlien.y, 40, 40);
            deadAlienCounter += 1 
        } else if (deadAlienCounter === 6 || deadAlienCounter === 7 || deadAlienCounter === 8) {
            canvastx.drawImage(exp3, deadAlien.x, deadAlien.y, 40, 40);
            deadAlienCounter += 1  
        } else if(deadAlienCounter ===9) {
            deadAlien = false
            deadAlienCounter = 0
        }
    }

    canvastx.drawImage(ship, player.x, player.y, 45, 45);
    aliens.map((alien) => {
        canvastx.drawImage(alienImg, alien.x, alien.y, 30, 30);
        if (alienDir >= 0 && alienDir < 80) {
            alien.x -= 1
        } else if (alienDir >= 80 && alienDir < 83) {
            alien.y += 5
        } else if (alienDir >= 83 && alienDir < 163) {
            alien.x += 1
        } else if (alienDir >= 163 && alienDir < 166) {
            alien.y += 5
        }

        if (alien.y === player.y) {
            isPlaying = false
            document.getElementsByClassName("game")[0].style.display = 'none';
            document.getElementsByClassName("victory")[0].style.display = 'flex';
            document.getElementsByClassName("score")[1].textContent = score;
            document.getElementsByClassName("victoryTab")[0].textContent = "DEFEAT!";
        }
    })

    missles.map((missle, i) => {
        canvastx.drawImage(rocketImg, missle.x, missle.y, 15, 15);
        missle.y -= 5
        if (missle.y < 0) {
            missles.splice(i, 1)
        }
        aliens.map((alien, i2) => {
            for (let i3 = 0; i3 < 30; i3++) {
                if (missle.y === alien.y + 10 && missle.x + i3 === alien.x) {
                    aliens.splice(i2, 1)
                    missles.splice(i, 1)
                    deadAlien = {x: alien.x, y:alien.y}
                    score += 10
                    var audio = new Audio('explosion.wav');
                    audio.volume = laserVol / 100
                    audio.play();
                    document.getElementsByClassName("score")[0].textContent = score;
                } else if (missle.y === alien.y + 10 && missle.x - i3 === alien.x) {
                    aliens.splice(i2, 1)
                    missles.splice(i, 1)
                    var audio = new Audio('explosion.wav');
                    audio.volume = laserVol / 100
                    deadAlien = {x: alien.x, y:alien.y}
                    audio.play();
                    score += 10
                    document.getElementsByClassName("score")[0].textContent = score;
                }
            }
            
        })
 
    })
    
    alienDir += 1
    if (alienDir === 167) {
        alienDir = 0
    }

    if (aliens.length === 0) {
        aliens = [
            {x: 100, y:50},
            {x: 200, y:50},{x: 300, y:50},{x: 400, y:50},
            {x: 500, y:50},{x: 100, y:100},{x: 200, y:100},{x: 300, y:100},
            {x: 400, y:100},{x: 500, y:100},  {x: 100, y:150},
            {x: 200, y:150},{x: 300, y:150},
            {x: 400, y:150},{x: 500, y:150}
        ]
        alienDir = 0
    }

    if (isPlaying) {
        window.requestAnimationFrame(gameLoop)
    }
    
} 