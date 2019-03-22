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
    isConnect: false,
  },
  mutations: {
    UPDATE_USER_LIST(state, payload: UserModel[]) {
      state.userList = payload;
    },
    UPDATE_EMAIL_EXIST(state, payload: boolean) {
      state.emailExist = payload;
    },
    UPDATE_IS_CONNECT(state, payload: boolean) {
      state.isConnect = payload;
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
        url: 'http://localhost:8080/passwordReset',
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
    async signInWithEmailLink({ commit }): Promise<boolean> {
      const email = localStorage.getItem('email');

      if (!email) { return false; }

      return await Firebase.auth.signInWithEmailLink(email)
        .then(() => {
          return true;
        })
        .catch((error) => {
          return false;
        });
    },
    fetchProvidersForEmail({ commit, dispatch }, email) {
      dispatch('createAccount', email);
      // Firebase.auth.fetchSignInMethodsForEmail(email)
      // .then((providers) => {
      //   if (providers.length > 0) {
      //     dispatch('sendPasswordResetEmail', email);
      //   }
      // });
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
    isConnect: (state) => state.isConnect,
  },
});
