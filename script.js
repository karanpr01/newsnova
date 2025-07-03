

//* Gsap 
let tl = gsap.timeline({ paused: true });


tl.to(".nav-links", {
  right: "0",
  duration: 0.6
})

tl.from(".nav-links h4", {
  x: 150,
  duration: 0.7,
  stagger: 0.25,
  opacity: 0
})

tl.from(".nav-links i", {
  opacity: 0
})



let navbar = document.querySelector(".menu")
let cross = document.querySelector(".cancel")

navbar.addEventListener("click", function () {
  tl.play()

})

cross.addEventListener("click", function () {
  tl.reverse()

})


// * Dark Mode

const moons = document.querySelectorAll(".moon");
const suns = document.querySelectorAll(".sun");

// Function to enable dark mode
function enableDarkMode() {
  document.body.classList.add("dark");
  localStorage.setItem("theme", "dark");

  moons.forEach(m => m.classList.add("hide"));
  suns.forEach(s => s.classList.remove("hide"));
}

// Function to disable dark mode
function disableDarkMode() {
  document.body.classList.remove("dark");
  localStorage.setItem("theme", "light");

  suns.forEach(s => s.classList.add("hide"));
  moons.forEach(m => m.classList.remove("hide"));
}

// Event Listeners
moons.forEach(moon => {
  moon.addEventListener("click", enableDarkMode);
});

suns.forEach(sun => {
  sun.addEventListener("click", disableDarkMode);
});

// Check saved theme or system preference on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});







// Random quotes API
async function getQuotes() {
  try {
    const res = await fetch('https://dummyjson.com/quotes');

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();

    // Get a random quote from the list
    const randomIndex = Math.floor(Math.random() * data.quotes.length);
    const quote = data.quotes[randomIndex];

    const quoteContainer = document.getElementById("quote");

    quoteContainer.innerHTML = `
      <h2><i>"${quote.quote}"</i><br>
      — <b>${quote.author}</b></h2>
    `;

  } catch (error) {
    console.error("❌ Error fetching quotes:", error);
    document.getElementById("quote").innerHTML = `
      <p style="color: red;">❌ Failed to load quote. Please try again later.</p>
    `;
  }
}

// Initial quote
getQuotes();

// Update quote every 10 seconds (10000 ms)
setInterval(getQuotes, 60000);



// News ApI

const apikey = 'f725116e3477ec4b62f5b64412a9410f';
const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=10&apikey=${apikey}`;

const CACHE_KEY = 'cachedNews';
const CACHE_TIME_KEY = 'cachedTime';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour (in ms)

function formatPublishedDate(isoDate) {
  const date = new Date(isoDate);

  const formattedDate = date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return `${formattedDate} | ${formattedTime}`;
}

async function getBreakingNews() {
  const articlePage = document.getElementById("hero");
  articlePage.innerHTML = "<p>⏳ Loading news...</p>";

  try {
    const now = Date.now();
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

    // ✅ Check cache is fresh (within 1 hour)
    if (cachedData && cachedTime && now - new Date(cachedTime).getTime() < CACHE_DURATION) {
      console.log("✅ Using cached news");
      const articles = JSON.parse(cachedData);
      renderArticles(articles);
      return;
    }

    // 🔄 Fetch new data from API if no cache or cache expired
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      articlePage.innerHTML = "<p>No breaking news found.</p>";
      return;
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(data.articles));
    localStorage.setItem(CACHE_TIME_KEY, new Date().toISOString());

    renderArticles(data.articles);

  } catch (err) {
    console.error("❌ Failed to load news:", err);
    articlePage.innerHTML = `<p style="color:red;">❌ Error loading news: ${err.message}</p>`;
  }
}

function renderArticles(articles) {
  const articlePage = document.getElementById("hero");
  articlePage.innerHTML = ""; // Clear previous content

  articles.forEach(article => {
    const image = article.image || "https://via.placeholder.com/600x350?text=No+Image";

    articlePage.innerHTML += `
      <div class="news-card">
        <h2>${article.title}</h2>
        <p>${formatPublishedDate(article.publishedAt)} | ${article.source.name}</p>
        <img src="${image}" class="featured-image" alt="News image"/>
        <p>${article.description}</p>
        <button>
          <a href="${article.url}" target="_blank">Read More →</a>
        </button>
      </div>
      <hr/>
    `;
  });
}

// Call once on page load
getBreakingNews();



// Search News
















