function newBoolTab(n){ //ok
  /*int -> bool[][]
    n = mapsize
    returns 2n arrays of n*true*/
  var res = new Array;
  for (var i = 0; i < n*2; i++) {
    res[i] = new Array;
    for (var j = 0; j < n; j++) {
      res[i][j] = true;
    }
  }
  return res;
}

function rand(tab){ //ok
  /*int[] -> int
    returns a random value from an array*/
  return tab[Math.floor(Math.random() * tab.length)];
}

function inter(tab1, tab2){ //ok
  /*bool[] * bool[]-> int[]*/
  var res = new Array;
  var c=0;
  for (var i = 0; i < tab1.length; i++) {
    if (tab1[i] && tab2[i]) {
      res[c] = i;
      c++;
    }
  }
  return res;
}

function randCell(x,y,boolT){ //ok
  /*int * int * Bool[][] -> int
    returns a random value for the (x,y)cells
    (returns NaN, if it's not possible)*/
  var value = rand(inter(boolT[x], boolT[y+ boolT.length/2]));
  boolT[x][value] = false;
  boolT[y+ boolT.length/2][value] = false;
  return value+1
}

//TODO:Trouver un odre de generation sans faille ou gerer erreur (2 derniers chiffres sur toutes les lignes et colones)
