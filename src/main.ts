import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'reflect-metadata';

import Rollbar from 'vue-rollbar';

Vue.use(Rollbar, {
  accessToken: 'a0c2245309fa4864a9c177c6cdf55181',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: true,
  environment: 'production',
  payload: {
    client: {
      javascript: {
        code_version: 'version-1',
      },
    },
  },
});

JSON.parse('invalid json string');

import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Layout,
  Card,
  Row,
  Col,
  Icon,
  Menu,
  message,
  Alert,
  Avatar,
  Divider,
  Tooltip,
  Tag,
} from 'ant-design-vue';

Vue.component(Button.name, Button);
Vue.component(Table.name, Table);
Vue.component(Modal.name, Modal);
Vue.component(Form.name, Form);
Vue.component(Form.Item.name, Form.Item);
Vue.component(Input.name, Input);
Vue.component(Layout.name, Layout);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Layout.Footer.name, Layout.Footer);
Vue.component(Card.name, Card);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Icon.name, Icon);
Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Alert.name, Alert);
Vue.component(Avatar.name, Avatar);
Vue.component(Divider.name, Divider);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Tag.name, Tag);

Vue.prototype.$message = message;

Vue.config.productionTip = false;

import 'animate.css';

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app');
