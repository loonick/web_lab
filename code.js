let
    time,
    level,
    timer;



function timeGame() {
    document.getElementById("time_game").innerHTML = time;
    if (time === 0) {
        loose();
    }
    time--;
}

function rand(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function split() {
    const
        hu = rand(1, 360),
        satur = 100,
        light = 50,
        squareCount = (level+1) * (level+1),
        gameField = document.getElementById("gameField");

    while (gameField.firstChild) {
        gameField.removeChild(gameField.firstChild);
    }

    gameField.style.gridTemplateColumns = `repeat(${(level+1).toString()}, 1fr)`;

    const
        mainColor = "hsl(" + hu.toString() + ", " + satur.toString() + "%, " + light.toString() + "%)",
        semiColor = "hsl(" + hu.toString() + ", " + (satur - satur/level).toString() + "%, " + (light - light/level).toString() + "%)",
        randomSquare = rand(0, squareCount);

    for (let i = 0; i < squareCount; i++) {

        let square = document.createElement('div');
        square.className = 'square';
        
        if (i === randomSquare) {
            square.style.backgroundColor = semiColor;
            square.id = "semiSquare";
        } else {
            square.style.backgroundColor = mainColor;
            square.id = "mainSquare" + i.toString();
        }

        square.onclick = function() { if (this.id === "semiSquare") {
            level++;
            document.getElementById("level").innerHTML = level;
            split();
        }
        else {
                clearInterval(timer);
        let gameField = document.getElementById("gameField");

        while (gameField.firstChild) {
            gameField.removeChild(gameField.firstChild);
        }

        alert(`Вы дошли до ${level.toString()} уровня.`);
        level = 0;
        time = 0;
            };
    }
        gameField.appendChild(square);
    }
}

function startGame() {
    time = 100;
    level = 1;
    document.getElementById("level").innerHTML = level;
    split();
    timer = setInterval(timeGame, 1000);
}

