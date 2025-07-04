const API_KEY = "ea0476bf230a48fb837556f86ac414db"; // Replace this!

const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

map.on('click', function () {
    const country = prompt("Enter 2-letter country code (e.g., IN, US):");
    if (!country) return;

    const category = document.getElementById("category").value;
    
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;
    if (category && category !== "") {
        url += `&category=${category}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const newsList = document.getElementById("newsList");
            newsList.innerHTML = "";

            const articles = data.articles?.slice(0, 5);
            if (!articles || articles.length === 0) {
                newsList.innerHTML = "<li>No fresh news found. Try another country or category!</li>";
                return;
            }

            articles.forEach(article => {
                const li = document.createElement("li");
                const summary = article.title.length > 80 ? article.title.slice(0, 80) + "..." : article.title;
                li.textContent = "🗞️ " + summary;
                newsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching news:", error);
            newsList.innerHTML = "<li>Oops! Couldn't load news. Check your API key or try again later.</li>";
        });
});