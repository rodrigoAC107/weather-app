import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

const URL_BASE = process.env.VUE_APP_URL_BASE_WEATHER;
const KEY_SECRET = process.env.VUE_APP_KEY_SECRET;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    degree: null,
    dataWeather: null,
  },
  mutations: {
    SET_DATA_WEATHER(state, weather){
      state.dataWeather = weather;
    },
    SET_DEGREE(state, degree){
      state.degree = degree;
    },
  },
  actions: {
    async getDataWeather({commit}, {country = 'Salta', degree = null}) {
      const { data } = await axios.get(
        `${URL_BASE}?q=${country}&appid=${KEY_SECRET}&units=${degree}`
      );

       commit('SET_DATA_WEATHER', data);
       commit('SET_DEGREE', degree);
    },
  },
  getters: {
    getDegree: state => state.degree,
    getDataWeather: state => state.dataWeather,

  },
  modules: {},
});
