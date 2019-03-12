<template>
  <a-layout style="height: 100vh">
    <a-layout-content>
      <a-row style="height: 100vh" type="flex" justify="space-around" align="middle">
        <a-col :span="8">
          <a-card headStysle="textAlign: center" title="Créez votre compte">
            <a-form :form="form" class="login-form" @submit="handleSubmit">
              <a-form-item>
                <a-input
                  placeholder="Email"
                  a-input
                  v-decorator="[
                    'email',
                    { rules: [{ required: true, message: `L'adresse est obligatoire.` }] }
                  ]"
                >
                  <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
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
import { CreateAccountModel } from '@/models/createAccountModel';

@Component
export default class Home extends Vue {
  @Action private createAccount!: any;

  @Action private fetchProvidersForEmail!: any;

  @Getter private emailExist!: boolean;

  private form!: any;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.fetchProvidersForEmail(values.email);

        if (this.emailExist) { 
          this.$message.error('Un compte existe.');
          return; 
        }

        this.createAccount(values.email);
      }
    });
  }
}
</script>
