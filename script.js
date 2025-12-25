let stage = 0;
/*
0 = chưa mở phong bì
1 = đã mở phong bì
2 = đang xem ảnh
3 = câu hỏi
*/

let imgIndex = 0;
let canNext = false;

const images = ["1.png", "2.png", "3.png", "4.png"];

const envelope = document.getElementById("envelope");
const viewer = document.getElementById("viewer");
const hint = document.querySelector(".hint");
const questionBox = document.getElementById("questionBox");
const finalBox = document.getElementById("finalBox");
const yesBtn = document.getElementById("yesBtn");

/* CLICK PHONG BÌ */
envelope.addEventListener("click", (e) => {
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
    return;
  }
});

/* HIỆN ẢNH 1 */
function showFirstImage() {
  imgIndex = 0;
  viewer.src = images[imgIndex];
  viewer.style.display = "block";
  viewer.classList.remove("show");

  setTimeout(() => {
    viewer.classList.add("show");
    canNext = true;
  }, 150);
}

/* CLICK CHUYỂN ẢNH */
document.body.addEventListener("click", () => {
  if (stage !== 2 || !canNext) return;

  canNext = false;
  viewer.classList.remove("show");

  setTimeout(() => {
    imgIndex++;
    if (imgIndex < images.length) {
      viewer.src = images[imgIndex];
      viewer.classList.add("show");
      canNext = true;
    } else {
      viewer.style.display = "none";
      questionBox.style.display = "flex";
      stage = 3;
    }
  }, 300);
});

/* CLICK YES */
yesBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  questionBox.style.display = "none";
  finalBox.style.display = "flex";
});
