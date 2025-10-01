let levelNum = document.getElementById("levelNum");
let puzzleArea = document.getElementById("puzzleArea");
let skipBtn = document.getElementById("skipBtn");

let level = 0;
let difficulty = 0;
let generateLevel = function() {
    skipBtn.textContent = "Skip";
    puzzleArea.innerHTML = "";
    if (difficulty < 3) {
        level++;
        difficulty = level;
    } else {
        level++;
    }
    levelNum.innerText = level
    let pieces = 15 * (difficulty ** 2);
    let temp;
    for (let i = 0; i < pieces; i++) {
        temp = document.createElement("div");
        temp.classList.add("piece");
        let width = 100 / (5 * difficulty);
        let height = 100 / (3 * difficulty);
        temp.style.width = width + "%";
        temp.style.height = height + "%";
        temp.style.border = "solid 1px black";
        temp.style.boxSizing = "border-box";
        temp.style.backgroundImage = "url(images/puzzleImage"+ (level % 3 + 1) + ".png)"
        temp.style.backgroundPositionX = (100 / (5 * difficulty - 1)) * (i % (5 * difficulty)) + "%";
        temp.style.backgroundPositionY = (100 / (3 * difficulty - 1)) * ((Math.floor(i / (5 * difficulty)))) + "%";
        temp.style.backgroundSize = (500 * difficulty) + "% " + (300 * difficulty) + "%";
        let rotate = Math.floor(Math.random() * 3);
        temp.style.transform = "rotate(" + rotate * 90 + "deg)"
        temp.classList.add(rotate);
        temp.addEventListener("click", rotatePiece);
        puzzleArea.append(temp);
    }
}

function rotatePiece(e) {
    let classNames = e.target.className.split(" ");
    let rotate = parseInt(classNames[1]);
    rotate = (rotate + 1) % 4;
    e.target.style.transform = "rotate(" + rotate * 90 + "deg)";
    e.target.classList.replace(classNames[1], rotate);
    if (checkWin()) {
        skipBtn.textContent = "Next Level!";
    }
}

function checkWin() {
    let allPieces = document.getElementsByClassName("piece");
    let win = true;
    for (let piece of allPieces) {
        if (!piece.classList.contains("0")) {
            win = false;
        }
    }
    return win;
}

window.addEventListener("load", generateLevel);
skipBtn.addEventListener("click", generateLevel);
