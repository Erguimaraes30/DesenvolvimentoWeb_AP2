if (sessionStorage.getItem('logado')) {
    let lista_jogadores;

    const pega_json = async (caminho) => {
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;
    }

    const carregarDados = async (url) => {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 0 auto;">
                <img src="images/carregando.gif" alt="Carregando">
                <h3 style="color: white; text-align: center; font-family: sans-serif; text-transform: uppercase; margin-top: 10px;">Carregando dados, por favor aguarde...</h3>
            </div>
        `;
        const data = await pega_json(url);
        lista_jogadores = data;

        container.innerHTML = '';

        lista_jogadores.forEach((jogador) => {
            constroiCard(jogador);
        });
    }

    const container = document.createElement('div');
    container.id = 'myContainer';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(220px, 1fr))';
    container.style.gap = '20px';
    container.style.maxWidth = '1200px';
    container.style.margin = '0 auto';
    container.style.padding = '20px';

    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.backgroundColor = '#000';
    document.body.style.color = '#fff';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.display = 'flex';
    document.body.style.flexDirection = 'column';
    document.body.style.alignItems = 'center';

    const header = document.createElement('header');
    header.style.backgroundColor = '#000';
    header.style.color = '#fff';
    header.style.padding = '20px';
    header.style.width = '100%';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.marginBottom = '20px';

    const logoDiv = document.createElement('div');
    logoDiv.classList.add('logo');
    logoDiv.style.display = 'flex';
    logoDiv.style.alignItems = 'center';

    const escudo = document.createElement('img');
    escudo.src = 'assets/imagens/escudo.png';
    escudo.style.width = '50px';
    escudo.style.marginRight = '10px';

    const title = document.createElement('h1');
    title.textContent = 'Elenco de Atletas';
    title.style.color = 'white';
    title.style.textAlign = 'center';
    title.style.fontFamily = 'sans-serif';
    title.style.textTransform = 'uppercase';
    title.style.margin = '0';
    title.style.padding = '0';

    const btn_sair = document.createElement('button');
    btn_sair.id = 'btn_sair';
    btn_sair.textContent = 'Sair';
    btn_sair.style.backgroundColor = '#fff';
    btn_sair.style.color = '#000';
    btn_sair.style.border = '2px solid #000';
    btn_sair.style.padding = '10px 20px';
    btn_sair.style.borderRadius = '5px';
    btn_sair.style.cursor = 'pointer';
    btn_sair.style.transition = 'background-color 0.3s, color 0.3s';

    btn_sair.onclick = () => {
        sessionStorage.removeItem('logado');
        window.location.href = 'index.html';
    };

    logoDiv.appendChild(escudo);
    logoDiv.appendChild(title);
    header.appendChild(logoDiv);
    header.appendChild(btn_sair);
    document.body.appendChild(header);

    const divPesquisa = document.createElement('div');
    divPesquisa.style.textAlign = 'center';
    divPesquisa.style.marginTop = '15px';
    divPesquisa.style.padding = '1rem';

    const inputPesquisa = document.createElement('input');
    inputPesquisa.id = 'inputPesquisa';
    inputPesquisa.placeholder = 'Pesquise por posição';
    inputPesquisa.type = 'text';
    divPesquisa.appendChild(inputPesquisa);

    inputPesquisa.onkeyup = (event) => {
        const valor = event.target.value;
        const resultado = lista_jogadores.filter(
            (elemento) => elemento.posicao.toLowerCase().includes(valor.toLowerCase())
        );
        container.innerHTML = '';

        resultado.forEach((jogador) => {
            constroiCard(jogador);
        });
    };

    document.body.appendChild(divPesquisa);
    document.body.appendChild(container);

    const constroiCard = (atleta) => {
        const divCard = document.createElement('article');
        divCard.style.backgroundColor = '#333';
        divCard.style.color = '#fff';
        divCard.style.padding = '10px';
        divCard.style.borderRadius = '10px';
        divCard.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
        divCard.style.overflow = 'hidden';

        divCard.dataset.id = atleta.id;
        divCard.dataset.descricao = atleta.descricao;
        divCard.dataset.nome = atleta.nome;
        divCard.dataset.nomeCompleto = atleta.nome_completo;
        divCard.dataset.posicao = atleta.posicao;
        divCard.dataset.imagem = atleta.imagem;
        divCard.dataset.elenco = atleta.elenco;
        divCard.dataset.nascimento = atleta.nascimento;
        divCard.dataset.altura = atleta.altura;

        divCard.onclick = handleClick;

        const imagem = document.createElement('img');
        imagem.style.width = '100%';
        imagem.style.height = '200px';
        imagem.style.objectFit = 'cover';
        imagem.style.objectPosition = 'top';
        imagem.src = atleta.imagem;
        imagem.alt = atleta.nome;

        const titulo = document.createElement('p');
        titulo.style.fontFamily = 'Bebas Neue, sans-serif';
        titulo.style.fontWeight = '400';
        titulo.style.fontSize = '1.3rem';
        titulo.style.textTransform = 'uppercase';
        titulo.style.color = 'white';
        titulo.style.backgroundColor = '#000';
        titulo.style.textAlign = 'center';
        titulo.textContent = atleta.posicao;

        const btn_more = document.createElement('button');
        btn_more.classList.add('btn-more');
        btn_more.textContent = 'SAIBA MAIS';
        btn_more.style.backgroundColor = '#fff';
        btn_more.style.color = '#000';
        btn_more.style.border = 'none';
        btn_more.style.padding = '10px 20px';
        btn_more.style.borderRadius = '5px';
        btn_more.style.cursor = 'pointer';
        btn_more.style.transition = 'background-color 0.3s, color 0.3s';
        btn_more.style.marginTop = 'auto';

        btn_more.onclick = () => {
            const card = divCard;
            const dados = {
                id: card.dataset.id,
                descricao: card.dataset.descricao,
                nome: card.dataset.nome,
                nomeCompleto: card.dataset.nomeCompleto,
                posicao: card.dataset.posicao,
                imagem: card.dataset.imagem,
                elenco: card.dataset.elenco,
                nascimento: card.dataset.nascimento,
                altura: card.dataset.altura
            };

            localStorage.setItem('atleta', JSON.stringify(dados));
            window.location.href = `detalhes.html?id=${dados.id}`;
        };

        divCard.appendChild(imagem);
        divCard.appendChild(titulo);
        divCard.appendChild(btn_more);
        container.appendChild(divCard);
    };

    // Função para simular o clique no card
    const handleClick = (event) => {
        const card = event.currentTarget;
        const dados = {
            id: card.dataset.id,
            descricao: card.dataset.descricao,
            nome: card.dataset.nome,
            nomeCompleto: card.dataset.nomeCompleto,
            posicao: card.dataset.posicao,
            imagem: card.dataset.imagem,
            elenco: card.dataset.elenco,
            nascimento: card.dataset.nascimento,
            altura: card.dataset.altura
        };

        localStorage.setItem('atleta', JSON.stringify(dados));
        window.location.href = `detalhes.html?id=${dados.id}`;
    };

    // Evento para carregar os dados iniciais
    carregarDados('https://botafogo-atletas.mange.li/2024-1/all');
} else {
    const h1 = document.createElement('h1');
    h1.textContent = 'Acesso negado, faça login para acessar essa página';
    h1.style.color = '#fff';
    h1.style.textAlign = 'center';
    h1.style.fontFamily = 'Arial, sans-serif';
    h1.style.marginTop = '100px';
    document.body.style.backgroundColor = '#000';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.innerHTML = '';
    document.body.appendChild(h1);
}
