export const catalogo = [
  {
    id: "1",
    nome: "Natura Homem",
    preco: 175,
    imagem: "./imagem/homem_blue.jpg",
    feminino: false,
  },

  {
    id: "2",
    nome: "Óleo Corporal Natura Ekos - Açaí",
    preco: 80,
    imagem: "./imagem/ekos_acai.jpg",

    feminino: true,
  },

  {
    id: "3",
    nome: "Perfume Feminino Ilía ",
    preco: 125,
    imagem: "./imagem/ilia.jpg",
    feminino: true,
  },

  {
    id: "4",
    nome: "Sabonete Natura Todo Dia",
    preco: 95,
    imagem: "./imagem/sabonete_todo_dia.png",
    feminino: true,
  },

  {
    id: "5",
    nome: "Óleo Corporal Séve",
    preco: 78,
    imagem: "./imagem/seve.jpg",
    feminino: true,
  },

  {
    id: "6",
    nome: "Sabonete Líquido Natura Sou",
    preco: 47,
    imagem: "./imagem/sou.jpg",
    feminino: true,
  },

  {
    id: "7",
    nome: "Hair Care Natura Plant ",
    preco: 135,
    imagem: "./imagem/todo_dia_plant.jpg",
    feminino: true,
  },

  {
    id: "8",
    nome: "Desodorante Colônia  Masculino Amó",
    preco: 67,
    imagem: "./imagem/descolonia_amo.jpg",
    feminino: false,
  },
  {
    id: "9",
    nome: "Deo Corporal Masculino Humor a Dois",
    preco: 65,
    imagem: "./imagem/desodorante_humor.jpg",
    feminino: false,
  },
  {
    id: "10",
    nome: "Hidrante Corporal Natura Todo Dia",
    preco: 89,
    imagem: "./imagem/todo_dia.jpg",
    feminino: true,
  },

  {
    id: "11",
    nome: "Creme de Barbear Homem  ",
    preco: 70,
    imagem: "./imagem/cremebarba.jpg",
    feminino: false,
  },

  {
    id: "12",
    nome: "Perfume Masc. Natura Essencial Oud Vanilla",
    preco: 166,
    imagem: "./imagem/oud_vanilla.jpg",
    feminino: false,
  },

  {
    id: "13",
    nome: "Kaiak",
    preco: 170,
    imagem: "./imagem/kaiak.jpg",
    feminino: false,
  },
  {
    id: "14",
    nome: "Kit Sintonia",
    preco: 140,
    imagem: "./imagem/kit_sintonia.jpg",
    feminino: false,
  },

  {
    id: "15",
    nome: "Deo Corporal Essencial Feminino",
    preco: 60,
    imagem: "./imagem/essencial_desfem.jpg",
    feminino: true,
  },
  {
    id: "16",
    nome: "Perfume Paz e Humor Masculino",
    preco: 110,
    imagem: "./imagem/humor.jpg",
  },
];

export function salvarLocalStorage(chave, informacao) {
  localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave) {
  return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave) {
  localStorage.removeItem(chave);
}

export function desenharProdutosNoCarrinhoSimples(
  idProduto,
  idContainerHtml,
  quantidadeProduto
) {
  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho = document.getElementById(idContainerHtml);

  const elementCart = document.createElement("li");

  const cartaoProdutoCarrinho = `
    <img 
    src=${produto.imagem}
    alt= Carrinho: ${produto.nome}
    class="img-cart"
    />
    <div class="description-cart">
    <p>${produto.nome}</p>
    <p>R$ ${produto.preco},00</p>
    </div>
    <div id="quantidades">
    <p id="quantidade-${produto.id}">${quantidadeProduto}</p>
    </div>
  
    `;

  elementCart.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementCart);
}
