import Vue from 'vue';
import Vuex from 'vuex';
import { setStoring, getStorage, removeStoring } from '@/utils/tools';

Vue.use(Vuex);

function resetData(state, key) {
  const data = getStorage(key);
  if (key === 'goods') state.goodsData = data;
  if (key === 'historysData') state.historysData = data;
}

export default new Vuex.Store({
  state: {
    goodsData: getStorage('goods') || {},
    historysData: getStorage('historysData') || [],
  },
  mutations: {
    setStorageData(state, { key, value, mode }) {
      setStoring(key, value, mode);
      resetData(state, key);
    },
    removeStorageData(state, { key, value }) {
      removeStoring(key, value);
      resetData(state, key);
    },
  },
  getters: {
    goodsNum(state) {
      const countArr = Object.values(state.goodsData);
      const count = countArr.reduce((pre, next) => pre + next, 0);
      return count === 0 ? null : count;
    },
    goodsDataLen(state) {
      return Object.keys(state.goodsData).length;
    },
  },
  actions: {
  },
  modules: {
  },
});
