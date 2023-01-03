export class Player {
  constructor(gameboard, nickname) {
    this.gameboard = gameboard;
    this.nickname = nickname;
  }

  playerTurn(enemy, square) {
    enemy.gameboard.receiveAttack(square);
  }

  computerTurn(enemy) {
    enemy.gameboard.randomAttack();
  }
}
