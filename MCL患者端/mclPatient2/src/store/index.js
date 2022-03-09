import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    personInfo : {}, // 信息资料
    nutrition : {}, // 营养评估
    psychology : {}, // 心理评估
    physicalGauge : {}, // 体能评估
    symptom : [], // 症状监测
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
    setphysicalGauge(state, obj) {
      state.physicalGauge = obj
    },
    setsymptom(state, arr) {
      state.symptom = arr
    },
  }
})

export default store