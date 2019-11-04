function newBoolTab(n){
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

function rand(tab){
  /*int[] -> int
    returns a random value from an array*/
  return tab[Math.floor(Math.random() * tab.length)];
}

function inter(tab1, tab2){
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

function randCell(x,y,boolT){
  /*int * int * Bool[][] -> int
    returns a random value for the (x,y)cells
    (returns NaN, if it's not possible)*/
  var value = rand(inter(boolT[x], boolT[y+ boolT.length/2]));
  boolT[x][value] = false;
  boolT[y+ boolT.length/2][value] = false;
  return value+1
}

function newSolution(n){
  /*int -> int[]
    returns a valid solution*/
  var bt = newBoolTab(n);
  var tab = new Array;
  for (var x=0; x<n; x++) {
    for (var y=0; y<n; y++) {
      //TODO: if randCell = Nan , switch avec y-1
      tab[x+n*y]=randCell(x,y,bt);
    }
  }
  return tab;
}
