import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    year: null,
    dateflag: null,
    timeZhi: {
      year: null,
      dateflag: null,
    },
    timeZi: {
      year: null,
      dateflag: null,
    },
    timeInfo: {
      year: null,
      dateflag: null,
    }
  },
  mutations: {
    setYear(state, time) {
      state.year = time
    },
    setDateflag(state, dateflag) {
      state.dateflag = dateflag
    },
    setYearZi(state, time) {
      state.timeZi.year = time
    },
    setDateflagZi(state, dateflag) {
      state.timeZi.dateflag = dateflag
    },
    setYearZhi(state, time) {
      state.timeZhi.year = time
    },
    setDateflagZhi(state, dateflag) {
      state.timeZhi.dateflag = dateflag
    },
    setYearInfo(state, time) {
      state.timeInfo.year = time
    },
    setDateflagInfo(state, dateflag) {
      state.timeInfo.dateflag = dateflag
    },
  }
})

export default store