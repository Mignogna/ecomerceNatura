import { renderizarCatalogo } from "./src/productcard.js";
import {
  inicializarCarrinho,
  renderizarProdutosCarrinho,
} from "./src/menucart.js";
import { atualizarPrecoCarrinho } from "./src/menucart.js";
import { inicializarFiltros } from "./src/cataloguefilter.js";

renderizarCatalogo();
inicializarCarrinho();
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();
