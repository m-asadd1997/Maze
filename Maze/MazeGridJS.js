var canvas = document.getElementById('mycanvas');
var context = canvas.getContext('2d');
context.fillStyle = 'grey';
context.fillRect(0, 0, canvas.width, canvas.height);
let cols, rows;
let cellWidth = 20;
let gridder = [];
let current;
let stack = [];

function mazeDisplay() {
  //frameRate(15);
  //   createCanvas(400, 400);
  console.log('mazeDisplay');
  cols = Math.floor(canvas.width / cellWidth);
  rows = Math.floor(canvas.height / cellWidth);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cell = new Cell(x, y);
      gridder.push(cell);
    }
  }

  current = gridder[0];
  strokeCells();
}

function strokeCells() {
  console.log('strokeCells');
  context.fillStyle = 'black';
  for (let cell of gridder) {
    cell.show();
  }
  current.visited = true;

  current.highlight();
  // STEP 1
  let next = current.checkNeighbors();
  // STEP 1.a
  if (next) {
    next.visited = true;
    // STEP 1.b
    stack.push(current);
    // STEP 1.context
    removeWalls(current, next);
    // STEP 1.d
    current = next;
    // STEP 2
  } else if (stack.length > 0) {
    // STEP 2.a and 2.b
    current = stack.pop();
  }
}

class Cell {
  constructor(context, r) {
    this.row = r;
    this.col = context;
    this.walls = {
      top: true,
      right: true,
      bottom: true,
      left: true
    };
    this.visited = false;
  }

  show() {
    let x = this.col * cellWidth;
    let y = this.row * cellWidth;
    //     stroke(255);

    if (this.walls.top) {
      //  line(x, y, x+cellWidth, y);
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + cellWidth, y);
    }
    if (this.walls.right) {
      context.moveTo(x + cellWidth, y);
      context.lineTo(x + cellWidth, y + cellWidth);
    }
    if (this.walls.bottom) {
      context.moveTo(x + cellWidth, y + cellWidth);
      context.lineTo(x, y + cellWidth);
    }
    if (this.walls.left) {
      context.moveTo(x, y + cellWidth);
      context.lineTo(x, y);
    }

    if (this.visited) {
      context.strokeStyle = 'black';
      context.fillStyle = 'purple';
      context.fillRect(x, y, cellWidth, cellWidth);
      //  noStroke();
      //  fill(255, 0, 244, 100);
      //  rect(x, y, cellWidth, cellWidth);
    }
    context.stroke();
  }

  checkNeighbors() {
    let neighbors = [];

    let top = gridder[index(this.col - 1, this.row)];
    let right = gridder[index(this.col, this.row + 1)];
    let bottom = gridder[index(this.col + 1, this.row)];
    let left = gridder[index(this.col, this.row - 1)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = Math.floor(Math.random() * neighbors.length);
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  highlight() {
    let x = this.col * cellWidth;
    let y = this.row * cellWidth;
    context.strokeStyle = 'none';
    context.fillStyle = 'blue';
    context.fillRect(x, y, cellWidth, cellWidth);
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  let x = a.col - b.col;
  if (x == 1) {
    a.walls.left = false;
    b.walls.right = false;
  } else if (x == -1) {
    a.walls.right = false;
    b.walls.left = false;
  }
  let y = a.row - b.row;
  if (y == 1) {
    a.walls.top = false;
    b.walls.bottom = false;
  } else if (y == -1) {
    a.walls.bottom = false;
    b.walls.top = false;
  }
}

function myFunction() {
  timer = setInterval(strokeCells, 1);
  mazeDisplay();
  strokeCells();
}
function myFunction1() {
  clearInterval(timer);
}

function forEasy() {
  cellWidth = 40;
  timer = setInterval(strokeCells, 1);
  mazeDisplay();
  strokeCells();
}

function forHard() {
  cellWidth = 10;
  timer = setInterval(strokeCells, 1);
  mazeDisplay();
  strokeCells();
}
