import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    personInfo : {}, // 信息资料
    nutrition : {}, // 营养评估
    psychology : {}, // 心理评估
  },
  mutations: {
    setpersonInfo(state, obj) {
      state.personInfo = obj
    },
    setnutrition(state, obj) {
      state.nutrition = obj
    },
    setpsychology(state, obj) {
      state.psychology = obj
    },
  }
})

export default store