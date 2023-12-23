let grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const backgrounds = {
  0: [205, 193, 180],
  2: [238, 228, 218],
  4: [237, 224, 200],
  8: [242, 177, 121],
  16: [245, 149, 99],
  32: [246, 124, 95],
  64: [246, 94, 59],
  128: [237, 207, 114],
  256: [237, 204, 97],
  512: [237, 200, 80],
  1024: [237, 197, 63],
  2048: [237, 194, 46],
};

const storageName = "blackydrum_2048_highscore";

let score = 0;
let highscore = 0;

function setup() {
  let canvas = createCanvas(600, 600);

  canvas.style("border", "10px solid #BBADA0");
  canvas.style("border-radius", "5px");

  highscore = Number.parseInt(window.localStorage.getItem(storageName));
  if (isNaN(highscore)) {
    highscore = 0;
  } else {
    document.getElementById("highscore").innerHTML = highscore;
  }

  addNumber();
  addNumber();
}

function restart() {
  grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  score = 0;
  document.getElementById("score").innerHTML = score;
  addNumber();
  addNumber();
  loop();
}

function draw() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      strokeWeight(15);
      stroke(187, 173, 160);
      fill(backgrounds[grid[i][j]]);
      rect(i * 150, j * 150, 150, 150);
      strokeWeight(1);
      stroke(0);
      if (grid[i][j] !== 0) {
        textAlign(CENTER, CENTER);
        textSize(64);
        textStyle(BOLD);
        fill(119, 110, 101);
        noStroke();
        text(grid[i][j], i * 150 + 75, j * 150 + 75);
        noFill();
      }
    }
  }

  if (isWin()) {
    textAlign(CENTER);
    textSize(64);
    textStyle(BOLD);
    fill(119, 110, 101);
    noStroke();
    text("YOU WIN", width / 2, height / 2);
    noLoop();

    if (score > highscore) {
      highscore = score;
      document.getElementById("highscore").innerHTML = highscore;
      window.localStorage.setItem(storageName, highscore);
    }
  } else if (isGameOver()) {
    textAlign(CENTER);
    textSize(64);
    textStyle(BOLD);
    fill(119, 110, 101);
    noStroke();
    text("GAME OVER", width / 2, height / 2);
    noLoop();

    if (score > highscore) {
      highscore = score;
      document.getElementById("highscore").innerHTML = highscore;
      window.localStorage.setItem(storageName, highscore);
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

function slide(row) {
  let arr = row.filter((val) => val);
  let missing = 4 - arr.length;
  let zeros = Array(missing).fill(0);
  arr = zeros.concat(arr);
  return arr;
}

function keyPressed() {
  let keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"];

  let old = JSON.stringify(grid);

  if (key === "ArrowDown") {
    for (let i = 0; i < 4; i++) {
      grid[i] = slide(grid[i]);
      grid[i] = combine(grid[i]);
      grid[i] = slide(grid[i]);
    }
  } else if (key === "ArrowUp") {
    for (let i = 0; i < 4; i++) {
      grid[i] = slide(grid[i].reverse()).reverse();
      grid[i] = combine(grid[i].reverse()).reverse();
      grid[i] = slide(grid[i].reverse()).reverse();
    }
  } else if (key === "ArrowRight") {
    grid = transpose(grid);
    for (let i = 0; i < 4; i++) {
      grid[i] = slide(grid[i]);
      grid[i] = combine(grid[i]);
      grid[i] = slide(grid[i]);
    }
    grid = transpose(grid);
  } else if (key === "ArrowLeft") {
    grid = transpose(grid);
    for (let i = 0; i < 4; i++) {
      grid[i] = slide(grid[i].reverse()).reverse();
      grid[i] = combine(grid[i].reverse()).reverse();
      grid[i] = slide(grid[i].reverse()).reverse();
    }
    grid = transpose(grid);
  }

  if (keys.includes(key) && old !== JSON.stringify(grid)) {
    addNumber();
  }
}

function isGameOver() {
  let gameOver = true;
  for (let i = 0; i < 4; i++) {
    if (grid[i].includes(0)) {
      gameOver = false;
    }
  }
  if (gameOver) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === grid[i][j + 1]) {
          gameOver = false;
        }
      }
    }
  }
  if (gameOver) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === grid[i + 1][j]) {
          gameOver = false;
        }
      }
    }
  }
  return gameOver;
}

function isWin() {
  for (let i = 0; i < 4; i++) {
    if (grid[i].includes(2048)) {
      return true;
    }
  }
  return false;
}

function transpose(matrix) {
  let temp = [];
  for (let i = 0; i < 4; i++) {
    temp.push([]);
    for (let j = 0; j < 4; j++) {
      temp[i].push(matrix[j][i]);
    }
  }
  return temp;
}

function combine(row) {
  for (let i = 3; i >= 1; i--) {
    let a = row[i];
    let b = row[i - 1];
    if (a === b) {
      row[i] = a + b;
      row[i - 1] = 0;
      score += row[i];
      document.getElementById("score").innerHTML = score;
    }
  }
  return row;
}
