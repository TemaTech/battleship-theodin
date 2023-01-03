import { Player } from '../scripts/player';
import { Gameboard } from '../scripts/gameboard';

test("Create a new player.", () => {
  const player = new Player(new Gameboard(), "player1");
  expect(player.gameboard).toBeDefined();
  expect(player.nickname).toBeDefined();
});

test("Players have their nicknames.", () => {
  const player = new Player(new Gameboard(), "player1");
  expect(player.nickname).toBe("player1");
});

test("Player can take a turn against a computer.", () => {
  const player = new Player(new Gameboard(), "Player");
  const computer = new Player(new Gameboard(), "Computer");

  player.playerTurn(computer, "0,0");
  
  expect(computer.gameboard.grid.get("0,0").isHit).toBe(false);
});
