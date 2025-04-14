let previousQuote = "";
let quotes = {
  classicQuotes: [],
  liteQuotes: []
};

// HTML 다 불러온 다음에 실행되도록
document.addEventListener("DOMContentLoaded", () => {
  // ✅ JSON 불러오기
  fetch('data/quotes.json')
    .then(response => response.json())
    .then(data => {
      quotes.classicQuotes = data.classicQuotes;
      quotes.liteQuotes = data.liteQuotes;
      console.log("✅ JSON 불러오기 성공");
    })
    .catch(error => {
      console.error("❌ JSON 불러오기 실패:", error);
    });

  // ✅ 버튼 이벤트 연결
  const classicBtn = document.querySelector('.pixel-button:nth-child(1)');
  const liteBtn = document.querySelector('.pixel-button:nth-child(2)');

  if (classicBtn && liteBtn) {
    classicBtn.addEventListener("click", () => showQuote('classic'));
    liteBtn.addEventListener("click", () => showQuote('lite'));
  }
});

// ✅ 명언 출력 함수
function showQuote(type) {
  const quoteArea = document.getElementById('quote-area');
  const quoteList = type === 'classic' ? quotes.classicQuotes : quotes.liteQuotes;

  if (!quoteList.length) {
    quoteArea.innerText = "🧘‍♂️ 잠시만요, 아직 불경을 찾는 중입니다...";
    return;
  }

  let newQuote = "";
  do {
    const randomIndex = Math.floor(Math.random() * quoteList.length);
    newQuote = quoteList[randomIndex];
  } while (newQuote === previousQuote && quoteList.length > 1);

  previousQuote = newQuote;

  // 화면 전환
  if (type === 'classic') {
    document.getElementById("main-screen").style.display = "none";
    document.getElementById("classic-screen").style.display = "block";
  }

  quoteArea.innerText = "";
  typeWriterEffect(quoteArea, newQuote);
}



// ✅ 타이핑 효과 함수
function typeWriterEffect(element, text, i = 0) {
  if (i < text.length) {
    element.innerText += text.charAt(i);
    setTimeout(() => typeWriterEffect(element, text, i + 1), 40);
  }
}
