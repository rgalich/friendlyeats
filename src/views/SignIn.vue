<template>
  <a-layout>
    <a-layout-content>
      <a-row style="height: 100vh" type="flex" justify="space-around" align="middle">
        <a-col :span="8">
          <a-card title="Se connecter">
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
                      { required: true, message: `Le mot de passe est obligatoire.` }
                    ]}
                  ]"
                >
                  <a-icon slot="prefix" type="lock"/>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit">Se connecter</a-button>
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
import { UserWithEmailAndPasswordModel } from '@/models/userWithEmailAndPasswordModel';

@Component
export default class SignIn extends Vue {
  private form!: any;

  @Action private signInWithEmailAndPassword!: any;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.signInWithEmailAndPassword(UserWithEmailAndPasswordModel.toClass({ email: values.email, password: values.password }));
      }
    });
  }
}
</script>
