<template>
  <a-layout style="height: 100vh">
    <a-layout-content>
      <a-row style="height: 100vh" type="flex" justify="space-around" align="middle">
        <a-col>
          <a-row>
            <a-col :style="{ textAlign:'center' }">
              <a-avatar :size="300" icon="mail" />
            </a-col>
            <a-col :style="{ textAlign:'center' }">
              aaaaaaaaaa
            </a-col>
            <a-col :style="{ textAlign:'center' }">
              aaaaaaaaaa
            </a-col>
            <a-col :style="{ textAlign:'center' }">
              aaaaaaaaaa
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ExpiredLink extends Vue {
  private img: string = '../assets/expired-link.jpg';
}
</script>
