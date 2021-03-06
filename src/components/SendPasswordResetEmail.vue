<template>
  <a-col :span="8">
    <a-card title="Réinitialiser le mot de passe">
      <a-form :form="form" @submit="handleSubmit">
        <transition
          enter-active-class="animated fadeInDown"
          leave-active-class="animated fadeOutDown"
        >
          <a-form-item v-if="userNotFound">
            <a-alert
              :message="`Aucun compte ne correspond à ${email}.`"
              description="Peut-être avez-vous utilisé une adresse e-mail différente/incorrecte lors de votre inscription."
              type="error"
              showIcon
              closable
              @close="userNotFound = false"
            ></a-alert>
          </a-form-item>
        </transition>
        <transition
          enter-active-class="animated fadeInDown"
          leave-active-class="animated fadeOutDown"
        >
          <a-form-item v-if="isSuccess">
            <a-alert
              message="Un email à été envoyé."
              type="success"
              showIcon
              closable
              @close="isSuccess = false"
            ></a-alert>
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
          <a-button block type="primary" html-type="submit">Envoyer le lien de réinitialisation</a-button>
        </a-form-item>
      </a-form>
      <a-divider type="horizontal"/>
      <a @click="$router.push({ name: 'signIn' })">Retour à l'écran de connexion</a>
    </a-card>
  </a-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
import { UserWithEmailAndPasswordModel } from '../models/userWithEmailAndPasswordModel';
import { CreateUserWithEmailAndPasswordEnum } from '@/enums/createUserWithEmailAndPasswordEnum';
import { SendPasswordResetEmailEnum } from '@/enums/sendPasswordResetEmailEnum';

@Component
export default class SignUp extends Vue {
  private form!: any;
  private isSuccess: boolean = false;
  private userNotFound: boolean = false;
  private email: string = '';

  @Action private sendPasswordResetEmail!: any;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        const response: SendPasswordResetEmailEnum = await this.sendPasswordResetEmail(
          values.email
        );
        this.email = values.email;
        switch (response) {
          case SendPasswordResetEmailEnum.Success: {
            this.userNotFound = false;
            this.isSuccess = true;
            break;
          }
          case SendPasswordResetEmailEnum.UserNotFound: {
            this.userNotFound = true;
            this.isSuccess = false;
            break;
          }
          default: {
            break;
          }
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
