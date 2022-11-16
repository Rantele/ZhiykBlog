/*
 * @Author: Rantele
 * @Date: 2022-10-13 13:00:56
 * @LastEditors: Rantele
 * @LastEditTime: 2022-11-15 21:34:01
 * @Description:Vux状态统一管理
 *
 */

import { createStore } from 'vuex'
import { App } from 'vue'
import { getUserRouterApi, getWSList, getBannerList, getMdStatistics } from '../request/api'
import Cookies from 'js-cookie'
import convertToTreeData from '@/utils/convertToTreeData'
import { EventSourcePolyfill } from 'event-source-polyfill'

const store = createStore<State>({
  state() {
    return {
      menus: [],
      websites: '' || JSON.parse(localStorage.getItem('websites') || '{}'),
      banners: '' || JSON.parse(localStorage.getItem('banners') || '{}'),
      nickname: '',
      img: '',
      MdStatistics: '' || JSON.parse(localStorage.getItem('md_statistics') || '{}'),
    }
  },
  getters: {
    getNewMenus(state): NewMenus {
      return convertToTreeData(state.menus, 0)
    },
    getNewWebsite(state): NewWebSites {
      return convertToTreeData(state.websites, 0)
    },
  },
  mutations: {
    updateMenus(state, data) {
      state.menus = data.router
      state.nickname = data.nickname
      state.img = data.img
    },
    updateWebSites(state, data) {
      localStorage.setItem('websites', JSON.stringify(data))
      localStorage.setItem('websites_timestamp', Date.now().toString())
      state.websites = data
    },
    updateBanners(state, data) {
      localStorage.setItem('banners', JSON.stringify(data))
      localStorage.setItem('banners_timestamp', Date.now().toString())
      state.banners = data
    },
    updateMdStic(state, data) {
      localStorage.setItem('md_statistics', JSON.stringify(data))
      state.MdStatistics = data
    },
  },
  actions: {
    getUserRouter({ commit }) {
      return new Promise((resolve, reject) => {
        getUserRouterApi().then((res: ResComItf<UserRouterRes> | any) => {
          if (res.code === 200) {
            commit('updateMenus', res.data)
            resolve(res.data)
          } else if (res.code === 201) {
            Cookies.set('token', res.data.tokenHead + res.data.token)
            reject(res)
          } else {
            reject(res)
          }
        })
      })
    },
    getWebSites({ commit }) {
      return new Promise((resolve, reject) => {
        getWSList().then((res) => {
          if (res.code === 200) {
            commit('updateWebSites', res.data)
            resolve(res.data)
          } else {
            reject(res)
          }
        })
      })
    },
    getBanners({ commit }) {
      return new Promise((resolve, reject) => {
        getBannerList().then((res) => {
          if (res.code === 200) {
            commit('updateBanners', res.data)
            resolve(res.data)
          } else {
            reject(res)
          }
        })
      })
    },
    getMdStic({ commit }) {
      return new Promise((resolve, reject) => {
        getMdStatistics().then((res) => {
          if (res.code === 200) {
            commit('updateMdStic', res.data)
            resolve(res.data)
          } else {
            reject(res)
          }
        })
      })
    },
  },
  modules: {},
})

export const initStore = (app: App<Element>) => {
  app.use(store)
}

export default store
