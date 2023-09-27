const articlesContainer = document.getElementById("articles");
const searchInput = document.getElementById("searchInput");
const filteredArticles = document.getElementById("filteredArticles");

let articlesJSON; // Variable pour stocker les articles

// Charger les articles depuis le fichier JSON
fetch('data/articles.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(loadedArticles) {
        articlesJSON = loadedArticles; // Stocker les articles chargés
        displayArticles(articlesJSON.articles);
    })
    .catch(function(error) {
        console.error('Erreur de chargement du fichier JSON :', error);
    });

// Fonction pour afficher les articles dans le conteneur
function displayArticles(articles) {
    articlesContainer.innerHTML = ""; // Effacer le contenu actuel
    articles.forEach(function(article) {
        let card = document.createElement("div");

        card.className ="mx-3 flex flex-col bg-white border border-1 rounded-lg shadow-xl sm:shrink-0 sm:grow sm:basis-0 mb-10";    
        card.innerHTML = `
            <a href="#!">
                <img class="rounded-t" width="500" height="500" src="${article.image}" alt="article image"
                    onmouseover="this.src='${article.hover}'" 
                    onmouseout="this.src='${article.image}'"/>
            </a>
            <div class="p-6">
                <div class="flex justify-between items-center">
                    <h5 class="mb-2 font-amiri font-bold leading-tight text-xl text-neutral-800"> 
                        ${article.nom}
                    </h5>
                    <span class="mb-2 font-amiri font-bold leading-tight text-xl text-neutral-800">
                        ${article.prix.toFixed(2)} EUR
                    </span>
                </div>
                <p class="font-maitree text-base text-neutral-600">
                    ${article.designation}
                </p>
            </div>
        `;
        articlesContainer.appendChild(card);
    });
}

// Gestionnaire d'événements pour la recherche
searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = articlesJSON.articles.filter(function(article) {
        // Filtrer les articles en fonction du terme de recherche
        return (
            article.nom.toLowerCase().includes(searchTerm) ||
            article.designation.toLowerCase().includes(searchTerm) ||
            article.prix.toFixed(2).includes(searchTerm)
        );
    });
    displayArticles(filtered); // Afficher les articles filtrés
});