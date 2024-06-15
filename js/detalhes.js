async function buscarAtletaPorId(id) {
    try {
      const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar atleta');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar atleta:', error.message);
      throw error;
    }
  }
  
  function criarCard(atleta) {
    const detalhesAtleta = document.getElementById('detalhesAtleta');
    detalhesAtleta.innerHTML = '';
  
    const divCard = document.createElement('div');
    divCard.classList.add('card');
  
    const img = document.createElement('img');
    img.src = atleta.imagem;
    img.alt = atleta.nome;
  
    const nome = document.createElement('p');
    nome.textContent = `Nome: ${atleta.nome}`;
  
    const posicao = document.createElement('p');
    posicao.textContent = `Posição: ${atleta.posicao}`;
  
    const descricao = document.createElement('p');
    descricao.textContent = atleta.detalhes;
  
    const nascimento = document.createElement('p');
    nascimento.textContent = `Data de Nascimento: ${atleta.nascimento}`;
  
    const jogos = document.createElement('p');
    jogos.textContent = `Partidas Jogadas: ${atleta.n_jogos}`;
  
    const naturalidade = document.createElement('p');
    naturalidade.textContent = `Naturalidade: ${atleta.naturalidade}`;
  
    const button = criarBotao('Voltar', 'jogadores.html');
  
    divCard.append(img, nome, posicao, descricao, nascimento, jogos, naturalidade, button);
    detalhesAtleta.appendChild(divCard);
  }
  
  function criarBotao(texto, url) {
    const button = document.createElement('button');
    button.textContent = texto;
    button.addEventListener('click', () => {
      window.location.href = url;
    });
    return button;
  }
  
  function mostrarErro(mensagem) {
    const detalhesAtleta = document.getElementById('detalhesAtleta');
    detalhesAtleta.innerHTML = '';
  
    const erro = document.createElement('p');
    erro.textContent = mensagem;
  
    const button = criarBotao('Voltar', 'jogadores.html');
  
    detalhesAtleta.appendChild(erro);
    detalhesAtleta.appendChild(button);
  }
  
  function iniciar() {
    const detalhesAtleta = document.getElementById('detalhesAtleta');
  
    // Verifica se o usuário está logado
    if (!sessionStorage.getItem('logado')) {
      const deslogado = document.createElement('p');
      deslogado.textContent = 'Acesso negado, faça login para acessar essa página';
      detalhesAtleta.appendChild(deslogado);
      return;
    }
  
    // Obtém o ID do atleta da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idAtleta = urlParams.get('id');
  
    if (!idAtleta) {
      mostrarErro('ID do atleta não fornecido');
      return;
    }
  
    // Busca o atleta pelo ID e cria o card
    buscarAtletaPorId(idAtleta)
      .then(atleta => criarCard(atleta))
      .catch(() => mostrarErro('Erro ao tentar buscar atleta'));
  }
  
  document.addEventListener('DOMContentLoaded', iniciar);
  