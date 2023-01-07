import './gameCSS/game.css';
import { data } from '..';
import { renderGrid } from './placing';
import { renderShipsOnGrid } from './placing';
import { Game } from '../scripts/game';
import explosionImg from './img/explosion.png';
import { renderFinalScreen } from './finalScreen';

export function renderGame() {
  const content = document.querySelector('.content-container');
  content.style.display = 'grid';
  content.innerHTML = '';
  renderPlayerGrid();
  renderComputerGrid();

  const computerSquares = document.querySelectorAll('.grid:nth-of-type(2) .square')
  const playerSquares = document.querySelectorAll('.grid:nth-of-type(1) .square');

  const GAME = new Game();
  GAME.placeAllPlayerShips(data.ships);
  GAME.computer.gameboard.grid.forEach((value, key) => {
    if (value.isTaken !== false) {
      computerSquares.forEach(square => {
        if (square.id === key.split(',').join('-')) {
          square.style.background = '#FFF'
        }
      });
    }
  });
  renderTitle(GAME);
  document.querySelectorAll('.grid:nth-of-type(2) .square').forEach(square => {
    square.addEventListener('click', () => {
      const squareKey = square.id.split('-').join(',');
      if (GAME.canComputerSquareBeAttacked(squareKey)) {
        GAME.takeTurn(squareKey);
        
        let computerSq;
        computerSquares.forEach(sq => {
          if (sq.id === getLastAttackID(GAME.computer)) {
            computerSq = sq;
          }
        });
        
        let playerSq;
        playerSquares.forEach(sq => {
          if (sq.id === getLastAttackID(GAME.player)) {
            playerSq = sq;
          }
        });

        styleSquare(GAME.computer, computerSq);
        styleSquare(GAME.player, playerSq);
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
  const grid = document.querySelector('.grid');
  grid.setAttribute('id', 'player-grid');
  renderShipsOnGrid();
}

function renderComputerGrid() {
  renderGrid();
}

function styleSquare(entity, square) {
  square.classList.add(entity.gameboard.lastAttack.split('-')[1]);
  if (entity.gameboard.lastAttack.split('-')[1] == 'true') {
    const img = document.createElement('img');
    img.src = explosionImg;
    square.appendChild(img);
  }
}

function getLastAttackID(entity) {
  const square = entity.gameboard.lastAttack.split('-')[0].split(',').join('-');
  return square;
}
