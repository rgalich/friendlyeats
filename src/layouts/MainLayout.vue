<template>
  <a-layout style="height: 100vh">
    <a-layout-header>
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px', float: 'right' }">
        <a-menu-item v-if="isConnect" @click="$router.push({ name: 'gameList' })">Mes parties</a-menu-item>
        <a-menu-item v-if="isConnect" @click="signOutClick">Se déconnecter</a-menu-item>
        <a-menu-item v-if="!isConnect" @click="$router.push({ name: 'signIn' })">Se connecter</a-menu-item>
        <a-menu-item v-if="!isConnect" @click="$router.push({ name: 'signUp' })">S'inscrire</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '24px' }">
      <div :style="{ background: '#FFFFFF', height: '100%' }">
        <transition
          enter-active-class="animated fadeInDown"
        >
          <router-view/>
        </transition>
      </div>
    </a-layout-content>
    <a-layout-footer style="textAlign: center">Ant Design ©2018 Created by Ant UED</a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component
export default class MainLayout extends Vue {
  @Getter private isConnect!: boolean;

  @Action private signOut!: any;

  private signOutClick(): void {
   this.signOut();
   this.$router.push({ name: 'home' });
  }
}
</script>