import {
  apagarDoLocalStorage,
  lerLocalStorage,
  salvarLocalStorage,
  desenharProdutosNoCarrinhoSimples,
} from "./src/utilities.js";

import { atualizarPrecoCarrinho } from "./src/menucart.js";

function clearForm(address) {
  document.getElementById("rua").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
}

function fillForm(address) {
  document.getElementById("rua").value = address.logradouro;
  document.getElementById("bairro").value = address.bairro;
  document.getElementById("cidade").value = address.localidade;
  document.getElementById("estado").value = address.uf;
}

const eNumber = (number) => /^[0-9]+$/.test(number);
const validCep = (cep) => cep.length === 8 && eNumber(cep);

const searchCep = async () => {
  clearForm();
  const cep = document.getElementById("cep").value;
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  if (validCep(cep)) {
    const data = await fetch(url);
    const address = await data.json();

    if (address.hasOwnProperty("erro")) {
      document.getElementById("rua").value = "Cep não encontrado!";
    } else {
      fillForm(address);
    }
  } else {
    document.getElementById("rua").value = "CEP incorreto!";
  }
};

document.getElementById("cep").addEventListener("keyup", searchCep);

function desenharPedidosLastCheck() {
  const idsProdutosCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  for (const idProduto in idsProdutosCarrinhoComQuantidade) {
    desenharProdutosNoCarrinhoSimples(
      idProduto,
      "last-check",
      idsProdutosCarrinhoComQuantidade[idProduto]
    );
  }
  atualizarPrecoCarrinho();
}
desenharPedidosLastCheck();

function finalizarCompra(evento) {
  evento.preventDefault();
  const idsProdutosCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  if (Object.keys(idsProdutosCarrinhoComQuantidade).length === 0) {
    return;
  }
  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idsProdutosCarrinhoComQuantidade,
  };
  const historicoDePedidos = lerLocalStorage("historico") ?? [];
  const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];
  salvarLocalStorage("historico", historicoDePedidosAtualizado);
  apagarDoLocalStorage("carrinho");
  window.location.href = "./finish.html";
}

document.addEventListener("submit", (e) => finalizarCompra(e));
