
async function getNews() {
  const topic = document.getElementById("topicInput").value;
  const newsPanel = document.getElementById("newsPanel");
  newsPanel.innerHTML = "";
  if (!topic || !countryCode) {
    alert("Please click a country on the map and enter a topic.");
    return;
  }
  const API_KEY = "pub_f7ab7b5285744c268db6a47489d8024b";
  const apiUrl = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${encodeURIComponent(topic)}&country=${countryCode}&language=en`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.status === "success" && data.results?.length) {
      const articles = data.results.slice(0, 5);
      articles.forEach((article, index) => {
        const card = document.createElement("div");
        card.className = "news-card";
        const domain = (new URL(article.link)).hostname.replace("www.", "");
        const bias = window.biasMap?.[domain] || "Unknown";
        card.innerHTML = `
          <h3>${article.title}</h3>
          <p><em>${article.creator?.[0] || "Unknown"} | ${new Date(article.pubDate).toLocaleDateString()}</em></p>
          <p>${article.description || "No description available."}</p>
          <p><strong>Bias:</strong> ${bias}</p>
          <a href="${article.link}" target="_blank">Read more 🔗</a>
          <button onclick="speakText('${article.title.replace(/'/g, "")}')">🔊 Read Headline</button>
        `;
        newsPanel.appendChild(card);
      });
    } else {
      newsPanel.innerHTML = "<p>No articles found for this country/topic.</p>";
    }
  } catch (error) {
    console.error("❌ Failed to fetch news:", error);
    newsPanel.innerHTML = "<p>Error fetching articles.</p>";
  }
}
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}
