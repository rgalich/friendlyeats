import { UserModel } from './models/userModel';
import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from './firebaseConfig';
import { plainToClass, classToPlain } from 'class-transformer';

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
          const user: UserModel = plainToClass(UserModel, doc.data());
          user.id = doc.id;
          userList.push(user);
        });
        commit('UPDATE_USER_LIST', userList);
      });
    },
    addUser({ commit }, user: UserModel) {
      Firebase.db.collection('user').add(classToPlain(user));
    },
  },
  getters: {
    userList: (state) => state.userList,
  },
});
