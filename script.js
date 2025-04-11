let classicQuotes = [];
let liteQuotes = [];

let usedClassic = [];
let usedLite = [];
let history = [];

let quotesLoaded = false;

fetch('data/quotes.json')
  .then(response => response.json())
  .then(data => {
    classicQuotes = [...data.classicQuotes];
    liteQuotes = [...data.liteQuotes];
    quotesLoaded = true;
  })
  .catch(error => {
    console.error("문구 파일 로딩 실패 ❌", error);
    document.getElementById("quote").innerText = "문구를 불러오지 못했습니다.";
  });

function showClassic() {
  if (!quotesLoaded) {
    document.getElementById("quote").innerText = "불경을 읽는 중입니다... 잠시만요 🧘‍♂️";
    return;
  }

  if (classicQuotes.length === 0) {
    classicQuotes = [...usedClassic];
    usedClassic = [];
  }

  const index = Math.floor(Math.random() * classicQuotes.length);
  const quote = classicQuotes.splice(index, 1)[0];
  usedClassic.push(quote);

  displayQuote(quote, "images/buddha_classic.png");
}

function showLite() {
  if (!quotesLoaded) {
    document.getElementById("quote").innerText = "부처님이 유머 모드로 입장 중입니다... 😂";
    return;
  }

  if (liteQuotes.length === 0) {
    liteQuotes = [...usedLite];
    usedLite = [];
  }

  const index = Math.floor(Math.random() * liteQuotes.length);
  const quote = liteQuotes.splice(index, 1)[0];
  usedLite.push(quote);

  displayQuote(quote, "images/buddha_funny.png");
}

function displayQuote(quote, imagePath) {
  document.getElementById("quote").innerText = quote;
  document.getElementById("buddha-img").src = imagePath;

  if (!history.includes(quote)) {
    history.push(quote);
    updateHistoryUI();
  }
}

function toggleHistory() {
  const box = document.getElementById("history-box");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

function updateHistoryUI() {
  const list = document.getElementById("history-list");
  list.innerHTML = "";
  history.forEach((q) => {
    const li = document.createElement("li");
    li.innerText = q;
    list.appendChild(li);
  });
}
