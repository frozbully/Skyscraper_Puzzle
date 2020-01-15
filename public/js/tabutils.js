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
    (if it returns undefined, if it's not possible)*/
  var value = rand(inter(boolT[x], boolT[y+ boolT.length/2]));
  boolT[x][value] = false;
  boolT[y+ boolT.length/2][value] = false;
  console.log(value);
  return value+1
}

function newRandSolution(n){
  /*int -> int[]
    returns a random solution for a given mapsize n*/
    var solution = new Array;
    var boolT = newBoolTab(n);
    var x; var y;
    for (var base=0; base<n; n++) {
      for (x=base; x<n; x++){
        solution[x+ n*base] = randCell(x,base,boolT);
      }
      for (y=base+1; y<n; y++){
        solution[base+ n*y] = randCell(base,y,boolT);
      }
      console.log(solution);
    }
    return solution;
}
