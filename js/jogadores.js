const logado = sessionStorage.getItem("logado");
if (logado !== "1") {
  window.location.href = "index.html";
}

const search = document.getElementById("searchInput");
let jogadores = [];

search.addEventListener("input", () => {
  const jogadoresFilter = jogadores.filter((value) => {
    return value.nome.toLowerCase().includes(search.value.toLowerCase());
  });
  cria_jogadores(jogadoresFilter);
});


const buttonsData = [
  { text: 'Masculino', url: 'https://botafogo-atletas.mange.li/2024-1/masculino' },
  { text: 'Feminino', url: 'https://botafogo-atletas.mange.li/2024-1/feminino' },
  { text: 'Geral', url: 'https://botafogo-atletas.mange.li/2024-1/all' },
];

function initializePage() {
  const btnsContainer = document.getElementById('button-group');
  buttonsData.forEach(btnData => {
    const button = document.createElement('button');
    button.className = 'menu-btn';
    button.innerText = btnData.text;
    button.addEventListener('click', () => {
      if (btnData.url) {
        loadPlayerData(btnData.url);
      } else {
        btnData.action();
      }
    });
    btnsContainer.appendChild(button);
  });
}
initializePage();

const container_card = document.getElementById("container_card");

function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao obter os dados');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error('Houve um problema na requisição:', error);
    });
}

function cria_card(jogador) {
  const container_card_jogador = document.createElement("div");
  container_card_jogador.className = "container_card_jogador";

  const image = document.createElement("img");
  image.src = jogador.imagem;
  image.className = "imagem";

  const saibaMais = document.createElement("a")
  saibaMais.href = 'detalhes.html?id=' + jogador.id
  saibaMais.textContent = 'Saiba mais'

  const posicao_jogador = document.createElement("h3");
  posicao_jogador.textContent = jogador.posicao;

  const nome_jogador = document.createElement("h3");
  nome_jogador.textContent = jogador.nome;

  container_card_jogador.appendChild(image);
  container_card_jogador.appendChild(saibaMais)
  container_card_jogador.appendChild(nome_jogador);
  container_card_jogador.appendChild(posicao_jogador);
  
  
  container_card.appendChild(container_card_jogador);
  
  

    return container_card_jogador

  }

async function atualiza_jogadores() {
  jogadores = await fetchData('https://botafogo-atletas.mange.li/2024-1/all');
  console.log(jogadores);
  cria_jogadores(jogadores);
}

function cria_jogadores(jogadoresFilter) {
  container_card.innerHTML = "";
  jogadoresFilter.forEach(jogador => {
    cria_card(jogador);
  });
}




atualiza_jogadores();

function loadPlayerData(url) {
  fetchData(url).then(data => {
    jogadores = data;
    cria_jogadores(jogadores);
  });


}
