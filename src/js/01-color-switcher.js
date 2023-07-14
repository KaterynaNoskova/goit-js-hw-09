const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');
let counter = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
function onStart(){
    counter = setInterval(chooseBgColor, 1000);
    startBtn.toggleAttribute('disabled');
    stopBtn.removeAttribute('disabled');
};

function onStop(){
    clearInterval(counter);
    startBtn.removeAttribute('disabled');
    stopBtn.toggleAttribute('disabled');
};

function chooseBgColor (){
    bodyColor.style.background = getRandomHexColor();
};

startBtn.addEventListener("click", onStart);
stopBtn.addEventListener("click", onStop);


