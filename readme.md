# Desafio em dupla — Livraria Página 42

A dupla vai completar uma livraria com duas páginas: catálogo (`index.html`) e detalhes (`product.html`). Será possível escolher um livro, adicionar ao carrinho e recuperar os itens ao trocar de página.

## Como começar

Abra `index.html` com o Live Server e trabalhe nos arquivos JavaScript indicados em cada sprint. O HTML, o CSS, os livros e as funções de apoio já estão preparados.

Consulte os [modelos dos componentes](./modelos.md) para preencher os cards, os detalhes e as linhas do carrinho. Os arquivos de atividade começam apenas com comentários; as funcionalidades aparecerão conforme você as implementar.

## Entrega obrigatória

- Mostrar os livros do catálogo e abrir os detalhes pelo ID da URL.
- Adicionar uma unidade por clique; repetir o livro aumenta sua quantidade.
- Abrir e fechar o carrinho, mostrar itens, quantidades e total.
- Salvar e recuperar o carrinho com `localStorage`.
- Remover um livro e finalizar uma compra simulada.

## Combinados da dupla

Cada pessoa tem uma task em arquivos diferentes. Ao terminar, compartilhe as alterações com sua colega e testem juntas. A próxima sprint começa depois da integração.

Usem os recursos dos slides: funções, condições, arrays, `for...of`, `find`, `filter`, `push`, `querySelector`, `innerHTML`, `createElement`, `appendChild`, `classList` e eventos. Os complementos de **URL e localStorage** estão no [guia de apoio](./guia-apoio.md), para consultar quando chegar à tarefa.

### Nomes combinados

Você já pode usar `dados.livros`, `formatarPreco(centavos)`, `lerCarrinho()` e `salvarCarrinho()`.

O array `carrinho` terá entradas como `{ id: "1", quantidade: 2 }`. Título, preço e cor continuam em `dados.livros`.

| Arquivo | Responsabilidade |
|---|---|
| `js/data.js` e `js/apoio.js` | Dados e funções de apoio fornecidos |
| `js/index.js` | Catálogo |
| `js/product.js` | Detalhes e botão de adicionar |
| `js/cart.js` | Exibição, abertura, fechamento e remoção |
| `js/checkout.js` | Finalização simulada |

## Sprint 1 — Do catálogo aos detalhes

### Pessoa 1 — Mostrar os livros

**Arquivo:** `js/index.js`.

1. Crie `renderizarCatalogo()`, selecione `.products__list` e limpe seu conteúdo.
2. Percorra `dados.livros` e crie um card por livro, usando o [modelo de card](./modelos.md#card-do-catálogo).
3. Preencha título, autor e preço; use `formatarPreco(livro.preco)`.
4. Dentro da template string, faça o link apontar para `./product.html?id=${livro.id}`.
5. Insira cada card com `appendChild` e chame a função ao carregar a página.

**Pronto quando:** todos os livros aparecem e cada card tem um link com seu próprio ID.

### Pessoa 2 — Mostrar o livro escolhido

**Arquivo:** `js/product.js`.

1. Siga a seção “Ler o ID” do [guia de apoio](./guia-apoio.md#ler-o-id-da-url).
2. Encontre o livro com `find` e guarde em `livroSelecionado`.
3. Preencha `.book-detail` com o [modelo de detalhes](./modelos.md#detalhes-do-livro): título, autor, preço e descrição. Inclua o botão `.book-detail__add`.
4. Se o ID não existir, mostre “Livro não encontrado” e o link para o catálogo.

**Teste independente:** abra diretamente `product.html?id=1`; não precisa esperar os links da colega.

**Pronto quando:** IDs diferentes mostram livros diferentes; ID ausente ou inválido mostra a mensagem.

### Integração

Abram dois livros pelo catálogo, comparem os dados e testem o retorno. Confiram o console antes de seguir.

## Sprint 2 — Adicionar e visualizar o carrinho


### Pessoa 1 — Adicionar e salvar

**Arquivo:** `js/product.js`.

1. No caminho do livro válido, selecione o botão de adicionar após criar seu HTML.
2. No clique, procure o ID de `livroSelecionado` em `carrinho` usando `find`.
3. Se existir, aumente a quantidade em 1. Se não existir, use `push` para adicionar `{ id: livroSelecionado.id, quantidade: 1 }`.
4. Chame `salvarCarrinho()`. Consulte a explicação no [guia de apoio](./guia-apoio.md#salvar-e-recuperar-o-carrinho).

**Teste independente:** clique duas vezes, confira o array no console e recarregue. O mesmo livro deve ter quantidade 2 em uma única entrada.

### Pessoa 2 — Mostrar e abrir o carrinho

**Arquivo:** `js/cart.js`.

1. Crie `renderizarCarrinho()`: limpe `.cart__products` e percorra `carrinho`.
2. Para cada entrada, encontre o livro em `dados.livros` e use o [modelo de item](./modelos.md#item-do-carrinho) para mostrar título, quantidade e valor da linha (`preco * quantidade`). Crie o elemento com `createElement` e insira com `appendChild`.
3. Some os valores e atualize `.total` com `formatarPreco(total)`. Se vazio, mostre a mensagem e total zero.
4. Crie `abrirCarrinho()` e `fecharCarrinho()`, adicionando/removendo `cart--active` no painel e `cart-backdrop--active` no fundo. Atualize `aria-hidden` do painel e `aria-expanded` do botão com `setAttribute`.
5. Conecte o botão `.cart-trigger` à abertura e `.cart__close` e `.cart-backdrop` ao fechamento.

**Teste independente:** no console, use `carrinho = [{ id: "1", quantidade: 2 }]` e chame `renderizarCarrinho()`. Isso não deve ficar no arquivo. Duas unidades de R$ 39,90 devem totalizar R$ 79,80.

### Integração

- A Pessoa 1 acrescenta `renderizarCarrinho()` e `abrirCarrinho()` depois de salvar no evento de adicionar.
- Cada página chama `renderizarCarrinho()` no final de seu script. Nos detalhes, a chamada fica fora do tratamento de ID, para funcionar também com ID inválido.
- Adicionem um livro, voltem ao catálogo, abram o carrinho e recarreguem. Os itens devem permanecer.

## Sprint 3 — Remover, finalizar e testar

### Pessoa 1 — Remover um livro

**Arquivo:** `js/cart.js`.

1. Acrescente um botão “Remover” a cada linha criada em `renderizarCarrinho()`.
2. Selecione o botão dentro do elemento daquela linha e registre seu clique.
3. Use `filter` para manter apenas as entradas com ID diferente do removido; atribua o resultado a `carrinho`.
4. Chame `salvarCarrinho()` e `renderizarCarrinho()`.

**Pronto quando:** remover exclui todas as unidades daquele título; os demais continuam; remover o último mostra a mensagem de carrinho vazio e total zero.

### Pessoa 2 — Finalizar uma compra simulada

**Arquivo:** `js/checkout.js`.

1. Registre o clique de `.checkout` uma única vez, ao carregar o arquivo.
2. Se `carrinho.length === 0`, mostre um alerta e encerre com `return`.
3. Caso contrário, mostre “Compra simulada com sucesso!” e o texto de `.total`.
4. Atribua `[]` a `carrinho`, salve, renderize novamente e feche o painel.

**Pronto quando:** finalizar vazio mostra aviso; finalizar com itens mostra o total e esvazia o carrinho, inclusive após recarregar.

### Integração e entrega

Façam juntas este percurso:

- [ ] Abrir um livro pelo catálogo e adicionar duas vezes.
- [ ] Abrir outro livro e adicionar uma vez.
- [ ] Voltar ao catálogo e conferir os dois títulos, quantidades e total.
- [ ] Recarregar e conferir os itens salvos.
- [ ] Remover um título e conferir o total.
- [ ] Finalizar e conferir que o carrinho continua vazio após recarregar.
- [ ] Abrir detalhes com ID inválido e conferir a mensagem.

Cada pessoa explica uma função que implementou. Entreguem o projeto com o percurso acima funcionando.
