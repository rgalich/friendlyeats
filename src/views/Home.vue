<template>
  <a-layout>
    <a-layout-header>
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px', float: 'right' }">
        <a-menu-item v-if="!isConnect" @click="$router.push({ name: 'signIn' })">Se connecter</a-menu-item>
        <a-menu-item v-if="isConnect" @click="signOut">Se déconnecter</a-menu-item>
        <a-menu-item v-if="!isConnect" @click="$router.push({ name: 'signUp' })">S'inscrire</a-menu-item>
      </a-menu>
    </a-layout-header>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component
export default class Home extends Vue {
  @Getter private isConnect!: boolean;

  @Action private signOut!: any;
}
</script>
