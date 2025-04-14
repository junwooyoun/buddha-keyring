let previousQuote = "";
let quotes = {
  classicQuotes: [],
  liteQuotes: []
};

// JSON 불러오기
fetch('data/quotes.json')
  .then(response => response.json())
  .then(data => {
    quotes.classicQuotes = data.classicQuotes;
    quotes.liteQuotes = data.liteQuotes;
    console.log("✅ JSON 로드 성공:", quotes);
  })
  .catch(error => {
    console.error("❌ JSON 로드 실패:", error);
  });

// 타이핑 효과 함수
function typeQuote(text, elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    let index = 0;
  
    const typing = setInterval(() => {
      if (index < text.length) {
        const char = text.charAt(index);
        let span = document.createElement("span");
  
        if (char === "\n") {
          element.innerHTML += "<br>";
        } else if (char === " ") {
          span.innerHTML = "&nbsp;";
        } else {
          span.textContent = char;
        }
  
        // ✨ 스무스하게 등장하는 애니메이션
        span.style.opacity = 0;
        span.style.transition = "opacity 0.3s ease-in";
        element.appendChild(span);
        requestAnimationFrame(() => {
          span.style.opacity = 1;
        });
  
        index++;
      } else {
        clearInterval(typing);
      }
    }, 60); // ✨ 속도도 살짝 느리게
  }
  
// 명언 출력 함수
function showQuote(type) {
  const quoteArea = document.getElementById('quote-area');
  const quoteList = type === 'classic' ? quotes.classicQuotes : quotes.liteQuotes;

  if (!quoteList.length) {
    quoteArea.innerText = "📂 명언 데이터를 아직 불러오고 있어요...";
    return;
  }

  let newQuote = "";
  do {
    const randomIndex = Math.floor(Math.random() * quoteList.length);
    newQuote = quoteList[randomIndex];
  } while (newQuote === previousQuote && quoteList.length > 1);

  previousQuote = newQuote;

  // ✨ 타이핑 효과로 출력
  typeQuote(newQuote, 'quote-area');
}

// 지난 명언 보기 (선택 기능)
function showPreviousQuote() {
  const quoteArea = document.getElementById('quote-area');
  if (previousQuote) {
    quoteArea.innerText = previousQuote;
  } else {
    quoteArea.innerText = "📜 아직 명언을 뽑지 않았어요!";
  }
}
