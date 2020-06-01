import Vue from "vue";
import Element from "element-ui";
import Vuetify from "vuetify";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/reset.css";
import "element-theme-chalk/lib/select.css";
import App from "./App.vue";

import locale from "element-ui/lib/locale/lang/de";

Vue.use(Vuetify);

Vue.use(Element, { locale });

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  vuetify: new Vuetify({
    icons: {
      iconfont: "md"
    }
  })
});
