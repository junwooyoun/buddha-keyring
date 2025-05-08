// script.js
// ✅ 접근 제한용 쿼리 검사
//(function checkAccessToken() {
 // const urlParams = new URLSearchParams(window.location.search);
 // const access = urlParams.get('access');
 //if (access !== 'temple2024') {
 //  document.body.innerHTML = "<div style='color:white; font-family:sans-serif; text-align:center; margin-top:50vh;'>🙏 허용되지 않은 접근입니다</div>";
  //  throw new Error("접근 거부됨: 올바른 토큰 없음");
 // }
//})();


let previousQuote = "";
let recentQuotes = []; // 🔥 추가: 최근 본 문구 기억
let quotes = {
  classicQuotes: [],
  liteQuotes: []
};

// ✅ JSON 불러오기
fetch('data/quotes.json')
  .then(response => response.json())
  .then(data => {
    quotes.classicQuotes = data.classicQuotes;
    quotes.liteQuotes = data.liteQuotes;
  })
  .catch(error => {
    console.error("❌ JSON 불러오기 실패:", error);
  });

  // 문구랜덤뽑기
  function getUniqueQuote(list) {
    let quote = "";
    let attempts = 0;
  
    do {
      const i = Math.floor(Math.random() * list.length);
      quote = list[i];
      attempts++;
    } while (recentQuotes.includes(quote) && attempts < 10);
  
    recentQuotes.push(quote);
    if (recentQuotes.length > 5) {
      recentQuotes.shift();
    }
  
    return quote;
}



// ✅ 타이핑 효과
function typeWriterEffect(element, text, i = 0) {
  if (i < text.length) {
    element.textContent += text.charAt(i);
    setTimeout(() => typeWriterEffect(element, text, i + 1), 50);
  }
}

// ✅ 진심 위로 모드 전환
function enterClassicMode() {
  const mainScreen = document.getElementById("main-screen");
  if (mainScreen) mainScreen.style.display = "none";

  const bg = document.getElementById("main-bg");
  if (bg) {
    bg.style.opacity = 0;
    setTimeout(() => {
      bg.src = "images/classic-bg.png";
      bg.style.opacity = 1;
    }, 300);
  }

  setTimeout(() => {
    const screen = document.getElementById("classic-screen");
    if (!screen) return;
    screen.style.display = "flex";

    const buddha = document.querySelector(".classic-buddha");
    if (buddha) {
      buddha.style.opacity = 0;
      buddha.style.animation = "zoomFade 2s ease-out forwards, float 3s ease-in-out infinite";
      buddha.style.animationDelay = "0.5s, 2.5s";
    }

    const quoteArea = document.getElementById("quote-area-classic");
    quoteArea.innerText = "";
    const quote = getUniqueQuote(quotes.classicQuotes);
    typeWriterEffect(quoteArea, quote);
  }, 1000);
}

function showAnotherClassicQuote() {
  const quoteArea = document.getElementById("quote-area-classic");
  const quote = getUniqueQuote(quotes.classicQuotes);
  quoteArea.innerText = "";
  typeWriterEffect(quoteArea, quote);
}

function enterLiteMode() {
  const mainScreen = document.getElementById("main-screen");
  if (mainScreen) mainScreen.style.display = "none";

  const bg = document.getElementById("main-bg");
  if (bg) {
    bg.style.opacity = 0;
    setTimeout(() => {
      bg.src = "images/pixel-temple-laugh.png";
      bg.style.opacity = 1;
    }, 300);
  }

  setTimeout(() => {
    const screen = document.getElementById("lite-screen");
    if (!screen) return;
    screen.style.display = "flex";

    const buddha = screen.querySelector(".classic-buddha");
    if (buddha) {
      buddha.style.opacity = 0;
      buddha.style.animation = "zoomFade 2s ease-out forwards, float 3s ease-in-out infinite";
      buddha.style.animationDelay = "0.5s, 2.5s";
    }

    const quoteArea = document.getElementById("quote-area-lite");
    quoteArea.textContent = "";
    const quote = getUniqueQuote(quotes.liteQuotes);
    typeWriterEffect(quoteArea, quote);
  }, 1000);
}

function showAnotherLiteQuote() {
  const quoteArea = document.getElementById("quote-area-lite");
  const quote = getUniqueQuote(quotes.liteQuotes);
  quoteArea.textContent = "";
  typeWriterEffect(quoteArea, quote);
}

// ✅ 돌아가기 버튼 기능 (공통)
function backToMain() {
  const classic = document.getElementById("classic-screen");
  const lite = document.getElementById("lite-screen");
  const main = document.getElementById("main-screen");
  const bg = document.getElementById("main-bg");

  if (classic) classic.style.display = "none";
  if (lite) lite.style.display = "none";
  if (main) main.style.display = "flex";

  if (bg) {
    bg.style.opacity = 0;
    setTimeout(() => {
      bg.src = "images/pixel-temple-bg.png";
      bg.style.opacity = 1;
    }, 300);
  }

  const quoteArea = document.getElementById("quote-area");
  if (quoteArea) quoteArea.innerText = "";
}

// ✅ 고양이 버튼 동작 (숨김 + 이동 효과)
const cat = document.getElementById('ninja-cat');
let posX = 100;
let posY = 100;
let speedX = 1.2;
let speedY = 0.9;

function moveCat() {
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  const catW = cat.offsetWidth;
  const catH = cat.offsetHeight;

  posX += speedX;
  posY += speedY;

  if (posX <= 0 || posX + catW >= screenW) speedX *= -1;
  if (posY <= 0 || posY + catH >= screenH) speedY *= -1;

  cat.style.left = posX + 'px';
  cat.style.top = posY + 'px';

  if (Math.random() < 0.01) {
    cat.style.opacity = 0;
    setTimeout(() => {
      cat.style.opacity = 1;
    }, 1500);
  }

  requestAnimationFrame(moveCat);
}

moveCat();

cat.addEventListener('click', () => {
  enterLiteMode();
});
cat.addEventListener('click', () => {
  const popup = document.getElementById("cat-popup");
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
  const moktak = document.querySelector('.moktak-wrapper');
const cat = document.getElementById('ninja-cat');

// 모바일 및 PC에서 목탁 터치/클릭 시 고양이 클릭 무시
function disableCatClick() {
  cat.style.pointerEvents = 'none';
  setTimeout(() => {
    cat.style.pointerEvents = 'auto';
  }, 1500); // 1.5초 후 다시 클릭 가능
}

moktak.addEventListener('touchstart', disableCatClick); // 모바일 대응
moktak.addEventListener('mousedown', disableCatClick);  // 데스크탑 대응

});