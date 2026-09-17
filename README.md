# Página Pessoal

Portfólio web desenvolvido para a **Atividade Prática 2** da disciplina
**GAC116, Programação WEB** (UFLA, 2026/2), em **duas versões com o mesmo conteúdo**:
uma construída com **Bootstrap 5** e outra com **Tailwind CSS 4**.

**Acesse agora:** https://ratzogun.github.io/Personal_Page/

- **Autor:** Gilson dos Santos Junior
- **Turma:** 14A
- **Professor:** Raphael Winckler de Bettio
- **Universidade Federal de Lavras, Departamento de Ciência da Computação**

## Sobre o projeto

A página apresenta informações reais do autor: um resumo pessoal, a formação em
Sistemas de Informação na UFLA, o histórico profissional em desenvolvimento de
software e a lista de tecnologias com que trabalha, além dos canais de contato.

O objetivo da atividade é comparar dois frameworks CSS resolvendo o mesmo problema.
Por isso o conteúdo, a ordem das seções e o comportamento são idênticos nas duas
versões. O que muda é como a interface foi montada.

| | Bootstrap 5 | Tailwind CSS 4 |
| --- | --- | --- |
| Abordagem | Componentes prontos | Classes utilitárias |
| Grade | Sistema de 12 colunas (`row`, `col-lg-7`) | Utilitários de grade (`grid`, `lg:grid-cols-12`) |
| Componentes | `card`, `navbar`, `badge`, `progress`, `list-group` | Compostos manualmente a partir de utilitários |
| Tema escuro | Atributo `data-bs-theme` no elemento raiz | Classe `dark` no elemento raiz |
| Entrega do CSS | Arquivo pronto, via CDN | Compilado sob medida pelo Tailwind CLI |
| Tamanho do CSS | Cerca de 230 kB minificado | Cerca de 29 kB, só o que a página usa |
| Personalização | `style.css` sobrescrevendo variáveis do Bootstrap | `input.css` com `@theme` e `@layer components` |

## Paleta

O projeto usa uma paleta quente, aplicada igualmente nas duas versões.

| Cor | Onde é usada |
| --- | --- |
| `#BF7950` | Acento do tema escuro: botões, ícones, marcadores da linha do tempo |
| `#A65E44` | Acento do tema claro, e o preenchimento dos botões principais |
| `#0D0302` | Fundo do tema escuro |
| `#591812` | Pílulas de tecnologia e realces do tema escuro |
| `#400808` | Brilho do topo no tema escuro, e as sombras |

Os neutros claros (`#FAF4F0`, `#F3E7E0`, `#E6D4C9`, `#6B4A3E`) são derivados da mesma
família quente, em vez de um cinza neutro, para não destoarem ao lado das cores acima.

Existe ainda um tom de acento exclusivo para texto pequeno, `#8C4A34` no tema claro e
`#D9A182` no escuro. O motivo é medido: `#A65E44` sobre o creme `#FAF4F0` dá razão de
contraste 4,44, logo abaixo dos 4,5 que o WCAG AA exige para texto normal. O acento
original continua nos preenchimentos e ícones, onde o mínimo é 3,0.

Na versão Bootstrap a paleta entra redefinindo as variáveis `--bs-*` em
`bootstrap/assets/css/style.css`. Na versão Tailwind ela é declarada como duas escalas,
`base` e `marca`, no bloco `@theme` de `tailwind/src/input.css`, o que gera classes como
`bg-base-900` e `text-marca-500` com o mesmo comportamento das nativas.

## Funcionalidades

- **Tema claro e tema escuro**, com botão de alternância em todas as páginas.
  A escolha fica salva no navegador e, enquanto o usuário não escolher, a página
  segue a preferência do sistema operacional.
- **Layout responsivo**, testado de 375 px (celular) a 1440 px (desktop).
- **Menu fixo no topo** que destaca automaticamente a seção visível e se recolhe
  no celular.
- **Navegação suave** entre as seções, respeitando `prefers-reduced-motion`.
- **Acessibilidade:** marcação semântica, atalho para pular ao conteúdo, textos
  alternativos nas imagens e rótulos `aria` nos controles interativos. Todo o texto
  das três páginas foi medido contra o fundo real nos dois temas e passa no WCAG AA.

## Estrutura do projeto

```
Personal_Page/
├── index.html                      Página de entrada, escolhe entre as duas versões
├── bootstrap/
│   ├── index.html                  Versão construída com Bootstrap 5
│   └── assets/
│       ├── css/style.css           Ajustes próprios sobre o Bootstrap
│       ├── js/main.js              Tema, menu e destaque da seção
│       └── img/                    Retratos de cada tema e favicon
├── tailwind/
│   ├── index.html                  Versão construída com Tailwind CSS 4
│   ├── src/input.css               Fonte do Tailwind, com o tema e os componentes
│   └── assets/
│       ├── css/tailwind.css        CSS gerado pelo Tailwind CLI
│       ├── js/main.js              Tema, menu e destaque da seção
│       └── img/                    Retratos de cada tema e favicon
├── package.json                    Scripts para gerar o CSS do Tailwind
├── LICENSE                         Licença MIT
└── README.md
```

## Tecnologias utilizadas

- **HTML5:** marcação semântica com `header`, `nav`, `main`, `section`, `article` e `footer`.
- **CSS3:** variáveis CSS, `grid`, `flexbox`, consultas de mídia e `prefers-color-scheme`.
- **JavaScript (ES6+):** alternância de tema, menu do celular e `IntersectionObserver`
  para destacar a seção visível. Sem bibliotecas além dos próprios frameworks.
- **Bootstrap 5.3** e **Bootstrap Icons**, carregados por CDN.
- **Tailwind CSS 4**, compilado localmente pelo Tailwind CLI.
- **Web Storage API (`localStorage`):** guarda o tema escolhido pelo usuário.
- **GitHub Pages:** publicação das duas versões.

## Instalação e execução

O site é estático. Para apenas visitá-lo, não é preciso instalar nada.

**Opção 1, online:** acesse o link do GitHub Pages no topo deste README.

**Opção 2, localmente:** baixe o repositório e abra `index.html` no navegador.

**Opção 3, servidor local** (comportamento idêntico ao da versão publicada):

```bash
git clone https://github.com/RATZogun/Personal_Page.git
cd Personal_Page
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

### Regerando o CSS do Tailwind

O arquivo `tailwind/assets/css/tailwind.css` já vem pronto no repositório, então
nada precisa ser instalado para o site funcionar. Ele só precisa ser gerado de novo
se `tailwind/index.html`, `tailwind/assets/js/main.js` ou `tailwind/src/input.css`
mudarem:

```bash
npm install
npm run build:css     # gera o CSS uma vez
npm run watch:css     # regenera a cada alteração, durante o desenvolvimento
```

## Detalhes da implementação

- **Tema aplicado antes da primeira pintura.** Um script curto no `<head>` lê o
  tema salvo e ajusta o elemento raiz antes de o navegador desenhar a página. Sem
  isso, uma página em tema escuro piscaria branca ao carregar.
- **Preferência do sistema respeitada até a primeira escolha.** A página escuta
  `prefers-color-scheme` e só para de segui-la depois que o usuário clica no botão
  de tema, que é quando a escolha passa a valer.
- **Leitura e escrita no `localStorage` protegidas por `try/catch`,** porque o
  armazenamento pode estar bloqueado em navegação privada e a exceção derrubaria o script.
- **Seção visível destacada com `IntersectionObserver`** em vez de calcular a posição
  a cada evento de rolagem, o que evita trabalho desnecessário no fio principal.
- **Tailwind gerado, não carregado por CDN.** O CDN do Tailwind compila as classes
  no navegador, o que provoca um piscar de conteúdo sem estilo. Gerar o arquivo pelo
  CLI entrega um CSS comum, com apenas as classes efetivamente usadas.
- **Ícones diferentes em cada versão, de propósito.** A versão Bootstrap usa a fonte
  Bootstrap Icons, que é parte do ecossistema do framework. A versão Tailwind usa SVG
  escrito à mão, mantendo-a livre de qualquer dependência do Bootstrap.

## Licença

Distribuído sob a **Licença MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Informações da atividade

```json
{
    "nome": "Página Pessoal",
    "descricao": "Portfólio web pessoal em duas versões de mesmo conteúdo, uma com Bootstrap 5 e outra com Tailwind CSS 4, ambas responsivas e com tema claro e escuro.",
    "autores": "Gilson dos Santos Junior",
    "turma": "14A"
}
```
