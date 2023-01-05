import './gameCSS/game.css';
import { data } from '..';
import { renderGrid } from './placing';
import { renderShipsOnGrid } from './placing';
import { Game } from '../scripts/game';
import explosionImg from './img/explosion.png';

export function renderGame() {
  const content = document.querySelector('.content-container');
  content.style.display = 'grid';
  content.innerHTML = '';
  renderPlayerGrid();
  renderComputerGrid();

  const computerSquares = document.querySelectorAll('.grid:nth-of-type(2) .square');
  const playerSquares = document.querySelectorAll('#player-grid.grid .square');

  const game = new Game();
  renderTitle(game);
  game.placeAllPlayerShips(data.ships);
  computerSquares.forEach(square => {
    square.addEventListener('click', () => {
      if (!square.classList.contains('attacked')) {
        square.classList.add('attacked');
        game.player.playerTurn(game.computer, square.id.split('-').join(','));
        const playerAttackResult = game.computer.gameboard.lastAttack.split('-');
        const coordinates1 = playerAttackResult[0].split(',').join('-');
        let sq1;
        for (let i = 0; i < computerSquares.length; i++) {
          if (computerSquares[i].id === coordinates1) {
            sq1 = computerSquares[i];
            break;
          }
        }
        sq1.classList.add(playerAttackResult[1]);
        if (playerAttackResult[1] == 'true') {
          const img = document.createElement('img');
          img.src = explosionImg;
          sq1.appendChild(img);
        }
        if (!game.computer.gameboard.allSunk()) {
          game.computer.computerTurn(game.player);
          const computerAttackResult = game.player.gameboard.lastAttack.split('-');
          const coordinates2 = computerAttackResult[0].split(',').join('-');
          let sq2;
          for (let i = 0; i < playerSquares.length; i++) {
            if (playerSquares[i].id === coordinates2) {
              sq2 = playerSquares[i];
              break;
            }
          }
          sq2.classList.add(computerAttackResult[1]);
          if (computerAttackResult[1] == 'true') {
            const img = document.createElement('img');
            img.src = explosionImg;
            sq2.appendChild(img);
          }
          if (game.player.gameboard.allSunk()) {
            game.winner = game.computer;
            // Make a winner screen with game.winner 
            return;
          }
        } else if (game.computer.gameboard.allSunk()) {
          game.winner = game.player;
            // Make a winner screen with game.winner 
          return;
        }
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

