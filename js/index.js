// Sprint 1 — Pessoa 1: implemente renderizarCatalogo().
// Consulte o modelo de card em modelos.md.



function renderizarCatalogo() {
  const lista = document.querySelector(".products__list");

  lista.innerHTML = "";

  for (const livro of dados.livros) {
    const card = document.createElement("article");

    card.classList.add("book-card");

    card.innerHTML = `
      <div class="book-cover book-cover--${livro.cor}">
        <h3>${livro.titulo}</h3>
        <small>${livro.autor}</small>
        <b>p.42</b>
      </div>

      <div class="book-card__details">
        <h3>${livro.titulo}</h3>
        <span>${livro.autor}</span>

        <div>
          <strong>${formatarPreco(livro.preco)}</strong>

          <a href="./product.html?id=${livro.id}">
            Ver detalhes
          </a>
        </div>
      </div>
    `;

    lista.appendChild(card);
  }
}

renderizarCatalogo();
