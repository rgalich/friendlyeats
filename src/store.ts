import { UserWithEmailAndPasswordModel } from './models/userWithEmailAndPasswordModel';
import Vue from 'vue';
import Vuex, { Payload } from 'vuex';
import Firebase from './firebaseConfig';
import { ActionCodeInfoEnum } from './enums/actionCodeInfoEnum';
import { CreateUserWithEmailAndPasswordEnum } from './enums/createUserWithEmailAndPasswordEnum';
import { SendPasswordResetEmailEnum } from './enums/sendPasswordResetEmailEnum';
import { SignInWithEmailAndPasswordEnum } from './enums/signInWithEmailAndPasswordEnum';
import { GameModel } from './models/gameModel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnect: false,
    code: '',
    user: null,
  },
  mutations: {
    UPDATE_IS_CONNECT(state, payload: boolean) {
      state.isConnect = payload;
    },
    UPDATE_USER(state, payload: any) {
      state.user = payload;
    },
    UPDATE_CODE(state, payload: string) {
      state.code = payload;
    },
  },
  actions: {
    async createUserWithEmailAndPassword(
      { commit },
      userWithEmailAndPasswordModel: UserWithEmailAndPasswordModel,
    ): Promise<CreateUserWithEmailAndPasswordEnum> {
      return await Firebase.auth.createUserWithEmailAndPassword(
        userWithEmailAndPasswordModel.email,
        userWithEmailAndPasswordModel.password,
      )
        .then(() => {
          return CreateUserWithEmailAndPasswordEnum.Success;
        })
        .catch((error) => {
          return error.code as CreateUserWithEmailAndPasswordEnum;
        });
    },
    async sendEmailVerification({ commit }): Promise<boolean> {
      const user = Firebase.auth.currentUser;
      return user ? await user.sendEmailVerification()
        .then(() => {
          return true;
        })
        .catch((error) => {
          return false;
        }) : false;
    },
    async applyActionCode({ commit }, code: string): Promise<ActionCodeInfoEnum> {
      return await Firebase.auth.checkActionCode(code)
        .then(async (actionCodeInfo) => {
          switch (actionCodeInfo.operation) {
            case ActionCodeInfoEnum.VerifyEmail: {
              return await Firebase.auth.applyActionCode(code)
                .then(() => {
                  return actionCodeInfo.operation as ActionCodeInfoEnum;
                })
                .catch((error) => {
                  return ActionCodeInfoEnum.Error;
                });
              break;
            }
            case ActionCodeInfoEnum.PasswordReset: {
              return await Firebase.auth.verifyPasswordResetCode(code)
              .then(() => {
                commit('UPDATE_CODE', code);
                return ActionCodeInfoEnum.PasswordReset;
              })
              .catch((error) => {
                return ActionCodeInfoEnum.Error;
              });
              break;
            }
            default: {
              return ActionCodeInfoEnum.Error;
              break;
            }
          }
        })
        .catch((error) => {
          return ActionCodeInfoEnum.Error;
        });
    },
    async signInWithEmailAndPassword(
      { commit },
      userWithEmailAndPasswordModel: UserWithEmailAndPasswordModel,
    ): Promise<SignInWithEmailAndPasswordEnum> {
      return await Firebase.auth.signInWithEmailAndPassword(
        userWithEmailAndPasswordModel.email,
        userWithEmailAndPasswordModel.password,
      )
      .then(() => {
        const user = Firebase.auth.currentUser;
        if (user!.emailVerified) {
          commit('UPDATE_IS_CONNECT', true);
          commit('UPDATE_USER', user);
          return SignInWithEmailAndPasswordEnum.Success;
        } else {
          return SignInWithEmailAndPasswordEnum.UnverifiedEmail;
        }
      })
      .catch((error) => {
        return error.code as SignInWithEmailAndPasswordEnum;
      });
    },
    async confirmPasswordReset({ commit, getters }, newPassword: string): Promise<boolean> {
      if (!getters.code) { return false; }

      return await Firebase.auth.confirmPasswordReset(
        getters.code,
        newPassword,
      )
      .then(() => {
        commit('UPDATE_CODE', '');
        return true;
      })
      .catch((error) => {
        commit('UPDATE_CODE', '');
        return false;
      });
    },
    async signOut({ commit }): Promise<boolean> {
      return await Firebase.auth.signOut()
        .then(() => {
          commit('UPDATE_IS_CONNECT', false);
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    async sendPasswordResetEmail({ commit }, email): Promise<SendPasswordResetEmailEnum> {
      return Firebase.auth.sendPasswordResetEmail(email)
      .then(() => {
        return SendPasswordResetEmailEnum.Success;
      })
      .catch((error) => {
        return error.code as SendPasswordResetEmailEnum;
      });
    },
    currentUser({ commit }) {
      const user = Firebase.auth.currentUser;
      commit('UPDATE_USER', user);
      commit('UPDATE_IS_CONNECT', !!user);
    },
    addGame({commit, getters}, gameModel: GameModel) {
      gameModel.userId = getters.user ? getters.user.uid : null;
      gameModel.date = Firebase.firestore.Timestamp.now();

      Firebase.db.collection('game').add(gameModel.toPlan())
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    },
  },
  getters: {
    isConnect: (state) => state.isConnect,
    user: (state) => state.user,
    code: (state) => state.code,
  },
});
