let bananaColor = [49, 90, 52];
let strokeColor = [191, 95, 22];
let backgroundColor = [21, 89, 61];
let isPartying = false;

let gap = 100;
let rotateSpeed = 0.02;
let moveSpeed = 1;
let scaleRatio = 0.3;

let gridData = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);

  colorMode(HSL);
}

function draw() {
  if (isPartying) {
    backgroundColor[0] = (backgroundColor[0] + 1) % 360;
  }
  background(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);

  for (let x = 0; x  <= (width + (gap - width % gap)) / gap; x++) {
    if (!gridData[x]) {
      gridData.push([]);
    }
    for (let y = 0; y <= height / gap + 1; y++) {
      if (!gridData[x][y]) {
        gridData[x].push(
          { 
            rotation: x + y + 0.1,
            translationX: x * gap,
            translationY: y * gap
          }
        );
      } else {
        if (gridData[x][y].translationX % (width + (gap - width % gap)) == 0 && gridData[x][y].translationX != 0) {
          gridData[x][y] = {
              rotation: (gridData[x][y].rotation + rotateSpeed) % (2 * PI),
              translationX: -gap,
              translationY: gridData[x][y].translationY
          }
        } else if (gridData[x][y].translationY % (height + (gap - height % gap)) == 0 && gridData[x][y].translationY != 0) {
          gridData[x][y] = {
              rotation: (gridData[x][y].rotation + rotateSpeed) % (2 * PI),
              translationX: gridData[x][y].translationX,
              translationY: -gap
          }
        } else {
          gridData[x][y] = {
              rotation: (gridData[x][y].rotation + rotateSpeed) % (2 * PI),
              translationX: gridData[x][y].translationX + moveSpeed,
              translationY: gridData[x][y].translationY + moveSpeed
          }
        }
      }
      push();
      if (isPartying) {
        bananaColor[0] = gridData[x][y].translationX / width * 360;
        strokeColor[0] = bananaColor[0] + 120;
      }
      translate(gridData[x][y].translationX, gridData[x][y].translationY);
      scale(scaleRatio);
      rotate(gridData[x][y].rotation);
      drawBanana();
      pop();
    }
  }
}

function windowResized() {
  // Change canvas size as window resizes
  //resizeCanvas(windowWidth, windowHeight);

  // Reload window as it resizes
  window.location.reload();
}

function drawBanana() {
  //base
  fill(bananaColor[0], bananaColor[1], bananaColor[2]);
  strokeWeight(6);
  stroke(strokeColor[0], strokeColor[1], strokeColor[2]);

  beginShape();

  vertex(-46, -129);
  bezierVertex(-37, -138, -33, -136, -26, -127);
  vertex(-29, -71);
  bezierVertex(-18, -55, -12, -43, -10, -26);
  bezierVertex(25, 16, 46, 29, 86, 35);
  vertex(102, 44);
  vertex(110, 44);
  bezierVertex(120, 56, 117, 62, 92, 76);
  vertex(97, 79);
  bezierVertex(128, 76, 95, 118, 19, 109);
  vertex(22, 120);
  bezierVertex(39, 120, 20, 143, -10, 140);
  bezierVertex(-88, 125, -149, 8, -88, -72);
  vertex(-61, -92);
  vertex(-54, -102);

  endShape(CLOSE);

  //details
  //Neck
  fill(strokeColor[0], strokeColor[1], strokeColor[2]);
  strokeWeight(6);

  beginShape();

  vertex(-46, -129);
  bezierVertex(-37, -138, -33, -136, -26, -127);
  vertex(-27, -99);
  vertex(-45, -97);
  vertex(-54, -102);

  endShape(CLOSE);

  //Inner Stroke
  noFill();
  strokeWeight(6);

  beginShape();

  vertex(-43, -98);
  vertex(-49, -80);
  vertex(-43, -57);
  bezierVertex(-55, 23, -41, 64, 19, 109);

  endShape();

  beginShape();

  vertex(-11, -27);
  bezierVertex(-2, 40, 8, 67, 73, 69);
  bezierVertex(85, 71, 87, 73, 92, 76);

  endShape();

  //more inner stroke
  noFill();
  strokeWeight(2);

  beginShape();

  vertex(-49, -84);
  bezierVertex(-86, 0, -63, 101, 20, 122);

  endShape();

  beginShape();

  vertex(-26, -65);
  bezierVertex(-27, 54, -2, 88, 98, 81);

  endShape();

  beginShape();

  vertex(-5, 3);
  bezierVertex(29, 37, 49, 49, 101, 46);

  endShape();

  //spots
  point(54, 35);
  point(60, 40);
  point(67, 37);
  point(72, 42);
  point(80, 41);

  point(21, 91);
  point(25, 99);
  point(37, 93);
  point(37, 101);
  point(47, 95);
  point(51, 101);
  point(63, 94);
  point(75, 98);
  point(82, 88);
}

