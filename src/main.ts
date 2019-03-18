import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'reflect-metadata';

import { Button, Table, Modal, Form, Input, Layout, Card, Row, Col, Icon, message } from 'ant-design-vue';
Vue.component(Button.name, Button);
Vue.component(Table.name, Table);
Vue.component(Modal.name, Modal);
Vue.component(Form.name, Form);
Vue.component(Form.Item.name, Form.Item);
Vue.component(Input.name, Input);
Vue.component(Layout.name, Layout);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Card.name, Card);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Icon.name, Icon);

Vue.prototype.$message = message;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
