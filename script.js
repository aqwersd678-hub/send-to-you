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
const flowerLayer = document.getElementById("flowerLayer");

/* MỞ PHONG BÌ */

envelope.onclick = (e) => {
  e.stopPropagation();

  /* CLICK LẦN 1 */
  if (stage === 0) {

    envelope.classList.add("open");

    stage = 1;

    return;
  }

  /* CLICK LẦN 2 */
  if (stage === 1) {

    stage = 2;

    envelope.style.pointerEvents = "none";

    hint.style.opacity = "0";

    setTimeout(() => {
      hint.style.display = "none";
    }, 500);

    startFlowerTransition();
  }
};


/* ===== HOA BUNG RA ===== */

function startFlowerTransition() {

  flowerLayer.innerHTML = "";

  flowerLayer.style.display = "block";
  flowerLayer.classList.remove("fade-out");
  flowerLayer.classList.add("full");

  const flowers = [
    "🌸",
    "🌷",
    "🌺",
    "🌼",
    "🌸",
    "🌷",
    "🌺",
    "🌼"
  ];

  /*
    Tạo nhiều bông hoa
    để hiệu ứng phủ kín màn hình
  */

  for (let i = 0; i < 65; i++) {

    const flower = document.createElement("div");

    flower.className = "flower";

    flower.innerText =
      flowers[Math.floor(Math.random() * flowers.length)];

    /*
      Vị trí cuối của hoa
    */

    const x =
      (Math.random() - 0.5) * window.innerWidth * 1.5;

    const y =
      (Math.random() - 0.5) * window.innerHeight * 1.5;

    const size =
      20 + Math.random() * 35;

    const delay =
      Math.random() * 0.5;

    const rotate =
      (Math.random() - 0.5) * 1000;

    flower.style.setProperty(
      "--x",
      `${x}px`
    );

    flower.style.setProperty(
      "--y",
      `${y}px`
    );

    flower.style.setProperty(
      "--size",
      `${size}px`
    );

    flower.style.setProperty(
      "--delay",
      `${delay}s`
    );

    flower.style.setProperty(
      "--rotate",
      `${rotate}deg`
    );

    flowerLayer.appendChild(flower);
  }


  /*
    Sau khi hoa bung kín màn hình
    bắt đầu tan đi
  */

  setTimeout(() => {

    flowerLayer.classList.add("fade-out");

  }, 1900);


  /*
    Hoa biến mất hoàn toàn
    rồi mới xuất hiện ảnh 1
  */

  setTimeout(() => {

    flowerLayer.style.display = "none";

    flowerLayer.innerHTML = "";

    showFirstImage();

    stage = 3;

  }, 2900);
}

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
if (stage !== 3 || !canNext) return;

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

