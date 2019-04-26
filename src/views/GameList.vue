<template>
  <a-table bordered rowKey="id" :columns="columns" :dataSource="gameList" :pagination="{ pageSize: 20 }" :scroll="{ y: 600 }"/>
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

  private columns = [
    {
      title: 'Date',
      dataIndex: 'dateReal',
      width: 250,
      align: 'center'
    },
    {
      title: 'Nombre de tours',
      dataIndex: 'turnNumber',
      width: 150,
      align: 'center',
    },
    {
      title: 'Gagnant',
      dataIndex: 'winner'
    }
  ];
}
</script>
