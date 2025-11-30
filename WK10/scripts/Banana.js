let bananaFreshAsset, bananaMildAsset, bananaRotAsset;

class Banana {
  
  constructor(_x, _y) {
    this.origin = createVector(width, height);
    this.pos = createVector(_x, _y);
    this.vel = createVector(random(-4, 4), 0);
    
    this.life = 3;
    this.spawnFrame = frameCount;
    this.lifeFrame = Math.floor(random(500, 600));
    
    this.inHand = false;
  }
  
  spawn() {
    push()
    translate((width - this.origin.x) * 0.5, 0);
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
    this.growTree();
    pop();
  }
  
  decompose() {
    this.life = 3 * (1 - (frameCount - this.spawnFrame) / this.lifeFrame);
    if (this.life <= 0) {
      this.remove();
    }
  }
  
  growTree() {
    let nearTree = 0;
    bananaTrees.forEach((t) => {
      if (this.pos.dist(t.pos) < 100) {
        nearTree++;
      }
    });
    if (this.life > 1 && random(0, 20 * nearTree) < 1) {
      fertilizer.forEach((f) => {
        if (this.pos.dist(f.pos) < 20) {
          bananaTrees.push(new BananaTree(this.pos.x + random(-100,100), 500));
          this.remove();
          f.remove();
        }
      });
    }
  }
  
  display() {
    if (!this.inHand) {
      push();
      translate(this.pos.x, this.pos.y);
      let asset;
      if (this.life > 2) {
        asset = bananaFreshAsset;
      } else if (this.life > 1) {
        asset = bananaMildAsset;
      } else if (this.life >= 0) {
        asset = bananaRotAsset;
      }
      image(asset, -asset.width * 0.5, -asset.height);
      pop();      
    }
  }
  
  remove() {
    this.life = 0;
    bananas.splice(bananas.indexOf(this), 1);
    if (fertilizer.includes(this)) {
      fertilizer.splice(fertilizer.indexOf(this));
    }
  }
}