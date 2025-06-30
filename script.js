

//* Gsap 
let tl = gsap.timeline({paused: true });


tl.to(".nav-links",{
    right:"0",
    duration:0.6
})

tl.from(".nav-links h4",{
    x:150,
    duration:0.7,
    stagger:0.25,
    opacity:0
})

tl.from(".nav-links i",{
    opacity:0
})



let navbar = document.querySelector(".menu")
let cross = document.querySelector(".cancel")

navbar.addEventListener("click",function(){
    tl.play()
    
})

cross.addEventListener("click", function(){
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

let allArticles = [];       // Holds full list of articles
let currentIndex = 0;       // Index to track shown articles
const batchSize = 3;        // How many articles to show per click

const articlePage = document.getElementById("hero");
const loadMoreBtn = document.getElementById("loadMore");
const statusMessage = document.getElementById("status-message");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function formatPublishedDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function renderNextBatch() {
  const nextArticles = allArticles.slice(currentIndex, currentIndex + batchSize);
  nextArticles.forEach((article) => {
    const articleHTML = `
      <div class="news-card">
        <h2>${article.title}</h2>
        <p>${formatPublishedDate(article.publishedAt)} | ${article.source.name}</p>
        <img src="${article.image}" class="featured-image" alt="News Image" />
        <p>${article.description}</p>
        <button>
          <a href="${article.url}" target="_blank" rel="noopener noreferrer">Read More →</a>
        </button>
      </div>
      <hr/>
    `;
    articlePage.innerHTML += articleHTML;
  });

  currentIndex += batchSize;

  if (currentIndex >= allArticles.length) {
    loadMoreBtn.style.display = 'none';
  }
}

async function getBreakingNews() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const data = await res.json();
    allArticles = shuffle(data.articles);
    localStorage.setItem("cachedNews", JSON.stringify(allArticles));
    localStorage.setItem("cachedTime", new Date().toISOString());

    currentIndex = 0;
    articlePage.innerHTML = '';
    statusMessage.innerHTML = '';
    renderNextBatch();
    loadMoreBtn.style.display = 'block';

  } catch (err) {
    console.error('❌ Failed to load news:', err);

    const cached = localStorage.getItem("cachedNews");
    if (cached) {
      allArticles = JSON.parse(cached);
      const cachedTime = localStorage.getItem("cachedTime");
      statusMessage.innerHTML = `🔄 Showing cached news.<br>🕒 Last updated: ${new Date(cachedTime).toLocaleString()}`;
      currentIndex = 0;
      articlePage.innerHTML = '';
      renderNextBatch();
      loadMoreBtn.style.display = 'block';
    } else {
      statusMessage.innerHTML = `❌ Failed to load news and no cached news available.`;
    }
  }
}

// Load on page
getBreakingNews();

// Refresh every 20 minutes
setInterval(getBreakingNews, 20 * 60 * 1000);

// Load more on click
loadMoreBtn.addEventListener("click", renderNextBatch);




