import { request } from '../request';

/** 获取翻译列表 */
export function getTranslateList() {
  return request({
    url: '/maritimeSilk/language/all',
    method: 'get'
  });
}
