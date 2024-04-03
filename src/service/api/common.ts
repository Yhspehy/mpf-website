import { request } from '../request';

/** 获取翻译列表 */
export function getTranslateList() {
  return request({
    url: '/maritimeSilk/admin/language/all',
    method: 'get'
  });
}
