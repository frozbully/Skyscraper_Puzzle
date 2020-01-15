
// timer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var h1 = document.getElementsByTagName('h1')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
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

// sidenavigation ~~~~~~~~~~~~~~~~~~~~~~~~

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

// game grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var activeCell;

//On event actions
function makeActive(cell){
  /*HTMLElement -> void
    Change the activeCell to cell*/
  if (activeCell !== undefined) {
    activeCell.id = '';
  }
  activeCell = cell;
  activeCell.id = "active";
}
function writeActive(cell,keycode,size){
  /*HTMLElement * int -> void
    Changes the textContent of a cell*/
  if (cell !== undefined) {
    if (keycode>96 && keycode<=96+size) {
    cell.textContent = keycode-96;
    }
    if (keycode === 96){
      cell.textContent = '';
    }
  }
}

//function getters for addEventListener()
function getMakeActive(){
  /*void -> function*/
  return function(){makeActive(this);}
}
function getWriteActive(size){
  /*void -> function*/
  return function(event){writeActive(activeCell,event.keyCode,size);};
}

//Init functions
function initInnerHTML(tab,size) {
  /*HTMLElement * int -> HTMLElement[]
    creates cells to an empty <table>*/
  var innerhtml='';
  for (var i=0; i<size+2; i++) {
    innerhtml += "<tr>";
    for (var j=0; j<size+2; j++) {
      if ((i==0 || i==size+1) && (j==0 || j==size+1)) {
        innerhtml += "<th id=\"corner\"></th>";
      }else if (i==0 || i==size+1 || j==0 || j==size+1) {
        innerhtml += "<th id=\"arrow\"></th>";
      }else {
        innerhtml += "<th id=\"cell\"></th>";
      }
    }
    innerhtml += "</tr>";
  }
  tab.innerHTML = innerhtml;
  return document.querySelectorAll("th");
}

function initClickListeners(tab){
  /*HTMLElement[] -> void
    creates cells' click callbacks*/
  var cell;
  for (var i=0; i<tab.length; i++) {
    cell = tab[i];
    if (cell.id == "cell") {
      cell.addEventListener("click",getMakeActive());
    }
  }
}

function initKeydownListener(size) {
  /*void -> void
    creates keyboard input callback*/
  window.addEventListener("keydown",getWriteActive(size),true);
}

function Init(size) {
  /*int -> HTMLElement[]*/
  var tab = document.querySelector("#gamediv"); // récupérer la zone de création du tableau
  tab = initInnerHTML(tab,size);                // créer le tableau aléatoire
  initClickListeners(tab);                      // rendre les cellules du tableau clickables
  initKeydownListener(size);                   // écouter les touches appuyées
  return tab;
}

//Main function
function main() {
  Init(4);
}//Do not edit below this line
main();
