/* ===============================
   SIP CALCULATOR LOGIC
================================ */

function calculateSIP() {
  const amount = Number(document.getElementById("amount").value);
  const years = Number(document.getElementById("years").value);
  const rate = Number(document.getElementById("rate").value);

  if (!amount || !years || !rate) {
    alert("Please enter all values");
    return;
  }

  const monthlyRate = rate / 100 / 12;
  const months = years * 12;

  const corpus =
    amount *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate);

  const invested = amount * months;
  const returns = corpus - invested;

  // Show values
  document.getElementById("invested").innerText =
    Math.round(invested).toLocaleString();

  document.getElementById("returns").innerText =
    Math.round(returns).toLocaleString();

  document.getElementById("corpus").innerText =
    Math.round(corpus).toLocaleString();

  // Pie chart
  const investedAngle = (invested / corpus) * 360;
  document.getElementById("pie").style.background =
    `conic-gradient(
      #0b3c5d 0deg ${investedAngle}deg,
      #e1e7ec ${investedAngle}deg 360deg
    )`;

  // Fill hidden fields for backend
  document.getElementById("h_amount").value = amount;
  document.getElementById("h_years").value = years;
  document.getElementById("h_rate").value = rate;
  document.getElementById("h_invested").value = Math.round(invested);
  document.getElementById("h_returns").value = Math.round(returns);
  document.getElementById("h_corpus").value = Math.round(corpus);

  document.getElementById("result").style.display = "block";
  document.getElementById("leadBox").style.display = "block";
}

/* ===============================
   LEAD FORM SUBMISSION
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("clientForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(form).entries()
    );

    try {
      const response = await fetch("/api/save-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert("Thank you! Our advisor will contact you shortly.");
        form.reset();
      } else {
        alert("Failed to save details. Please try again.");
      }

    } catch (error) {
      console.error(error);
      alert("Server error. Please try later.");
    }
  });
});
