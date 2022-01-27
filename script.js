'use strict';
//Selecionando elementos
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--novo');
const btnRoll = document.querySelector('.btn--jogar');
const btnHold = document.querySelector('.btn--guardar');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('ocultar');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const nextPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Iniciando condições
score0El.textContent = '0';
score1El.textContent = '0';
diceEl.classList.add('ocultar');

//Implementando a funcionalidade dos dados
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Gerar um jogo aleatório
    const dice = Math.trunc(Math.random() * 6 + 1);

    //2. Exibir no display;
    diceEl.classList.remove('ocultar');
    diceEl.src = `dice-${dice}.png`;

    //3. Verificar se o dado representa o número 1.
    if (dice !== 1) {
      //Não sendo 1, os valores são somados um ao outro e o jogador continua.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //se for o número 1, a vez passa para o próximo jogador.
      nextPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Adicionar a pontuação atual à pontuação do jogador ativo
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Checa se a pontuação do jogador é >= 100. Se for, ele vence e o jogo acaba.
    if (scores[activePlayer] >= 100) {
      //Termine o jogo
      playing = false;
      diceEl.classList.add('ocultar');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Vá para o próximo jogador
      nextPlayer();
    }

    //Se não for, pule para o próximo9 jogador.
  }
});

btnNew.addEventListener('click', init);
