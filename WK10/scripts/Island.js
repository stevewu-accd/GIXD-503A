class Island {
  constructor(_width, _height) {
    this.origin = createVector(width, height);
    this.width = _width;
    this.height = _height;
  }
  
  onIsland(_x) {
    return (this.origin.x - this.width) * 0.5 < _x && _x < (this.origin.x + this.width) * 0.5;
  }
  
  groundHeight() {
    return height - this.height;
  }
  
  display() {
    push();
    fill("#F6ECC0");
    noStroke();
    this.islandShape();
    pop();

    push();
    fill("#77C35C");
    noStroke();
    clip(() => this.islandShape());
    for(let x = -1; x <= (this.width / (this.height * 0.125)); x++) {
      circle((width - this.width) * 0.5 + x * this.height * 0.25, this.groundHeight(), this.height * 0.4); 
    }
    pop();

    push();
    fill("#87BBFF");
    noStroke();
    beginShape();
    for (let x = 0; x <= 20; x++) {
      if (x % 2 == 0) {
        vertex(x * width * 0.05, height - this.height * 0.5 + 20 * cos(millis() * 0.001));
      } else {
        vertex(x * width * 0.05, height - this.height * 0.5 + 20 * sin(millis() * 0.001));
      }
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
    pop();
  }
  
  islandShape() {
    beginShape();
    vertex((width + this.width) * 0.5, height - this.height);
    bezierVertex((width + this.width) * 0.5 + 100, height - this.height, (width + this.width) * 0.5 + 100, height - this.height * 0.5, (width + this.width) * 0.5 + 100, height);
    vertex((width - this.width) * 0.5 - 100, height);
    bezierVertex((width - this.width) * 0.5 - 100, height - this.height * 0.5, (width - this.width) * 0.5 - 100, height - this.height, (width - this.width) * 0.5, height - this.height);
    endShape(CLOSE);
  }
}