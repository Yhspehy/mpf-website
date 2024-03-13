import { createRouter, createWebHashHistory } from 'vue-router';
// import { createRouterGuard } from './guard';

const constantRoute = [
  {
    path: '/',
    name: 'root',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/person',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/home/sign-up.vue')
      },
      {
        path: '/home/person',
        name: 'person',
        component: () => import('@/views/home/personal.vue')
      },
      {
        path: '/home/qrcode',
        name: 'qrcode',
        component: () => import('@/views/home/qrcode.vue')
      },
      {
        path: '/home/forum',
        name: 'forum',
        component: () => import('@/views/home/forum.vue')
      },
      {
        path: '/home/service',
        name: 'service',
        component: () => import('@/views/home/service.vue')
      },
      {
        path: '/home/assistant',
        name: 'assistant',
        component: () => import('@/views/home/assistant.vue')
      },
      {
        path: '/home/companion',
        name: 'companion',
        component: () => import('@/views/home/companion.vue')
      }
    ],
    meta: {
      title: '首页'
    }
  },

  {
    path: '/verify',
    name: 'verify',
    component: () => import('../views/login/verify.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    name: '404',
    path: '/404',
    component: () => import('../views/404.vue'),
    meta: {
      title: '未找到'
    }
  }
];

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoute
});

/** setup vue router. - [安装vue路由] */
export async function setupRouter(app) {
  app.use(router);
  // createRouterGuard(router);
  await router.isReady();
}
