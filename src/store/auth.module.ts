import { UserModel } from './../models/userModel';
// tslint:disable:no-shadowed-variable

import { MutationTree, ActionTree, GetterTree } from 'vuex';
import Firebase from '@/firebaseConfig';
import {
  CreateUserWithEmailAndPasswordEnum,
  ActionCodeInfoEnum,
  SignInWithEmailAndPasswordEnum,
  SendPasswordResetEmailEnum,
} from '@/enums';
import { UserWithEmailAndPasswordModel } from '@/models';
import { SET_IS_CONNECT } from './mutations.type';

interface AuthState {
  isConnect: boolean;
  code: string;
  user: any;
}

const state: AuthState = {
    isConnect: false,
    code: '',
    user: null,
};

const getters: GetterTree<AuthState, any> = {
  isConnect: () => state.isConnect,
  user: () => state.user,
  code: () => state.code,
};

const actions: ActionTree<AuthState, any> = {
  async createUserWithEmailAndPassword(
    { commit },
    userWithEmailAndPasswordModel: UserWithEmailAndPasswordModel,
  ): Promise<CreateUserWithEmailAndPasswordEnum> {
    return await Firebase.auth.createUserWithEmailAndPassword(
      userWithEmailAndPasswordModel.email,
      userWithEmailAndPasswordModel.password,
    )
      .then((UserCredential) => {
        const user = new UserModel();
        Firebase.db.collection('user').doc(UserCredential.user!.uid).set(user.toAddUser());
        return CreateUserWithEmailAndPasswordEnum.Success;
      })
      .catch((error) => {
        return error.code as CreateUserWithEmailAndPasswordEnum;
      });
  },
  async sendEmailVerification(): Promise<boolean> {
    const user = Firebase.auth.currentUser;
    return user ? await user.sendEmailVerification()
      .then(() => {
        return true;
      })
      .catch(() => {
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
        commit(SET_IS_CONNECT, true);
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
        commit(SET_IS_CONNECT, false);
        return true;
      })
      .catch(() => {
        return false;
      });
  },
  async sendPasswordResetEmail({}, email): Promise<SendPasswordResetEmailEnum> {
    return Firebase.auth.sendPasswordResetEmail(email)
    .then(() => {
      return SendPasswordResetEmailEnum.Success;
    })
    .catch((error) => {
      return error.code as SendPasswordResetEmailEnum;
    });
  },
  currentUser({ commit, getters }) {
    const user = Firebase.auth.currentUser;
    commit('UPDATE_USER', user);
    commit(SET_IS_CONNECT, !!user);
  },
};

const mutations: MutationTree<AuthState> = {
  [SET_IS_CONNECT]({}, payload: boolean) {
    state.isConnect = payload;
  },
  UPDATE_USER({}, payload: any) {
    state.user = payload;
  },
  UPDATE_CODE({}, payload: string) {
    state.code = payload;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
