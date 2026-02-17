function unlockCalculator() {
  const name = document.getElementById("userName").value;
  const phone = document.getElementById("userPhone").value;

  if (name === "" || phone === "") {
    alert("Please enter name and phone number");
    return;
  }

  document.querySelector(".lead-box").classList.add("hidden");
  document.getElementById("calculatorArea").classList.remove("hidden");
}

function switchCalculator() {
  document.querySelectorAll(".calc-box").forEach(box => {
    box.classList.add("hidden");
  });

  const type = document.getElementById("calculatorType").value;
  if (type === "sip") document.getElementById("sipCalc").classList.remove("hidden");
  if (type === "term") document.getElementById("termCalc").classList.remove("hidden");
  if (type === "retirement") document.getElementById("retirementCalc").classList.remove("hidden");
}

function calculateSIP() {
  const P = Number(document.getElementById("sipAmount").value);
  const years = Number(document.getElementById("sipYears").value);
  const rate = Number(document.getElementById("sipReturn").value) / 100 / 12;
  const n = years * 12;

  if (!P || !years || !rate) {
    alert("Please fill all SIP fields");
    return;
  }

  const futureValue = P * ((Math.pow(1 + rate, n) - 1) / rate) * (1 + rate);
  const invested = P * n;

  document.getElementById("sipResult").innerHTML =
    `Total Invested: ₹${invested.toLocaleString()} <br>
     Final Value: ₹${Math.round(futureValue).toLocaleString()}`;
}
