function newBoolTab(n){
  /*int -> bool[]*/
  var res = new Array;
  for (var i = 0; i < n; i++) {
    res[i] = true;
  }
  return res;
}

function inter(tab1, tab2){
  /*bool[] * bool[]-> int[]*/
  console.log(tab2);
  var res = new Array;
  var c=0;
  for (var i = 0; i < tab1.length; i++) {
    if (tab1[i] && tab2[i]) {
      res[c] = i+1;
      c++;
    }
  }
  return res;
}

function randBool(tab){
  /*int[] -> int*/
  return tab[Math.floor(Math.random() * tab.length)];
}

function newTab(n){
  /*int -> bool[][]
    n = mapsize*/
  var res = new Array;
  for (var i = 0; i < n*2; i++) {
    res[i] = newBoolTab(n);
  }
  return res;
}

function randSoluce(tab){
  /*bool[][] -> int[][]*/
  var res = new Array;
  for (var i = 0; i < tab.length/2; i++) {
    res[i]= new Array;
    for (var j = 0; j< tab.length/2; j++) {
      res[i][j] = randBool(inter(tab[i] , tab[j+tab.length/2]));
      tab[i][res[i][j] - 1] = false;
      tab[j+tab.length/2][res[i][j] - 1] = false;
    }
  }
  return res;
}
//doesn't work from this point TODO:fix
function countSkyscrapers(tab){
  /*int[] -> int*/
  var count = 0;
  for (var i = 1; i < tab.length; i++) {
    if (tab[i-1] < tab[i]) count++;
  }
  return count;
}

function countSkyscrapersBackwards(tab){
  /*int[] -> int*/
  var count = 0;
  for (var i = tab.length-1; i > 1 ; i--) {
    if (tab[i-1] < tab[i]) count++;
  }
  return count;
}

function findArrows(tab){
  /*int[][] -> int[]*/
  var res = new Array;
  console.log(tab.length);
  for (var i = 0; i < tab.length; i++){
    res[i] = countSkyscrapers(tab[i]);
    res[i+tab.length*2] = countSkyscrapersBackwards(tab[i]);
  }
  return res;
}
