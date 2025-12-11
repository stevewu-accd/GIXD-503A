let banana1Asset, banana2Asset, banana3Asset, banana4Asset, monkeyHandNormalAsset, monkeyHandPinchAsset, bananaLowerPeelAsset, mouthOpenAsset, mouthCloseAsset;

let handIconAsset, mouthIconAsset, tutorialIconAsset, videoIconAsset, tutorialScreenAsset;

let currDrag;
let bananaPeels = [];
let peelLayer, strokeLayer, bananaLayer;

let handPose;
let video;
let hands = [];
let grabing = null;
let pinchCursor;

let faceMesh;
let faces = [];
let mouthOpen = false;
let bananaState = 0;
let bananaAssets;

let rebuilding = true;
let layerPosition;

let options = {
  video: false,
  tutorial: true,
  hand: true,
  mouth: true
};

function preload() {
  banana1Asset = loadImage('assets/Banana 1.png');
  banana2Asset = loadImage('assets/Banana 2.png');
  banana3Asset = loadImage('assets/Banana 3.png');
  banana4Asset = loadImage('assets/Banana 4.png');
  monkeyHandNormalAsset = loadImage('assets/Monkey Hand Normal.png');
  monkeyHandPinchAsset = loadImage('assets/Monkey Hand Pinch.png');
  bananaLowerPeelAsset = loadImage('assets/banana lower peel.png');
  mouthOpenAsset = loadImage('assets/Mouth Open.png');
  mouthCloseAsset = loadImage('assets/Mouth Close.png');
  bananaAssets = [banana1Asset, banana2Asset, banana3Asset, banana4Asset];
  
  handIconAsset = loadImage('assets/hand Icon.png');
  mouthIconAsset = loadImage('assets/mouth Icon.png');
  tutorialIconAsset = loadImage('assets/tutorial Icon.png');
  videoIconAsset = loadImage('assets/video Icon.png');
  tutorialScreenAsset = loadImage('assets/tutorial.png');

  handPose = ml5.handPose({ flipped: true });
  faceMesh = ml5.faceMesh({ maxFaces: 1, refineLandmarks: false, flipped: true });
}

function setup() {
  colorMode(HSB);
  createCanvas(1920, 1080);
  
  setupBanana();
  
  peelLayer = createGraphics(width, height);
  strokeLayer = createGraphics(width, height);
  bananaLayer = createGraphics(width, height);
  peelLayer.colorMode(HSB);
  strokeLayer.colorMode(HSB);
  
  video = createCapture(VIDEO, {flipped: true});
  video.size(1920, 1080);
  video.hide();
  handPose.detectStart(video, gotHands);
  faceMesh.detectStart(video, gotFaces);
  
  layerPosition = -height;
  createUI();
}

function draw() {
  background(48, 24, 100);
  
  peelLayer.clear();
  strokeLayer.clear();
  bananaLayer.clear();
  
  if (options.tutorial) {
    image(tutorialScreenAsset, 0, 0);
  }
  if (options.video) {
    image(video, 0, 0, width, height);
  }
  
  bananaPeels.forEach((p) => {
    p.display();
  });
  
  if (rebuilding) {
    if (layerPosition > 0 && layerPosition < height) {
      layerPosition += 10;
      if (layerPosition > height) {
        layerPosition = height;
      }
      buildScene(layerPosition);
    } else if (layerPosition == height) {
      bananaState = 0;
      setupBanana();
      layerPosition = -height;
    } else {
      layerPosition += 10;
      if (layerPosition > 0) {
        layerPosition = -height;
        rebuilding = false;
      }
      buildScene(layerPosition);
    }
  } else {
    buildScene(0);
  }
  
  if (hands[0]) {
    let hand = hands[0];
    let indexX = hand.index_finger_tip.x;
    let indexY = hand.index_finger_tip.y;
    let thumbX = hand.thumb_tip.x;
    let thumbY = hand.thumb_tip.y;
    pinchCursor = createVector((indexX + thumbX) * 0.5, (indexY + thumbY) * 0.5);
    push();
    
    let handAsset = monkeyHandNormalAsset;
    if (dist(indexX, indexY, thumbX, thumbY) < 50) {
      fill(255, 255, 255);
      pinch();
      handAsset = monkeyHandPinchAsset;
    } else {
      fill(100, 100, 100);
      handAsset = monkeyHandNormalAsset;
      if (currDrag) {
        currDrag.dragging = false;
        currDrag = null;
      }
    }
    translate(pinchCursor.x, pinchCursor.y);
    scale(0.7);
    if (options.hand) {
      image(handAsset, -36, -133);
    } else {
      circle(0, 0, 30); 
    }
    pop();
  }
  
  if (faces[0]) {
    let face = faces[0];
    let lipUp = face.lips.keypoints[36];
    let lipdown = face.lips.keypoints[26];
    let lipPos = createVector(face.lips.centerX, face.lips.centerY);
    
    push();
    let mouthAsset = mouthCloseAsset;
    if (dist(lipUp.x, lipUp.y, lipdown.x, lipdown.y) < 50) {
      mouthAsset = mouthCloseAsset;
      if (mouthOpen) {
        if (dist(lipPos.x, lipPos.y, width * 0.5, height * 0.4)) {
          eat();
        }
        mouthOpen = false;
      }
    } else {
      mouthAsset = mouthOpenAsset;
      mouthOpen = true;
    }
    if (options.mouth) {
      translate(lipPos.x, lipPos.y);
    } else {
      translate(width * 0.63, height * 0.21) 
    }
    scale(0.7);
    image(mouthAsset, -mouthAsset.width * 0.5, -mouthAsset.height * 0.5);
    pop();
  }
}

function setupBanana() {
  bananaPeels = [];
  bananaPeels.push(new BananaPeel(1067, 565, 45, 515, 0.03, 2.63, [49, 96, 90]));
  bananaPeels.push(new BananaPeel(1057, 574, 45, 520, 0.04, 2.4, [49, 96, 90]));
  bananaPeels.push(new BananaPeel(1013, 574, 45, 480, 0.04, 2.3, [49, 90, 95]));
  bananaPeels.push(new BananaPeel(978, 570, 45, 425, 0.04, 2.1, [49, 90, 95]));
}

function buildScene(_yPosition) {
  bananaLayer.push();
  bananaLayer.translate(width * 0.5, height * 0.5);
  bananaLayer.scale(height * 0.6 / bananaLowerPeelAsset.height);
  bananaLayer.image(bananaAssets[bananaState], -bananaAssets[bananaState].width * 0.5, -bananaAssets[bananaState].height * 0.5);
  bananaLayer.image(bananaLowerPeelAsset, -bananaLowerPeelAsset.width * 0.5, -bananaLowerPeelAsset.height * 0.5);
  bananaLayer.pop();
  image(strokeLayer, 0, _yPosition);
  image(bananaLayer, 0, _yPosition);
  image(peelLayer, 0, _yPosition);
}

function pinch() {
  if (!currDrag) {
    for (let i = 0; i < bananaPeels.length; i++) {
      let endDot = bananaPeels[i].dots[bananaPeels[i].segmentCount - 1];
      let d = dist(pinchCursor.x, pinchCursor.y, endDot.posX, endDot.posY);
      if (d < 20) {
        bananaPeels[i].dragging = true;
        currDrag = bananaPeels[i];
        endDot.posX = pinchCursor.x;
        endDot.posY = pinchCursor.y;
        currDrag.applyConstrain();
        break;
      }
    }    
  } else {
    let endDot = currDrag.dots[currDrag.segmentCount - 1];
    endDot.posX = pinchCursor.x;
    endDot.posY = pinchCursor.y;
    currDrag.applyConstrain();
  }
}

function eat() {
  for (let i = 0; i < bananaPeels.length; i++) {
    let endDot = bananaPeels[i].dots[bananaPeels[i].segmentCount - 1];
    if (endDot.posY < height * 0.4) {
      return;
    }
  }
  
  if (bananaState < 4) {
    bananaState++;
    if (bananaState == 3) {
      layerPosition = 1;
      rebuilding = true;
    }
  }
}
  
function mousePressed() {
  // Check if mouse is over any peel and set it as dragging
  for (let i = 0; i < bananaPeels.length; i++) {
    let endDot = bananaPeels[i].dots[bananaPeels[i].segmentCount - 1];
    let d = dist(mouseX, mouseY, endDot.posX, endDot.posY);
    if (d < 20) {
      bananaPeels[i].dragging = true;
      currDrag = bananaPeels[i];
      break;
    }
  }
}

function mouseReleased() {
  // Stop dragging when mouse is released
  if (currDrag) {
    currDrag.dragging = false;
  }
}

function mouseDragged() {
  // If a peel is being dragged, update its position and apply constraints
  for (let i = 0; i < bananaPeels.length; i++) {
    if (bananaPeels[i].dragging) {
      let endDot = bananaPeels[i].dots[bananaPeels[i].segmentCount - 1];
      endDot.posX = mouseX;
      endDot.posY = mouseY;

      // Apply constraints to maintain hierarchy for all joints
      bananaPeels[i].applyConstrain();
    }
  }
}

// Callback function for when handPose outputs data
function gotHands(results, error) {
  if(error) {
    console.error(error);
    return;
  } else {
    // Save the output to the hands variable
    hands = results;
    //console.log(results);
  }
}

// Callback function for when faceMesh outputs data
function gotFaces(results, error) {
  if(error) {
    console.error(error);
    return;
  } else {
    // Save the output to the faces variable
    faces = results;
    // console.log(results);
  }
}

function createUI() {
  let div = createDiv();
  let handBtn = createImg("assets/hand Icon.png", "hand Icon");
  let mouthBtn = createImg("assets/mouth Icon.png", "mouth Icon");
  let videoBtn = createImg("assets/video Icon.png", "video Icon");
  videoBtn.addClass('selected');
  let tutorialBtn = createImg("assets/tutorial Icon.png", "tutorial Icon");
  
  handBtn.mousePressed(() => {
    if (options.hand) {
      options.hand = false;
      
    } else {
      options.hand = true;
    }
    handBtn.toggleClass("selected");
  });
  mouthBtn.mousePressed(() => {
    if (options.mouth) {
      options.mouth = false;
    } else {
      options.mouth = true;
    }
    mouthBtn.toggleClass("selected");
  });
  videoBtn.mousePressed(() => {
    if (options.video) {
      options.video = false;
    } else {
      options.video = true;
    }
    videoBtn.toggleClass("selected");
  });
  tutorialBtn.mousePressed(() => {
    if (options.tutorial) {
      options.tutorial = false;
    } else {
      options.tutorial = true;
    }
    tutorialBtn.toggleClass("selected");
  });
  div.child(handBtn);
  div.child(mouthBtn);
  div.child(videoBtn);
  div.child(tutorialBtn);
  div.class("controlUI");
}
