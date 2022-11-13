<!--  -->
<template>
  <el-container direction="vertical" style="height: 100vh">
    <el-header class="navbar">
      <el-row :gutter="24" class="hidden-sm-and-up" justify="space-between">
        <el-col :xs="6" :sm="6">
          <el-dropdown @command="handleCommand" trigger="click" class="home-dropdown" size="large"
            style="justify-content:left">
            <div>
              <svg t="1668320148755" class="icon" viewBox="0 0 1462 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2696" width="20" height="20">
                <path
                  d="M1389.714286 146.285714H74.517943C37.215086 146.285714 2.896457 115.887543 0.2048 78.555429A73.142857 73.142857 0 0 1 73.142857 0h1315.0208c37.419886 0 71.767771 30.398171 74.430172 67.730286A73.142857 73.142857 0 0 1 1389.714286 146.285714z"
                  p-id="2697"></path>
                <path
                  d="M731.428571 585.142857H74.517943C37.215086 585.142857 2.896457 554.744686 0.2048 517.412571A73.142857 73.142857 0 0 1 73.142857 438.857143h656.735086c37.419886 0 71.738514 30.398171 74.430171 67.701028A73.142857 73.142857 0 0 1 731.428571 585.142857z"
                  p-id="2698"></path>
                <path
                  d="M1389.714286 1024H74.517943C37.215086 1024 2.896457 993.601829 0.2048 956.298971A73.142857 73.142857 0 0 1 73.142857 877.714286h1315.0208c37.419886 0 71.738514 30.398171 74.430172 67.701028A73.142857 73.142857 0 0 1 1389.714286 1024z"
                  p-id="2699"></path>
              </svg>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="/">首页</el-dropdown-item>
                <el-dropdown-item command="/blog">博客</el-dropdown-item>
                <el-dropdown-item command="/forum">圈子</el-dropdown-item>
                <el-dropdown-item command="/about">关于</el-dropdown-item>
                <el-dropdown-item :command="'/' + item.name" v-for="(item, index) in getRouteData.index" :key="index">{{
                    item.title
                }}</el-dropdown-item>
                <el-dropdown-item command="createBlog" divided>写博客</el-dropdown-item>

              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
        <el-col :xs="12" :sm="12">
          <div v-if="MobileSearch" style="line-height:58px;">
            <el-input v-model="searchData" size="large" @keyup.enter="handleMobileSearch" placeholder="🐱‍🏍探索知音库">
              <template #suffix>
                <el-button link @click="handleMobileSearch">
                  <el-icon :size="16">
                    <Search />
                  </el-icon>
                </el-button>
              </template>
            </el-input>
          </div>
          <div v-else class="logo" @click="goHome">
            <el-image style="width: 48px; height: 100%;" :src="LogoIcon" fit="contain" />
            <span>知音库</span>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" style="display:flex;justify-content: space-evenly;">
          <div style="line-height:58px;margin-right:8px;">
            <el-button link @click="MobileSearch = !MobileSearch">
              <el-icon :size="20">
                <Search />
              </el-icon>
            </el-button>
          </div>

          <div v-if="!hasLogin" class="icon-style">
            <el-avatar :size="32" @click="Login">
              <IEpUserFilled />
            </el-avatar>
          </div>
          <div v-else class="icon-style">
            <el-link ref="userLogoRef" href="javascript:;" :underline="false" @click.prevent="userLogo">
              <el-avatar v-if="!store.state.img" :src="defaultAvatar" :size="32" />
              <el-avatar v-else :src="'/path/user/avatar/' + store.state.img" :size="32" />
            </el-link>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="hidden-xs-only" justify="space-between">
        <el-col :sm="2" :md="4" :lg="3" :xl="3">
          <div class="logo" @click="goHome">
            <el-image style="width: 48px; height: 100%;" :src="LogoIcon" fit="contain" />
            <span class="hidden-sm-and-down">知音库</span>
          </div>
        </el-col>
        <el-col :sm="8" :md="10" :lg="13" :xl="13">
          <el-menu :default-active="$route.path" mode="horizontal" :router="true">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/blog">博客</el-menu-item>
            <el-menu-item index="/forum">圈子</el-menu-item>
            <el-menu-item index="/about">关于</el-menu-item>
            <el-menu-item v-for="(item, index) in getRouteData.index" :index="'/' + item.name" :key="index">{{
                item.title
            }}
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :sm="14" :md="10" :lg="8" :xl="8" style="display:flex;justify-content: center;">
          <div style="line-height:58px;margin-right:24px;">
            <el-input v-model="searchData" @keyup.enter="handleSearch" placeholder="🐱‍🏍探索知音库">
              <template #suffix>
                <el-button link @click="handleSearch">
                  <el-icon :size="16">
                    <Search />
                  </el-icon>
                </el-button>
              </template>
            </el-input>
          </div>
          <div style="line-height:58px;margin-right:16px;">
            <el-button type="primary" :icon="Edit" round @click="createBlog">
              <span>写文章</span>
            </el-button>
          </div>
          <div v-if="!hasLogin" class="icon-style">
            <el-avatar :size="32" @click="Login">
              <IEpUserFilled />
            </el-avatar>
          </div>
          <div v-else class="icon-style">
            <el-link ref="userLogoRef" href="javascript:;" :underline="false" @click.prevent="userLogo">
              <el-avatar v-if="!store.state.img" :src="defaultAvatar" :size="32" />
              <el-avatar v-else :src="'/path/user/avatar/' + store.state.img" :size="32" />
            </el-link>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-main class="page-component__scroll" style="height: calc(100vh - 59px);">
        <el-scrollbar class="scroll-item" style="height: 100%">
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
      <el-backtop target=".page-component__scroll .el-scrollbar__wrap" />
    </el-container>
  </el-container>
  <LoginVue :visible="dialogFormVisible" @close="closeLoginDialog" />
  <el-popover v-if="hasLogin" ref="popoverRef" :width="280" :virtual-ref="userLogoRef" trigger="hover"
    virtual-triggering popper-class="user-popover" popper-style="padding: 20px;">
    <div class="user-card">
      <div class="user-info">
        <div class="user-detail">
          <a href="/userCenter/userInfo">
            <el-avatar class="user-avatar" :size="56" :src="'/path/user/avatar/' + store.state.img" />
            <div class="user-nickname">{{ store.state.nickname }}</div>
          </a>
        </div>
        <div class="mdstatic">
          <div class="ms-item">
            <a href="/userCenter/userBlog">
              <div class="ms-item-count">{{ store.state.MdStatistics.blog_count }}</div>
              <div class="ms-item-title">文章</div>
            </a>
          </div>
          <div class="ms-item">
            <a href="/userCenter/userBlog">
              <div class="ms-item-count">{{ store.state.MdStatistics.vote_count }}</div>
              <div class="ms-item-title">赞过</div>
            </a>
          </div>
          <div class="ms-item">
            <a href="/userCenter/userStars">
              <div class="ms-item-count">{{ store.state.MdStatistics.star_count }}</div>
              <div class="ms-item-title">收藏</div>
            </a>
          </div>
        </div>
      </div>
      <div class="dropdown-list">
        <div class="dropdown-item">
          <a href="/userCenter">
            <el-icon class="item-icon">
              <User />
            </el-icon>
            <span>个人中心</span>
          </a>
        </div>
        <div class="dropdown-item">
          <a href="/userCenter/userHistory">
            <el-icon class="item-icon">
              <Clock />
            </el-icon>
            <span>我的足迹</span>
          </a>
        </div>
        <div class="dropdown-item">
          <a href="/userCenter/userSetting">
            <el-icon class="item-icon">
              <Setting />
            </el-icon>
            <span>我的设置</span>
          </a>
        </div>
      </div>
      <div class="popover-footer">
        <a class="logout" title="退出" :underline="false" @click.prevent="logout">
          <el-icon class="item-icon">
            <SwitchButton />
          </el-icon>
          <span>退出登录</span>
        </a>
      </div>
    </div>
  </el-popover>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, computed, provide } from 'vue'
import Cookies from 'js-cookie';
import store from '@/store';
import LoginVue from "@/views/login/Login.vue";
import LogoIcon from '@/assets/logo1.png'
import defaultAvatar from '@/assets/defaultAvatar.png'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import 'element-plus/es/components/notification/style/css'
import { Edit } from '@element-plus/icons-vue'
import { getRouteList } from '@/router'
import 'element-plus/theme-chalk/display.css'

const router = useRouter();
const userLogoRef = ref()
const popoverRef = ref()
const Login = () => {
  dialogFormVisible.value = true
}
const userLogo = () => {
  router.push('/userCenter')
}
const logout = () => {
  Cookies.remove("token");
  store.commit('updateMenus', { router: [], nickname: '', img: '' })
  router.push('/');
  ElNotification.success({
    title: '期望下次的相见👋',
    offset: 50,
    duration: 2500,
    showClose: false,
  })
}
//点击导航（移动端）
const handleCommand = (command: string) => {
  if (command === 'createBlog') {
    if (!hasLogin.value) {
      //没有登录弹出登录框
      dialogFormVisible.value = true
      console.log('用户未登录');

    } else {
      //跳转到写文章页面
      console.log('createBlog');
      router.push({ name: 'editorBlog', query: { create: 'true' } });
    }
  } else {
    router.push(command)
  }

}

//点击Logo图标跳转到首页
const goHome = () => {
  router.push('/')
}


const state = reactive<{
  dialogFormVisible: boolean;
  searchData: string;
  MobileSearch: boolean;
}>({
  dialogFormVisible: false,
  searchData: '',
  MobileSearch: false
})

const { dialogFormVisible, searchData, MobileSearch } = toRefs(state);

//provide
provide('toLogin', dialogFormVisible)
const getRouteData = computed(() => {
  let routeData: { index?: MenusObj[]; userCenter?: MenusObj[] } = { index: [], userCenter: [] }
  for (let i = 0; i < store.state.menus.length; i++) {
    if (store.state.menus[i].location === 'index') {
      routeData['index']?.push(store.state.menus[i])
    }
    else if (store.state.menus[i].location === 'userCenter') {
      routeData['userCenter']?.push(store.state.menus[i])
    }
  }
  return routeData
})

//点击写文章按钮
const createBlog = () => {
  if (!hasLogin.value) {
    //没有登录弹出登录框
    dialogFormVisible.value = true
    console.log('用户未登录');

  } else {
    //跳转到写文章页面
    console.log('createBlog');
    router.push({ name: 'editorBlog', query: { create: 'true' } });
  }
}

//判断是否登录
const hasLogin = computed(() => {
  if (store.state.nickname && Cookies.get('token')) {
    return true
  } else {
    return false
  }
})
provide('hasLogin', hasLogin)


//关闭登录框
const closeLoginDialog = (reload: any) => {
  dialogFormVisible.value = false
  if (!isNaN(reload)) {
    if (reload === 200) {
      store.dispatch('getUserRouter').then(res => {
        //加载动态路由
        getRouteList()
        ElNotification.success({
          title: '好久不见👋',
          message: '欢迎你，' + res.nickname,
          offset: 50,
          duration: 2000,
          showClose: false,
        })
        // router.go(0)
      })
      store.dispatch('getMdStic').catch(err => {
        console.log('[catch]:', err);
      })
    }
  }
}

//搜索操作
const handleSearch = () => {
  router.push({
    name: 'searchBlog',
    query: {
      search: searchData.value
    }
  })
  searchData.value = ''
}

//移动端搜索
const handleMobileSearch = () => {
  router.push({
    name: 'searchBlog',
    query: {
      search: searchData.value
    }
  })
  searchData.value = ''
  MobileSearch.value = false
}

</script>
<style lang='less' scoped>
.el-menu {
  background-color: unset;
}

.el-main {
  --el-main-padding: 0px;
  background-color: #f4f5f5;
}

/* 
  nav 透明毛玻璃效果失效
*/
.navbar {
  z-index: var(--nav-z-index);
  text-align: center;
  height: 59px;
  padding: 0 32px;
  background-image: radial-gradient(transparent 1px, var(--el-bg-color) 1px);
  border-bottom: var(--el-border-color) solid 1px;
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(8px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  span {
    font-weight: 600;
    font-size: 1.2rem;
    color: #213547;
    background: -webkit-linear-gradient(-45deg, #0184ff 25%, #d900ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
  }
}

.user-popover {
  box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px;
  display: flex;


  .user-card {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .user-info {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      gap: 8px;


      .user-detail {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        a {
          text-decoration: none;
        }

        .user-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          position: relative;
        }

        .user-nickname {
          word-break: break-all;
          font-size: 1.2rem;
          line-height: 1.2rem;
          color: #252933;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          margin-bottom: 8px;
          margin-top: 6px;
        }
      }

      .mdstatic {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        text-align: center;
        margin-bottom: 12px;

        a {
          text-decoration: none;
        }

        .ms-item {
          flex: 1;
          display: flex;
          flex-direction: column;

          .ms-item-count {
            font-weight: 500;
            font-size: 16px;
            line-height: 18px;
            color: #252933;
            margin-bottom: 4px;
          }

          .ms-item-title {
            color: #8a919f;
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
          }
        }
      }


    }

    .dropdown-list {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid rgba(0, 0, 0, .1);

      a {
        text-decoration: none;
        cursor: pointer;
        color: #252933;


      }

      .item-icon {
        position: relative;
        margin: 0 12px;
        height: 32px;
        width: 32px;
        line-height: 32px;

      }

      .dropdown-item {
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #252933;
        font-size: 14px;
        cursor: pointer;
      }

      .dropdown-item:hover {
        background: #E3E5E7;
        border-radius: 8px;
      }


    }

    .popover-footer {
      display: flex;
      flex-direction: column;

      .logout {
        text-decoration: none;
        cursor: pointer;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #252933;
        font-size: 14px;
        cursor: pointer;

        .item-icon {
          position: relative;
          margin: 0 12px;
          height: 32px;
          width: 32px;
          line-height: 32px;
        }
      }

      .logout:hover {
        background: #E3E5E7;
        border-radius: 8px;
      }
    }

  }
}



/* .el-menu--horizontal {
  border-bottom: none;
} */

.icon-style {
  display: inline-flex;
  align-items: center;
  position: relative;
  height: 58px;
}

.icon-style svg:hover {
  color: #79bbff;
}

.footer {
  text-align: center;
  border-top: var(--el-border-color) solid 1px;
  background-color: var(--el-bg-color-overlay);

}

.scroll-item {
  scroll-behavior: smooth;
}

.home-dropdown {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .el-dropdown-link {
    flex: 1;
  }
}
</style>