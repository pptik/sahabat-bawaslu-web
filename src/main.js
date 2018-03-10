//Import Vue Essential Library
import Vue from 'vue'
import Vuex from 'vuex'
import VueSession from 'vue-session'
import App from './App.vue'
import HakCipta from './components/HakCipta'
import VueRouter from 'vue-router'
import Routes from './routes'
import VueResource from 'vue-resource'



//Import CSS dan JS
import 'jquery/dist/jquery.min.js'
import 'jquery-ui-bundle/jquery-ui.js'
import 'jquery-ui-bundle/jquery-ui.min.css'
import 'semantic-ui/dist/semantic.min.js'
import 'semantic-ui/dist/semantic.min.css'
import 'moment/moment.js'




//import 'bootstrap'
//import 'bootstrap/dist/css/bootstrap.css'


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueSession);
Vue.use(Vuex);


Vue.component('hak-cipta',HakCipta)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

const store = new Vuex.Store({
  state:{
    count:100
  },
  mutations: {
    increment(state){
      state.count++
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router: router
})
