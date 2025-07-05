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

    // Show summary as text
    document.getElementById("summaryText").innerText = summary;
drawSummaryImage(summary);
  } catch (err) {
    console.error("❌ Summary fetch failed:", err);
    alert("Failed to generate summary.");
  }
}
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

    // ✅ Display summary text in a styled div
    const summaryDiv = document.getElementById("summaryText");
    summaryDiv.innerText = summary;
    summaryDiv.style.display = "block";
  } catch (err) {
    console.error("❌ Summary fetch failed:", err);
    alert("Failed to generate summary.");
  }
}
