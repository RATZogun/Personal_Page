/* =====================================================================
   Pagina pessoal, versao Tailwind CSS
   Comportamento: alternancia de tema, menu do celular e destaque da
   secao visivel no menu.

   As classes usadas aqui precisam existir como texto neste arquivo para
   que o Tailwind as inclua no CSS gerado. Por isso o input.css declara
   @source "../assets/js".
   ===================================================================== */

(function () {
  'use strict';

  var raiz = document.documentElement;
  var botaoTema = document.getElementById('btn-tema');
  var iconeLua = document.getElementById('icone-lua');
  var iconeSol = document.getElementById('icone-sol');
  var textoTema = document.getElementById('texto-tema');

  /* ----------------------------- Tema ------------------------------ */

  function lerTemaSalvo() {
    try {
      return localStorage.getItem('tema');
    } catch (e) {
      return null;
    }
  }

  function salvarTema(tema) {
    try {
      localStorage.setItem('tema', tema);
    } catch (e) {
      /* Navegacao privada ou armazenamento bloqueado: segue sem salvar. */
    }
  }

  function aplicarTema(tema) {
    var escuro = tema === 'dark';

    raiz.classList.toggle('dark', escuro);

    if (iconeLua) { iconeLua.classList.toggle('hidden', escuro); }
    if (iconeSol) { iconeSol.classList.toggle('hidden', !escuro); }
    if (textoTema) { textoTema.textContent = escuro ? 'Claro' : 'Escuro'; }
    if (botaoTema) {
      botaoTema.setAttribute('aria-label',
        escuro ? 'Mudar para o tema claro' : 'Mudar para o tema escuro');
    }
  }

  // O tema inicial ja foi aplicado no cabecalho, antes da primeira pintura.
  // Aqui apenas sincronizamos o icone e o rotulo do botao.
  aplicarTema(raiz.classList.contains('dark') ? 'dark' : 'light');

  if (botaoTema) {
    botaoTema.addEventListener('click', function () {
      var novo = raiz.classList.contains('dark') ? 'light' : 'dark';
      aplicarTema(novo);
      salvarTema(novo);
    });
  }

  // Enquanto o usuario nao escolher um tema, acompanha a preferencia do sistema.
  var consulta = window.matchMedia('(prefers-color-scheme: dark)');
  var aoMudarSistema = function (evento) {
    if (!lerTemaSalvo()) {
      aplicarTema(evento.matches ? 'dark' : 'light');
    }
  };

  if (typeof consulta.addEventListener === 'function') {
    consulta.addEventListener('change', aoMudarSistema);
  } else if (typeof consulta.addListener === 'function') {
    consulta.addListener(aoMudarSistema);
  }

  /* --------------------------- Menu mobile -------------------------- */

  var botaoMenu = document.getElementById('btn-menu');
  var menuMobile = document.getElementById('menu-mobile');

  function fecharMenu() {
    if (!menuMobile || !botaoMenu) { return; }
    menuMobile.classList.add('hidden');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir o menu de navegação');
  }

  if (botaoMenu && menuMobile) {
    botaoMenu.addEventListener('click', function () {
      var aberto = !menuMobile.classList.contains('hidden');
      if (aberto) {
        fecharMenu();
      } else {
        menuMobile.classList.remove('hidden');
        botaoMenu.setAttribute('aria-expanded', 'true');
        botaoMenu.setAttribute('aria-label', 'Fechar o menu de navegação');
      }
    });
  }

  /* ------------------ Destaque da secao no menu --------------------- */

  var ATIVO = ['bg-marca-500/10', 'text-marca-600', 'dark:bg-marca-400/15', 'dark:text-marca-300'];

  var links = Array.prototype.slice.call(document.querySelectorAll('.link-menu'));

  links.forEach(function (link) {
    link.addEventListener('click', fecharMenu);
  });

  var ids = [];
  links.forEach(function (link) {
    var id = link.getAttribute('href');
    if (ids.indexOf(id) === -1) { ids.push(id); }
  });

  var secoes = ids.map(function (id) { return document.querySelector(id); }).filter(Boolean);

  function marcar(id) {
    links.forEach(function (link) {
      var ativo = link.getAttribute('href') === '#' + id;
      ATIVO.forEach(function (classe) { link.classList.toggle(classe, ativo); });
      if (ativo) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if ('IntersectionObserver' in window && secoes.length) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) { marcar(entrada.target.id); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    secoes.forEach(function (secao) { observador.observe(secao); });
  }
})();
