restartbutton = document.getElementById('restart');
overbutton = document.getElementById('over');
newGamebutton = document.getElementById('newGame');
restartbutton.addEventListener("click",getRestart(tab));
overbutton.addEventListener("click",getOver(tab));
newGamebutton.addEventListener("click",getNewGame());
// je recupere les elements html et jecoute
function getRestart(tab){
  return function(){restart(tab);}
}

function getOver(tab){
  return function(){over(tab);}
}

function getNewGame(tab){
  return function(){newGame(tab);}
}

function restart(tab){
  for (var i=0; i<tab.length; i++){
    cell = tab[i];
    if (cell.id == "cell" || cell.id == "active") {
      cell.textContent=''; //je verfie que c pas des arrows
    }
  }
}

function over(tab){
  if (tabFull(tab)){
    if (tabCheck(tab)){
      alert(Victoire!);
    }
    else{
      alert(Il y a une erreur!);
    }
  }
  else {
    alert(le tableau n'est pas totalement rempli, il reste des cases à completer);
  }
}

function newGame(){
  Init(4);
}
