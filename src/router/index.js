import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: { title: '用户管理', icon: '用户管理' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '会员列表', icon: '会员',keepAlive:true }
      },
      {
        path: 'detail',
        name: 'usersDetail',
        component: () => import('@/views/user/detail'),
        meta: { title: '会员详情', icon: '会员' },
        hidden: true
      },
      {
        path: 'child',
        name: 'userChild',
        component: () => import('@/views/user/userChild'),
        meta: { title: '下级列表', icon: '会员' },
        hidden: true
      },
    ]
  },

  {
    path: '/money',
    component: Layout,
    redirect: '/money/order',
    name: 'Money',
    meta: { title: '资金管理', icon: '项目资金管理' },
    children: [
      {
        path: 'order',
        name: 'MoneyOrder',
        component: () => import('@/views/money/order'),
        meta: { title: '投资记录', icon: '投资记录' }
      },
      {
        path: 'log',
        name: 'MoneyLog',
        component: () => import('@/views/money/log'),
        meta: { title: '资金流水', icon: '资金流水' }
      },
      {
        path: 'return',
        name: 'MoneyReturn',
        component: () => import('@/views/money/return'),
        meta: { title: '回款列表', icon: '回款列表' }
      }
    ]
  },
  {
    path: '/resource',
    component: Layout,
    redirect: '/resource/banner',
    name: 'Resource',
    meta: { title: '内容管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'banner',
        name: 'Banner',
        component: () => import('@/views/banner/index'),
        meta: { title: '轮播图管理', icon: '轮播图管理' }
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/article/index'),
        meta: { title: '文章管理', icon: '文章管理' }
      }
    ]
  },
  {
    path: '/car',
    component: Layout,
    redirect: '/car/list',
    name: 'Car',
    meta: { title: '车源管理', icon: '车辆管理' },
    children: [
      {
        path: 'list',
        name: 'CarList',
        component: () => import('@/views/car/index'),
        meta: { title: '车辆列表', icon: '车辆管理 (1)' }
      },
      {
        path: 'cell',
        name: 'CellList',
        component: () => import('@/views/car/cellList'),
        meta: { title: '卖车申请', icon: '卖车' }
      },
      {
        path: 'log',
        name: 'CellLog',
        component: () => import('@/views/car/cellLog'),
        meta: { title: '跟进记录', icon: '记录' },
        hidden:true
      },
      {
        path: 'category',
        name: 'CarCategory',
        component: () => import('@/views/car/category'),
        meta: { title: '品牌分类', icon: 'tree' }
      },
      {
        path: 'editInfo',
        name: 'CarCategoryEdit',
        component: () => import('@/views/car/editInfo'),
        meta: { title: '编辑参数', icon: 'tree' },
        hidden:true
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: 'Product',
    meta: { title: '项目管理', icon: '项目管理' },
    children: [
      {
        path: 'list',
        name: 'ProductList',
        component: () => import('@/views/product/index'),
        meta: { title: '项目列表', icon: '项目管理 (1)' }
      },
    ]
  },
  {
    path: '/commission',
    component: Layout,
    redirect: '/commission/list',
    name: 'Commission',
    meta: { title: '营销管理', icon: '营销管理' },
    children: [
      {
        path: 'list',
        name: 'CommissionList',
        component: () => import('@/views/commission/order'),
        meta: { title: '推广订单', icon: '订单' }
      },
      {
        path: 'config',
        name: 'CommissionConfig',
        component: () => import('@/views/commission/config'),
        meta: { title: '推广设置', icon: '设置' }
      },
      {
        path: 'withdraw',
        name: 'CommissionWithdraw',
        component: () => import('@/views/commission/withdraw'),
        meta: { title: '佣金提现', icon: '提现' }
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('@/views/coupon/index'),
        meta: { title: '红包券', icon: '红包券' }
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
