import { createDynamicRouteGuard } from './dynamic';

/** 处理路由页面的权限 */
export async function createPermissionGuard(to, from, next) {
  // 动态路由
  const permission = await createDynamicRouteGuard(to, from, next);
  if (!permission) return;

  next();
}
