<template>
  <div class="home">
    <a-table :columns="columns" :dataSource="userList" :rowKey="record => record.id" bordered>
      <template slot="name" slot-scope="text">
        <a href="javascript:;">{{text}}</a>
      </template>
    </a-table>
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-modal
      title="Créer un utilisateur"
      v-model="visible"
      @ok="handleOk"
    >
      <a-form>
        <a-form-item label="Prénom">
          
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import Firebase from '../firebaseConfig';
import { Getter, Action } from 'vuex-class';
import { UserModel } from '@/models/userModel';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  @Getter private userList!: UserModel[];

  @Action private getUserList!: any;

  @Action private addUser!: any;

  private visible = false;

  private user: UserModel = new UserModel();

  private columns = [{
    title: 'Prénom',
    dataIndex: 'firstName',
  }, {
    title: 'Nom',
    dataIndex: 'lastName',
  }, {
    title: 'Mail',
    dataIndex: 'mail',
  }];

  private created() {
    this.getUserList();
  }

  private showModal() {
    this.visible = true;
  }

  private handleOk() {
    this.user = { id: 'aa', firstName: 'aaa', lastName: 'bb', mail: 'rr@rr.rr' };
    this.addUser(this.user);
    this.user = new UserModel();
    this.visible = false;
  }
}
</script>
