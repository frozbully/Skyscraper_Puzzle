// tile size in pixels
const TILE_SIZE = 40;
// gap between tiles in pixels
const TILE_GAP = 5;
// margins between the grid and the border
const MARGIN = 100;

var grid;

function preload() {}

function setup() {
  // creation of a 800x800 pixels HTML canvas
  createCanvas(800, 800);
  // creation of a grid of dim 4
  grid = new Grid(4);
}

function draw() {
  background(0);
  grid.draw();
}

function mousePressed() {
  grid.mouse_event(mouseX, mouseY);
}
