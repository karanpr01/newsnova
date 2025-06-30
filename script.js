

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
setInterval(getQuotes, 10000);



// News ApI


const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=10&apikey=${apikey}`;

async function getBreakingNews() {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();

        if (!data.articles || data.articles.length === 0) {
            console.log("No breaking news found.");
            return;
        }

        const article = data.articles[0];
        console.log(article);
        

        const articlePage = document.getElementById("hero");

        articlePage.innerHTML = `
          <h1>${article.title}</h1>
          <p>${formatPublishedDate(article.publishedAt)} | ${article.source.name}</p>
          <img src="${article.image}" class="featured-image" />
          <p style="margin-top:1rem;">${article.description}</p>
           <button>
                    <a href="${article.url}" target ="_blank">Read More →</a>
                </button>
        `;

    }
    catch (err) {
        console.error('❌ Failed to load news:', err);
        document.getElementById('article').innerHTML = `<p style="color:red;">Error loading news: ${err.message}</p>`;
    }


}

getBreakingNews();

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



