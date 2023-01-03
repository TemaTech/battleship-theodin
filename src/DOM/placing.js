import './placingCSS/placing.css';
import { data } from '..';

let AXIS = "X";

export function renderPlacing() {
  renderGrid();
  renderShipMenu();
  squareListeners();
  shipListeners();
}

function renderGrid() {
  const content = document.querySelector('.content-container');
  const grid = document.createElement('div');
  grid.classList = 'grid';
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const square = document.createElement('div');
      square.setAttribute('id', `${i}-${j}`);
      square.classList = 'square';
      square.setAttribute('draggable', false);
      grid.appendChild(square);
    }
  }
  content.appendChild(grid);
}

function renderShipMenu() {
  const content = document.querySelector('.content-container');
  const container = document.createElement('div');
  container.classList = 'container';
  const tip = document.createElement('p');
  tip.textContent = "To start the game you have to place all of the ships on the grid.";
  container.appendChild(tip);
  const shipContainer = document.createElement('div');
  shipContainer.classList = 'ship-container';
  const shipList = ['carrier-5', 'battleship-4', 'cruiser-3', 'submarine-3', 'destroyer-2'];
  for (let i = 0; i < shipList.length; i++) {
    const length = parseInt(shipList[i].split('-')[1]);
    const ship = document.createElement('div');
    ship.setAttribute('id', shipList[i]);
    ship.classList = 'ship';
    ship.setAttribute('draggable', true);
    ship.style.height = '50px';
    ship.style.width = `${length * 50}px`;
    for (let i = 0; i < length; i++) {
      const decoration = document.createElement('div');
      ship.appendChild(decoration);
    }
    shipContainer.appendChild(ship);
  }
  container.appendChild(shipContainer);
  const playButton = document.createElement('button');
  playButton.textContent = 'Play';
  playButton.classList = 'disabled-button';
  container.appendChild(playButton);
  content.appendChild(container);
}

function checkPlayButton() {
  const button = document.querySelector('.container button');
  
  if (Object.values(data.ships).every(val => val !== null && val !== undefined)) {
    button.classList.remove('disabled-button');
  } else {
    button.classList.add('disabled-button');
  }
}

function squareListeners() {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => {
    const Y = parseInt(square.id.split('-')[0]);
    const X = parseInt(square.id.split('-')[1]);

    square.addEventListener('dragenter', () => {
      const draggingShip = document.querySelector('.dragging-ship').id;
      const shipLength = parseInt(draggingShip.split('-')[1]);

      squares.forEach(square => {
        square.style.background = '#464646';
      });
      
      for (let i = X; i < (X + shipLength); i++) {
        if (validatePlacing([Y, X], "X", shipLength)) {
          document.getElementById(`${Y}-${i}`).style.background = '#5c5c5c';
        }  
      }
    });

    square.addEventListener('dragover', (e) => {
      const draggingShip = document.querySelector('.dragging-ship').id;
      const shipLength = parseInt(draggingShip.split('-')[1]);

      if (validatePlacing([Y, X], "X", shipLength)) {
        e.preventDefault();
      }
    });

    square.addEventListener('drop', (e) => {
      const shipData = e.dataTransfer.getData('text/plain');

      if (validatePlacing([Y, X], "X", parseInt(shipData.split('-')[1]))) {
        putData(shipData, "X", Y, X);
        checkPlayButton();
        renderShipsOnGrid();
      }
    });
  });
}

function shipListeners() {
  const ships = document.querySelectorAll('.ship');
  ships.forEach(ship => {
    ship.addEventListener('dragstart', (e) => {
      ship.classList.add('dragging-ship');
      e.dataTransfer.setData('text/plain', ship.id);
    });

    ship.addEventListener('dragend', () => {
      ship.classList.remove('dragging-ship');
    });

    ship.addEventListener('click', () => {
      console.log('Hello')
    });
  });
}

function validatePlacing(coordinates, axis, shipLength) {
  const boolean = new Set();
  const Y = coordinates[0];
  const X = coordinates[1];

  // Check if the ship is in the range of the gameboard
  if (axis === "X") {
    if (X + (shipLength - 1) < 10 && X + (shipLength - 1) >= 0) {
      boolean.add(true);
    } else {
      boolean.add(false);
    }
  } else {
    if (Y + (shipLength - 1) < 10 && Y + (shipLength - 1) >= 0) {
      boolean.add(true);
    } else {
      boolean.add(false);
    }
  }

  // Make sure that none of the squares within a range of 1 square from the current square have already been taken
  if (axis === "X") {
    for (let i = X; i < X + shipLength; i++) {
      for (let y = Y - 1; y <= Y + 1; y++) {
        for (let x = i - 1; x <= i + 1; x++) {
          let element = document.getElementById(`${y}-${x}`);
          if (element && element.classList.contains('taken-square')) {
            boolean.add(false);
            break;
          }
        }
      }
    }
  } else {
    for (let i = Y; i < Y + shipLength; i++) {
      for (let y = i - 1; y <= i + 1; y++) {
        for (let x = X - 1; X <= i + 1; x++) {
          let element = document.getElementById(`${y}-${x}`);
          if (element && element.classList.contains('taken-square')) {
            boolean.add(false);
            break;
          }
        }
      }
    }
  }

  if (boolean.has(false)) return false;
  return true;
}

function putData(shipData, axis, Y, X) {
  data.ships[shipData] = `${Y}-${X}-${axis}`;
}

function renderShipsOnGrid() {
  // Re-render the squares
  const takenSquares = document.querySelectorAll('.taken-square');
  takenSquares.forEach(square => {
    const decoration = document.querySelector('.taken-square div');
    square.removeChild(decoration)
    square.classList.remove('taken-square');
  });

  const ships = onlyPlacedShips();
  for (const ship in ships) {
    const length = parseInt(ship.split('-')[1]);
    const coordinates = ships[ship].split('-');
    const Y = parseInt(coordinates[0]);
    const X = parseInt(coordinates[1]);
    const axis = coordinates[2];

    if (axis === 'X') {
      for (let i = X; i < X + length; i++) {
        const currentSquare = document.getElementById(`${Y}-${i}`);
        currentSquare.classList.add('taken-square');
        const decoration = document.createElement('div');
        currentSquare.appendChild(decoration);
      }
    } else {
      for (let i = Y; i < Y + length; i++) {
        const currentSquare = document.getElementById(`${i}-${X}`);
        currentSquare.classList.add('taken-square');
        const decoration = document.createElement('div');
        currentSquare.appendChild(decoration);
      }
    }
  }
}

function onlyPlacedShips() {
  return Object.entries(data.ships)
  .filter(([key, val]) => val !== null)
  .reduce((result, [key, val]) => {
    result[key] = val;
    return result;
  }, {});
}
