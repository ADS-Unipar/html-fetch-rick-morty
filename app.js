 // Pega o número da página da URL, se houver
let totalPages = 0; // Variável para armazenar o total de páginas

async function fetchCharacters(page) {
    const API_URL = `https://rickandmortyapi.com/api/character?page=${page}`
    try {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    totalPages = data.info.pages; // Armazena o total de páginas
    window.location.hash = page; // Atualiza o hash da URL com a página atual
    exibirPersonagens(page, data.results); // Passa a página atual e os personagens para a função de exibição
    } catch(error) {
        console.error("Erro ao buscar personagens:", error);
        return {error: "Erro ao buscar personagens"};
    }
}

function exibirPersonagens(page, personagens) {
    const container = document.getElementById('personagens');

    // Usamos 'map' para transformar CADA personagem em uma string HTML
    const htmlPersonagens = personagens.map(personagem => {
        return `
            <article class="card">
                <img src="${personagem.image}" alt="${personagem.name}">
                <div class="card-info">
                    <h3>${personagem.name}</h3>
                    <p>Status: ${personagem.status}</p>
                    <p>Espécie: ${personagem.species}</p>
                </div>
            </article>
        `;
    }).join(''); // Junta todas as strings em uma só

    const paginationContainer = `
    <div class="pagination">
        <button onclick="fetchCharacters(${page - 1})" id="prev" ${page <= 1 ? 'disabled' : ''}>Anterior</button>
        <span>Página ${page} de ${totalPages}</span>
        <button onclick="fetchCharacters(${page + 1})" id="next" ${page >= totalPages ? 'disabled' : ''}>Próxima</button>
    </div>
    `
    // Insere o HTML gigante no container de uma vez
    container.innerHTML = htmlPersonagens + paginationContainer;
}

window.addEventListener("DOMContentLoaded", async () => {
    const page = Number(window.location.hash.slice(1)) || 1;
    fetchCharacters(page);
})
