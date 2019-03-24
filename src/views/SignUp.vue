<template>
  <a-layout>
    <a-layout-content>
      <a-row style="height: 100vh" type="flex" justify="space-around" align="middle">
        <a-col :span="8">
          <a-card title="S'inscrire">
            <a-form :form="form" @submit="handleSubmit">
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
                  <a-icon slot="prefix" type="lock" />
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
                  <a-icon slot="prefix" type="lock" />
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
import { Getter, Action } from 'vuex-class';
import { UserWithEmailAndPasswordModel } from '../models/userWithEmailAndPasswordModel';

@Component
export default class SignUp extends Vue {
  private form!: any;

  @Action private createUserWithEmailAndPassword!: any;
  @Action private sendEmailVerification!: any;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        const response = await this.createUserWithEmailAndPassword(UserWithEmailAndPasswordModel.toClass({ email: values.email, password: values.password }));
        if (response) {
          this.sendEmailVerification();
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
  }
}
</script>
