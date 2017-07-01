// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import ElementUI from 'element-ui';
// import Vuetify from 'vuetify';
import 'element-ui/lib/theme-default/index.css';
import App from './App';
import router from './router';
import Store from './store';

// Vue.use(Vuetify);
Vue.use(ElementUI);
Vue.component('icon', Icon);

Vue.prototype.$store = Store;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
