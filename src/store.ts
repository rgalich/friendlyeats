import { UserWithEmailAndPasswordModel } from './models/userWithEmailAndPasswordModel';
import { UserModel } from './models/userModel';
import Vue from 'vue';
import Vuex, { Payload } from 'vuex';
import Firebase from './firebaseConfig';
import { plainToClass, classToPlain } from 'class-transformer';
import { ConfirmPasswordResetModel } from './models/confirmPasswordResetModel';
import { ActionCodeInfoEnum } from './enums/actionCodeInfoEnum';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userList: [] as UserModel[],
    isConnect: false,
    errorEmailExists: false,
    successSignUp: false,
    user: null,
  },
  mutations: {
    UPDATE_USER_LIST(state, payload: UserModel[]) {
      state.userList = payload;
    },
    UPDATE_ERROR_EMAIL_EXISTS(state, payload: boolean) {
      state.errorEmailExists = payload;
    },
    UPDATE_SUCCESS_SIGN_UP(state, payload: boolean) {
      state.successSignUp = payload;
    },
    UPDATE_IS_CONNECT(state, payload: boolean) {
      state.isConnect = payload;
    },
    UPDATE_USER(state, payload: any) {
      state.user = payload;
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
    getUser({ commit }) {
      Firebase.auth.onAuthStateChanged((user) => {
        if (user) {
          commit('UPDATE_USER', user);
          console.log(user);
        } else {
          console.log('user is null');
        }
      });
    },
    async createUserWithEmailAndPassword(
      { commit },
      userWithEmailAndPasswordModel: UserWithEmailAndPasswordModel,
    ): Promise<boolean> {
      return await Firebase.auth.createUserWithEmailAndPassword(
        userWithEmailAndPasswordModel.email,
        userWithEmailAndPasswordModel.password,
      )
        .then(() => {
          return true;
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            commit('UPDATE_ERROR_EMAIL_EXISTS', true);
          }
          return false;
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
    createAccount({ commit }, email: string) {
      const actionCodeSettings = {
        url: 'http://localhost:8080/passwordReset',
        handleCodeInApp: true,
      };
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
    errorEmailExists: (state) => state.errorEmailExists,
    successSignUp: (state) => state.successSignUp,
    isConnect: (state) => state.isConnect,
    user: (state) => state.user,
  },
});
