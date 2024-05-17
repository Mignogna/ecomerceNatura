const dataCompra = document.getElementById("data");

function escreverData() {
  const horarioFinalizado = `<p class="horario">${new Date().toLocaleDateString(
    "pt-BR",
    { hour: "2-digit", minute: "2-digit" }
  )}</p>`;
  document.getElementById("data").innerHTML = horarioFinalizado;
}
escreverData();
