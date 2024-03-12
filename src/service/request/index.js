import axios from 'axios';

import { localStg } from '@/utils/storage';

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
      window.$message?.error(data.message);
    } else if (error.response.status === 401) {
      window.$message?.error('Unauthorized');
      localStg.remove('token');
    } else {
      window.$message?.error(data);
    }
  } else {
    window.$message?.error(error.message);
  }
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

  return response.data;

  // if (response.data.code !== 200) {
  //   /** 401: token过期，1003:没有token */
  //   if (response.data.code === 401 || response.data.code === 1003) {
  //     if (!loginDialog) {
  //       loginDialog = true;
  //       authStore.clearAuth();
  //       window.$dialog?.error({
  //         title: '登录已过期',
  //         content: '很抱歉，登录已过期，请重新登录',
  //         positiveText: '重新登录',
  //         onPositiveClick: () => {
  //           authStore.logout(true);
  //           loginDialog = false;
  //         },
  //         onClose: () => {
  //           loginDialog = false;
  //         }
  //       });
  //       return response.data;
  //     }
  //   } else {
  //     if (response.request.responseType !== 'blob') {
  //       window.$message?.error(response.data.message || '未知异常');
  //     }
  //     return response.data;
  //   }
  // } else {
  //   return response.data;
  // }
}, handleAxiosError);

/**
 * request实例方法
 * 设置RequestData
 */
function request(params) {
  return service(params);
}

export { request };
