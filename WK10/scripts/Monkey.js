let monkeyAsset, normalFaceAsset, hungryFaceAsset, dyingFaceAsset;
let monkeyHandAsset, monkeyHandBananaFreshAsset, monkeyHandBananaMildAsset, monkeyHandBananaRotAsset;

class Monkey {
  
  constructor(_x, _y) {
    this.origin = createVector(width, height);
    this.pos = createVector(_x, _y);
    this.maxSpeed = random(3, 5);
    this.vel = createVector(random(-4, 4), 0);
    
    this.lifeCap = Math.floor(random(8, 12));
    this.life = this.lifeCap;
    this.hunger = 10;
    this.spawnFrame = frameCount;
    this.lifeFrame = Math.floor(random(200, 300));
    this.hungerTimer = frameCount;
    this.hungerFrame = Math.floor(random(100,150));
    
    this.mateTimer = frameCount;
    this.mateFrame = 1000;
    this.mateAble = false;
    
    this.holding = null;
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
      if (this.life <= 1) {
        this.vel.x *= 0.9;
        this.pos.add(this.vel);
      } else if (this.vel.x < this.maxSpeed && this.vel.x >= 0) {
        let acc = createVector(0.1, 0);
        this.vel.add(acc);
      } else if (this.vel.x > -this.maxSpeed && this.vel.x < 0) {
        let acc = createVector(-0.1, 0);
        this.vel.add(acc);
      } else {
        this.vel = createVector(this.vel.x, 0);
      }
      this.pos.add(this.vel);
      if (!island.onIsland(this.pos.x + 1) || !island.onIsland(this.pos.x - 1)) {
        this.vel = createVector(this.vel.x * -1, 0);
        this.pos.add(this.vel);
      }
    } else if (this.pos.y > island.groundHeight() && island.onIsland(this.pos.x)) {
      this.vel = createVector(this.vel.x, 0);
      this.pos = createVector(this.pos.x, island.groundHeight()); 
    }
    this.display();
    this.decompose();
    this.getHungry();
    this.pickUp();
    this.eat();
    this.heal();
    this.mate();
    pop();
  }
  
  decompose() {
    if (frameCount - this.spawnFrame == this.lifeFrame) {
      this.spawnFrame = frameCount;
      this.life--;
      if (this.life <= 0) {
        this.remove();
      }
    }
  }
  
  getHungry() {
    if (frameCount - this.hungerTimer == this.hungerFrame) {
      this.hungerTimer = frameCount;
      this.hunger--;
      if (this.hunger <= 0) {
        this.life--;
      }
    }
  }
  
  pickUp() {
      bananas.forEach((b) => {
        if (this.pos.dist(b.pos) < 20) {
          if (this.holding == null) {
            this.holding = b;
            b.pos.x = this.pos.x;
            b.inHand = true;
          } else if (this.holding.life < b.life) {
            this.holding.pos.x = this.pos.x;
            this.holding.inHand = false;
            this.holding = b;
            b.pos.x = this.pos.x;
            b.inHand = true;
          } else {
            this.holding.pos.x = this.pos.x;
          }
        }
      });
  }
  
  eat() {
    if (this.holding != null && this.hunger <= 5) {
      if (this.holding.life < 1) {
        this.life -= 1;
      }
      this.hunger += 5;
      this.holding.remove();
      this.holding = null;
      fertilizer.push(new Fertilizer(this.pos.x, 500));
    }
    if(this.life < 0) {
      this.remove();
    }
  }
  
  heal() {
    if (this.life < this.lifeCap && this.hunger > 8) {
      this.life++;
      this.hunger -= 3;
    }
  }
  
  mate() {
    if (frameCount - this.mateTimer == this.mateFrame) {
      this.mateTimer = frameCount;
      this.mateAble = true;
    }
    monkeys.forEach((m) => {
      if (this.pos.dist(m.pos) < 20 && m.mateAble && this.mateAble) {
        if (this.hunger > 8) {
          monkeys.push(new Monkey(this.pos.x, 500));
          this.hunger -= 5;
          m.hunger -= 5;
          this.mateAble = false;
          m.mateAble = false;
        }
      }
    });
    if(this.life < 0) {
      this.remove();
    }
  }
  
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    if (this.vel.x < 0) {
      scale(-1, 1);
    }
    let asset = monkeyAsset;
    image(asset, -asset.width * 0.5, -asset.height);
    if (this.life <= 1) {
      asset = dyingFaceAsset;
    } else if (this.hunger <= 5) {
      asset = hungryFaceAsset;
    } else {
      asset = normalFaceAsset;
    }
    image(asset, -asset.width * 0.5, -asset.height)
    if (this.holding != null) {
      if (this.holding.life > 2) {
        asset = monkeyHandBananaFreshAsset;
      } else if (this.holding.life > 1) {
        asset = monkeyHandBananaMildAsset;
      } else if (this.holding.life > 0) {
        asset = monkeyHandBananaRotAsset;
      } else {
        this.holding = null;
      }
    } else {
      asset = monkeyHandAsset;
    }
    image(asset, -asset.width * 0.5 + 40, -asset.height);
    pop();
  }
  
  remove() {
    if (this.holding != null) {
      this.holding.inHand = false;
    }
    monkeys.splice(monkeys.indexOf(this), 1);
  }
}