# ⏳ Countdown Timer

Página de contagem regressiva para lançamento de site — construída com HTML, CSS e JavaScript puro, sem dependências externas.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Linguagens](https://img.shields.io/badge/HTML%20%7C%20CSS%20%7C%20JS-vanilla-blue)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)

---

## Índice

- [⏳ Countdown Timer](#-countdown-timer)
  - [Índice](#índice)
  - [Sobre o projeto](#sobre-o-projeto)
  - [Demo](#demo)
  - [Funcionalidades](#funcionalidades)
  - [Estrutura de arquivos](#estrutura-de-arquivos)
  - [Como usar](#como-usar)
    - [1. Clone o repositório](#1-clone-o-repositório)
    - [2. Defina a data-alvo](#2-defina-a-data-alvo)
    - [3. Abra no navegador](#3-abra-no-navegador)
    - [4. Publique (opcional)](#4-publique-opcional)
  - [Tutorial: entendendo o código](#tutorial-entendendo-o-código)
    - [HTML — a estrutura](#html--a-estrutura)
    - [CSS — o visual](#css--o-visual)
    - [JavaScript — a lógica](#javascript--a-lógica)
      - [1. Diferença entre datas](#1-diferença-entre-datas)
      - [2. Conversão em cascata](#2-conversão-em-cascata)
      - [3. Isolamento com módulo `%`](#3-isolamento-com-módulo-)
      - [4. Atualização contínua](#4-atualização-contínua)
  - [Personalização](#personalização)
  - [Tecnologias](#tecnologias)
  - [Licença](#licença)

---

## Sobre o projeto

Este projeto é uma página estática de countdown — ideal para ser publicada antes do lançamento de um site, produto ou evento. Ela exibe o tempo restante em dias, horas, minutos e segundos, atualizando em tempo real.

O projeto foi construído com foco didático: cada decisão de código está comentada e explicada, tornando-o um bom ponto de partida para quem está aprendendo desenvolvimento web.

---

## Demo

> Adicione aqui o link do GitHub Pages após publicar.  
> Exemplo: `https://thamiresviel.github.io/countdown`

---

## Funcionalidades

- Contagem regressiva em tempo real (atualiza a cada 1 segundo)
- Exibe dias, horas, minutos e segundos
- Mensagem automática quando o prazo é atingido
- Layout responsivo — funciona em mobile e desktop
- Zero dependências externas

---

## Estrutura de arquivos

```
countdown-timer/
├── index.html      # estrutura da página
├── style.css       # estilos e layout
├── script.js       # lógica da contagem regressiva
└── README.md       # documentação
```

---

## Como usar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/countdown-timer.git
cd countdown-timer
```

### 2. Defina a data-alvo

Abra o arquivo `script.js` e altere a data na primeira linha:

```js
// Formato: new Date(ano, mês - 1, dia, hora, minuto, segundo)
// Atenção: meses começam do zero em JavaScript (janeiro = 0, dezembro = 11)

const dataAlvo = new Date(2026, 11, 31, 0, 0, 0);
//                              ^^
//                         dezembro = 11
```

### 3. Abra no navegador

Você pode abrir diretamente o `index.html` no navegador, ou usar uma extensão como o **Live Server** (VS Code) para ter recarregamento automático ao salvar.

### 4. Publique (opcional)

Para publicar no GitHub Pages:

1. Vá em **Settings → Pages** no repositório
2. Em **Source**, selecione a branch `main` e a pasta `/ (root)`
3. Clique em **Save** — em alguns minutos o site estará disponível

---

## Tutorial: entendendo o código

### HTML — a estrutura

O HTML organiza os quatro blocos de tempo (dias, horas, minutos, segundos) dentro de uma estrutura simples:

```html
<div class="countdown" id="countdown">
  <div class="bloco">
    <span class="numero" id="dias">00</span>
    <span class="legenda">dias</span>
  </div>
  <!-- ... demais blocos ... -->
</div>
```

**Por que usar `id` nos `<span>` dos números?**  
O JavaScript precisa de um "gancho" para encontrar e atualizar cada elemento. O `id` é único na página — é por isso que usamos `document.getElementById("dias")` no JS.

**Por que o `<script>` fica no final do `<body>`?**  
O JavaScript é executado na ordem em que aparece. Se o `<script>` viesse antes dos elementos HTML, o JS tentaria selecionar elementos que ainda não existem — e retornaria `null`.

---

### CSS — o visual

Alguns pontos importantes do estilo:

**Centralização com Flexbox**

```css
body {
  min-height: 100vh; /* ocupa 100% da altura da tela */
  display: flex;
  align-items: center; /* centraliza verticalmente */
  justify-content: center; /* centraliza horizontalmente */
}
```

**Tipografia responsiva com `clamp()`**

```css
font-size: clamp(2.5rem, 8vw, 6rem);
/* mínimo   ideal    máximo */
```

`clamp()` faz o texto crescer proporcionalmente com a tela, sem precisar de media queries. `vw` significa _viewport width_ — 1vw = 1% da largura da janela.

**Transição suave nos números**

```css
.numero {
  transition: opacity 0.2s ease;
}
```

Quando o JavaScript atualiza o valor, a propriedade `opacity` pode ser animada, criando um efeito de fade suave ao invés de uma troca brusca.

---

### JavaScript — a lógica

**O núcleo do projeto está em três conceitos:**

#### 1. Diferença entre datas

```js
const agora = new Date();
const diferenca = dataAlvo - agora; // resultado em milissegundos
```

`Date` armazena datas como milissegundos desde 01/01/1970. Subtrair dois objetos `Date` devolve a diferença nessa unidade.

#### 2. Conversão em cascata

```js
const totalSegundos = Math.floor(diferenca / 1000);
const totalMinutos = Math.floor(totalSegundos / 60);
const totalHoras = Math.floor(totalMinutos / 60);
const totalDias = Math.floor(totalHoras / 24);
```

Cada divisão converte para a próxima unidade. `Math.floor()` descarta as casas decimais.

#### 3. Isolamento com módulo `%`

```js
const segundos = totalSegundos % 60; // resto da divisão por 60
const minutos = totalMinutos % 60;
const horas = totalHoras % 24;
```

O operador `%` retorna o **resto** da divisão — ele isola o "excedente" que não coube na unidade maior. Por exemplo: 90 minutos → `90 % 60 = 30` (30 minutos além de 1 hora completa).

#### 4. Atualização contínua

```js
atualizarContagem(); // roda imediatamente ao carregar
setInterval(atualizarContagem, 1000); // repete a cada 1000ms
```

A função é chamada uma vez de imediato (para não haver delay visual) e depois agendada para repetir a cada segundo.

---

## Personalização

| O que mudar              | Onde                                     | Como                                          |
| ------------------------ | ---------------------------------------- | --------------------------------------------- |
| Data-alvo                | `script.js`, linha 1                     | `new Date(ano, mês-1, dia, hora, min, seg)`   |
| Mensagem de encerramento | `script.js`, bloco `if (diferenca <= 0)` | Altere o `textContent`                        |
| Cores                    | `style.css`                              | Modifique as variáveis ou propriedades de cor |
| Fonte                    | `style.css`, `@import`                   | Troque pelo Google Fonts de sua preferência   |
| Texto "EM BREVE"         | `index.html`, `<h1>`                     | Edite diretamente o conteúdo da tag           |

---

## Tecnologias

- HTML5
- CSS3 (Flexbox, `clamp()`, `transition`)
- JavaScript ES6+ (`const`, arrow functions, template literals)
- [Google Fonts](https://fonts.google.com) — Space Mono + Inter

---

## Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
