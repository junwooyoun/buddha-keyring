let previousQuote = "";
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

// ✅ 명언 출력
function showQuote(type) {
  const area = document.getElementById('quote-area');
  const list = type === 'classic' ? quotes.classicQuotes : quotes.liteQuotes;

  if (!list.length) {
    area.innerText = "🧘‍♂️ 잠시만요, 불경을 찾는 중입니다...";
    return;
  }

  let quote = "";
  do {
    const i = Math.floor(Math.random() * list.length);
    quote = list[i];
  } while (quote === previousQuote && list.length > 1);

  previousQuote = quote;
  area.innerText = "";
  typeWriterEffect(area, quote);
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
  console.log("🔵 enterClassicMode 실행됨");

  // 기존 메인 화면 숨김
  const mainScreen = document.getElementById("main-screen");
  if (mainScreen) mainScreen.style.display = "none";

  // 배경 교체
  const bg = document.getElementById("main-bg");
  if (bg) {
    bg.style.opacity = 0;
    setTimeout(() => {
      bg.src = "images/classic-bg.png";
      bg.style.opacity = 1;
    }, 300);
  }

  // 새로운 화면 등장
  setTimeout(() => {
    const screen = document.getElementById("classic-screen");
    if (!screen) {
      console.error("❌ classic-screen 요소 없음");
      return;
    }

    screen.style.display = "flex";

    const buddha = document.querySelector(".classic-buddha");
    if (!buddha) {
      console.error("❌ classic-buddha 이미지 없음");
      return;
    }

    buddha.style.opacity = 0;
    buddha.style.animation = "zoomFade 2s ease-out forwards, float 3s ease-in-out infinite";
    buddha.style.animationDelay = "0.5s, 2.5s";

    const quoteArea = document.getElementById("quote-area-classic");
    quoteArea.innerText = "";
    const list = quotes.classicQuotes;
    if (list.length > 0) {
      const quote = list[Math.floor(Math.random() * list.length)];
      typeWriterEffect(quoteArea, quote);
    }

    console.log("✅ 부처님 + 명언 등장 완료");
  }, 1000);
}
// ✅ 진심 위로 → 메인 화면으로 돌아가기
function backToMain() {
  const mainScreen = document.getElementById("main-screen");
  const classicScreen = document.getElementById("classic-screen");
  const liteScreen = document.getElementById("lite-screen");
  const bg = document.getElementById("main-bg");

  // 화면 리셋
  if (mainScreen) mainScreen.style.display = "flex";
  if (classicScreen) classicScreen.style.display = "none";
  if (liteScreen) liteScreen.style.display = "none";

  // 배경 원복
  if (bg) {
    bg.style.opacity = 0;
    setTimeout(() => {
      bg.src = "images/pixel-temple-bg.png";
      bg.style.opacity = 1;
    }, 300);
  }

  // 명언도 싹 정리
  const quoteArea = document.getElementById("quote-area");
  const quoteAreaClassic = document.getElementById("quote-area-classic");
  const quoteAreaLite = document.getElementById("quote-area-lite");

  if (quoteArea) quoteArea.innerText = "";
  if (quoteAreaClassic) quoteAreaClassic.innerText = "";
  if (quoteAreaLite) quoteAreaLite.innerText = "";
}

  // 명언 영역 초기화 (깔끔하게)
  const quoteArea = document.getElementById("quote-area");
  if (quoteArea) quoteArea.innerText = "";

  // 진심위로 페이지에서 다른 문구 보기
function showAnotherClassicQuote() {
  const quoteArea = document.getElementById("quote-area-classic");
  const list = quotes.classicQuotes;

  if (!list.length) {
    quoteArea.innerText = "🧘‍♂️ 잠시만요, 불경을 다시 찾는 중입니다...";
    return;
  }

  let quote = "";
  do {
    const i = Math.floor(Math.random() * list.length);
    quote = list[i];
  } while (quote === previousQuote && list.length > 1);

  previousQuote = quote;
  quoteArea.innerText = "";
  typeWriterEffect(quoteArea, quote);
}
 // 웃음 위로 모드 진입 
function enterLiteMode() {
  console.log("🟡 enterLiteMode 실행됨");

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
    if (!screen) {
      console.error("❌ lite-screen 요소 없음");
      return;
    }
    screen.style.display = "flex";

    const buddha = screen.querySelector(".classic-buddha");
    if (!buddha) {
      console.error("❌ lite 부처 이미지 없음");
      return;
    }

    buddha.style.opacity = 0;
    buddha.style.animation = "zoomFade 2s ease-out forwards, float 3s ease-in-out infinite";
    buddha.style.animationDelay = "0.5s, 2.5s";

    const quoteArea = document.getElementById("quote-area-lite");
    quoteArea.textContent = "";
    const list = quotes.liteQuotes;
    if (list.length > 0) {
      const quote = list[Math.floor(Math.random() * list.length)];
      typeWriterEffect(quoteArea, quote);
    }

    console.log("✅ 웃음 부처님 + 명언 등장 완료");
  }, 1000);
}
// 다른 웃음 명언 보기 
function showAnotherLiteQuote() {
  const quoteArea = document.getElementById("quote-area-lite");
  const list = quotes.liteQuotes;

  if (!list.length) {
    quoteArea.textContent = "😅 잠시만요, 명랑한 불경을 찾는 중입니다...";
    return;
  }

  let quote = "";
  do {
    const i = Math.floor(Math.random() * list.length);
    quote = list[i];
  } while (quote === previousQuote && list.length > 1);

  previousQuote = quote;
  quoteArea.textContent = "";
  typeWriterEffect(quoteArea, quote);
}
