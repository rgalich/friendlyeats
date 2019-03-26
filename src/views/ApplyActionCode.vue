
<template></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { ActionCodeInfoEnum } from '@/enums/actionCodeInfoEnum';

@Component
export default class ApplyActionCode extends Vue {
  @Action private applyActionCode!: any;

  private async mounted() {
    const code = this.$route.query.oobCode;
    console.log(code);
    const applyActionCode: ActionCodeInfoEnum = await this.applyActionCode(
      code
    );
    debugger
    switch (applyActionCode) {
      case ActionCodeInfoEnum.VerifyEmail: {
        this.$router.push({ name: 'verifyEmail' })
        break;
      }
      default: {
        this.$router.push({ name: 'expiredLink' })
        break;
      }
    }
  }
}
</script>
