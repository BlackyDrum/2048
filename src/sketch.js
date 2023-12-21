function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      rect(i * 100, j * 100, 100, 100, 20);
    }
  }
}
