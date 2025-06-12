document.addEventListener("DOMContentLoaded", async () => {
  const apiKey = "pub_a4205f3a55074662b93c1a172d209daf";
  const breakingNewsAPI = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&q=breaking`;

  try {
    const response = await fetch(breakingNewsAPI);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.log("No news articles found.");
      return;
    }

    function truncateText(text, maxLength) {
  if (!text) return "No description available.";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

    const articles = data.slice(0, 4); // You have 4 cards: div1, div2, div3, div4

    articles.forEach((article, index) => {
      const card = document.querySelector(`.div${index + 1}`);
      if (card) {
        const img = card.querySelector("img");
        const title = card.querySelector("h2");
        const desc = card.querySelector("p");

        img.src = article.image_url || "https://via.placeholder.com/300";
        title.textContent = article.title || "No Title";
        desc.textContent = truncateText(article.description, 120); // or 100–150 chars  
      }
    });

  } catch (error) {
    console.log("Error fetching news:", error);
  }
});
