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
    signInWithEmailLink({ commit }) {
      const email = localStorage.getItem('email');

      if (!email) { return; }

      Firebase.auth.signInWithEmailLink(email)
      .catch((error) => {
        console.log(error);
      });
    },
    fetchProvidersForEmail({ commit }, email) {
      Firebase.auth.fetchSignInMethodsForEmail(email)
      .then((providers) => {
        if (providers.length > 0) {
          commit('UPDATE_EMAIL_EXIST', true);
        } else {
          commit('UPDATE_EMAIL_EXIST', false);
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
    }
  },
  getters: {
    userList: (state) => state.userList,
    emailExist: (state) => state.emailExist,
  },
});
