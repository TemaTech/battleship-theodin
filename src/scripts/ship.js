export class Ship {
  constructor(shipLength, codeName) {
    this.shipLength = shipLength;
    this.hits = 0;
    this.codeName = codeName;
  }

  hit() {
    if (!this.isSunk()) {
      this.hits += 1;
    }
  }

  isSunk() {
    if (this.hits == this.shipLength) {
      return true;
    } else {
      return false;
    }
  }
}