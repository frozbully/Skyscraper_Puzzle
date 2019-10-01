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
      cel.addEventListener("click",function(){makeActive(this)});
    }
  }
}

function makeActive(cel){
  activeCel = cel;
  console.log(cel.textContent);
}

function main() {
  Init();
}

main();
