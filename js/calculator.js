let mode = "sip";

function enableCalculator() {
  document.getElementById("calculatorSection").classList.remove("disabled");
}

function switchMode(selected) {
  mode = selected;
  document.querySelectorAll(".calc-toggle button").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}

function calculate() {
  const amount = Number(document.getElementById("amount").value);
  const years = Number(document.getElementById("years").value);
  const rate = Number(document.getElementById("rate").value) / 100 / 12;

  let invested = 0, corpus = 0;

  if (mode === "sip") {
    const months = years * 12;
    invested = amount * months;
    corpus = amount * ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate);
  } else {
    invested = amount;
    corpus = amount * Math.pow(1 + rate * 12, years);
  }

  document.getElementById("invested").innerText = invested.toFixed(0);
  document.getElementById("corpus").innerText = corpus.toFixed(0);
  document.getElementById("returns").innerText = (corpus - invested).toFixed(0);

  drawChart(invested, corpus - invested);
}

/* PIE CHART */
function drawChart(invested, returns) {
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");
  canvas.width = 250;
  canvas.height = 250;

  const total = invested + returns;
  const investAngle = (invested / total) * 2 * Math.PI;

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.beginPath();
  ctx.moveTo(125,125);
  ctx.fillStyle = "#0b3c5d";
  ctx.arc(125,125,100,0,investAngle);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(125,125);
  ctx.fillStyle = "#4caf50";
  ctx.arc(125,125,100,investAngle,2*Math.PI);
  ctx.fill();
}
