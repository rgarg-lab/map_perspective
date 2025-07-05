async function summarizeHeadlinesAndShowImage() {
  const allCards = document.querySelectorAll(".news-card h3, .article-card h4");
  const headlines = Array.from(allCards).map(card => card.textContent.trim());

  if (headlines.length === 0) {
    alert("No headlines available to summarize.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ headlines })
    });

    const data = await res.json();
    const summary = data.summary || "No summary available.";
    drawSummaryImage(summary);
  } catch (err) {
    console.error("❌ Summary fetch failed:", err);
    alert("Failed to generate summary.");
  }
}
function drawSummaryImage(summary) {
  const canvas = document.getElementById("summaryCanvas");
  const ctx = canvas.getContext("2d");
  canvas.style.display = "block";

  ctx.fillStyle = "#fffaf0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#333";
  ctx.font = "20px Arial";
  ctx.fillText("📰 Summary of Headlines", 20, 40);

  ctx.font = "16px sans-serif";
  const words = summary.split(" ");
  let line = "", x = 20, y = 70;

  words.forEach(word => {
    const testLine = line + word + " ";
    if (ctx.measureText(testLine).width > canvas.width - 40) {
      ctx.fillText(line, x, y);
      line = word + " ";
      y += 25;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line, x, y);
}

