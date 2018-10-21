export class Piece {
  static pieces: string[] = ['K', 'Q', 'R', 'N', 'B', 'P'];
  static colors: string[] = ['white', 'black'];

  private piece: number;
  private color: number;

  constructor (piece: string, color: string) {
    this.piece = Piece.pieces.indexOf(piece.toLocaleUpperCase());
    this.color = Piece.pieces.indexOf(color.toLocaleLowerCase());
  }

  getName () {
    return Piece.pieces[this.piece];
  }

  getColor() {
    return Piece.colors[this.color];
  }

}
