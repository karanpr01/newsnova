
// * Date

const date = new Date();
const year = date.getFullYear()
const month = date.toLocaleString('default', { month: 'long' })
const day = date.getDate()
const displayDate = document.getElementById("date")
const fromatDate = `${month} ${day},
 ${year}`

displayDate.innerText = fromatDate


// end


// * Theme stwich

const btn = document.getElementById("darkmode");
const body = document.body;
const icon = document.getElementById("themeicon")


function updateButton(theme) {
    if (theme === 'dark') {
        icon.className = "fa-solid fa-sun fa-3x"; // ☀️ icon

    } else {
        icon.className = "fa-solid fa-moon fa-3x"; // 🌙 icon
    }
}


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateButton('dark');
} else {
    updateButton('light');
}


btn.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    updateButton(currentTheme);
});

// end


//* News function for hero

document.addEventListener("DOMContentLoaded", async () => {
  const apiKey = "pub_a4205f3a55074662b93c1a172d209daf";
  const breakingNewsAPI = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&q=breaking`;

  async function displayArticles(articles) {
    const sliced = articles.slice(0, 4); // use only 4 cards
    sliced.forEach((article, index) => {
      const card = document.querySelector(`.div${index + 1}`);
      if (card) {
        const img = card.querySelector("img");
        const title = card.querySelector("h2");
        const desc = card.querySelector("p");

        img.src = article.image_url || "https://via.placeholder.com/300";
        title.textContent = article.title || "No Title";
        desc.textContent =
          article.description.slice(0, 200) + "..." || "No description available.";
      }
    });
  }

  try {
    const response = await fetch(breakingNewsAPI);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("No articles in response");
    }

    // ✅ Save to localStorage
    localStorage.setItem("cachedNews", JSON.stringify(data.results));

    // ✅ Show latest news
    displayArticles(data.results);
  } catch (error) {
    console.warn("Fetching failed. Loading from cache...");

    const cached = localStorage.getItem("cachedNews");
    if (cached) {
      const articles = JSON.parse(cached);
      displayArticles(articles);
    } else {
      alert("Unable to fetch news and no cached data available.");
    }
  }
});


// end







// const apiKey = "pub_a4205f3a55074662b93c1a172d209daf";
// // const btn = document.getElementById("getNews")

// const api = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=in&q=latest`

// let getNews = async () => {
//     try {
//         const response = await fetch(api)
//         const data = await response.json()
//         console.log(data);
//         console.log(data.results);

//         if (!data.results || data.results.length === 0) {
//             console.log("No news articles found.");
//             return;
//         }

//         data.results.forEach((item, index) => {
//             console.log(`📰 News ${index + 1}`);
//             console.log("Title:", item.title || "No title");
//             console.log("Category:", item.category || "No category");
//             console.log("Published At:", item.pubDate || "No date");
//             console.log("Author:", item.creator ? item.creator.join(", ") : "Unknown");
//             console.log("Link:", item.link || "No link");
//             console.log("imgUrl:", item.image_url || "No url");
//             console.log("keyword:", item.keywords || "No keyword");
//             console.log("--------------");
//         });

//     } catch (error) {
//         console.log(error);

//     }
// }

// btn.addEventListener("click", getNews)

