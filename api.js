const API_KEY="d1c9023f66694dbd959387eea1663b17";
// const API_KEY="79eae53414dd4284ab3e47b23b300ee4"
const url= "https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchNews("India"));
function reload() {
    window.location.reload();
}
async function fetchNews(query) {
  const res= await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}
  function bindData(article){
    const cardsConatiner=document.getElementById('card_container');
    const newstemplate=document.getElementById('new');
    cardsConatiner.innerHTML='';
    article.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone= newstemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsConatiner.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector("#news-img");
    const newsTitle=cardClone.querySelector("#news-title");
    const newsSource=cardClone.querySelector("#news-source");
    const newsDesc=cardClone.querySelector("#news-desc");

    newsImg.src= article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date = new Date(article.pulishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
  newsSource.innerHTML=`${article.source.name} ${date}`;
  cardClone.firstElementChild.addEventListener("click",()=>{
     window.open(article.url,"_blank");
  });
}
let curSelectedNav = null;
function onNavItemClick(id){
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav=navItem;
  curSelectedNav.classList.add("active");
}
const searchButton = document.getElementById("search_button");
const searchText = document.getElementById("search_text");

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
