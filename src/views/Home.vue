<template>
  <div style="height: 100%">
    <div class="game">
      <div class="board blink">
        <div
          v-for="i in ticTacToc"
          :key="i.id"
          :class="['square', i.positionY, i.positionX]"
          @click="play(i)"
        >
          <transition name="slide-fade">
            <div v-if="i.value" :class="i.value"></div>
          </transition>
        </div>
      </div>
    </div>
    <div class="scores p1">
      <p class="player1">
        <span class="p1">Joueur</span>(O)
        <span class="score">{{ winO }}</span>
      </p>
      <p class="ties">
        Egalité
        <span class="score">{{ draw }}</span>
      </p>
      <p class="player2">
        <span class="p2">{{ isMultiPlayer ? 'Joueur' : 'Ordinateur' }}</span>(X)
        <span class="score">{{ winX }}</span>
      </p>
      <div class="swap" @click="isMultiPlayer = !isMultiPlayer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <g fill="#fff">
            <path
              class="p1"
              d="M49.947,90.991c0.693,0,1.41,0.02,2.104,0c13.547-0.201,26.439-1.723,28.775-3.945 c0.537-4.928,1.195-7.311-20.65-17.644c-3.107-1.742-1.465-8.492-1.465-8.492c6.578-4.969,11.096-16.463,11.096-25.676 c0-15.921-7.18-23.453-17.756-24.234h-2.104c-10.557,0.781-17.734,8.312-17.734,24.234c0,9.213,4.496,20.707,11.078,25.676 c0,0,1.641,6.75-1.449,8.492C19.979,79.735,20.635,82.118,21.176,87.046C23.51,89.269,36.402,90.79,49.947,90.991z"
            ></path>
          </g>
        </svg>
        <p v-if="!isMultiPlayer" class="p1">J1</p>
        <p v-else class="p2">J2</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { GameModel } from '../models/gameModel';
import { TurnGameModel } from '../models/turnGameModel';

@Component
export default class Home extends Vue {
  @Action private addGame!: any;
  @Action private setGame!: any;
  @Action private addTurnGame!: any;

  private ticTacToc = [
    {
      id: 1,
      positionX: 'left',
      positionY: 'top',
      value: ''
    },
    {
      id: 2,
      positionX: null,
      positionY: 'top',
      value: ''
    },
    {
      id: 3,
      positionX: 'right',
      positionY: 'top',
      value: ''
    },
    {
      id: 4,
      positionX: 'left',
      positionY: null,
      value: ''
    },
    {
      id: 5,
      positionX: null,
      positionY: null,
      value: ''
    },
    {
      id: 6,
      positionX: 'right',
      positionY: null,
      value: ''
    },
    {
      id: 7,
      positionX: 'left',
      positionY: 'bottom',
      value: ''
    },
    {
      id: 8,
      positionX: null,
      positionY: 'bottom',
      value: ''
    },
    {
      id: 9,
      positionX: 'right',
      positionY: 'bottom',
      value: ''
    }
  ];

  private win = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  private winX = 0;

  private winO = 0;

  private draw = 0;

  private turn: 'o' | 'x' = 'o';

  private turnNumber = 0;

  private turnMax = 9;

  private isWinning = false;

  private isMultiPlayer = false;

  @Watch('turnNumber')
  private async onTurnNumberChanged(newVal: number) {
    if (newVal) {
      let isWinning = false;
      this.win.forEach(e => {
        const winWithValue = this.ticTacToc
          .filter(f => e.includes(f.id))
          .map(f => f.value)
          .filter((v, i, a) => a.indexOf(v) === i);

        if (winWithValue.length === 1 && !winWithValue.includes('')) {
          isWinning = true;
        }
      });

      this.isWinning = isWinning;

      if (this.isWinning) {
        const gameModel = new GameModel();
        gameModel.winner = this.turn;
        gameModel.turnNumber = newVal;
        await this.setGame(gameModel);
        switch (this.turn) {
          case 'o': {
            this.winO++;
            break;
          }
          case 'x': {
            this.winX++;
            break;
          }
        }
      } else if (this.turnNumber === this.turnMax) {
        this.draw++;
      }

      if (this.isWinning || this.turnNumber === this.turnMax) {
        setTimeout(() => {
          this.removePart();
        }, 1000);
        return;
      }

      this.turn = this.turn === 'o' ? 'x' : 'o';
    }
  }

  @Watch('isMultiPlayer')
  private onIsMultiPlayerChanged() {
    this.removePart(true);
  }

  private async play(item: any) {
    if (
      item.value ||
      this.isWinning ||
      (this.turn !== 'o' && !this.isMultiPlayer)
    ) {
      return;
    }

    item.value = this.turn;

    await this.saveGame(item.id);

    this.turnNumber++;

    if (
      this.isMultiPlayer ||
      (this.isWinning && this.turnNumber === this.turnMax)
    ) {
      return;
    }

    setTimeout(() => {
      this.autoPlay();
    }, 1000);
  }

  private async autoPlay() {
    if (this.isWinning) {
      return;
    }

    const emptyBoxList = this.ticTacToc.filter(e => !e.value);

    if (!emptyBoxList.length) {
      return;
    }

    const place =  emptyBoxList[ Math.floor(Math.random() * emptyBoxList.length) ];

    place.value = this.turn;

    await this.saveGame(place.id);

    this.turnNumber++;
  }

  private removePart(withScore: boolean = false) {
    this.ticTacToc.map(e => {
      e.value = '';
    });
    this.turn = 'o';
    this.isWinning = false;
    this.turnNumber = 0;

    if (!withScore) {
      return;
    }

    this.winX = 0;
    this.winO = 0;
    this.draw = 0;
  }

  private async saveGame(place: number) {
    if (this.turnNumber === 0) {
      const gameModel = new GameModel();
      gameModel.isMultiPlayer = this.isMultiPlayer;
      await this.addGame(gameModel);
    }

    const turnGameModel = new TurnGameModel();
    turnGameModel.turnNumber = this.turnNumber + 1;
    turnGameModel.turn = this.turn;
    turnGameModel.place = place;
    await this.addTurnGame(turnGameModel);
  }
}
</script>

<style lang="scss" scoped>
.game {
  position: absolute;
  top: 50%;
  left: 50%;
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
  border-color: rgb(0, 0, 0);
}

.square .x,
.square .o {
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
  border: 20px solid #000000;
}

.square .x:before,
.square .x:after {
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

.x:before,
.x:after {
  position: absolute;
  content: '';
  background-color: #000000;
  border-radius: 4px;
}

.scores {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 600px;
  margin-left: -300px;
  margin-top: 280px;
  text-align: center;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}

.scores {
  width: 450px;
  margin-left: -225px;
  margin-top: 210px;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.player1,
.player2 {
  width: 230px;
  white-space: nowrap;
}

.player1,
.player2 {
  width: 180px;
}

.scores p {
  font: 20px raleway, sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 1;
  display: inline-block;
  margin: 0;
  padding: 0;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.scores p {
  font-size: 17px;
  letter-spacing: 0;
}

.scores .swap {
  display: inline-block;
  vertical-align: top;
  width: 30px;
  height: 30px;
  margin: -5px -30px 0 0;
  opacity: 0.5;
  cursor: pointer;
  -webkit-transition: opacity 0.1s linear;
  -moz-transition: opacity 0.1s linear;
  transition: opacity 0.1s linear;
}

.scores .score {
  font-size: 50px;
  display: block;
  height: 60px;
  padding: 10px 0 0;
  will-change: transform;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.scores .score {
  font-size: 40px;
  padding-top: 8px;
  height: 50px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-enter {
  transform: translateX(50px);
  opacity: 0;
}
</style>
