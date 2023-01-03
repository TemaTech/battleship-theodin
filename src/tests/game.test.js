import { Game } from "../scripts/game";

test("Create a new game.", () => {
  const game = new Game();
  
  expect(game.computer).toHaveProperty("gameboard");
  expect(game.computer).toHaveProperty("nickname");
  expect(game.computer.gameboard).toHaveProperty("grid");
  expect(game.computer.gameboard.grid.size).toBe(100);
  expect(game.computer.gameboard).toHaveProperty("carrier");
  expect(game.computer.gameboard).toHaveProperty("battleship");
  expect(game.computer.gameboard).toHaveProperty("cruiser");
  expect(game.computer.gameboard).toHaveProperty("submarine");
  expect(game.computer.gameboard).toHaveProperty("destroyer");

  expect(game.player).toHaveProperty("gameboard");
  expect(game.player).toHaveProperty("nickname");
  expect(game.player.gameboard).toHaveProperty("grid");
  expect(game.player.gameboard.grid.size).toBe(100);
  expect(game.player.gameboard).toHaveProperty("carrier");
  expect(game.player.gameboard).toHaveProperty("battleship");
  expect(game.player.gameboard).toHaveProperty("cruiser");
  expect(game.player.gameboard).toHaveProperty("submarine");
  expect(game.player.gameboard).toHaveProperty("destroyer");
});
