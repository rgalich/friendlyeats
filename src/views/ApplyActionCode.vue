
<template>
  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class ApplyActionCode extends Vue {
  @Action private applyActionCode!: any;

  private mounted() {
    const code = this.$route.query.oobCode;
    console.log(code);
    this.applyActionCode(code);
  }
}
</script>
