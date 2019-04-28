export class GameModel {
  public static toGameList(game: GameModel) {
    const gameModel = new GameModel();
    gameModel.id = game.id;
    gameModel.date = game.date;
    gameModel.isMultiPlayer = game.isMultiPlayer;
    gameModel.turnNumber = game.turnNumber;
    gameModel.winner = game.winner;

    return gameModel;
  }

  public id!: string;

  public turnNumber!: number;

  public winner!: 'o' | 'x';

  public date!: firebase.firestore.Timestamp;

  public isMultiPlayer!: boolean;

  public userId!: string;

  get dateReal(): string { return this.date ? this.date.toDate().toLocaleString() : ''; }

  get isFinished(): boolean { return this.turnNumber === 9 || !!this.winner; }

  public toAddGame() {
    return {
      date: this.date,
      isMultiPlayer: this.isMultiPlayer,
      userId: this.userId,
    };
  }

  public toSetGame() {
    return {
      turnNumber: this.turnNumber,
      winner: this.winner,
    };
  }
}
