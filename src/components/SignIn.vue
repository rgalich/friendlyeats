<template>
  <a-col :span="8">
    <a-card title="Se connecter">
      <a-form :form="form" @submit="handleSubmit">
        <transition
          enter-active-class="animated fadeInDown"
          leave-active-class="animated fadeOutDown"
        >
          <a-form-item v-if="isInvalid">
            <a-alert
              message="L'adresse e-mail ou le mot de passe que vous avez entré n'est pas valide. Réessayez."
              type="error"
              showIcon
              closable
              @close="isInvalid = false"
            ></a-alert>
          </a-form-item>
        </transition>
        <transition
          enter-active-class="animated fadeInDown"
          leave-active-class="animated fadeOutDown"
        >
          <a-form-item v-if="unverifiedEmail">
            <a-alert
              message="Merci de confirmer votre adresse mail."
              type="error"
              showIcon
              closable
              @close="unverifiedEmail = false"
            >
              <template slot="description">
                <a-row>
                  <a-col :span="24">
                    <a @click="sendEmailVerification">Renvoyer le mail de validation</a>.
                  </a-col>
                </a-row>
              </template>
            </a-alert>
          </a-form-item>
        </transition>
        <a-form-item>
          <a-input
            placeholder="Email"
            a-input
            v-decorator="[
              'email',
              { rules: [
                { required: true, message: `L'adresse mail est obligatoire.` },
                { type: 'email', message: `L'adresse mail est non valide.` }
              ]}
            ]"
          >
            <a-icon slot="prefix" type="user"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            type="password"
            placeholder="Mot de passe"
            v-decorator="[
              'password',
              { rules: [
                { required: true, message: `Le mot de passe est obligatoire.` }
              ]}
            ]"
          >
            <a-icon slot="prefix" type="lock"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button block type="primary" html-type="submit">Se connecter</a-button>
        </a-form-item>
      </a-form>
      <a @click="$router.push({ name: 'sendPasswordResetEmail' })">Mot de passe oublié ?</a>
      <a-divider type="horizontal"/>Vous n'avez pas de compte ?
      <a @click="$router.push({ name: 'signUp' })">Inscription</a>
    </a-card>
  </a-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Firebase from '../firebaseConfig';
import { Getter, Action } from 'vuex-class';
import { UserModel } from '@/models/userModel';
import { UserWithEmailAndPasswordModel } from '@/models/userWithEmailAndPasswordModel';
import { SignInWithEmailAndPasswordEnum } from '@/enums/signInWithEmailAndPasswordEnum';

@Component
export default class SignIn extends Vue {
  private form!: any;
  private isInvalid: boolean = false;
  private unverifiedEmail: boolean = false;

  @Action private signInWithEmailAndPassword!: any;
  @Action private sendEmailVerification!: any;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        const response = await this.signInWithEmailAndPassword(
          UserWithEmailAndPasswordModel.toClass({
            email: values.email,
            password: values.password
          })
        );
        switch (response) {
          case SignInWithEmailAndPasswordEnum.Success: {
            this.$message.success('Vous ètes connecté.', 10);
            this.$router.push({ name: 'home' });
            break;
          }
          case SignInWithEmailAndPasswordEnum.UnverifiedEmail: {
            this.isInvalid = false;
            this.unverifiedEmail = true;
            break;
          }
          default: {
            this.isInvalid = true;
            this.unverifiedEmail = false;
            break;
          }
        }
      }
    });
  }
}
</script>
