import axios from 'axios';

import { localStg } from '@/utils/storage';
import { router } from '@/router';

/** 创建实例 */
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL, // api base_url
  timeout: 120000 // 请求超时时间
});

/** 处理axios的错误 */
const handleAxiosError = (error) => {
  if (error.response) {
    const data = error.response.data;
    if (error.response.status === 403) {
      window.$message?.error(data.message, { duration: 10000 });
    } else if (error.response.status === 401) {
      window.$message?.error('Unauthorized', { duration: 10000 });
      localStg.remove('token');
      router.push('/login');
    } else {
      window.$message?.error(data || error.message, { duration: 10000 });
    }
  } else {
    window.$message?.error(error.message, { duration: 10000 });
  }
  window.$appLoading?.(false);
  window.$loading?.(false);
  return Promise.reject(error);
};

/** request拦截器 */
service.interceptors.request.use((config) => {
  if (config.showLoading) {
    if (config.appLoading) {
      window.$appLoading?.(true);
    } else {
      window.$loading?.(true);
    }
  }
  const token = localStg.get('token');
  if (token) {
    config.headers['Authorization'] = token;
    config.headers['token'] = token;
  }
  return config;
}, handleAxiosError);

/** response拦截器 */
service.interceptors.response.use((response) => {
  const config = response.config;
  if (config.showLoading) {
    if (config.appLoading) {
      window.$appLoading?.(false);
    } else {
      window.$loading?.(false);
    }
  }
  if (response.config.isMpf && response.data.code !== '0') {
    // window.$notification.error({
    //   content: 'Error',
    //   meta: response.data.message || '未知异常',
    //   duration: 10000,
    //   keepAliveOnHover: true
    // });
    let errorMsg = response.data.message || 'error';
    const item = window.$errorList.find((e) => e.chinese === errorMsg);
    if (item) {
      errorMsg = item.english;
    }
    window.$message?.error(errorMsg, { duration: 10000 });
  }
  return response.data;
}, handleAxiosError);

/**
 * request实例方法
 * 设置RequestData
 */
function request(params) {
  return service(params);
}

export { request };
