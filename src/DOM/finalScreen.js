import './finalScreenCSS/finalScreen.css';
import { data } from '..';
import victoryTrophy from './img/trophy.png';
import surrenderImg from './img/peace.png';
import { renderDefault } from './default';

export function renderFinalScreen(winner) {
  document.querySelector('body').innerHTML = '';
  renderDefault();
  if (winner == data.nickname) {
    renderVictoryScreen();
  } else {
    renderDefeatScreen();
  }
}

const victoryText = "The player emerges victorious, rising to the rank of admiral and leading the human fleet to triumph over the robotic enemies. Our tactical genius prevails, and we are hailed as heroes of the sea.";
const defeatText = "Though we fought bravely, in the end we are no match for the formidable robotic fleet. We lay down our weapons and accept defeat with honor, vowing to learn from our mistakes and return stronger in the next battle.";

function renderCard() {
  const content = document.querySelector('.content-container');
  content.innerHTML = '';
  const cardContainer = document.createElement('div');
  cardContainer.classList = 'finalScreen-cardContainer';
  content.appendChild(cardContainer);
}

function renderVictoryScreen() {
  renderCard();

  const container = document.querySelector('.finalScreen-cardContainer');

  const header = document.createElement('div');
  header.classList = 'header';
  const img = document.createElement('img');
  img.src = victoryTrophy;
  header.appendChild(img);
  const headerText = document.createElement('h1');
  headerText.textContent = `${data.nickname} has won!`;
  header.appendChild(headerText);
  container.appendChild(header);

  const p = document.createElement('p');
  p.textContent = victoryText;
  container.appendChild(p);

  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play Again!';
  playAgainButton.addEventListener('click', () => {
    window.location.reload();
  });
  container.appendChild(playAgainButton);
}

function renderDefeatScreen() {
  renderCard();

  const container = document.querySelector('.finalScreen-cardContainer');

  const header = document.createElement('div');
  header.classList = 'header';
  const img = document.createElement('img');
  img.src = surrenderImg;
  header.appendChild(img);
  const headerText = document.createElement('h1');
  headerText.textContent = `${data.nickname} has lost.`;
  header.appendChild(headerText);
  container.appendChild(header);

  const p = document.createElement('p');
  p.textContent = defeatText;
  container.appendChild(p);

  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play Again!';
  playAgainButton.addEventListener('click', () => {
    window.location.reload();
  });
  container.appendChild(playAgainButton);
}