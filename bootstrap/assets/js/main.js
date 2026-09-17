/* =====================================================================
   Pagina pessoal, versao Bootstrap
   Comportamento: alternancia de tema, destaque do menu e fechamento do
   menu sanfonado no celular.
   ===================================================================== */

(function () {
  'use strict';

  var raiz = document.documentElement;
  var botao = document.getElementById('btn-tema');
  var icone = document.getElementById('icone-tema');
  var texto = document.getElementById('texto-tema');

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
    raiz.setAttribute('data-bs-theme', tema);

    if (icone) {
      icone.className = tema === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
    if (texto) {
      texto.textContent = tema === 'dark' ? 'Claro' : 'Escuro';
    }
    if (botao) {
      botao.setAttribute('aria-label',
        tema === 'dark' ? 'Mudar para o tema claro' : 'Mudar para o tema escuro');
    }
  }

  // O tema inicial ja foi definido no cabecalho, antes da primeira pintura.
  // Aqui apenas sincronizamos o rotulo e o icone do botao.
  aplicarTema(raiz.getAttribute('data-bs-theme') || 'light');

  if (botao) {
    botao.addEventListener('click', function () {
      var novo = raiz.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
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

  /* ------------------ Destaque da secao no menu -------------------- */

  var links = Array.prototype.slice.call(document.querySelectorAll('#menu .nav-link'));
  var secoes = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && secoes.length) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) { return; }
        links.forEach(function (link) {
          var ativo = link.getAttribute('href') === '#' + entrada.target.id;
          link.classList.toggle('active', ativo);
          if (ativo) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    secoes.forEach(function (secao) { observador.observe(secao); });
  }

  /* ---------------- Fecha o menu ao clicar no celular -------------- */

  var menu = document.getElementById('menu');

  links.forEach(function (link) {
    link.addEventListener('click', function () {
      if (menu && menu.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
})();
