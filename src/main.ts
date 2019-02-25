import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'reflect-metadata';

import { Button, Table, Modal, Form, Input } from 'ant-design-vue';
Vue.component(Button.name, Button);
Vue.component(Table.name, Table);
Vue.component(Modal.name, Modal);
Vue.component(Form.name, Form);
Vue.component(Form.Item.name, Form.Item);
Vue.component(Input.name, Input);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
