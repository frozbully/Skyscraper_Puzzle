var gameTab;
var cel;
var activeCel;
var i;

function Init() {
    gameTab = document.querySelectorAll("th");
    initlisteners();
}

function initlisteners() {
  for (i=0;i<6*6;i++) {
    cel = gameTab[i];
    if(cel.id == ''){
      cel.addEventListener("click",function(){makeActive(this);});
    }
  }
  window.addEventListener("keydown",function(event){writeActive(event.keyCode);},true);
}

function makeActive(cel){
  if (activeCel !== undefined) {
    activeCel.id = '';
  }
  activeCel = cel;
  activeCel.id = "active";
}

function writeActive(n){
  if (activeCel !== undefined) {
    if (n>96 && n<=100) {
    activeCel.textContent = n-96;
    }
    if (n === 96){
      activeCel.textContent = '';
    }
  }
}

function main() {
  Init();
}

main();
