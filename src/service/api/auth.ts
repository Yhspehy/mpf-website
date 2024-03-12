import { request } from '../request';

export function login(email, password) {
  return request({
    url: '/maritimeSilk/user/login/web',
    method: 'post',
    data: {
      email,
      password
    }
  });
}

export function verify(email) {
  return request({
    url: `/maritimeSilk/user/email/exist`,
    method: 'post',
    data: {
      email
    }
  });
}

export function register(email, password) {
  return request({
    url: `/maritimeSilk/user/register/web`,
    method: 'post',
    data: {
      email,
      password
    }
  });
}

export function registerEmail(email, phone, sign, timestamp) {
  return request({
    url: `/maritimeSilk/user/register/activate`,
    method: 'post',
    data: {
      email,
      phone,
      sign,
      timestamp
    }
  });
}
