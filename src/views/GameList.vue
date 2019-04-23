
<template>
  <a-table rowKey="id" :columns="columns" :dataSource="gameList" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { GameModel } from '@/models';

@Component
export default class GameList extends Vue {
  @Action private updateGameList!: any;
  @Getter private gameList!: GameModel[];

  private async created() {
    await this.updateGameList();
  }

  private columns = [{
    title: 'Date',
    dataIndex: 'dateReal',
    width: 250,
  }, {
    title: 'Nombre de tours',
    dataIndex: 'turnNumber',
    width: 150,
  }, {
    title: 'Gagnant',
    dataIndex: 'winner',
  }];
}
</script>
