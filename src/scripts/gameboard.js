import { Ship } from "./ship";
import { shuffle } from 'lodash';

export class Gameboard {
  constructor() {
    this.grid = new Map();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.grid.set(`${i},${j}`, {isTaken: false, isHit: null});
      }
    }
    this.carrier = new Ship(5, "carrier");
    this.battleship = new Ship(4, "battleship");
    this.cruiser = new Ship(3, "cruiser");
    this.submarine = new Ship(3, "submarine");
    this.destroyer = new Ship(2, "destroyer");
    this.lastAttack = null;
  }

  placeShip(square, codeName, axis) {
    const ship = this[codeName];
    const coordinates = [parseInt(square.split(',')[0]), parseInt(square.split(',')[1])];

    if (axis === "X" && coordinates[1] + (ship.shipLength - 1) < 10 && coordinates[1] + (ship.shipLength - 1) >= 0) {
      for (let i = 0; i < ship.shipLength; i++) {
        this.grid.get(`${coordinates[0]},${coordinates[1] + i}`).isTaken = ship;
      }
    } else if (axis === "Y" && coordinates[0] + (ship.shipLength - 1) >= 0 && coordinates[0] + (ship.shipLength - 1) < 10) {
      for (let i = 0; i < ship.shipLength; i++) {
        this.grid.get(`${coordinates[0] + i},${coordinates[1]}`).isTaken = ship;
      }
    }
  }

  receiveAttack(square) {
    const sq = this.grid.get(square);
    if (sq.isTaken === false) {
      sq.isHit = false;
      this.lastAttack = `${square}-${false}`;
    } else {
      sq.isHit = true;
      this[sq.isTaken.codeName].hit();
      this.lastAttack = `${square}-${true}`;
    }
  }

  allSunk() {
    const boolean = new Set();
    for (const square of this.grid) {
      if (square[1].isTaken) {
        boolean.add(this[square[1].isTaken.codeName].isSunk());
      }
    }

    if (boolean.has(false)) return false;
    
    return true;
  }

  isValidPosition(square, codeName, axis) {
    const ship = this[codeName];
    const Y = parseInt(square.split(',')[0]);
    const X = parseInt(square.split(',')[1]);
    const boolean = new Set();

    if (axis === 'X') {
      if (X + ship.shipLength - 1 < 10 && X + ship.shipLength - 1 >= 0) {
        for (let i = X; i < X + ship.shipLength; i++) {
          this.grid.get(`${Y},${i}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          if (this.grid.get(`${Y - 1},${i}`)) {
            this.grid.get(`${Y - 1},${i}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${Y + 1},${i}`)) {
            this.grid.get(`${Y + 1},${i}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${Y},${i - 1}`)) {
            this.grid.get(`${Y},${i - 1}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${Y},${i + 1}`)) {
            this.grid.get(`${Y},${i + 1}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${Y - 1},${i - 1}`)) {
            this.grid.get(`${Y - 1},${i - 1}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${Y - 1},${i + 1}`)) {
            this.grid.get(`${Y - 1},${i + 1}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${Y + 1},${i + 1}`)) {
            this.grid.get(`${Y + 1},${i + 1}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${Y + 1},${i - 1}`)) {
            this.grid.get(`${Y + 1},${i - 1}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
        }
      } else {
        boolean.add(false);
      }
    } else {
      if (Y + ship.shipLength - 1 < 10 && Y + ship.shipLength - 1 >= 0) {
        for (let i = Y; i < Y + ship.shipLength; i++) {
          this.grid.get(`${i},${X}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          if (this.grid.get(`${i - 1},${X}`)) {
            this.grid.get(`${i - 1},${X}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${i + 1},${X}`)) {
            this.grid.get(`${i + 1},${X}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${i},${X - 1}`)) {
            this.grid.get(`${i},${X - 1}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${i},${X + 1}`)) {
            this.grid.get(`${i},${X + 1}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${i - 1},${X - 1}`)) {
            this.grid.get(`${i - 1},${X - 1}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${i - 1},${X + 1}`)) {
            this.grid.get(`${i - 1},${X + 1}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${i + 1},${X + 1}`)) {
            this.grid.get(`${i + 1},${X + 1}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
          if (this.grid.get(`${i + 1},${X - 1}`)) {
            this.grid.get(`${i + 1},${X - 1}`).isTaken === false ? boolean.add(true) : boolean.add(false);
          }
        }
      } else {
        boolean.add(false);
      }
    }

    if (!boolean.has(false)) {
      return true;
    } else {
      return false;
    }
  } 
  

  placeShipsRandomly() {
    const ships = shuffle([this.carrier, this.battleship, this.cruiser, this.submarine, this.destroyer]);

    for (const ship of ships) {
      let placed = false;

      while(!placed) {
        const axis = Math.random() < 0.5 ? "X" : "Y";
        const i = Math.floor(Math.random() * 10);
        const j = Math.floor(Math.random() * 10);
        const square = `${i},${j}`;

        if (this.isValidPosition(square, ship.codeName, axis)) {
          this.placeShip(square, ship.codeName, axis);
          placed = true;
        }
      }
    }
  }

  isValidAttack(square) {
    if (this.grid.get(square).isHit === null) {
      return true;
    } else {
      return false;
    }
  }

  randomAttack() {
    let attacked = false;

    while(!attacked) {
      const i = Math.floor(Math.random() * 10);
      const j = Math.floor(Math.random() * 10);
      const square = `${i},${j}`;

      if (this.isValidAttack(square)) {
        this.receiveAttack(square);
        attacked = true;
      }
    }
  }
}

// #1 Validation doesn't work properly, a ship can't be placed in the range of 1 square nearby an other ship
// #2 allSunk() function doesn't work properly, computer wins before it has sunk all of players ship
// #3 placeShip() funciton doesn't work correctly, even though the player has sunk all of the computer's ships, the player doesn't win
// because not all ships are placed
// #4 Animations and trasnsitions have to be added