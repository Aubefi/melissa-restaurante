document.addEventListener('DOMContentLoaded', () => {

    /* 1. ALTERNÂNCIA ENTRE PÁGINA INICIAL (1-6) E CARDÁPIO (7-14) */
    const paginaInicial = document.getElementById('pagina-inicial');
    const paginaCardapio = document.getElementById('pagina-cardapio');
    const botoesAbrirCardapio = document.querySelectorAll('.btn-abrir-cardapio');
    const botoesVoltarInicio = document.querySelectorAll('.btn-voltar-inicio');

    // Abre a página do Cardápio e oculta a Página Inicial
    botoesAbrirCardapio.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            evento.preventDefault();
            paginaInicial.classList.add('oculto');
            paginaCardapio.classList.remove('oculto');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Volta para a Página Inicial ao clicar na logo do topo do Cardápio
    botoesVoltarInicio.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            evento.preventDefault();
            paginaCardapio.classList.add('oculto');
            paginaInicial.classList.remove('oculto');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    /* 2. TRANSIÇÃO AUTOMÁTICA DO BANNER DA HOME (PÁGINAS 3 E 4 DO PDF) */
    const slidesBannerHome = document.querySelectorAll('.banner-slide');
    let indiceBannerHome = 0;

    if (slidesBannerHome.length > 1) {
        setInterval(() => {
            // Só executa a troca se a Página Inicial estiver visível
            if (!paginaInicial.classList.contains('oculto')) {
                slidesBannerHome[indiceBannerHome].classList.remove('ativo');
                indiceBannerHome = (indiceBannerHome + 1) % slidesBannerHome.length;
                slidesBannerHome[indiceBannerHome].classList.add('ativo');
            }
        }, 4000); // Troca a cada 4 segundos
    }

    /* 3. TRANSIÇÃO AUTOMÁTICA DO TOPO DO CARDÁPIO (PÁGINAS 7, 8 E 9) */
    const slidesTopoCardapio = document.querySelectorAll('.cardapio-slide');
    let indiceTopoCardapio = 0;

    if (slidesTopoCardapio.length > 1) {
        setInterval(() => {
            // Só executa a troca se a Página do Cardápio estiver visível
            if (!paginaCardapio.classList.contains('oculto')) {
                slidesTopoCardapio[indiceTopoCardapio].classList.remove('ativo');
                indiceTopoCardapio = (indiceTopoCardapio + 1) % slidesTopoCardapio.length;
                slidesTopoCardapio[indiceTopoCardapio].classList.add('ativo');
            }
        }, 4500); // Troca a cada 4,5 segundos
    }

    /* 4. BARRA FIXA DE CATEGORIAS DO CARDÁPIO (PÁGINAS 10 A 14) */
    const abasCategoria = document.querySelectorAll('.aba-categoria');
    const secoesCardapio = document.querySelectorAll('.cardapio-secao');

    // Rolagem suave ao clicar numa categoria (Entrada, Prato Principal, etc.)
    abasCategoria.forEach(aba => {
        aba.addEventListener('click', (evento) => {
            evento.preventDefault();

            // Atualiza o destaque verde imediatamente no clique
            abasCategoria.forEach(item => item.classList.remove('ativa'));
            aba.classList.add('ativa');

            const idAlvo = aba.getAttribute('href');
            const secaoAlvo = document.querySelector(idAlvo);

            if (secaoAlvo) {
                secaoAlvo.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Atualiza automaticamente a categoria verde ativa conforme o utilizador rola a página
    window.addEventListener('scroll', () => {
        if (paginaCardapio.classList.contains('oculto')) return;

        let idSecaoAtual = '';

        secoesCardapio.forEach(secao => {
            const retangulo = secao.getBoundingClientRect();
            // Verifica se a secção chegou perto do topo da janela
            if (retangulo.top <= 160) {
                idSecaoAtual = '#' + secao.getAttribute('id');
            }
        });

        if (idSecaoAtual) {
            abasCategoria.forEach(aba => {
                aba.classList.toggle('ativa', aba.getAttribute('href') === idSecaoAtual);
            });
        }
    }, { passive: true });

});
