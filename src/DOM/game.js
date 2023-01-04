import './gameCSS/game.css';
import { data } from '..';
import { renderGrid } from './placing';
import { renderShipsOnGrid } from './placing';
import { Game } from '../scripts/game';

export function renderGame() {
  const content = document.querySelector('.content-container');
  content.style.display = 'grid';
  content.innerHTML = '';
  renderPlayerGrid();
  renderComputerGrid();

  const computerSquares = document.querySelectorAll('.grid:nth-of-type(2) .square');

  // Game loop
  const game = new Game();
  renderTitle(game);
  game.placeAllPlayerShips(data.ships);
  computerSquares.forEach(square => {
    square.addEventListener('click', () => {
      if (!square.classList.contains('attacked')) {
        console.log('Hello world');
        square.classList.add('attacked');
      }
    });
  });
}

function renderTitle(game) {
  const content = document.querySelector('.content-container');
  const titleCont = document.createElement('div');
  titleCont.classList = 'title-container';
  const title = document.createElement('h3');
  title.textContent = `${game.player.nickname} vs ${game.computer.nickname}`;
  titleCont.appendChild(title);
  const tip = document.createElement('p');
  tip.textContent = "You have to click on enemy's square to attack him.";
  titleCont.appendChild(tip)
  content.appendChild(titleCont);
}

function renderPlayerGrid() {
  renderGrid();
  renderShipsOnGrid();
}

function renderComputerGrid() {
  renderGrid();
}

