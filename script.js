//* Dark mode button
const btn = document.querySelector(".theme");
const body = document.body;
const icon = document.getElementById("themeicon")


function updateButton(theme) {
    if (theme === 'dark') {
        icon.className = "fa-solid fa-sun fa-2x"; // ☀️ icon

    } else {
        icon.className = "fa-solid fa-moon fa-2x"; // 🌙 icon
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



//* Current Date

const date = new Date()
const year = date.getFullYear()
const month = date.toLocaleString('default', { month: "long" })
const day = date.getDate()
const displyaDate = document.getElementById("date")

displyaDate.innerText = `${month} ${day}, ${year}`;


//* Tags deisgn

const tags = document.querySelectorAll("li")

// console.log(tags);

tags.forEach(tag => {
    tag.addEventListener("click", function () {

        tags.forEach(t => t.classList.remove("active"))

        tag.classList.add("active")

        console.log(`tag cilcked:${tag.innerText}`);

    })
})



//* Api request

const apiKey = "pub_91f38af71b024abba962d84f73383b6c"
const api = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&q=breaking`;

let getNews = async () => {
    try {
        const response = await fetch(api)
        const data = await response.json()

        console.log(data);

        // data.results.forEach((article, index) => {
        //     console.log(`--- Article ${index + 1} ---`);
        //     console.log("Title:", article.title);
        //     console.log("Description:", article.description);
        //     console.log("Image URL:", article.image_url);
        //     console.log("Published At:", article.pubDate);
        //     console.log("URL:", article.link);
        // });

        const article = data.results[0]

        const heroNews = document.getElementById("hero-news")
        heroNews.innerHTML = ''

        heroNews.innerHTML = `
                <div class="hero">
                <div class="img">
                    <img src="${article.image_url || 'https://images.pexels.com/photos/73871/rocket-launch-rocket-take-off-nasa-73871.jpeg'}"
                        alt="news-img" width="280px">
                </div>
                <div class="text">
                    <div class="tag"> ${article.source_name} || Science</div>
                    <div class="title">
                        <h2>${article.title || 'Exciting Advances in Space Exploration'}</h2>
                    </div>
                    <div class="desc">
                        <p>${article.description || 'Faild to load data'} </p>
                    </div>
                    <div class="btn"><a href="${article.link} target="_blank">Read Full Article</a></div>
                </div>
            </div>`

        




      
        



    } catch (error) {
        console.log(`Error fetching data:${error}`);

    }
}

// getNews()