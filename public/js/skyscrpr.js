
// timer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var h1 = document.getElementsByTagName('h1')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear =  document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
timer();


/* Start button */
start.onclick = timer;

/* Stop button */
stop.onclick = function() {
    clearTimeout(t);
}

/* Clear button */
clear.onclick = function() {
    h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}

// Bouton play

document.getElementById('volume').onclick = function() {
  document.getElementById('mute').play();
  return false;
}

document.getElementById('btnpause').onclick = function() {
  document.getElementById('player').pause();
  return false;
}

// sidenavigation ~~~~~~~~~~~~~~~~~~~~~~~~

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("open").style.visibility = "hidden";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("open").style.visibility = "visible";
  document.getElementById("myDropdown").style.display = "none";
}

// Rules Modal~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



function openOver(){
    document.getElementById("myOver").style.display = "block";
    document.getElementById("mySidenav").style.width = "0";

}
function closeOver() {
    document.getElementById("myOver").style.display = "none";
    document.getElementById("open").style.visibility = "visible";
}

// Language menu~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function dropdown() {
  var x = document.getElementById("myDropdown");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";

  }
}
