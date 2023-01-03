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
  }

  placeShip(square, codeName, axis) {
    const ship = this[codeName];
    const coordinates = [parseInt(square.split(',')[0]), parseInt(square.split(',')[1])];

    if (axis === "X" && coordinates[1] + (ship.shipLength - 1) < 10 && coordinates[1] + (ship.shipLength - 1) >= 0) {
      for (let i = 0; i < ship.shipLength; i++) {
        this.grid.get(`${coordinates[0]},${coordinates[1] + i}`).isTaken = ship;
      }
    } else if (axis === "Y" && coordinates[0] - (ship.shipLength - 1) >= 0 && coordinates[0] - (ship.shipLength - 1) < 10) {
      for (let i = 0; i < ship.shipLength; i++) {
        this.grid.get(`${coordinates[0] - i},${coordinates[1]}`).isTaken = ship;
      }
    }
  }

  receiveAttack(square) {
    if (this.grid.get(square).isHit === null) {
      if (this.grid.get(square).isTaken !== false) {
        this.grid.get(square).isHit = true;
        this[this.grid.get(square).isTaken.codeName].hit();
      } else {
        this.grid.get(square).isHit = false;
      }
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
    const coordinates = [parseInt(square.split(',')[0]), parseInt(square.split(',')[1])];
    const boolean = new Set();

    if (axis === "X" && coordinates[1] + (ship.shipLength - 1) < 10 && coordinates[1] + (ship.shipLength - 1) >= 0) {
      for (let i = 0; i < ship.shipLength; i++) {
        this.grid.get(`${coordinates[0]},${coordinates[1] + i}`).isTaken === false ? boolean.add(true) : boolean.add(false);
      }
    } else if (axis === "Y" && coordinates[0] - (ship.shipLength - 1) >= 0 && coordinates[0] - (ship.shipLength - 1) < 10) {
      for (let i = 0; i < ship.shipLength; i++) {
        this.grid.get(`${coordinates[0] - i},${coordinates[1]}`).isTaken === false ? boolean.add(true) : boolean.add(false);
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