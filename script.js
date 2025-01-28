const API_URL = "https://recherche-entreprises.api.gouv.fr/search";
const resultsTable = document.querySelector("#results-table tbody");
const searchForm = document.querySelector("#search-form");
const prevPageBtn = document.querySelector("#prev-page");
const nextPageBtn = document.querySelector("#next-page");
const currentPageSpan = document.querySelector("#current-page");
const loadingDiv = document.querySelector("#loading");

let currentPage = 1;
let lastQuery = {};

// Fonction pour rechercher des entreprises
async function searchCompanies(postalCode, nafCode, page) {
  try {
    loadingDiv.style.display = "block";
    resultsTable.innerHTML = "";
    document.getElementById('results-info').style.display = "none";
    
    const queryParams = new URLSearchParams({
      activite_principale: nafCode,
      code_postal: postalCode,
      page: page,
      per_page: 10,
      etat_administratif: 'A'
    });

    const response = await fetch(`${API_URL}?${queryParams}`);
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    
    const data = await response.json();
    
    // Mise à jour des informations de pagination
    document.getElementById('total-results').textContent = data.total_results;
    document.getElementById('current-page-info').textContent = data.page;
    document.getElementById('total-pages').textContent = data.total_pages;
    document.getElementById('results-info').style.display = "block";
    
    if (data.total_results === 0) {
      const row = document.createElement("tr");
      row.innerHTML = '<td colspan="5" style="text-align: center;">Aucune entreprise trouvée pour ces critères</td>';
      resultsTable.appendChild(row);
      togglePagination(0, 1);
      return;
    }
    
    displayResults(data.results);
    togglePagination(data.total_pages, page);
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    const errorMessage = error.message.includes('HTTP') 
      ? "Le service de recherche est temporairement indisponible. Veuillez réessayer plus tard."
      : "Une erreur s'est produite lors de la recherche. Veuillez vérifier vos critères et réessayer.";
    alert(errorMessage);
  } finally {
    loadingDiv.style.display = "none";
  }
}

// Affichage des résultats
function displayResults(companies) {
  if (!companies || companies.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="5" style="text-align: center;">Aucun résultat trouvé</td>';
    resultsTable.appendChild(row);
    return;
  }

  companies.forEach((company) => {
    const row = document.createElement("tr");
    
    // Récupération du dirigeant
    const dirigeant = company.dirigeants && company.dirigeants[0]
      ? `${company.dirigeants[0].prenoms} ${company.dirigeants[0].nom}`
      : "Non renseigné";

    // Récupération du SIRET et de l'adresse du siège
    const siege = company.siege || {};
    const siret = company.siege?.siret || "Non renseigné";
    const adresse = siege.adresse || "Non renseigné";

    // Création des cellules avec data-full-content pour le hover
    const cells = [
      { content: company.nom_complet || "Non renseigné" },
      { content: siret },
      { content: dirigeant },
      { content: adresse },
      { content: siege.code_postal || "Non renseigné" }
    ];

    row.innerHTML = cells.map(cell => `
      <td data-full-content="${escapeHtml(cell.content)}">${escapeHtml(cell.content)}</td>
    `).join('');

    resultsTable.appendChild(row);
  });
}

// Fonction pour échapper les caractères HTML
function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Gestion de la pagination
function togglePagination(totalPages, page) {
  prevPageBtn.disabled = page <= 1;
  nextPageBtn.disabled = page >= totalPages;
  currentPageSpan.textContent = `Page : ${page}`;
}

// Gestionnaire de soumission du formulaire
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const postalCode = document.querySelector("#postal-code").value.trim();
  const nafCode = document.querySelector("#naf-code").value.trim();
  
  if (!postalCode || !nafCode) {
    alert("Veuillez remplir tous les champs");
    return;
  }
  
  currentPage = 1;
  lastQuery = { postalCode, nafCode };
  searchCompanies(postalCode, nafCode, currentPage);
});

// Gestion des boutons de pagination
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    searchCompanies(lastQuery.postalCode, lastQuery.nafCode, currentPage);
  }
});

nextPageBtn.addEventListener("click", () => {
  currentPage++;
  searchCompanies(lastQuery.postalCode, lastQuery.nafCode, currentPage);
});
