// Sprint 2 — Pessoa 2: renderize, abra e feche o carrinho.
// Sprint 3 — Pessoa 1: conecte a remoção de cada item.
function renderizarCarrinho() {
    const areaProdutos = document.querySelector(".cart__products");

    areaProdutos.innerHTML = "";

    let total = 0;

    if (carrinho.length === 0) {
        areaProdutos.innerHTML = `
            <p>Seu carrinho está vazio.</p>
        `;

        document.querySelector(".total").textContent = formatarPreco(0);

        return;
    }

    for (const item of carrinho) {
        const livro = dados.livros.find(function (livro) {
            return livro.id === item.id;
        });

        if (!livro) {
            continue;
        }

        const produto = document.createElement("div");

        produto.classList.add("cart__product");

        const valorDaLinha = livro.preco * item.quantidade;

        total += valorDaLinha;

        produto.innerHTML = `
            <div class="cart-mini-cover book-cover--${livro.cor}">
                <b>p.42</b>
            </div>

            <div class="cart__product-info">
                <h3>${livro.titulo}</h3>

                <p>
                    Quantidade: ${item.quantidade}
                </p>

                <strong>
                    ${formatarPreco(valorDaLinha)}
                </strong>
            </div>

            <button class="remove" type="button">
                Remover
            </button>
        `;

        const botaoRemover = produto.querySelector(".remove");

        botaoRemover.addEventListener("click", function () {
            carrinho = carrinho.filter(function (itemDoCarrinho) {
                return itemDoCarrinho.id !== item.id;
            });

            salvarCarrinho();

            renderizarCarrinho();
        });

        areaProdutos.appendChild(produto);
    }

    document.querySelector(".total").textContent = formatarPreco(total);
}


function abrirCarrinho() {
    const carrinhoPainel = document.querySelector(".cart");
    const fundo = document.querySelector(".cart-backdrop");
    const botaoCarrinho = document.querySelector(".cart-trigger");

    carrinhoPainel.classList.add("cart--active");
    fundo.classList.add("cart-backdrop--active");

    carrinhoPainel.setAttribute("aria-hidden", "false");
    botaoCarrinho.setAttribute("aria-expanded", "true");
}


function fecharCarrinho() {
    const carrinhoPainel = document.querySelector(".cart");
    const fundo = document.querySelector(".cart-backdrop");
    const botaoCarrinho = document.querySelector(".cart-trigger");

    carrinhoPainel.classList.remove("cart--active");
    fundo.classList.remove("cart-backdrop--active");

    carrinhoPainel.setAttribute("aria-hidden", "true");
    botaoCarrinho.setAttribute("aria-expanded", "false");
}


const botaoCarrinho = document.querySelector(".cart-trigger");
const botaoFechar = document.querySelector(".cart__close");
const fundoCarrinho = document.querySelector(".cart-backdrop");

botaoCarrinho.addEventListener("click", abrirCarrinho);

botaoFechar.addEventListener("click", fecharCarrinho);

fundoCarrinho.addEventListener("click", fecharCarrinho);

renderizarCarrinho();

