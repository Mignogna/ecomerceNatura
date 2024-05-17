import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilities.js";

const idsProdutosCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};

export function abrirCarrinho() {
  document.getElementById("carrinho").classList.remove("ocultar");
  document.getElementById("carrinho").classList.add("mostrar");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("mostrar");
  document.getElementById("carrinho").classList.add("ocultar");
}

function irParaForm() {
  if (Object.keys(idsProdutosCarrinhoComQuantidade).length === 0) {
    return;
  }
  window.location.href = "./form.html";
}

export function inicializarCarrinho() {
  fecharCarrinho();
  const btnFecharCarrinho = document.getElementById("fechar-carrinho");
  const btnAbrirCarrinho = document.getElementById("abrir-carrinho");
  const btnIrParaForm = document.getElementById("comprar");

  btnFecharCarrinho.addEventListener("click", fecharCarrinho);
  btnAbrirCarrinho.addEventListener("click", abrirCarrinho);
  btnIrParaForm.addEventListener("click", irParaForm);
}

function removerDoCarrinho(idProduto) {
  delete idsProdutosCarrinhoComQuantidade[idProduto];
  salvarLocalStorage("carrinho", idsProdutosCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutosCarrinhoComQuantidade[idProduto]++;
  salvarLocalStorage("carrinho", idsProdutosCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarQuantidadeProduto(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
  if (idsProdutosCarrinhoComQuantidade[idProduto] === 1) {
    removerDoCarrinho(idProduto);
    return;
  }
  idsProdutosCarrinhoComQuantidade[idProduto]--;
  salvarLocalStorage("carrinho", idsProdutosCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarQuantidadeProduto(idProduto);
}

function atualizarQuantidadeProduto(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText =
    idsProdutosCarrinhoComQuantidade[idProduto];
}

function desenharProdutosNoCarrinho(idProduto) {
  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");

  const elementCart = document.createElement("li");

  const cartaoProdutoCarrinho = `
  <button class="btn-fechar-produto-carrinho" id="remover-item-${produto.id}">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg>
  </button>
  <img 
  src=${produto.imagem}
  
  alt= Carrinho: ${produto.nome}
  class="img-cart"
  />
  <div class="description-cart">
  <p>${produto.nome}</p>
  <p>R$ ${produto.preco},00</p>
  </div>
  <div class="quantidade">
  <button class="incrementar" id="incrementar-quantidade-${
    produto.id
  }"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(264, 230, 197)" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>
</button>
  
<p class="numero" id="quantidade-${produto.id}">${
    idsProdutosCarrinhoComQuantidade[produto.id]
  }</p>
  <button class="decrementar" id="decrementar-quantidade-${
    produto.id
  }"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(246, 230, 197)" class="bi bi-dash" viewBox="0 0 16 16">
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
</svg>
</button>
  </div>

  `;

  elementCart.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementCart);

  document
    .getElementById(`incrementar-quantidade-${produto.id}`)
    .addEventListener("click", () => incrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`decrementar-quantidade-${produto.id}`)
    .addEventListener("click", () => decrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho() {
  const containerprodutosCarrinho =
    document.getElementById("produtos-carrinho");
  containerprodutosCarrinho.innerHTML = "";
  for (const idProduto in idsProdutosCarrinhoComQuantidade) {
    desenharProdutosNoCarrinho(idProduto);
  }
}

export function adicionarCarrinho(idProduto) {
  if (idProduto in idsProdutosCarrinhoComQuantidade) {
    incrementarQuantidadeProduto(idProduto);
    return;
  }
  idsProdutosCarrinhoComQuantidade[idProduto] = 1;
  salvarLocalStorage("carrinho", idsProdutosCarrinhoComQuantidade);
  desenharProdutosNoCarrinho(idProduto);
  atualizarPrecoCarrinho();
}
export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById("preço-total");
  let precoTotalCarrinho = 0;
  for (const idProdutoNoCarrinho in idsProdutosCarrinhoComQuantidade) {
    precoTotalCarrinho +=
      catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
      idsProdutosCarrinhoComQuantidade[idProdutoNoCarrinho];
  }
  precoCarrinho.innerText = `Preço total: R$ ${precoTotalCarrinho},00`;
}
