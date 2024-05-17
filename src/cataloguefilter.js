const catalogoProdutos = document.getElementById("container-produto");

function exibirTodos() {
  const exibirTodosProdutos = Array.from(
    catalogoProdutos.getElementsByClassName("hide")
  );
  for (const produto of exibirTodosProdutos) {
    produto.classList.remove("hide");
  }
}

function esconderMasculino() {
  exibirTodos();
  const produtosMasculinos = Array.from(
    catalogoProdutos.getElementsByClassName("masculino")
  );
  for (const produto of produtosMasculinos) {
    produto.classList.add("hide");
  }
}

function esconderFeminino() {
  exibirTodos();
  const produtosFemininos = Array.from(
    catalogoProdutos.getElementsByClassName("feminino")
  );
  for (const produto of produtosFemininos) {
    produto.classList.add("hide");
  }
}

export function inicializarFiltros() {
  document
    .getElementById("exibir-todos")
    .addEventListener("click", exibirTodos);

  document
    .getElementById("exibir-femininos")
    .addEventListener("click", esconderMasculino);

  document
    .getElementById("exibir-masculinos")
    .addEventListener("click", esconderFeminino);
  exibirTodos();
}
