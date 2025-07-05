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

  // Show temporary loading message
  document.getElementById("controls").innerHTML = "<p>Loading news POV... ⏳</p>";

  // Wait 7 seconds before fetching (simulate animation/loading)
  setTimeout(async () => {
    const API_KEY = "pub_a34e5950edf9462aa8a5d14c4c79fe98";
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${encodeURIComponent(topic)}&country=${countryCode}&language=en`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.status === "success" && data.results?.length) {
        // Call the function from splitNewsByBias.js
        splitAndDisplayNews(data.results.slice(0, 15)); // Limit to 15 articles max
      } else {
        alert("⚠️ No news found for this topic/country.");
      }
    } catch (err) {
      console.error("❌ News fetch error:", err);
      alert("Something went wrong while fetching news.");
    }
  }, 7000); // delay in milliseconds (7000ms = 7s)
}

