let backgroundColor = [21, 89, 61];
let banana, belly, body, ear, eating, face, hair, hands, happy, head, expression;
let noiselevel, noiseScale;
let imageScales = 0.035;

function preload() {
    banana = loadImage('../assets/banana.svg');
    belly = loadImage('../assets/belly.svg');
    body = loadImage('../assets/body.svg');
    ear = loadImage('../assets/ear.svg');
    eating = loadImage('../assets/eating.svg');
    face = loadImage('../assets/face.svg');
    hair = loadImage('../assets/hair.svg');
    hands = loadImage('../assets/hands.svg');
    happy = loadImage('../assets/happy.svg');
    head = loadImage('../assets/head.svg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(backgroundColor[0], backgroundColor[1], backgroundColor[2]);

  colorMode(HSL);
  
  expression = happy;
  setInterval(() => {
    if (expression == happy) {
      expression = eating;
    } else {
      expression = happy;
    }
  }, 2000);
}

function draw() {
  background(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
  
  // background
  // Set the noise level and scale.
  let noiseLevel = 400 * (1 - cos(PI * millis() * 0.0005));
  let noiseScale = 3 * (1 - cos(0.5 * PI * millis() * 0.0005));
  let lineDetailLevel = 9;
  
  push();
  fill(49, 90, 52);
  noStroke();
  beginShape();
  vertex(0, height * 0.5);
  // Iterate from left to right.
  for (let x = 1; x < lineDetailLevel; x++) {
    // Compute the noise value.
    let y = height * 0.5 + noiseLevel * (lineDetailLevel / 2 - Math.abs(x - lineDetailLevel/2))/lineDetailLevel * (0.5 - noise(x, noiseScale));

    // Draw the vetexes.
    curveVertex(x * width/lineDetailLevel, y);
  }
  vertex(9 * width/9, height * 0.5);
  vertex(width, height * 0.5);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  pop();
  
  // rope
  push();
  translate(width * 0.5, height * -imageScales);
  fill(25, 63, 75);
  stroke(191, 95, 22);
  strokeWeight(height / 200);
  for (let i = 0; i < 10; i++) {
    translate(0, height * imageScales);
    rotate(sin(PI * millis() * 0.0005) * 0.2);
    rect(height * -imageScales / 5, 0, height * imageScales / 2.5, height * imageScales);
  }
  
  // banana canvas
  push();
  translate(0, height * imageScales);
  rotate(sin(PI * millis() * 0.0005) * 0.2);
  scale(height / (3.5 * 530));
  image(banana, -139, -78);
  pop();  
  pop();
  
  // monkey canvas
  push();
  translate(width * 0.5, height + cos(PI * millis() * 0.0005) * height * 0.4);
  scale(height / (3.5 * 530));
  parrallaxLayer(hands, -516.5, 0, 20, 0);
  parrallaxLayer(body, -188.85, 389, 10, 0.3);
  parrallaxLayer(belly, -128.76, 527.02, 60, 0.3);
  parrallaxLayer(hair, -56.5, 5.5, 0, 0.6);
  parrallaxLayer(ear, -397, 214, 0, 0.6);
  parrallaxLayer(head, -280, 83, 20, 0.6);
  parrallaxLayer(face, -202, 116, 40, 0.6); 
  parrallaxLayer(expression, -114, 175, 60, 0.8); 
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function parrallaxLayer(layer, x, y, parrallaxOffset, timeDiff) {
  push();
  translate(x, y + parrallaxOffset * cos(PI * millis() * 0.0005 + timeDiff));
  image(layer, 0, 0);
  pop(); 
}