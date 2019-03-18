import { CreateAccountModel } from './models/createAccountModel';
import { UserModel } from './models/userModel';
import Vue from 'vue';
import Vuex, { Payload } from 'vuex';
import Firebase from './firebaseConfig';
import { plainToClass, classToPlain } from 'class-transformer';
import { ConfirmPasswordResetModel } from './models/confirmPasswordResetModel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userList: [] as UserModel[],
    emailExist: false,
  },
  mutations: {
    UPDATE_USER_LIST(state, payload: UserModel[]) {
      state.userList = payload;
    },
    UPDATE_EMAIL_EXIST(state, payload: boolean) {
      state.emailExist = payload;
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
        url: 'http://localhost:8080/confirmPasswordReset',
        handleCodeInApp: true,
      };
      Firebase.auth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        localStorage.setItem('email', email);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    signInWithEmailLink({ commit }): boolean {
      const email = localStorage.getItem('email');

      if (!email) { return false; }

      Firebase.auth.signInWithEmailLink(email)
      .catch((error) => {
        if (error.code === 'auth/invalid-action-code') {
          return false;
        }
      });

      return false;
    },
    fetchProvidersForEmail({ commit, dispatch }, email) {
      Firebase.auth.fetchSignInMethodsForEmail(email)
      .then((providers) => {
        if (providers.length > 0) {
          dispatch('sendPasswordResetEmail', email);
        }
      });
    },
    updatePassword({ commit }, password: string) {
      const user = Firebase.auth.currentUser;

      if (!user) { return; }

      user.updatePassword(password)
      .catch((error) => {
        console.log(error);
      });
    },
    sendPasswordResetEmail({ commit }, email) {
      if (!email) { return; }
      const actionCodeSettings: firebase.auth.ActionCodeSettings = {
        url: 'http://localhost:8080/confirmPasswordReset',
        handleCodeInApp: true,
      };

      Firebase.auth.sendPasswordResetEmail(email, actionCodeSettings);
    },
  },
  getters: {
    userList: (state) => state.userList,
    emailExist: (state) => state.emailExist,
  },
});
