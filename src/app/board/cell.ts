export class Cell {
  file_c: string;
  file_n: number;
  positions: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  constructor (c: number, n: number) {
    this.file_c = this.positions[c];
    this.file_n = n;
  }

  getPosition() {
    return this.file_c + this.file_n;
  }

  getX () {
    return this.positions.indexOf(this.file_c);
  }

  getY () {
    return this.file_n;
  }
}
