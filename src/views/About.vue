<template>
  <div class="game">
    <div class="board blink">
        <div v-for="i in ticTacToc" :key="i.id" :class="['square', i.positionX, i.positionY]" @click="play(i)">
            <transition name="slide-fade">
                <div v-if="i.value" :class="i.value"></div>
            </transition>
        </div>
        {{ checkWin }}
        {{ turnNumber }}
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
            value: '',
        },
        {
            id: 2,
            positionX: null,
            positionY: 'top',
            value: '',
        },
        {
            id: 3,
            positionX: 'right',
            positionY: 'top',
            value: '',
        },
        {
            id: 4,
            positionX: 'left',
            positionY: null,
            value: '',
        },
        {
            id: 5,
            positionX: null,
            positionY: null,
            value: '',
        },
        {
            id: 6,
            positionX: 'right',
            positionY: null,
            value: '',
        },
        {
            id: 7,
            positionX: 'left',
            positionY: 'button',
            value: '',
        },
        {
            id: 8,
            positionX: null,
            positionY: 'buttom',
            value: '',
        },
        {
            id: 9,
            positionX: 'right',
            positionY: 'button',
            value: '',
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
    ];

    private turn = 'o';

    private turnNumber = 0;

    private isFinish = false;

    private play(item: any) {
        if (item.value || this.checkWin) { return; }

        item.value = this.turn;

        if (this.checkWin) { return; }

        this.toggleTurn();
        setTimeout(() => { this.autoPlay(); }, 2000);
    }

    private autoPlay() {
        if (this.checkWin) { return; }

        const emptyBoxList = this.ticTacToc.filter((e) => !e.value);
        emptyBoxList[Math.floor(Math.random() * emptyBoxList.length)].value = this.turn;

        if (this.checkWin) { return; }

        this.toggleTurn();
    }

    get checkWin() {
        this.win.forEach((e) => {
            const toto = this.ticTacToc.filter(
                (f) => e.includes(f.id))
                .map((f) => f.value)
                .filter((v, i, a) => a.indexOf(v) === i);
            if (toto.length === 1 && !toto.includes('')) {
                return true;
            }
        });

        return false;
    }

    private toggleTurn() {
        this.turn = this.turn === 'o' ? 'x' : 'o';
        this.turnNumber += 1;
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

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-enter {
        transform: translateX(50px);
        opacity: 0;
    }
</style>

