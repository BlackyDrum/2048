let grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      rect(i * 100, j * 100, 100, 100, 20);
      if (grid[i][j] !== 0) {
        textAlign(CENTER, CENTER);
        textSize(64);
        text(grid[i][j], i * 100 + 50, j * 100 + 50);
      }
    }
  }
}

function addNumber() {
  let options = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        options.push({
          x: i,
          y: j,
        });
      }
    }
  }

  if (options.length > 0) {
    let spot = random(options);
    let r = random(1);
    grid[spot.x][spot.y] = r > 0.5 ? 2 : 4;
  }
}

function keyPressed() {
  if (key === " ") {
    addNumber();
  }
}
