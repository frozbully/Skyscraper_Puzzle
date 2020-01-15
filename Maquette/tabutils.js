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
    returns a valid solution
    or 'error'*/
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
        return 'error';
      }
      array[x][value-1] = 0;
      array[y + n][value-1] = 0;
      value = -1;
    }
  }
  return res;
}

function newSolutionForce(n){//completer la description
  var res = new Array;
  while ((res = newSolution(n))== 'error') {
    console.log('error');
  }
  return res;
}

function  countSkyscrapers(array){//completer la description
  /*int[] -> int*/
  var last = 0;
  var count = 0;
  for (var i=0; i<array.length; i++) {
    if (last < array[i]) {
      count++;
      last = array[i];
    }
  }
  return count;
}

function findArrows(array, n){//completer la description
  /*int[] -> int[]*/
  var arrow = new Array;
  var line = new Array;
  for (var i=0; i<4; i++){
    arrow[i] = new Array;
  }
  //top
  for (var i=0; i<n; i++) {
    for (var j=0; j<n; j++) {
      line[j] = array[i+n*j];//top->bottom
    }
    arrow[0][i] = countSkyscrapers(line);//left -> right
  }
  //right
  for (var i=0; i<n; i++) {
    for (var j=0; j<n; j++) {
      line[j] = array[n-j-1 +n*i];//right->left
    }
    arrow[1][i] = countSkyscrapers(line);//top->bottom
  }

  //bottom
  for (var i=0; i<n; i++) {
    for (var j=0; j<n; j++) {
      line[j] = array[(n-i-1)+n*(n-j-1)];//bottom->top
    }
    arrow[2][i] = countSkyscrapers(line);//right->left
  }
  //left
  for (var i=0; i<n; i++) {
    for (var j=0; j<n; j++) {
      line[j] = array[j +n*(n-i-1)];//left->righ
    }
    arrow[3][i] = countSkyscrapers(line);//bottom -> top
  }
  return arrow;
}
