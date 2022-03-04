import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    personInfo : {}, // 信息资料
    nutrition : {} // 营养评估
  },
  mutations: {
    setpersonInfo(state, obj) {
      state.personInfo = obj
    },
    setnutrition(state, obj) {
      state.nutrition = obj
    },
  }
})

export default store