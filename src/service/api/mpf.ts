import qs from 'qs';
import { request } from '../request';

export function getMember(email, hiddenError = false) {
  return request({
    url: '/maritimeSilk/proxy/getMember',
    method: 'post',
    showLoading: true,
    appLoading: true,
    isMpf: true,
    hiddenError,
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
    appLoading: true,
    isMpf: true,
    data
  });
}

export function updateMemberInSign(data, Sign, Timestamp, Email) {
  return request({
    url: '/maritimeSilk/web/proxy/modifyMember',
    method: 'post',
    showLoading: true,
    appLoading: true,
    isMpf: true,
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
    appLoading: true,
    isMpf: true,
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
    appLoading: true,
    isMpf: true,
    data
  });
}

export function getUnit(name) {
  return request({
    url: '/maritimeSilk/proxy/getUnit',
    method: 'post',
    isMpf: true,
    data: qs.stringify({
      name
    })
  });
}

export function getUnitInSign(name, Sign, Timestamp, Email) {
  return request({
    url: '/maritimeSilk/web/proxy/getUnit',
    method: 'post',
    isMpf: true,
    headers: {
      Sign,
      Timestamp,
      Email
    },
    data: qs.stringify({
      name
    })
  });
}

export function getStatic() {
  return request({
    url: '/maritimeSilk/proxy/getStatic',
    isMpf: true,
    method: 'post'
  });
}

export function getStaticInSign(Sign, Timestamp, Email) {
  return request({
    url: '/maritimeSilk/web/proxy/getStatic',
    method: 'post',
    isMpf: true,
    headers: {
      Sign,
      Timestamp,
      Email
    }
  });
}

export function getMemberInSign(Sign, Timestamp, Email) {
  return request({
    url: '/maritimeSilk/web/proxy/getMember',
    method: 'post',
    showLoading: true,
    appLoading: true,
    isMpf: true,
    hiddenError: true,
    headers: {
      Sign,
      Timestamp,
      Email
    },
    data: qs.stringify({
      email: Email
    })
  });
}

export function getMemberInfoInSign(id, Sign, Timestamp, Email) {
  return request({
    url: '/maritimeSilk/web/proxy/getInfo',
    method: 'post',
    showLoading: true,
    appLoading: true,
    isMpf: true,
    hiddenError: true,
    headers: {
      Sign,
      Timestamp,
      Email
    },
    data: qs.stringify({
      id
    })
  });
}

export function getQrCode(id = '') {
  return request({
    url: '/maritimeSilk/user/qr?id=' + id,
    method: 'GET'
  });
}

export function addVolunteer(data) {
  return request({
    url: '/maritimeSilk/proxy/addVolunteer',
    method: 'post',
    isMpf: true,
    showLoading: true,
    appLoading: true,
    data
  });
}

export function getGlobalConfig() {
  return request({
    url: '/maritimeSilk/global-config/canSignUp',
    method: 'get'
  });
}
