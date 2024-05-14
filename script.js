let startTime, updatedTime, difference, tInterval, running = false;
let savedTime = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0;


const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapStopwatch);

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
}

function stopStopwatch() {
    if (running) {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    lapClick = 0
    hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
    displayTime(0, 0, 0, 0);
    document.getElementById('laps').innerHTML = '';
}

let lapClick = 0

function lapStopwatch() {
    if (running) {
        lapClick++;
        const lapTime = document.createElement('div');
        lapTime.textContent = `# ${lapClick} ->  ${format(hours)} : ${format(minutes)} : ${format(seconds)} : ${format(milliseconds)}`;
        document.getElementById('laps').appendChild(lapTime);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    milliseconds = Math.floor((difference % 1000) / 10);

    displayTime(hours, minutes, seconds, milliseconds);
}

function displayTime(h, m, s, ms) {
    document.getElementById('hours').innerHTML = format(h) + " :";
    document.getElementById('minutes').innerHTML = format(m) + " :";
    document.getElementById('seconds').innerHTML = format(s) + " :";
    document.getElementById('milliseconds').innerHTML = format(ms);
}

function format(number) {
    return number < 10 ? '0' + number : number;
}
