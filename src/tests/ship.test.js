import { Ship } from '../scripts/ship';

test("A ship can be hit", () => {
  const ship = new Ship(2);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("A ship can't be hit if it has been sunk", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("A ship can be sunk if the number of hits equals to the length of the ship", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});

test("A ship can't be sunk if the number of hits doesn't equal to the length of the ship", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeFalsy();
});
