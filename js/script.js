// DEFINIR A DATA ALVO
const dataAlvo = new Date(2026, 11, 31, 0, 0, 0);

// PEGAR OS ELEMENTOS DO HTML

const elDias = document.getElementById("dias");
const elHoras = document.getElementById("horas");
const elMinutos = document.getElementById("minutos");
const elSegundos = document.getElementById("segundos");
const elMensagem = document.getElementById("mensagem");

// A FUNÇÃO PRINCIPAL

function atualizarContagem() {
  // Pega o momento exato agora
  const agora = new Date();

  // Calcula a diferença em milisegundos
  const diferenca = dataAlvo - agora;

  // SE já passou da data, mostra mensagem e para

  if (diferenca <= 0) {
    elMensagem.textContent = "🎉 chegou o dia!";
    elDias.textContent = "00";
    elHoras.textContent = "00";
    elMinutos.textContent = "00";
    elSegundos.textContent = "00";
    return;
  }
  // Conversão de milisegundos para unidades legiveis
  const totalSegundos = Math.floor(diferenca / 1000);
  const totalMinutos = Math.floor(totalSegundos / 60);
  const totalHoras = Math.floor(totalMinutos / 60);
  const totalDias = Math.floor(totalHoras / 24);

  // Isola o "resto" de cada unidade
  const segundos = totalSegundos % 60;
  const minutos = totalMinutos % 60;
  const horas = totalHoras % 24;
  const dias = totalDias;

  // Formata com zero à esquerda e atualiza o HTML
  elDias.textContent = String(dias).padStart(2, "0");
  elHoras.textContent = String(horas).padStart(2, "0");
  elMinutos.textContent = String(minutos).padStart(2, "0");
  elSegundos.textContent = String(segundos).padStart(2, "0");
}

// 4. RODAR A FUNÇÃO IMEDIATAMENTE E DEPOIS A CADA 1 SEGUNDO
atualizarContagem(); // Roda agora pra não ter delay inicial

setInterval(atualizarContagem, 1000); // Repete a cada 1000ms
