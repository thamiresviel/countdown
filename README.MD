# 🎆 Countdown — Ano Novo

Contador regressivo para a virada do ano, desenvolvido com HTML, CSS e JavaScript puro.

---

## 🚀 Demonstração

> Abra o arquivo `index.html` no navegador e o contador começa automaticamente.

---

## 📁 Estrutura do projeto

```
countdown-ano-novo/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

---

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (Grid, Custom Properties)
- JavaScript (ES6+)

---

## 📖 Tutorial — Como foi construído

Este projeto é ótimo para praticar manipulação de datas em JavaScript e atualização dinâmica do DOM.

### 1. Estrutura HTML

O HTML define quatro "caixas", uma para cada unidade de tempo.
Cada valor usa um atributo `data-*` como identificador, evitando
o uso de classes ou IDs — o que deixa o código mais semântico e fácil de selecionar via JavaScript.

```html
00 dias
```

### 2. Layout com CSS Grid

O layout usa `display: grid` para centralizar tudo na tela e organizar as quatro caixas lado a lado.

```css
/* Centraliza o contador verticalmente e horizontalmente */
body {
  display: grid;
  place-content: center;
  min-height: 100vh;
}

/* Distribui as 4 caixas em colunas iguais */
.countdown__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
```

### 3. Lógica JavaScript — a matemática do tempo

Toda a lógica gira em torno de um único valor: a diferença em milissegundos entre agora e a meia-noite do próximo 1º de janeiro.

```js
const now = new Date();
const newYear = new Date(now.getFullYear() + 1, 0, 1);
const timeLeft = newYear - now; // diferença em milissegundos
```

A partir desse valor, cada unidade é extraída com divisões e o operador `%` (módulo), que descarta o que já foi contado
pela unidade maior:

```
timeLeft = 5.000.000.000 ms (exemplo)

dias    = Math.floor(timeLeft / 86.400.000)
horas   = Math.floor((timeLeft % 86.400.000) / 3.600.000)
minutos = Math.floor((timeLeft % 3.600.000)  / 60.000)
segundos= Math.floor((timeLeft % 60.000)     / 1.000)
```

Por exemplo: se restar 90.000 ms (1 min e 30 s), `horas` e `dias` serão 0, `minutos` será 1 e `segundos` será 30.
O `%` garante que os segundos não transbordem" para os minutos.

```js
const countdown = () => {
  const now = new Date();
  const newYear = new Date(now.getFullYear() + 1, 0, 1);
  const timeLeft = newYear - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  render(days, hours, minutes, seconds);
};
```

### 4. Atualização do DOM e formatação

A função `render` injeta os valores nas ``correspondentes.
O`.padStart(2, "0")`garante que números de 1 dígito
apareçam como`01`, `02`, etc.

```js
const render = (days, hours, minutes, seconds) => {
  daysElement.innerHTML = String(days).padStart(2, "0");
  hoursElement.innerHTML = String(hours).padStart(2, "0");
  minutesElement.innerHTML = String(minutes).padStart(2, "0");
  secondsElement.innerHTML = String(seconds).padStart(2, "0");
};
```

### 5. O intervalo e a chamada inicial

`setInterval` executa `countdown` a cada 1000 ms (1 segundo).
A chamada direta antes do intervalo evita o atraso de 1s na exibição inicial — sem ela, a tela ficaria com "00" por 1s.

```js
countdown(); // exibe imediatamente
setInterval(countdown, 1000); // atualiza a cada segundo
```

---

## ✅ Melhorias a implementar

### Funcionais

- [ ] **Parar o intervalo ao chegar em zero** — usar `clearInterval` para evitar valores negativos após a virada
- [ ] **Permitir data-alvo customizável** — receber qualquer data via parâmetro ou campo de input, não só o Ano Novo
- [ ] **Persistência via URL** — salvar a data alvo na query string (`?target=2025-12-31`) para compartilhar o link

### Visuais

- [ ] **Animação de flip** — efeito de "carta virando" ao trocar o número (como relógios de aeroporto)
- [ ] **Responsividade mobile** — adaptar o grid para 2×2 em telas pequenas com media queries
- [ ] **Tema escuro/claro** — alternar com `prefers-color-scheme` ou um botão de toggle

### Código

- [ ] **Separar a lógica de data** em uma função pura `getTimeLeft(targetDate)` para facilitar testes e reaproveitamento
- [ ] **Adicionar testes unitários** com Vitest ou Jest para validar os cálculos de dias/horas/minutos/segundos

---

## ⚙️ Como usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/thamiresviel/countdown-ano-novo.git
   ```
2. Abra o arquivo `index.html` no navegador.

---

## 📄 Licença

Este projeto está sob a licença MIT.
