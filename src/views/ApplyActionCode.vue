
<template></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { ActionCodeInfoEnum } from '@/enums/actionCodeInfoEnum';

@Component
export default class ApplyActionCode extends Vue {
  @Action private applyActionCode!: any;

  private async created() {
    const code = this.$route.query.oobCode;
    const applyActionCode: ActionCodeInfoEnum = await this.applyActionCode(
      code
    );
    switch (applyActionCode) {
      case ActionCodeInfoEnum.VerifyEmail: {
        this.$router.push({ name: 'verifyEmail' })
        break;
      }
      case ActionCodeInfoEnum.PasswordReset: {
        this.$router.push({ name: 'confirmPasswordReset' })
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
