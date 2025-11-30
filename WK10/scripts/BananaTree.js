let bananaTreeAsset;

class BananaTree {
  
  constructor(_x, _y) {
    this.origin = createVector(width, height);
    this.pos = createVector(_x, _y);
    this.vel = createVector(random(-4, 4), 0);
    
    this.life = 1;
    this.spawnFrame = frameCount;
    this.lifeFrame = Math.floor(random(1500, 2000));
    
    this.growTimer = frameCount;
    this.maxGrowAmount = Math.floor(random(3, 5));
    this.growFrame = Math.floor(random(300, 500));
    this.size = random(0.8, 1.1);
  }
  
  spawn() {
    push()
    translate((width - this.origin.x) * 0.5, 0);
    this.growBanana();
    if (this.pos.y >= this.origin.y) {
      this.remove();
    } else if (this.pos.y < island.groundHeight() || !island.onIsland(this.pos.x)) {
      let acc = createVector(0, 0.98);
      this.vel.add(acc);
      this.pos.add(this.vel);
    } else if (this.pos.y == island.groundHeight() && island.onIsland(this.pos.x)) {
      this.vel = createVector(0, 0);
    } else if (this.pos.y > island.groundHeight() && island.onIsland(this.pos.x)) {
      this.vel = createVector(0, 0);
      this.pos = createVector(this.pos.x, island.groundHeight()); 
    }
    this.display();
    this.decompose();
    pop();
  }
  
  decompose() {
    if (frameCount - this.spawnFrame == this.lifeFrame) {
      this.spawnFrame = frameCount;
      this.life--;
      if (this.life == 0) {
        this.remove();
      }
    }
  }
  
  growBanana() {
    if (frameCount - this.growTimer == this.growFrame) {
      this.growTimer = frameCount;
      let growAmount = random(0, this.maxGrowAmount);
      for(let i = 0; i < growAmount; i++) {
        bananas.push(new Banana(this.pos.x, 300));
      }
    }
  }
  
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    scale(this.size);
    let asset = bananaTreeAsset;
    image(asset, -asset.width * 0.5, -asset.height);
    pop();
  }
  
  remove() {
    bananaTrees.splice(bananaTrees.indexOf(this), 1);
  }
}