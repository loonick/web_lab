let n;

let timerId;
let time;
let levelc;
const timer = document.getElementById("time_game");
const level = document.getElementById("level");

function createField(){
    let field = document.getElementById("field");
}

function startGame() {
    
    levelc = 1;
    clearInterval(timerId);
    time = 100 * 1000;
    timerId = setInterval(timeGame, 100);
    n = 2;
    createField();
    split();
}

function timeGame() {
    timer.innerHTML = Math.round(time / 1000);
    if (time <= 0) {
        getFailed();
    }
    time -= 100;
}

function split() {
    
    level.innerHTML = levelc;
    field.innerHTML = "";
    
    const n2 = n*n;
    const size = 492 / n;
    const margin = Math.max(Math.floor(size / 30), 1);
    const realSize = size - margin;

    const hu = rand(0, 360);
    const satur = 100;
    const light = 50;


    const mainColor = "hsl(" + hu.toString() + ", " + satur.toString() + "%, " + light.toString() + "%)";
    const semiColor = "hsl(" + hu.toString() + ", " + (satur - satur/levelc).toString() + "%, " + (light - light/levelc).toString() + "%)";

    for (let i = 0; i < n2; i++) {
        const elem = document.createElement("div");
        elem.className = "square";
        elem.id = i;
        elem.style.width = realSize + "px";
        elem.style.height = realSize + "px";
        elem.style.margin = margin + "px " + "0 0 " + margin + "px";
        elem.style.backgroundColor = mainColor;
        
        field.appendChild(elem);
        elem.onclick = () => loose();
    }
    
    const el = document.getElementById(rand(0, n2 - 1));
    el.style.backgroundColor = semiColor;
    el.onclick = () => split();
    n++;
    levelc++;
}

function loose () {
    clearInterval(timerId);
    
    alert(`Вы дошли до ${(levelc-1).toString()} уровня.`);
    level.innerHTML = 0;
    timer.innerHTML = 0;
    startGame();
}


function rand(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}