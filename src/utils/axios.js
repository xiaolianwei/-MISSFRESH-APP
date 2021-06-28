import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods',
});

instance.interceptors.request.use((req) => {
  req.params.appkey = 'xiaolianwei_1615365846585';
  return req;
});

instance.interceptors.response.use((res) => res.data);

export default instance;
