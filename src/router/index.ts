import { createRouter, RouteRecordRaw, createWebHistory, Router } from 'vue-router'
import { App } from 'vue'
import Cookies from 'js-cookie'
import store from '../store'
//引入加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const modules = import.meta.glob([
  '../views/manage/*.vue',
  '../views/manage/*/*.vue',
  '../views/manage/*/*/*.vue',
  '../views/userCenter/*.vue',
  '../views/userCenter/*/*.vue',
  '../views/userCenter/*/*/*.vue',
])

const whiteList = ['home', 'index', 'blog', 'forum', 'about', '404']

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/home.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('../views/home/index/index.vue'),
      },
      {
        path: 'blog',
        name: 'blog',
        component: () => import('../views/home/blog/blog.vue'),
        children: [
          {
            path: '',
            name: 'mainBlog',
            component: () => import('../views/home/blog/mainBlog/mainBlog.vue'),
          },
          {
            path: 'search',
            name: 'searchBlog',
            component: () => import('../views/home/blog/searchBlog/searchBlog.vue'),
          },
        ],
      },
      {
        path: 'forum',
        name: 'forum',
        component: () => import('../views/home/forum/forum.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/home/about/about.vue'),
      },
      {
        path: '/detailBlog/:id?',
        name: 'detailBlog',
        component: () => import('../views/home/detailBlog/detailBlog.vue'),
      },
    ],
  },
  {
    path: '/editorBlog/:id?',
    name: 'editorBlog',
    component: () => import('../views/home/editBlog/editBlog.vue'),
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

//异步路由（需要权限的页面）
const convertTreeToRouter = (treeData: any, pathstr: string = '../views/'): RouteRecordRaw => {
  //默认为根路由
  let path: string = `/${treeData.name}`
  if (treeData.parentId !== 0) {
    path = treeData.name
  }
  const newRoute: any = {
    path: path,
    name: treeData.name,
    component: modules[`${pathstr}${treeData.name}/${treeData.name}.vue`],
  }
  let temp: any = {}
  //有子路由
  if (treeData.children.length !== 0) {
    newRoute['children'] = []
    newRoute['redirect'] = pathstr.slice(8) + treeData.name + '/' + treeData.children[0].name
    for (let i = 0; i < treeData.children.length; i++) {
      temp = convertTreeToRouter(treeData.children[i], pathstr + treeData.name + '/')
      newRoute['children'].push(temp)
    }
  }
  return newRoute
}

const getRoutes = () => {
  const menus = store.getters.getNewMenus
  //循环菜单对象
  for (let key in menus) {
    //动态添加路由规则
    const newRoute = convertTreeToRouter(menus[key])
    router.addRoute(newRoute)
  }
  //动态添加首页
  router.addRoute({
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/NotFound/NotFound.vue'),
  })
}

//前置导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = Cookies.get('token')
  // 有效期
  const websites_timestamp: any = localStorage.getItem('websites_timestamp')
  const banners_timestamp: any = localStorage.getItem('banners_timestamp')
  if (Date.now() - websites_timestamp > 604800 * 1000) {
    store.dispatch('getWebSites')
  }
  //86, 400
  if (Date.now() - banners_timestamp > 60 * 1000) {
    store.dispatch('getBanners')
  }
  if (token) {
    const hasMenus = store.state.menus.length !== 0
    //判断是否为刷新：menus为空
    if (!hasMenus) {
      store
        .dispatch('getUserRouter')
        .then((data) => {
          getRoutes()
          next(to)
        })
        .catch((err) => {
          if (err.code === 201) {
            console.log('权限更新')
            next(to)
          } else {
            console.log('[catch]:', err)
          }
        })
    } else {
      next()
    }
  } else {
    getRoutes()
    if (whiteList.indexOf(to.name as string) >= 0) {
      next()
    } else {
      next('/404')
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

export const initRouter = (app: App<Element>) => {
  app.use(router)
}
export const getRouteList = () => {
  getRoutes()
}

// export default router;
