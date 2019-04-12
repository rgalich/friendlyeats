export class TurnGameModel {
  public id!: string;

  public gameId!: string;

  public turnNumber!: number;

  public turn!: 'o' | 'x';

  public place!: number;

  public date!: firebase.firestore.Timestamp;

  public userId!: string;

  public addTurnGame() {
    return { date: this.date, gameId: this.gameId, turnNumber: this.turnNumber,  turn: this.turn, place: this.place };
  }
}
