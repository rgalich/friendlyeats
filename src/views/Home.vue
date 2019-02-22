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
    let addressId;

    Firebase.db.collection('address').add({
      city: 'Roanne',
      posteCode: 42120,
    })
    .then((docRef) => {
      addressId = docRef.id;
      Firebase.db.collection('user').add({
        first: 'Rémi',
        last: 'GALICHON',
        born: 1815,
        addressId
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      });
    });
  }

  mounted() {
    Firebase.db.collection('user').onSnapshot((querySnapshot) => {
        this.data = [];
        querySnapshot.forEach((doc) => {
            this.data.push(doc.data());
            Firebase.db.collection('address').doc(doc.data().addressId).get().then((doc) => {
              console.log(doc);
            });
        });
        console.log(this.data);
    });
  }
}
</script>
