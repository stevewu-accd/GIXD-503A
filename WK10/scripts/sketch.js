let island;
let spawnScquence = [];
let bananaTrees = [];
let bananas = [];
let monkeys = [];
let fertilizer = [];

let selected = null;

function preload() {
  bananaFreshAsset = loadImage('assets/Banana Fresh.png');
  bananaMildAsset = loadImage('assets/Banana Mild.png');
  bananaRotAsset = loadImage('assets/Banana Rot.png');
  bananaTreeAsset = loadImage('assets/Banana Tree.png');
  monkeyHandBananaFreshAsset = loadImage('assets/Monkey Hand Banana Fresh.png');
  monkeyHandBananaMildAsset = loadImage('assets/Monkey Hand Banana Mild.png');
  monkeyHandBananaRotAsset = loadImage('assets/Monkey Hand Banana Rot.png');
  monkeyHandAsset = loadImage('assets/Monkey Hand.png');
  monkeyAsset = loadImage('assets/Monkey.png');
  poopAsset = loadImage('assets/Poop.png');
  
  normalFaceAsset = loadImage('assets/Normal Face.png');
  hungryFaceAsset = loadImage('assets/Hungry Face.png');
  dyingFaceAsset = loadImage('assets/Dying Face.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#B8D7FF");
  island = new Island(width * 0.6, 300);
  bananaTrees.push(new BananaTree(width * 0.5, height * 0.1));
  monkeys.push(new Monkey(width * 0.5, height * 0.1));
  monkeys.push(new Monkey(width * 0.5, height * 0.1));
  spawnScquence = [bananaTrees, fertilizer, bananas, monkeys];
  
  createUI();
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  background("#B8D7FF");

  //spawn banana
  spawnScquence.forEach((scquence) => {
    scquence.forEach((i) => {
      i.spawn();
    });
  });
  
  //island 
  island.display();
}

function createUI() {
  let div = createDiv();
  let monkeyBtn = createImg("assets/Monkey Icon.png", "Monkey Icon");
  let bananaBtn = createImg("assets/Banana Icon.png", "Banana Icon");
  let treeBtn = createImg("assets/Banana Tree Icon.png", "Banana Tree Icon");
  
  let clearAllBtn = createImg("assets/Clear All Icon.png", "Clear All Icon");
  
  monkeyBtn.mousePressed(() => {
    selected = "Monkey";
    monkeyBtn.addClass("selected");
    bananaBtn.removeClass("selected");
    treeBtn.removeClass("selected");
  });
  bananaBtn.mousePressed(() => {
    selected = "Banana";
    monkeyBtn.removeClass("selected");
    bananaBtn.addClass("selected");
    treeBtn.removeClass("selected");
  });
  treeBtn.mousePressed(() => {
    selected = "BananaTree";
    monkeyBtn.removeClass("selected");
    bananaBtn.removeClass("selected");
    treeBtn.addClass("selected");
  });
  clearAllBtn.mousePressed(clearAllfuc);
  div.child(monkeyBtn);
  div.child(bananaBtn);
  div.child(treeBtn);
  div.child(clearAllBtn);
  div.class("controlUI");
}

function clearAllfuc() {
  spawnScquence.forEach((scquence) => {
    while (scquence.length > 0) {
      scquence.pop();
    }
  });
}

function mouseReleased() {
  switch(selected) {
    case "Monkey":
      monkeys.push(new Monkey(mouseX, mouseY));
      break;
    case "Banana":
      bananas.push(new Banana(mouseX, mouseY));
      break;
    case "BananaTree":
      bananaTrees.push(new BananaTree(mouseX, mouseY));
      break;
    default:
      break;
  }
}