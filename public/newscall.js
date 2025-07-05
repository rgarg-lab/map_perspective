function getCleanDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "").toLowerCase();
  } catch {
    return "unknown";
  }
}

async function getNews() {
  const topic = document.getElementById("topicInput").value;
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
      console.log(`🗞️ News in ${clickedLocation.place} for topic "${topic}":`);
      data.results.slice(0, 5).forEach((article, index) => {
        const domain = getCleanDomain(article.link);
        const bias = biasMap[domain] || "Unknown";

        console.log(`${index + 1}. ${article.title}`);
        console.log(`   ${article.description}`);
        console.log(`   Source: ${domain} | Bias: ${bias} | ${article.pubDate}`);
        console.log(`   🔗 ${article.link}`);
      });
    } else {
      console.log("⚠️ No news articles found for this country/topic.");
    }
  } catch (error) {
    console.error("❌ Failed to fetch news:", error);
  }
}
