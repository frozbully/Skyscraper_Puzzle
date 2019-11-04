function newArray(n){
  /*int -> int[][]
    returns 2n arrays of n int*/
  var array = new Array;
  for (var i=0; i<2*n; i++) {
    array[i] = new Array;
    for (var j=0; j<n; j++) {
      array[i][j] = j+1;
    }
  }
  return array;
}

function inter(tab1, tab2){
  /*int[] * int[]-> int[]*/
  var j=0;
  var res = new Array;
  for (var i=0; i<tab1.length; i++){
    if ((tab1[i] != 0) && (tab2[i] == tab1[i])) {
      res[j] = tab1[i];
      j++;
    }
  }
  if (j === 0) {
    return [-1];
  }
  else {
    return res;
  }
}

function isIn(n, tab){
  /*int * int[] -> bool
    is n in tab ?*/
  for (var i=0; i<tab.length; i++) {
    if (n === tab[i]) {
      return true;
    }
  }
  return false;
}

function rand(tab){
  /*int[] -> int
    returns a random value from an array*/
  return tab[Math.floor(Math.random() * tab.length)];
}

function randCell(x,y,array){
  /*int * int * int[][] -> int
    returns a random value for the (x,y)cells
    (returns -1, if it's not possible)*/
  return rand(inter(array[x], array[y + (array.length) / 2]));
}

function newSolution(n){
  /*int -> int[]
    returns a valid solution*/
  var array = newArray(n);
  var res = new Array;
  var value = -1;
  for (var y=0; y<n; y++) {
    for (var x=0; x<n; x++) {
      if ((x === n-2)) {
        for (var i=0; i<y; i++) {
          if (isIn(res[n-1+n*i], inter(array[x],array[y+n]) )) {
            value = res [n-1+n*i]; //prevents errors
          }
        }
      }
      if(value === -1) {
        value = randCell(x,y,array); //if no errors
      }
      res[x+n*y] = value;
      if (value === -1) {
        return 'eror';
      }
      array[x][value-1] = 0;
      array[y + n][value-1] = 0;
      value = -1;
    }
  }
  return res;
}

function newSolutionForce(n){
  var res = new Array;
  while ((res = newSolution(n))== 'eror') {
    console.log('eror');
  }
  return res;
}
