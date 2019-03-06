import { CreateAccountModel } from './models/createAccountModel';
import { UserModel } from './models/userModel';
import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from './firebaseConfig';
import { plainToClass, classToPlain } from 'class-transformer';
import { ConfirmPasswordResetModel } from './models/confirmPasswordResetModel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userList: [] as UserModel[],
  },
  mutations: {
    UPDATE_USER_LIST(state, payload: UserModel[]) {
      state.userList = payload;
    },
  },
  actions: {
    getUserList({ commit }) {
      Firebase.db.collection('user').onSnapshot((querySnapshot) => {
        const userList: UserModel[] = [];
        querySnapshot.forEach((doc) => {
          const user: UserModel = UserModel.toClass(doc);
          userList.push(user);
        });
        commit('UPDATE_USER_LIST', userList);
      });
    },
    addUser({ commit }, user: UserModel) {
      Firebase.db.collection('user').add(UserModel.toPlan(user));
    },
    createAccount({ commit }, email: string) {
      const actionCodeSettings = {
        url: 'http://localhost:8081/confirmPasswordReset',
        handleCodeInApp: true,
      };
      Firebase.auth.sendSignInLinkToEmail(email, actionCodeSettings)
      .catch((error) => {
        console.log(error);
      });
    },
    confirmPasswordReset({ commit }, confirmPasswordResetModel: ConfirmPasswordResetModel) {
      const actionCodeSettings = {
        url: 'http://localhost:8081/confirmPasswordReset',
        handleCodeInApp: true,
      };
      Firebase.auth.signInWithEmailLink('remigalichon@gmail.com')
      .then((e) => {
        console.log('ee');
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
  getters: {
    userList: (state) => state.userList,
  },
});
