let stage = 0;
let index = 0;
let canNext = false;

const images = ["1.png", "2.png", "3.png", "4.png"];

const envelope = document.getElementById("envelope");
const viewer = document.getElementById("viewer");
const hint = document.querySelector(".hint");
const questionBox = document.getElementById("questionBox");
const finalBox = document.getElementById("finalBox");
const yesBtn = document.getElementById("yesBtn");

/* MỞ PHONG BÌ */
envelope.onclick = (e) => {
  e.stopPropagation();

  if (stage === 0) {
    envelope.classList.add("open");
    stage = 1;
    return;
  }

  if (stage === 1) {
    envelope.style.display = "none";
    hint.style.display = "none";
    showFirstImage();
    stage = 2;
  }
};

/* ẢNH ĐẦU */
function showFirstImage() {
  index = 0;
  viewer.src = images[index];
  viewer.style.display = "block";
  viewer.classList.remove("show");

  setTimeout(() => {
    viewer.classList.add("show");
    canNext = true;
  }, 120);
}

/* CHẠM ẢNH → ĐỔI ẢNH */
viewer.onclick = (e) => {
  e.stopPropagation();
  if (stage !== 2 || !canNext) return;

  canNext = false;
  viewer.classList.remove("show");

  setTimeout(() => {
    index++;
    if (index < images.length) {
      viewer.src = images[index];
      viewer.classList.add("show");
      canNext = true;
    } else {
      viewer.style.display = "none";
      questionBox.style.display = "flex";
      stage = 3;
    }
  }, 400);
};

/* YES */
yesBtn.onclick = (e) => {
  e.stopPropagation();
  questionBox.style.display = "none";
  finalBox.style.display = "flex";
};

