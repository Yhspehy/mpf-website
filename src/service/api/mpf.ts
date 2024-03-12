import qs from 'qs';
import { request } from '../request';

export function getMember(email) {
  return request({
    url: '/maritimeSilk/proxy/getMember',
    method: 'post',
    showLoading: true,
    data: qs.stringify({
      email
    })
  });
}

export function updateMember(data) {
  return request({
    url: '/maritimeSilk/proxy/modifyMember',
    method: 'post',
    showLoading: true,
    data
  });
}

export function updateMemberInSign(data, Sign, Timestamp, Email) {
  return request({
    url: '/maritimeSilk/proxy/modifyMember',
    method: 'post',
    showLoading: true,
    headers: {
      Sign,
      Timestamp,
      Email
    },
    data
  });
}

export function getMemberInfo(id) {
  return request({
    url: '/maritimeSilk/proxy/getInfo',
    method: 'post',
    showLoading: true,
    data: qs.stringify({
      id
    })
  });
}

export function updateMemberInfo(data) {
  return request({
    url: '/maritimeSilk/proxy/modifyInfo',
    method: 'post',
    showLoading: true,
    data
  });
}

export function getUnit(name) {
  return request({
    url: '/maritimeSilk/proxy/getUnit',
    method: 'post',
    data: qs.stringify({
      name
    })
  });
}

export function getStatic() {
  return request({
    url: '/maritimeSilk/proxy/getStatic',
    method: 'post'
  });
}
