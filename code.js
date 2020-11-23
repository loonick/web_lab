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
    return Math.floor(Math.random() * (max - min)) + min;
}

function split() {
    const
        hue = rand(0, 360),
        saturation = 100,
        lightness = 50,
        squareCount = (level+1) * (level+1),
        gameField = document.getElementById("gameField");

    while (gameField.firstChild) {
        gameField.removeChild(gameField.firstChild);
    }

    gameField.style.gridTemplateColumns = `repeat(${(level+1).toString()}, 1fr)`;

    const
        mainColor = "hsl(" + hue.toString() + ", " + saturation.toString() + "%, " + lightness.toString() + "%)",
        semiColor = "hsl(" + hue.toString() + ", " + (saturation - saturation/level).toString() + "%, " + (lightness - lightness/level).toString() + "%)",
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

        square.onclick = squareClick;
        gameField.appendChild(square);
    }
}

function loose() {
    clearInterval(timer);
    let gameField = document.getElementById("gameField");

    while (gameField.firstChild) {
        gameField.removeChild(gameField.firstChild);
    }

    alert(`Вы дошли до ${level.toString()} уровня.`);
    level = 0;
    time = 0;

}

function squareClick() {
    if (this.id === "semiSquare") {
        level++;
        document.getElementById("level").innerHTML = level;
        split();
    }
    else {
        loose();
    }
}

function startGame() {
    time = 100;
    level = 1;
    document.getElementById("level").innerHTML = level;
    split();
    timer = setInterval(timeGame, 1000);
}

