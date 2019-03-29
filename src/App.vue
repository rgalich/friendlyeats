<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <transition
      enter-active-class="animated fadeInDown"
    >
      <router-view/>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class App extends Vue {
  @Action private currentUser!: any;

  private mounted() {
    this.currentUser();
  }
}
</script>

