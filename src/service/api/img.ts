import { request } from '../request';

export function uploadImg(data: any) {
  return request({
    url: '/maritimeSilk/image/upload',
    method: 'post',
    data
  });
}
