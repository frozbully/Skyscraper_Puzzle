var activeCell;
var tharray = new Array;
var arrows = new Array;
var gamesize;
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
  var tab = document.querySelector("#gamediv");   // récupérer la zone de création du tableau
  tab = initInnerHTML(tab,size);                  // créer le tableau aléatoire
  initClickListeners(tab);                        // rendre les cellules du tableau clickables
  initKeydownListener(size);                      // écouter les touches appuyées
  tharray = document.querySelectorAll("#cell");
  arrows = document.querySelectorAll("#arrow");
  gamesize = size;
  return tab;
}

function showTab(tab){ //completer la description
  for (var i = 0; i < tharray.length; i++) {
    tharray[i].textContent = tab[i];
  }
}

function showArrows(tab){ //completer la description
  var nn=0;
  var n = tab[0].length
  for (var i=0; i<tab.length; i++) {
    for (var j=0; j<tab[i].length; j++) {
      if (nn<n) {
        arrows[nn].textContent=tab[i][j];
      }else if (nn< 2*n) {
        arrows[n+1 + 2*(nn%n)].textContent=tab[i][j];
      }else if (nn < 3*n) {
        arrows[4*n-1 - (nn%n)].textContent=tab[i][j];
      }else {
        arrows[3*n-2 - 2*(nn%n)].textContent=tab[i][j];
      }
      nn++;
    }
  }
}
//tab
function getTab(x, y){
  /*int*int -> int*/
  return Number(tharray[x+y*gamesize].textContent);
}

function setTab(x,y,value){
  /*int*int*int -> void*/
  tharray[x+y*gamesize].textContent = String(value);
}
//Get arrows
function getTop(i){
	/* 0<= i < 4
	  int -> int*/
		return Number(arrows[i].textContent);
}
function getRight(i){
	/* 0<= i < 4
	  int -> int*/
		return Number(arrows[gamesize+1 + i*2].textContent);
}
function getLeft(i){
	/* 0<= i < 4
		int -> int*/
		return Number(arrows[gamesize + i*2].textContent);
}
function getBottom(i){
	/* 0<= i < 4
		int -> int*/
		return Number(arrows[3*gamesize + i].textContent);
}
//Set showArrows
function setTop(i, value){
	/* 0<= i < 4
	  int -> int*/
		if(value == 0 || value == undefined){value = '';}
		return (arrows[i].textContent = String(value));
}
function setRight(i, value){
	/* 0<= i < 4
	  int -> int*/
		if(value == 0 || value == undefined){value = '';}
		return (arrows[gamesize+1 + i*2].textContent = String(value));
}
function setLeft(i, value){
	/* 0<= i < 4
		int -> int*/
		if(value == 0 || value == undefined){value = '';}
		return (arrows[gamesize + i*2].textContent = String(value));
}
function setBottom(i, value){
	/* 0<= i < 4
		int -> int*/
		if(value == 0 || value == undefined){value = '';}
		return (arrows[3*gamesize + i].textContent = String(value));
}

function tabOfRowsGet(tab)
{
  var tab = [];
  for (let i = 0; i < gamesize; i++)
  {
    tab[i] = [];
    for (let j = 0; j < gamesize; j++)
      tab[i].push(getTab(j, i));
  }
  return (tab);
}

function tabOfColsGet(tab)
{
  var tab = [];
  for (let i = 0; i < gamesize; i++)
  {
    tab[i] = [];
    for (let j = 0; j < gamesize; j++)
      tab[i].push(getTab(i, j));
  }
  return (tab);
}

function launch() // a ready solved board to test (play)
{
  Init(gamesize);
  //var tab = newSolutionForce(gamesize);
  //var arr = findArrows(tab, gamesize);
  setTop(0, 2);
  setTop(1, 1);
  setTop(2, 3);
  setTop(3, 2);
  setRight(0, 2);
  setRight(1, 1);
  setRight(2, 2);
  setRight(3, 3);
  setBottom(0, 1);
  setBottom(1, 3);
  setBottom(2, 2);
  setBottom(3, 3);
  setLeft(0, 2);
  setLeft(1 , 3);
  setLeft(2 , 2);
  setLeft(3 , 1);
  borders = [];
  for (let i = 0; i < gamesize; i++)
    borders.push(getTop(i));
  for (let i = 0; i < gamesize; i++)
    borders.push(getRight(i));
  for (let i = 0; i < gamesize; i++)
    borders.push(getBottom(i));
  for (let i = 0; i < gamesize; i++)
    borders.push(getLeft(i));
  showArrows(borders);
  tab = [];
  setTab(0, 0, 3);
  setTab(1, 0, 4);
  setTab(2, 0, 1);
  setTab(3, 0, 2);
  setTab(0, 1, 1);
  setTab(1, 1, 3);
  setTab(2, 1, 2);
  setTab(3, 1, 4);
  setTab(0, 2, 2);
  setTab(1, 2, 1);
  setTab(2, 2, 4);
  setTab(3, 2, 3);
  setTab(0, 3, 4);
  setTab(1, 3, 2);
  setTab(2, 3, 3);
  setTab(3, 3, 1);
  for (let i = 0; i < gamesize; i++)
  {
    for (let j = 0; j < gamesize; j++)
      tab.push(getTab(j, i));
  }
  a = tabOfRowsGet(tab);
}

function tabFull(tab) //check if a grid is full or not
{
    for (let i = 0; i < gamesize; i++)
    {
        for (let j = 0; j < gamesize; j++)
          if (tab[i][j] == 0)
            return false;
    }
    return true;
}

function arrayFull(array)
{
  for (let i = 0;i < gamesize; i++)
    if (array[i] == 0)
      return false;
  return true;
}

function arrayCheck(target, array)
{
  if (!arrayFull(array))
    return false;
  var max = 0;
  var count = 0;
  var set = new Set([]);
  for (let i = 0; i < gamesize; i++)
  {
    if (array[i] > max)
    {
      max = array[i];
      count++;
    }
    set.add(array[i]);
  }
  if (set.size != array.length)
    return false;
  return (target == count);
}

function bordersGet()
{
  var borders = [[], [], [], []];
  for (let i = 0; i < gamesize; i++)
    borders[0].push(getTop(i));
  for (let i = 0; i < gamesize; i++)
    borders[1].push(getRight(i));
  for (let i = 0; i < gamesize; i++)
    borders[2].push(getBottom(i));
  for (let i = 0; i < gamesize; i++)
    borders[3].push(getLeft(i));
    return (borders);
}

function arrayHighlightError(array)
{
  try {
    for (let i = 0; i < 16; i++)
      array[i].style.background = "red";
  } catch (e) {
    console.log("Type error, probably caused while converting NodeList -> array -> NodeList");
  }
}

function tabHighlightErrors(tab)
{
  var borders = bordersGet();
  var gridRows = tabOfRowsGet(tab);
  var gridCols = tabOfColsGet(tab);
  var thCols = tharrayRowsGet(tharray);
  var thRows = tharrayColsGet(tharray);
  for (let i = 0; i < gamesize; i++)
  {
    if (!arrayCheck(borders[0][i], gridCols[i])) //collumn
      arrayHighlightError(thCols[i]);
    if (!arrayCheck(borders[2][i], gridCols[i].reverse())) //column backwards
      arrayHighlightError(thCols[i]);
    if (!arrayCheck(borders[1][i], gridRows[i].reverse()))
     arrayHighlightError(thRows[i]);
    if (!arrayCheck(borders[3][i], gridRows[i].reverse()))
     arrayHighlightError(thRows[i]);
  }
}

function tharrayRowsGet(tharray)
{
  const array = Array.from(tharray);
  var res = [];
  var i = 0;
  while (i < gamesize * gamesize)
  {
      res.push(array.slice(i, i + gamesize));
      i = i + gamesize;
  }
  return (res);
}

function tharrayColsGet(tharray)
{
  var res = [];
  var i = 0;
  var temp = [];
  var j;
  while (i < gamesize)
  {
      j = i;
      temp = [];
      while (j < gamesize * gamesize)
      {
        temp.push(tharray[j]);
        j = j + gamesize ;
      }
      res.push(temp);
      i++;
  }
  return (res);
}

function tabCheck(tab)
{
  var borders = bordersGet();
  var gridRows = tabOfRowsGet(tab);
  var gridCols = tabOfColsGet(tab);
  for (let i = 0; i < gamesize; i++)
  {
    if (!arrayCheck(borders[0][i], gridCols[i])) //collumn
      return false;
    if (!arrayCheck(borders[2][i], gridCols[i].reverse())) //column backwards
      return false;
    if (!arrayCheck(borders[1][i], gridRows[i].reverse()))
      return false;
    if (!arrayCheck(borders[3][i], gridRows[i].reverse()))
      return false;
  }
  return true;
}

//Main function
function main() {
  Init(4);
}//Do not edit below this line
main();