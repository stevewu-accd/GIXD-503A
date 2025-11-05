let numLines = 5;

function setup() {
  createCanvas(800,600);
  background(220);

  for (let x = 0; x <= numLines; x++) {
    let localStartX = (width/numLines) * x;
    let localEndX = localStartX + width/numLines;
    
    line(localStartX, 0, localStartX, height);
  
    for (let y = 0; y <= numLines; y++) {
      let localStartY = (height/numLines) * y;
      let localEndY = localStartY + height/numLines;
      line(localStartX, localStartY, localEndX, localStartY); 
      
      // draw bg
      fill(255, random(255), random(255));
      rect(localStartX, localStartY, localEndX, localEndY)

      // draw circles
      let radiusC = (x + 1) * 10;
      fill(255, random(255), random(255));
      circle(
        random(localStartX + radiusC , localEndX - radiusC),
        random(localStartY + radiusC, localEndY - radiusC),
        radiusC*2
      );

      // draw rect
      let rW = random(10, width/numLines);
      let rH = random(10, height/numLines)
      fill(255, random(255), random(255));
      rect(
        random(localStartX, localEndX - rW),
        random(localStartY, localEndY - rH),
        rW,
        rH
      )

      //draw triangle
      fill(255, random(255), random(255));
      triangle(
        random(localStartX, localEndX),
        random(localStartY, localEndY),
        random(localStartX, localEndX),
        random(localStartY, localEndY),
        random(localStartX, localEndX),
        random(localStartY, localEndY)
      )
    }
  }
}