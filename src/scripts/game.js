import { Gameboard } from './gameboard';
import { Player } from './player';
import { data } from '../index';

export class Game {
  constructor() {
    this.winner = null;

    this.player = new Player(new Gameboard(), data.nickname);
    this.computer = new Player(new Gameboard(), "Computer");

    this.player.gameboard.placeShipsRandomly();
    this.computer.gameboard.placeShipsRandomly();
  }
  
}