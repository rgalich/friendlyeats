<template>
  <a-layout style="height: 100vh">
    <a-layout-content>
      <a-row style="height: 100vh" type="flex" justify="space-around" align="middle">
        <a-col :span="8">
          <a-card headStysle="textAlign: center" title="Mot de passe">
            <a-form :form="form" class="login-form" @submit="handleSubmit">
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
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  v-decorator="[
                    'passwordConfig',
                    { rules: [
                      { required: true, message: `Le mot de passe est obligatoire.` },
                      { min: 6, message: `Le mot de passe est trop court.` },
                      { validator: handleConfirmPassword }
                    ] }
                  ]"
                >
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit" class="login-form-button">Continuer</a-button>Or
                <a href>register now!</a>
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
import Firebase from '../firebaseConfig';
import { Getter, Action } from 'vuex-class';
import { UserModel } from '@/models/userModel';
import { ConfirmPasswordResetModel } from '@/models/confirmPasswordResetModel';

@Component
export default class confirmPasswordReset extends Vue {
  @Action private confirmPasswordReset!: any;

  private form!: any;

  private code!: string;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private created() {
    this.code = this.$route.query.oobCode as string;
  }

  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        const confirmPasswordResetModel: ConfirmPasswordResetModel = new ConfirmPasswordResetModel();
        confirmPasswordResetModel.code = this.code;
        confirmPasswordResetModel.newPassword = values.password;
        this.confirmPasswordReset(confirmPasswordResetModel);
      }
    });
  }

  private handleConfirmPassword = (rule: any, value: any, callback: any) => {
    const { getFieldValue } = this.form;
    if (value && value !== getFieldValue('password')) {
      callback('Les mots de passe doivent-être identique');
    }
    callback();
  }
}
</script>
