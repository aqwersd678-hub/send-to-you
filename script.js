/* ========================================
   TRẠNG THÁI
======================================== */

let stage = 0;
let index = 0;
let canNext = false;


/* ========================================
   DANH SÁCH ẢNH
======================================== */

const images = [
  "1.png",
  "2.png",
  "3.png",
  "4.png"
];


/* ========================================
   LẤY ELEMENT
======================================== */

const envelope =
  document.getElementById("envelope");

const viewer =
  document.getElementById("viewer");

const hint =
  document.querySelector(".hint");

const flowerLayer =
  document.getElementById("flowerLayer");

const questionBox =
  document.getElementById("questionBox");

const finalBox =
  document.getElementById("finalBox");

const yesBtn =
  document.getElementById("yesBtn");


/* ========================================
   CLICK PHONG BÌ
======================================== */

envelope.onclick = (e) => {

  e.stopPropagation();


  /* --------------------------------
     CLICK LẦN 1
     MỞ NẮP
  -------------------------------- */

  if (stage === 0) {

    envelope.classList.add("open");

    stage = 1;

    return;

  }


  /* --------------------------------
     CLICK LẦN 2
     HOA BUNG RA
  -------------------------------- */

  if (stage === 1) {

    stage = 2;

    envelope.style.pointerEvents =
      "none";


    /* Ẩn dòng hướng dẫn */

    hint.style.opacity = "0";

    setTimeout(() => {

      hint.style.display =
        "none";

    }, 500);


    /* Bắt đầu hiệu ứng */

    startFlowerTransition();

  }

};


/* ========================================
   HIỆU ỨNG HOA
======================================== */

function startFlowerTransition() {

  /* Xóa hoa cũ */

  flowerLayer.innerHTML = "";


  /* Hiện layer */

  flowerLayer.style.display =
    "block";

  flowerLayer.style.opacity =
    "1";

  flowerLayer.classList.remove(
    "fade-out"
  );


  /* --------------------------------
     DANH SÁCH HOA
  -------------------------------- */

  const flowers = [

    "🌸",
    "🌷",
    "🌺",
    "🌼",
    "🌸",
    "🌷",
    "🌺",
    "🌼",
    "🌻",
    "💐"

  ];


  /* --------------------------------
     TẠO 70 BÔNG HOA
  -------------------------------- */

  for (let i = 0; i < 70; i++) {

    const flower =
      document.createElement("div");


    flower.className =
      "flower";


    /* Chọn hoa ngẫu nhiên */

    flower.innerText =
      flowers[
        Math.floor(
          Math.random() *
          flowers.length
        )
      ];


    /* --------------------------------
       VỊ TRÍ ĐÍCH
    -------------------------------- */

    const x =
      (Math.random() - 0.5)
      *
      window.innerWidth
      *
      1.7;


    const y =
      (Math.random() - 0.5)
      *
      window.innerHeight
      *
      1.7;


    /* --------------------------------
       KÍCH THƯỚC
    -------------------------------- */

    const size =
      20 +
      Math.random() * 35;


    /* --------------------------------
       DELAY
    -------------------------------- */

    const delay =
      Math.random() * 0.45;


    /* --------------------------------
       XOAY
    -------------------------------- */

    const rotate =
      (Math.random() - 0.5)
      * 1000;


    /* --------------------------------
       GÁN CSS VARIABLES
    -------------------------------- */

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


    /* Thêm vào màn hình */

    flowerLayer.appendChild(
      flower
    );

  }


  /* --------------------------------
     SAU 2 GIÂY → HOA TAN
  -------------------------------- */

  setTimeout(() => {

    flowerLayer.classList.add(
      "fade-out"
    );

  }, 2000);


  /* --------------------------------
     SAU 3 GIÂY → ẢNH 1
  -------------------------------- */

  setTimeout(() => {

    flowerLayer.style.display =
      "none";

    flowerLayer.innerHTML = "";


    /* Hiện ảnh đầu tiên */

    showFirstImage();


    /* Stage ảnh */

    stage = 3;

  }, 3000);

}


/* ========================================
   HIỆN ẢNH ĐẦU
======================================== */

function showFirstImage() {

  index = 0;


  viewer.src =
    images[index];


  viewer.style.display =
    "block";


  viewer.classList.remove(
    "show"
  );


  setTimeout(() => {

    viewer.classList.add(
      "show"
    );

    canNext = true;

  }, 120);

}


/* ========================================
   CLICK ẢNH → ẢNH TIẾP
======================================== */

viewer.onclick = (e) => {

  e.stopPropagation();


  /* Chỉ cho click khi đang ở màn ảnh */

  if (
    stage !== 3 ||
    !canNext
  ) {

    return;

  }


  canNext = false;


  /* Fade ảnh hiện tại */

  viewer.classList.remove(
    "show"
  );


  setTimeout(() => {

    index++;


    /* --------------------------------
       VẪN CÒN ẢNH
    -------------------------------- */

    if (
      index < images.length
    ) {

      viewer.src =
        images[index];


      viewer.classList.add(
        "show"
      );


      canNext = true;


      return;

    }


    /* --------------------------------
       HẾT ẢNH
    -------------------------------- */

    viewer.style.display =
      "none";


    questionBox.style.display =
      "flex";


    stage = 4;

  }, 400);

};


/* ========================================
   YES
======================================== */

yesBtn.onclick = (e) => {

  e.stopPropagation();


  questionBox.style.display =
    "none";


  finalBox.style.display =
    "flex";

};
