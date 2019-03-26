<template>
  <a-layout style="height: 100vh">
    <a-layout-content>
      <a-row style="height: 100vh" type="flex" justify="space-around" align="middle">
        <a-col :span="8">Votre adresse mail est vérifié.</a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class VerifyEmail extends Vue {}
</script>
