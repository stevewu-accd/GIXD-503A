let cStage = document.getElementById("colorStage");
let cButton = document.getElementById("colorButton");

const bIamge = document.getElementById("bananaImage");
const bButton = document.getElementById("imageToggle");
const tImage = document.getElementById("triggerImage");

let changeColor = function() {
    let rComp = Math.random() * 255;
    let gComp = Math.random() * 255;
    let bComp = Math.random() * 255;

    cStage.style.backgroundColor = "rgb("+ rComp + ", " + gComp + ", " + bComp +")";
}

let toggleImage = () => {
    if (bIamge.src.includes("banana-yellow")) {
        bIamge.src = "images/banana-brown.png";
    } else {
        bIamge.src = "images/banana-yellow.png";
    }
}

tImage.addEventListener("click", toggleImage);
bButton.addEventListener("click", toggleImage);
cButton.addEventListener("click", changeColor);
window.addEventListener("load", changeColor);