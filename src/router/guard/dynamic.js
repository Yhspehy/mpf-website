import { localStg } from '@/utils/storage';

/**
 * 动态路由
 */
export async function createDynamicRouteGuard(to, _from, next) {
  const isLogin = Boolean(localStg.get('token'));

  if (!isLogin) {
    const redirect = to.fullPath;
    next({ name: 'login', query: { redirect } });
    return false;
  }

  // 权限路由已经加载，仍然未找到，重定向到404
  if (to.name === 'not-found') {
    next({ name: '404', replace: true });
    return false;
  }

  return true;
}
