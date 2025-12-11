class BananaPeel {
  
  constructor(_x, _y, _width, _length, _curvature, _curvatureScale, _color) {
    this.dragging = false;
    
    this.origin = createVector(_x, _y);
    this.pos = createVector(_x, _y);
    this.color = _color;
    this.width = _width;
    this.strokeWidth = 6;
    
    this.segmentCount = 5;
    this.maxRadius = _length / 5;
    this.minRadius = this.maxRadius - 5;
    this.dots = [];
    
    this.dots[0] = {
      posX: this.pos.x,
      posY: this.pos.y
    };
    for (let i = 1; i < this.segmentCount; i++) {
      let posX = this.dots[i - 1].posX - sin(_curvature * i ** _curvatureScale) * this.maxRadius;
      let posY = this.dots[i - 1].posY - cos(_curvature * i ** _curvatureScale) * this.maxRadius;
      this.dots[i] = {
        posX: posX,
        posY: posY
      };
    }
  }
  
  display() {
    this.drawPeel(strokeLayer, [191, 97, 43], this.width + this.strokeWidth * 2);
    this.drawPeel(peelLayer, this.color, this.width);
  }
  
  drawPeel(_layer, _color, _width) {
    _layer.beginShape();
    _layer.noFill();
    _layer.stroke(_color[0], _color[1], _color[2]);
    _layer.strokeWeight(_width);
    _layer.vertex(this.dots[0].posX, this.dots[0].posY);
    _layer.curveVertex(this.dots[0].posX, this.dots[0].posY);
    for (let d = 1; d < this.segmentCount - 1; d++) {
      _layer.curveVertex(this.dots[d].posX, this.dots[d].posY); 
    }
    _layer.curveVertex(this.dots[this.segmentCount - 1].posX,
                this.dots[this.segmentCount - 1].posY);
    _layer.vertex(this.dots[this.segmentCount - 1].posX,
           this.dots[this.segmentCount - 1].posY); 
    _layer.endShape();
  }
  
  applyConstrain() {
    // --- Backward pass ---
    for (let i = this.segmentCount - 1; i > 0; i--) {
      let dx = this.dots[i].posX - this.dots[i - 1].posX;
      let dy = this.dots[i].posY - this.dots[i - 1].posY;
      let d = sqrt(dx*dx + dy*dy);

      if (d > this.maxRadius) {
        let angle = atan2(dy, dx);
        this.dots[i - 1].posX = this.dots[i].posX - cos(angle) * this.maxRadius;
        this.dots[i - 1].posY = this.dots[i].posY - sin(angle) * this.maxRadius;
      } else if (d < this.minRadius) {
        let angle = atan2(dy, dx);
        this.dots[i - 1].posX = this.dots[i].posX - cos(angle) * this.minRadius;
        this.dots[i - 1].posY = this.dots[i].posY - sin(angle) * this.minRadius;
      }
    }

    // --- Constrain the WHITE DOT inside center circle ---
    this.dots[0].posX = this.pos.x;
    this.dots[0].posY = this.pos.y;

    // --- FINAL PASS (critical!) ---
    // Fix the chain after we moved dot[0]
    for (let i = 0; i < this.segmentCount - 1; i++) {
      let dx = this.dots[i + 1].posX - this.dots[i].posX;
      let dy = this.dots[i + 1].posY - this.dots[i].posY;
      let d = sqrt(dx*dx + dy*dy);

      if (d > this.maxRadius) {
        let angle = atan2(dy, dx);
        this.dots[i + 1].posX = this.dots[i].posX + cos(angle) * this.maxRadius;
        this.dots[i + 1].posY = this.dots[i].posY + sin(angle) * this.maxRadius;
      } else if (d < this.minRadius) {
        let angle = atan2(dy, dx);
        this.dots[i + 1].posX = this.dots[i].posX + cos(angle) * this.minRadius;
        this.dots[i + 1].posY = this.dots[i].posY + sin(angle) * this.minRadius;
      }
    }
  }
}