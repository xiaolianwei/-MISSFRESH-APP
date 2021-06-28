import axios from '@/utils/axios';

export default {
  getsidebar(type) {
    return axios.get('/getsidebar', {
      params: { type },
    });
  },
  getGoodsList(params) {
    return axios.get('/getGoodsList', { params });
  },
  getGoodsByIds(goodsArr) {
    return axios.get('/getGoodsByIds', {
      params: {
        value: goodsArr.toString(),
      },
    });
  },
  likeSearch(likeValue) {
    return axios.get('/likeSearch', {
      params: { likeValue },
    });
  },
  search(params) {
    return axios.get('/search', { params });
  },
};
