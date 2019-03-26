<template>
  <a-layout>
    <a-layout-content>
      <a-row style="height: 100vh" type="flex" justify="space-around" align="middle">
        <a-col :span="8">
          <a-card title="S'inscrire">
            <a-form :form="form" @submit="handleSubmit">
              <transition
                enter-active-class="animated fadeInDown"
                leave-active-class="animated fadeOutDown"
              >
                <a-form-item v-if="errorEmailExists">
                  <a-alert
                    message="L'adresse mail est déjà utilisée."
                    type="error"
                    showIcon
                    closable
                    @close="updateErrorEmailExists(false)"
                  >
                    <template slot="description">
                      <a-row>
                        <a-col :span="24">Veuillez vous <a @click="$router.push({ name: 'signIn' })">connecter</a>.</a-col>
                        <a-col :span="24">Ou modifier votre <a>mot de passe</a>.</a-col>
                      </a-row>
                    </template>
                  </a-alert>
                </a-form-item>
                </transition>
                <transition
                enter-active-class="animated fadeInDown"
                leave-active-class="animated fadeOutDown"
              >
                <a-form-item v-if="successSignUp">
                  <a-alert
                    message="Votre compte est créé."
                    type="success"
                    showIcon
                    closable
                    @close="updateSuccessSignUp(false)"
                  >
                    <template slot="description">
                      <a-row>
                        <a-col :span="24">Veuillez activer votre compte via l'email envoyé.</a-col>
                        <a-col :span="24"><a @click="sendEmailVerification">Renvoyer le mail de validation</a>.</a-col>
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
                      { required: true, message: `Le mot de passe est obligatoire.` },
                      { min: 6, message: `Le mot de passe est trop court.` }
                    ] }
                  ]"
                >
                  <a-icon slot="prefix" type="lock"/>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  v-decorator="[
                    'passwordConfirm',
                    { rules: [
                      { required: true, message: `Le mot de passe est obligatoire.` },
                      { validator: handleConfirmPassword }
                    ] }
                  ]"
                >
                  <a-icon slot="prefix" type="lock"/>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit">S'inscrire</a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
import { UserWithEmailAndPasswordModel } from '../models/userWithEmailAndPasswordModel';

@Component
export default class SignUp extends Vue {
  private form!: any;

  @Action private createUserWithEmailAndPassword!: any;
  @Action private sendEmailVerification!: any;

  @Getter private errorEmailExists!: boolean;
  @Getter private successSignUp!: boolean;

  @Mutation('UPDATE_ERROR_EMAIL_EXISTS') private updateErrorEmailExists!: any;
  @Mutation('UPDATE_SUCCESS_SIGN_UP') private updateSuccessSignUp!: any;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        const response = await this.createUserWithEmailAndPassword(
          UserWithEmailAndPasswordModel.toClass({
            email: values.email,
            password: values.password
          })
        );
        if (response) {
          await this.sendEmailVerification();
          this.updateSuccessSignUp(true);
        }
      }
    });
  }

  private handleConfirmPassword = (rule: any, value: any, callback: any) => {
    const { getFieldValue } = this.form;
    if (value && value !== getFieldValue('password')) {
      callback('Les mots de passe doivent-être identiques.');
    }
    callback();
  };
}
</script>
