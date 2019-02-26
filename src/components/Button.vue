<template>
  <div class="o">
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
.square .x, .square .o {
    position: relative;
  }

  .square .o {
      border-width: 15px;
  }

  .o {
      left: 16.666666667%;
      top: 16.666666667%;
      width: 66.666666667%;
      height: 66.666666667%;
      border-radius: 50%;
      border: 20px solid #fff;
  }

  .square .x:before, .square .x:after {
      left: 67.5px;
      top: 16px;
      width: 15px;
      height: 118px;
  }

  .x:before {
      transform: rotate(-45deg);
  }

  .x:after {
      transform: rotate(45deg);
  }

  .x:before, .x:after {
      position: absolute;
      content: "";
      background-color: #fff;
      border-radius: 4px;
  }
</style>
