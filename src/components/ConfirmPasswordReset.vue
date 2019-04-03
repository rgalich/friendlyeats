<template>
  <a-col :span="8">
    <a-card title="Mot de passe oublié">
      <a-form :form="form" @submit="handleSubmit">
        <transition
          enter-active-class="animated fadeInDown"
          leave-active-class="animated fadeOutDown"
        >
          <a-form-item v-if="isError">
            <a-alert
              message="Une erreur est survenue. Veuillez réessayer plus tard."
              type="error"
              showIcon
              closable
              @close="isError = false"
            ></a-alert>
          </a-form-item>
        </transition>
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
          <a-button block type="primary" html-type="submit">Modifier</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </a-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Firebase from '../firebaseConfig';
import { Getter, Action } from 'vuex-class';
import { UserModel } from '@/models/userModel';

@Component
export default class ConfirmPasswordReset extends Vue {
  @Action private confirmPasswordReset!: any;
  private isError: boolean = false;

  private form!: any;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private async handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        const response: boolean = await this.confirmPasswordReset(
          values.password
        );
        if (response) {
          this.$message.success(
            'Votre mot de passe est modifié. Vous pouvez vous connecter.',
            10
          );
          this.$router.push({ name: 'signIn' });
        } else {
          this.isError = true;
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
