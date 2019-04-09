export class GameModel {
  public id!: string;

  public turnNumber!: number;

  public winner!: 'o' | 'x';

  public date!: firebase.firestore.Timestamp;

  public isMultiPlayer!: boolean;

  public userId!: string;

  public toPlan() {
    return { date: this.date, isMultiPlayer: this.isMultiPlayer, userId: this.userId };
  }
}