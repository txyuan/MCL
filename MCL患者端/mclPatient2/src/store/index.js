import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    personInfo : {}, // 信息资料
    nutrition : {}, // 营养评估
    psychology : {}, // 心理评估
    physicalGauge : {}, // 体能评估
    symptom : [], // 症状管理组件
    symptomData : [],// 症状管理数据 
    foodPhotoData : [], // 饮食检测图片formdata
    breakfastList : [], // 早餐
    lunchList : [], // 中餐
    dinnerList : [], // 晚餐
    mealAdditionList : [], // 加餐
    mealType : '', // 餐名
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
    setsymptomData(state, arr) {
      state.symptomData = arr
    },
    setfoodPhotoData(state, arr) {
      state.foodPhotoData = arr
    },
    setbreakfastList(state, arr) {
      state.breakfastList = arr
    },
    setlunchList(state, arr) {
      state.lunchList = arr
    },
    setdinnerList(state, arr) {
      state.dinnerList = arr
    },
    setmealAdditionList(state, arr) {
      state.mealAdditionList = arr
    },
    setmealType(state, str) {
      state.mealType = str
    },
  }
})

export default store