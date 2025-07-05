function getCleanDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "").toLowerCase();
  } catch {
    return "unknown";
  }
}

async function getNews() {
  const topic = document.getElementById("topicInput").value;
  const newsPanel = document.getElementById("newsPanel");
  newsPanel.innerHTML = ""; // Clear panel

  if (!topic || !countryCode) {
    alert("Please click a country on the map and enter a topic.");
    return;
  }

  const API_KEY = "pub_a34e5950edf9462aa8a5d14c4c79fe98";
  const apiUrl = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${encodeURIComponent(topic)}&country=${countryCode}&language=en`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.status === "success" && data.results?.length) {
      const articles = data.results.slice(0, 5);

      articles.forEach((article) => {
        const domain = getCleanDomain(article.link);
        const bias = biasMap[domain] || "Unknown";

        const card = document.createElement("div");
        card.className = "news-card";

        card.innerHTML = `
  <h3>${article.title}</h3>
  <p><em>${article.creator?.[0] || "Unknown"} | ${new Date(article.pubDate).toLocaleDateString()}</em></p>
  <p>${article.description || "No description available."}</p>
  <p><strong>Source:</strong> ${domain}</p>
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
