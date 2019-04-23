export class GameModel {
  public static toGameList(game: GameModel) {
    const gameModel = new GameModel();
    gameModel.id = game.id;
    gameModel.isMultiPlayer = game.isMultiPlayer;
    gameModel.turnNumber = game.turnNumber;
    gameModel.winner = game.winner;
    gameModel.dateReal = game.date.toDate().toLocaleString();

    return gameModel;
  }

  public id!: string;

  public turnNumber!: number;

  public winner!: 'o' | 'x';

  public date!: firebase.firestore.Timestamp;

  public isMultiPlayer!: boolean;

  public userId!: string;

  public dateReal!: string;

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
