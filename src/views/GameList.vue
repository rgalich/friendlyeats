<template>
  <a-table bordered rowKey="id" :columns="columns" :dataSource="gameList" :pagination="false" :scroll="{ y: 500 }">
    <span slot="isMultiPlayer" slot-scope="value">
      <a-tooltip>
        <template slot="title">
          <span>{{ value ? 'Multijoueur' : 'Solo' }}</span>
        </template>
        <a-icon v-if="value" type="team" />
        <a-icon v-else type="user" />
      </a-tooltip>
    </span>
    <span slot="isFinished" slot-scope="value">
      <a-tag v-if="value" color="red">Termier</a-tag>
      <a-tag v-else color="blue">Reprendre</a-tag>
    </span>
  </a-table>

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
      width: 200,
      align: 'center',
    },
    {
      title: 'Type',
      dataIndex: 'isMultiPlayer',
      width: 200,
      align: 'center',
      scopedSlots: { customRender: 'isMultiPlayer' },
    },
    {
      title: 'Nombre de tours',
      dataIndex: 'turnNumber',
      width: 200,
      align: 'center',
    },
    {
      title: 'Gagnant',
      dataIndex: 'winner',
      width: 200,
      align: 'center',
    },
    {
      title: 'Statut',
      dataIndex: 'isFinished',
      width: 200,
      align: 'center',
      scopedSlots: { customRender: 'isFinished' },
    }
  ];
}
</script>
