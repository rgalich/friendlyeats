import { WinnerModel } from './../models/winnerModel';
import { PositionModel } from './../models/positionModel';
// tslint:disable:no-shadowed-variable

import { MutationTree, ActionTree, GetterTree } from 'vuex';
import Firebase from '@/firebaseConfig';
import { GameModel, TurnGameModel } from '@/models';
import { firestore } from 'firebase';

interface TicTacToeState {
  game: GameModel;
  gameList: GameModel[];
  positionList: PositionModel[];
  winningCombinationList: Array<[number, number, number]>;
  winner: WinnerModel;
  turn: 'o' | 'x';
  turnNumber: number;
  turnMax: number;
  isWinning: boolean;
  isMultiPlayer: boolean;
}

const state: TicTacToeState = {
    game: new GameModel(),
    gameList: [] as GameModel[],
    positionList: [
      {
        id: 1,
        positionX: 'left',
        positionY: 'top',
        value: null,
      },
      {
        id: 2,
        positionX: null,
        positionY: 'top',
        value: null,
      },
      {
        id: 3,
        positionX: 'right',
        positionY: 'top',
        value: null,
      },
      {
        id: 4,
        positionX: 'left',
        positionY: null,
        value: null,
      },
      {
        id: 5,
        positionX: null,
        positionY: null,
        value: null,
      },
      {
        id: 6,
        positionX: 'right',
        positionY: null,
        value: null,
      },
      {
        id: 7,
        positionX: 'left',
        positionY: 'bottom',
        value: null,
      },
      {
        id: 8,
        positionX: null,
        positionY: 'bottom',
        value: null,
      },
      {
        id: 9,
        positionX: 'right',
        positionY: 'bottom',
        value: null,
      },
    ],
    winningCombinationList: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ],
    winner: new WinnerModel(),
    turn: 'o',
    turnNumber: 0,
    turnMax: 9,
    isWinning: false,
    isMultiPlayer: false,
};

const getters: GetterTree<TicTacToeState, TicTacToeState> = {
  game: (state) => state.game,
  gameList: (state) => state.gameList,
  positionList: (state) => state.positionList,
  winningCombinationList: (state) => state.winningCombinationList,
  winner: (state) => state.winner,
  turn: (state) => state.turn,
  isWinning: (state) => state.isWinning,
  isMultiPlayer: (state) => state.isMultiPlayer,
};

const actions: ActionTree<TicTacToeState, TicTacToeState> = {
  async addGame({ commit, getters }, gameModel: GameModel): Promise<boolean> {
    if (!getters.isConnect) { return false; }

    const userUid = getters.user.uid!;

    gameModel.userId = userUid;
    gameModel.date = Firebase.firestore.Timestamp.now();

    const increment = firestore.FieldValue.increment(1);
    const userDoc =  Firebase.db.collection('user').doc(userUid);
    const gameRef = Firebase.db.collection('game').doc();

    const batch = Firebase.db.batch();
    batch.update(userDoc, { gameNumber: increment });
    batch.set(gameRef, gameModel.toAddGame());
    return batch.commit()
            .then(() => {
              gameModel.id = gameRef.id;
              commit('UPDATE_GAME', gameModel);
              return true;
            })
            .catch((error: any) => {
              return false;
            });
  },
  async setGame({ commit, getters }, gameModel: GameModel): Promise<boolean> {
    if (!getters.isConnect) { return false; }

    const game: GameModel = getters.game;
    game.turnNumber = gameModel.turnNumber;
    game.winner = gameModel.winner;

    return Firebase.db.collection('game').doc(game.id).update(game.toSetGame())
      .then(() => {
        commit('UPDATE_GAME', game);
        return true;
      })
      .catch((error) => {
        return false;
      });
  },
  async addTurnGame({ commit, getters }, turnGameModel: TurnGameModel): Promise<boolean> {
    if (!getters.isConnect) { return false; }

    turnGameModel.userId = getters.user ? getters.user.uid : null;
    turnGameModel.date = Firebase.firestore.Timestamp.now();
    turnGameModel.gameId = getters.game.id;

    return Firebase.db.collection('turnGame').add(turnGameModel.addTurnGame())
      .then((docRef) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  },
  updateGameList({ commit, getters }, userId: string): void {
    const userCurrentId: string = getters.user.uid;

    Firebase.db.collection('game').where('userId', '==', userCurrentId).orderBy('date', 'desc').get()
    .then((snapshot) => {
      const gameList: GameModel[] = [];
      snapshot.forEach((doc) => {
        const game: GameModel = GameModel.toGameList(doc.data() as GameModel);
        game.id = doc.id;
        gameList.push(game);
      });
      commit('UPDATE_GAME_LIST', gameList);
    });
  },
};

const mutations: MutationTree<TicTacToeState> = {
  UPDATE_GAME(state, payload: GameModel) {
    state.game = payload;
  },
  UPDATE_GAME_LIST(state, payload: GameModel[]) {
    state.gameList = payload;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
