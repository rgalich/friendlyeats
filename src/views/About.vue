<template>
  <div class="game">
    <div class="board blink">
        <div v-for="i in ticTacToc" :key="i.id" :class="['square', i.positionX, i.positionY]" @click="play(i)">
            <div :class="i.value"></div>
        </div>
        {{ isFinish }}
    </div>
    <div class="restart" style="display: block;"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {
    private ticTacToc = [
        {
            id: 1,
            positionX: 'left',
            positionY: 'top',
            value: null,
        },
        {
            id: 2,
            positionX: null,
            positionY: 'top',
            value: null,
        },
        {
            id: 3,
            positionX: 'right',
            positionY: 'top',
            value: null,
        },
        {
            id: 4,
            positionX: 'left',
            positionY: null,
            value: null,
        },
        {
            id: 5,
            positionX: null,
            positionY: null,
            value: null,
        },
        {
            id: 6,
            positionX: 'right',
            positionY: null,
            value: null,
        },
        {
            id: 7,
            positionX: 'left',
            positionY: 'button',
            value: null,
        },
        {
            id: 8,
            positionX: null,
            positionY: 'buttom',
            value: null,
        },
        {
            id: 9,
            positionX: 'right',
            positionY: 'button',
            value: null,
        },
    ];

    private win = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ]

    private turn = 'o';

    private isFinish = false;

    private play(item: any) {
        if (!item.value && !this.isFinish) {
            item.value = this.turn;
            this.checkWin();
            this.turn = this.turn === 'o' ? 'x' : 'o';
        }
    }

    private checkWin() {
        const rowAlign = this.ticTacToc.filter((e) => 
            ((e.id >= 1 && e.id <= 3) || (e.id >= 4 && e.id <= 6) || (e.id >= 7 && e.id <= 9))
            && e.value === this.turn).length;
        console.log(rowAlign);
        if (rowAlign === 3) {
            this.isFinish = true;
        }
    }
}
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

