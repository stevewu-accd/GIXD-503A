let pausebtn = document.getElementById("pausebtn");
let refreshbtn = document.getElementById("refreshbtn");
let partybtn = document.getElementById("partybtn");
let documentbtn = document.getElementById("documentbtn");

pausebtn.addEventListener("click", () => {
    if (isLooping()) {
        noLoop();
        pausebtn.innerText = "▶️"
    } else {
        loop();
        pausebtn.innerText = "⏸️";
    }
});

refreshbtn.addEventListener("click", () => {
    colorMode(HSL);
    randomColor = random(0, 360);
    bananaColor = [randomColor, random(90, 100), random(60, 100)];
    strokeColor = [randomColor + 120 % 360, 95, random(20, 30)];
    backgroundColor = [randomColor + 120 % 360, random(20, 60), random(30, 80)]
    redraw();
});

partybtn.addEventListener("click", () => {
    if (isPartying) {
        partybtn.innerText = "😉";
        isPartying = false;
        bananaColor = [49, 90, 52];
        strokeColor = [191, 95, 22];
        backgroundColor = [21, 89, 61];
    } else {
        partybtn.innerText = "😎";
        isPartying = true;
    }
});

documentbtn.addEventListener("click", () => {
    document.querySelector("article").classList.toggle("hidden");
});