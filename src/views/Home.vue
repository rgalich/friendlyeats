<template>
  <div class="home">
    <a-table :columns="columns" :dataSource="data" bordered>
      <template slot="name" slot-scope="text">
        <a href="javascript:;">{{text}}</a>
      </template>
    </a-table>
    <a-button @click="addUser" type="primary">Primary</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import Firebase from '../firebaseConfig'

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {

  columns = [{
    title: 'Prénom',
    dataIndex: 'first'
  }, {
    title: 'Cash Assets',
    dataIndex: 'last',
  }, {
    title: 'born',
    dataIndex: 'born',
  }];

  data: any[] = [];

  addUser() {
    console.log('ee')
    Firebase.db.collection('users').add({
      first: 'Rémi',
      last: 'GALICHON',
      born: 1815,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
  }

  mounted() {
    Firebase.db.collection("users").onSnapshot((querySnapshot) => {
        this.data = [];
        querySnapshot.forEach((doc) => {
            this.data.push(doc.data());
        });
    });
  }
}
</script>
