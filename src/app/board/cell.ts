export class Cell {
  static files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  file: string;
  rank: number;

  constructor (c: number, n: number) {
    this.file = Cell.files[c];
    this.rank = n;
  }

  getPosition() {
    return this.file + this.rank;
  }

  getX () {
    return Cell.files.indexOf(this.file);
  }

  getY () {
    return this.rank;
  }
}
