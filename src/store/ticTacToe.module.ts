// tslint:disable:no-shadowed-variable

import { MutationTree, ActionTree, GetterTree } from 'vuex';
import Firebase from '@/firebaseConfig';
import { GameModel, TurnGameModel } from '@/models';

interface TicTacToeState {
  game: GameModel;
}

const state: TicTacToeState = {
    game: new GameModel(),
};

const getters: GetterTree<TicTacToeState, TicTacToeState> = {
  game: (state) => state.game,
};

const actions: ActionTree<TicTacToeState, TicTacToeState> = {
  async addGame({commit, getters}, gameModel: GameModel): Promise<boolean> {
    gameModel.userId = getters.user ? getters.user.uid : null;
    gameModel.date = Firebase.firestore.Timestamp.now();

    return Firebase.db.collection('game').add(gameModel.toPlan())
    .then((docRef) => {
      gameModel.id = docRef.id;
      commit('UPDATE_GAME', gameModel);
      return true;
    })
    .catch((error) => {
        return false;
    });
  },
  async setGame({commit, getters}, gameModel: GameModel): Promise<boolean> {
    const game: GameModel = getters.game;
    game.turnNumber =  gameModel.turnNumber;
    game.winner = gameModel.winner;

    return Firebase.db.collection('game').doc(game.id).set(game.toPlan())
    .then(() => {
      commit('UPDATE_GAME', game);
      return true;
    })
    .catch((error) => {
        return false;
    });
  },
  addTurnGame({ getters }, turnGameModel: TurnGameModel) {
    turnGameModel.userId = getters.user ? getters.user.uid : null;
    turnGameModel.date = Firebase.firestore.Timestamp.now();
    turnGameModel.gameId = getters.game.id;

    Firebase.db.collection('turnGame').add(turnGameModel.toPlan())
    .then((docRef) => {
      turnGameModel.id = docRef.id;
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  },
};

const mutations: MutationTree<TicTacToeState> = {
  UPDATE_GAME(state, payload: GameModel) {
    state.game = payload;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
