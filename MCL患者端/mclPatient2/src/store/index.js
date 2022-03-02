import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    personInfo : {}
  },
  mutations: {
    setpersonInfo(state, obj) {
      state.personInfo = obj
    }
  }
})

export default store