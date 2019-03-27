import { UserWithEmailAndPasswordModel } from './models/userWithEmailAndPasswordModel';
import { UserModel } from './models/userModel';
import Vue from 'vue';
import Vuex, { Payload } from 'vuex';
import Firebase from './firebaseConfig';
import { plainToClass, classToPlain } from 'class-transformer';
import { ConfirmPasswordResetModel } from './models/confirmPasswordResetModel';
import { ActionCodeInfoEnum } from './enums/actionCodeInfoEnum';
import { CreateUserWithEmailAndPasswordEnum } from './enums/createUserWithEmailAndPasswordEnum';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnect: false,
    user: null,
  },
  mutations: {
    UPDATE_IS_CONNECT(state, payload: boolean) {
      state.isConnect = payload;
    },
    UPDATE_USER(state, payload: any) {
      state.user = payload;
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
          return await Firebase.auth.applyActionCode(code)
            .then(() => {
              return actionCodeInfo.operation as ActionCodeInfoEnum;
            })
            .catch((error) => {
              return ActionCodeInfoEnum.Error;
            });
        })
        .catch((error) => {
          return ActionCodeInfoEnum.Error;
        });
    },
    signInWithEmailAndPassword({ commit }, userWithEmailAndPasswordModel: UserWithEmailAndPasswordModel) {
      Firebase.auth.signInWithEmailAndPassword(userWithEmailAndPasswordModel.email, userWithEmailAndPasswordModel.password)
        .then((error) => {
          console.log(error);
        });
    },
    async updatePassword({ commit }, password: string): Promise<boolean> {
      const user = Firebase.auth.currentUser;

      if (!user) { return false; }

      return user.updatePassword(password)
        .then(() => {
          commit('UPDATE_IS_CONNECT', true);
          return true;
        })
        .catch((error) => {
          commit('UPDATE_IS_CONNECT', false);
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
    sendPasswordResetEmail({ commit }, email) {
      Firebase.auth.sendPasswordResetEmail(email);
    },
  },
  getters: {
    isConnect: (state) => state.isConnect,
    user: (state) => state.user,
  },
});
