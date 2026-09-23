// Sprint 1 — Pessoa 1: implemente renderizarCatalogo().
// Consulte o modelo de card em modelos.md.



function renderizarCatalogo() {
  const lista = document.querySelector(".products__list");

  lista.innerHTML = "";

  for (const livro of dados.livros) {
    const card = document.createElement("div");

    card.innerHTML = `
      <a href="./product.html?id=${livro.id}">
        <h2>${livro.titulo}</h2>
        <p>${livro.autor}</p>
        <p>${formatarPreco(livro.preco)}</p>
      </a>
    `;

    lista.appendChild(card);
  }
}

renderizarCatalogo();


