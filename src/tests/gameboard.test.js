import { Gameboard } from '../scripts/gameboard';

test("The size of a gameboard should be 100 squares.", () => {
  const gameboard = new Gameboard();

  expect(gameboard.grid.size).toBe(100)
});

test("Check default values and properties of a square on a gameboard.", () => {
  const gameboard = new Gameboard();

  for (let [key, value] of gameboard.grid) {
    expect(value.isTaken).toBe(false);
    expect(value.isHit).toBe(null);

  }
});

test("The placeShip() function on X axis.", () => {
  const gameboard = new Gameboard();

  expect(gameboard.grid.get("0,0").isTaken).toBe(false);
  expect(gameboard.grid.get("0,1").isTaken).toBe(false);

  gameboard.placeShip("0,0", "destroyer", "X");
  expect(gameboard.grid.get("0,0").isTaken).toEqual({"hits": 0, "shipLength": 2, "codeName": "destroyer"});
  expect(gameboard.grid.get("0,1").isTaken).toEqual({"hits": 0, "shipLength": 2, "codeName": "destroyer"});
});

test("The placeShip() function on Y axis.", () => {
  const gameboard = new Gameboard();

  expect(gameboard.grid.get("1,0").isTaken).toBe(false);
  expect(gameboard.grid.get("0,0").isTaken).toBe(false);

  gameboard.placeShip("1,0", "destroyer", "Y");
  expect(gameboard.grid.get("1,0").isTaken).toEqual({"hits": 0, "shipLength": 2, "codeName": "destroyer"});
  expect(gameboard.grid.get("0,0").isTaken).toEqual({"hits": 0, "shipLength": 2, "codeName": "destroyer"});
});

test("The recieveAttack() function.", () => {
  const gameboard = new Gameboard();

  expect(gameboard.grid.get("0,0").isHit).toBe(null)

  gameboard.receiveAttack("0,0");
  expect(gameboard.grid.get("0,0").isHit).toBe(false);

  gameboard.placeShip("2,0", "destroyer", "X");
  gameboard.receiveAttack("2,0");
  gameboard.receiveAttack("2,1");
  expect(gameboard.grid.get("2,0").isHit).toBe(true);
  expect(gameboard.grid.get("2,1").isHit).toBe(true);
  expect(gameboard.destroyer.hits).toBe(2);
});

test("The allSunk() function.", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip("0,0", "destroyer", "X");
  expect(gameboard.allSunk()).toBe(false);

  gameboard.receiveAttack("0,0");
  expect(gameboard.allSunk()).toBe(false);

  gameboard.receiveAttack("0,1");
  expect(gameboard.allSunk()).toBe(true)
});
