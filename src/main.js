import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from './element'
import VueCookies from 'vue-cookies'
import { Field } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Button } from 'vant';
import { Tab, Tabs } from 'vant';
import { Icon } from 'vant';
import { Search } from 'vant';
import { Popup } from 'vant';
import { Sticky } from 'vant';
import { Dialog } from 'vant';
import { RadioGroup, Radio } from 'vant';

Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Dialog);
Vue.use(Sticky);
Vue.use(Popup);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);

Vue.use(Field)

Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.use(element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
