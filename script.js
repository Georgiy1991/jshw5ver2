var start = document.querySelector('.start-button');
var reset = document.querySelector('.reset-button');
var lap = document.querySelector('.lap-button');
var pause = document.querySelector('.pause-button');
var list = document.getElementById('list');
var globalTime;
var lapTime = 0;
var init = 0;
var startDate;
var clocktimer;

function clearFields() {
clearTimeout(clocktimer);
document.querySelector('.big').innerHTML = '00.00.00';
document.querySelector('.small').innerHTML = '.00';
list.innerHTML = ''; 
globalTime=0;
lapTime = 0;
};

function parseTime(time) {
    var ms = time%1000;
    time-=ms;
    ms=Math.floor(ms/10);
    time = Math.floor (time/1000);

    var s = time%60;
    time-=s;
    time = Math.floor (time/60);

    var m = time%60;
    time-=m;
    time = Math.floor (time/60);

    var h = time%60;

    if (h<10) h='0'+h;
    if (m<10) m='0'+m;
    if (s<10) s='0'+s;
    if (ms<10) ms='0'+ms;

    return {time: h + '.' + m + '.' + s, milliseconds: '.' + ms};
}

function startTIME(plus = 0) {
    var thisDate = new Date();
    var t = thisDate.getTime() - startDate.getTime() + plus;
    globalTime = t;

    var parsedTime = parseTime(t);

    document.querySelector('.big').innerHTML = parsedTime.time;
    document.querySelector('.small').innerHTML = parsedTime.milliseconds;
    clocktimer = setTimeout(() => startTIME(plus), 10);
};

function findTIME() {
start.parentNode.replaceChild(pause, start);
reset.parentNode.replaceChild(lap, reset);
lap.style.display = lap.style.display === 'flex' ? 'none' : 'flex';
pause.style.display = pause.style.display === 'flex' ? 'none' : 'flex';
start.style.display = start.style.display === 'none' ? 'flex' : 'none';
reset.style.display = reset.style.display === 'none' ? 'flex' : 'none';

    if(!init) {
        startDate = new Date();
        startTIME();
        init = 1;
        } else {
        startDate = new Date();
        var plusTime = globalTime;
        startTIME(plusTime);
        }
};

function pauseTIME(){
    clearTimeout(clocktimer);
    pause.parentNode.replaceChild(start, pause);
    lap.parentNode.replaceChild(reset, lap);
    start.style.display = start.style.display === 'flex' ? 'none' : 'flex';
    reset.style.display = reset.style.display === 'flex' ? 'none' : 'flex';
    lap.style.display = lap.style.display === 'none' ? 'flex' : 'none';
    pause.style.display = pause.style.display === 'none' ? 'flex' : 'none';
};




function addLap(){
    var newLi = document.createElement('li');
    newLi.classList.add("new-li");
    var t = globalTime - lapTime;
    lapTime = globalTime;
    
    var parsedTime = parseTime(t);
        
   
    newLi.innerHTML = parsedTime.time+parsedTime.milliseconds;
    list.appendChild(newLi);
    
};