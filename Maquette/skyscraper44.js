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
  var innerhtml=''
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
  var tab = document.querySelector("#gamediv");
  tab = initInnerHTML(tab,size);
  initClickListeners(tab);
  initKeydownListener(size);
  return tab;
}

//Main function
function main() {
  Init(4);
}//Do not edit below this line
main();
