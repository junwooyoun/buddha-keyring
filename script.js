const classicQuotes = [
    "모든 것은 인연 따라 생기고, 인연 따라 사라진다.",
    "마음이 고요하면, 세상도 고요해진다.",
    "고통도 머무르지 않는다.",
    "지금 이 순간, 숨을 쉬는 너는 살아 있다.",
    "집착을 놓는 순간, 너는 자유롭다.",
    "자비는 나 자신에게 먼저 베풀어야 한다.",
    "마음이 곧 부처다.",
    "너는 그대로도 충분하다."
  ];
  
  const liteQuotes = [
    "번뇌를 놓는 순간, 야근도 놓고 싶어진다.",
    "집착을 놓으면 택시도 잘 잡힌다.",
    "자비롭게 살라 했지, 회식까지 하란 소린 아니었다.",
    "숨 한번 크게 쉬고, 아무것도 하지 마라. (진심)",
    "깨달음은 멀리 있지 않다. 보통은 화장실 가는 길에 온다.",
    "불성을 찾으려다 지각했다.",
    "마음 비웠는데 배도 고프다.",
    "욕망을 버리면… 커피는 남는다."
  ];
  
  function showClassic() {
    const random = Math.floor(Math.random() * classicQuotes.length);
    document.getElementById("quote").innerText = classicQuotes[random];
  }
  
  function showLite() {
    const random = Math.floor(Math.random() * liteQuotes.length);
    document.getElementById("quote").innerText = liteQuotes[random];
  }
  
  function resetQuote() {
    document.getElementById("quote").innerText = "버튼을 눌러보세요.";
  }
  