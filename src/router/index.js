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
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/banner',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'BannerList',
        component: () => import('@/views/banner/index'),
        meta: { title: 'Banner管理', icon: 'el-icon-user-solid' }
      },
      {
        path: 'create',
        name: 'CreateBanner',
        component: () => import('@/views/banner/create'),
        meta: { title: '添加Banner', icon: 'tree' },
        hidden: true
      },

      {
        path: 'edit/:id(\\d+)',
        name: 'EditBanner',
        component: () => import('@/views/banner/edit'),
        meta: { title: '编辑Banner', icon: 'tree' },
        hidden: true
      },
    ]
  },

  {
    path: '/activity',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'ActivityList',
        component: () => import('@/views/activity/list'),
        meta: { title: '活动管理', icon: 'el-icon-user-solid' }
      },
      {
        path: 'create',
        name: 'CreateActivity',
        component: () => import('@/views/activity/create'),
        meta: { title: '添加活动', icon: 'tree' },
        hidden: true
      },

      {
        path: 'edit/:id(\\d+)',
        name: 'EditActivity',
        component: () => import('@/views/activity/edit'),
        meta: { title: '编辑活动', icon: 'tree' },
        hidden: true
      },
    ]
  },

  {
    path: '/channel',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'ChannelList',
        component: () => import('@/views/channel/list'),
        meta: { title: '频道管理', icon: 'el-icon-user-solid' }
      },
      {
        path: 'create',
        name: 'CreateChannel',
        component: () => import('@/views/channel/create'),
        meta: { title: '添加频道', icon: 'tree' },
        hidden: true
      },

      {
        path: 'edit/:id(\\d+)',
        name: 'EditChannel',
        component: () => import('@/views/channel/edit'),
        meta: { title: '编辑频道', icon: 'tree' },
        hidden: true
      },
    ]
  },

  {
    path: '/content',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'ContentList',
        component: () => import('@/views/content/list'),
        meta: { title: '内容管理', icon: 'el-icon-user-solid' }
      },
      {
        path: 'create',
        name: 'CreateContent',
        component: () => import('@/views/content/create'),
        meta: { title: '添加内容', icon: 'tree' },
        hidden: true
      },

      {
        path: 'edit/:id(\\d+)',
        name: 'EditContent',
        component: () => import('@/views/content/edit'),
        meta: { title: '编辑内容', icon: 'tree' },
        hidden: true
      },
    ]
  },

  {
    path: '/course',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'CourseList',
        component: () => import('@/views/course/list'),
        meta: { title: '课程管理', icon: 'el-icon-user-solid' }
      },
      {
        path: 'create',
        name: 'CreateCourse',
        component: () => import('@/views/course/create'),
        meta: { title: '添加课程', icon: 'tree' },
        hidden: true
      },

      {
        path: 'edit/:id(\\d+)',
        name: 'EditCourse',
        component: () => import('@/views/course/edit'),
        meta: { title: '编辑课程', icon: 'tree' },
        hidden: true
      },
    ]
  },

  {
    path: '/affiche',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'AfficheList',
        component: () => import('@/views/affiche/list'),
        meta: { title: '公告管理', icon: 'el-icon-user-solid' }
      },
      {
        path: 'create',
        name: 'CreateAffiche',
        component: () => import('@/views/affiche/create'),
        meta: { title: '添加公告', icon: 'tree' },
        hidden: true
      },

      {
        path: 'edit/:id(\\d+)',
        name: 'EditAffiche',
        component: () => import('@/views/affiche/edit'),
        meta: { title: '编辑公告', icon: 'tree' },
        hidden: true
      },
    ]
  },

  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'AdminList',
        component: () => import('@/views/admin/index'),
        meta: { title: '后台帐号', icon: 'el-icon-user-solid' }
      },
      {
        path: 'create',
        name: 'CreateAdmin',
        component: () => import('@/views/admin/create'),
        meta: { title: '添加后台帐号', icon: 'tree' },
        hidden: true
      },

      {
        path: 'edit',
        name: 'EditAdmin',
        component: () => import('@/views/admin/edit'),
        meta: { title: '编辑后台帐号', icon: 'tree' },
        hidden: true
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
