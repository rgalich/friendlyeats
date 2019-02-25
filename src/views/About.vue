<template>
  <div class="game">
    <div class="board blink">
      <div class="square top left"><div class="o"></div></div>
      <div class="square top"><div class="o"></div></div>
      <div class="square top right"><div class="x"></div></div>
      <div class="square left"><div class="x"></div></div>
      <div class="square"><div class="x"></div></div>
      <div class="square right"><div class="o"></div></div>
      <div class="square bottom left"><div class="o"></div></div>
      <div class="square bottom"><div class="x"></div></div>
      <div class="square bottom right"><div class="o"></div></div>
    </div>
    <div class="restart" style="display: block;"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {}
</script>

<style lang="scss" scoped>
  .game {
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: #000;
      width: 450px;
      height: 450px;
      margin-left: -225px;
      margin-top: -280px;
  }

  .board {
      width: 100%;
      height: 100%;
  }

  .square.left {
      clear: both;
      border-right-style: solid;
  }

  .square.right {
      border-left-style: solid;
  }

  .square.top {
      border-bottom-style: solid;
  }

  .square.bottom {
      border-top-style: solid;
  }

  .square {
      float: left;
      width: 33.333333333%;
      height: 33.333333333%;
      cursor: pointer;
      border-width: 5px;
      border-color: #fff;
  }

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

