import { Gameboard } from './gameboard';
import { Player } from './player';
import { data } from '..';

export class Game {
  constructor() {
    this.winner = null;

    this.player = new Player(new Gameboard(), data.nickname);
    this.computer = new Player(new Gameboard(), "Computer");

    this.computer.gameboard.placeShipsRandomly();
  }

  placeAllPlayerShips(ships) {
    for (const ship in ships) {
      const shipName = ship.split('-')[0];
      const data = ships[ship].split('-');
      const square = `${data[0]},${data[1]}`;
      const axis = data[2];
      this.player.gameboard.placeShip(square, shipName, axis);
    }
  }

  takeTurn(square) {
    if (this.computer.gameboard.allSunk()) {
      this.winner = this.player;
      return;
    }

    if (this.player.gameboard.allSunk()) {
      this.winner = this.computer;
      return;
    }

    this.computer.gameboard.receiveAttack(square);

    if (this.computer.gameboard.allSunk()) {
      this.winner = this.player;
      return;
    }

    this.player.gameboard.randomAttack();

    if (this.player.gameboard.allSunk()) {
      this.winner = this.computer;
      return;
    }
  }

  canComputerSquareBeAttacked(square) {
    const sq = this.computer.gameboard.grid.get(square);
    return sq.isHit === null ? true : false;
  }
}