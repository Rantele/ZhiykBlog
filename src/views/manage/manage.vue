<!--  -->
<template>
  <div class="homepage_container">
    <el-container direction="vertical" style="height: 100%;">
      <el-header class="homepage_header">
        <el-menu mode="horizontal" :ellipsis="false" style="height:70px">
          <el-button link style="padding:0 8px 0 0" @click="goBack">
            <el-icon>
              <ArrowLeftBold />
            </el-icon>
            返回
          </el-button>
          <el-button link class="collapse-btn hidden-xs-only">
            <el-icon size="20px" @click="isCollapse = !isCollapse">
              <Expand v-if="isCollapse" />
              <Fold v-else />
            </el-icon>
          </el-button>
          <div style="flex-grow:1"></div>
          <el-dropdown trigger="click" class="hidden-sm-and-up" size="large" style="align-items: center;">
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
              <el-menu :default-active="$route.path" :unique-opened="true" :router="true">
                <template v-for="(menu, menuindex) in manageMenus">
                  <el-sub-menu v-if="menu.children?.length !== 0" :index="'/' + menu.location + '/' + menu.name"
                    :key="menuindex">
                    <template #title>
                      <el-icon>
                        <component :is="menu.icon"></component>
                      </el-icon>
                      <span>{{ menu.title }}</span>
                    </template>
                    <el-menu-item v-for="(submenu, index) in menu.children"
                      :index="'/' + menu.location + '/' + menu.name + '/' + submenu.name" :key="index">
                      <el-icon>
                        <component :is="submenu.icon"></component>
                      </el-icon>
                      <span>{{ submenu.title }}</span>
                    </el-menu-item>
                  </el-sub-menu>
                  <el-menu-item v-else :index="'/' + menu.location + '/' + menu.name" :key="menuindex + 1">
                    <el-icon>
                      <component :is="menu.icon"></component>
                    </el-icon>
                    <span>{{ menu.title }}</span>
                  </el-menu-item>
                </template>
              </el-menu>
            </template>
          </el-dropdown>
        </el-menu>
      </el-header>
      <el-container style="height: calc(100vh - 70px);">
        <el-aside width="null" class="hidden-xs-only">
          <el-scrollbar>
            <el-menu class="el-menu-vertical" :default-active="$route.path" :collapse="isCollapse" :unique-opened="true"
              :router="true">
              <template v-for="(menu, menuindex) in manageMenus">
                <el-sub-menu v-if="menu.children?.length !== 0" :index="'/' + menu.location + '/' + menu.name"
                  :key="menuindex">
                  <template #title>
                    <el-icon>
                      <component :is="menu.icon"></component>
                    </el-icon>
                    <span>{{ menu.title }}</span>
                  </template>
                  <el-menu-item v-for="(submenu, index) in menu.children"
                    :index="'/' + menu.location + '/' + menu.name + '/' + submenu.name" :key="index">
                    <el-icon>
                      <component :is="submenu.icon"></component>
                    </el-icon>
                    <span>{{ submenu.title }}</span>
                  </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="'/' + menu.location + '/' + menu.name" :key="menuindex + 1">
                  <el-icon>
                    <component :is="menu.icon"></component>
                  </el-icon>
                  <span>{{ menu.title }}</span>
                </el-menu-item>
              </template>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main class="page-component__scroll">
          <el-scrollbar>
            <div class="main-wrap">
              <el-config-provider :locale="zhCn">
                <router-view></router-view>
              </el-config-provider>
            </div>
          </el-scrollbar>
        </el-main>
        <el-backtop target=".page-component__scroll .el-scrollbar__wrap" />
      </el-container>
    </el-container>
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, computed } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from "vue-router"
// 导入 Element Plus 语言包
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import 'element-plus/theme-chalk/display.css'


const router = useRouter();
const store = useStore();

//侧边导航伸缩
const isCollapse = ref(false)

//处理菜单导航数据
const manageMenus = computed<NewMenus>(() => {
  let item = "0";
  for (let index in store.getters.getNewMenus) {
    if (store.getters.getNewMenus[index].name === "manage") {
      item = index;
      break;
    }
  }
  return store.getters.getNewMenus[item].children;

})

// 返回到首页
const goBack = () => {
  router.push('/');
}

</script>
<style lang='less' scoped>
// 解决侧边栏折叠卡顿的问题
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-vertical {
  height: calc(100vh - 70px);
  ;
}


.homepage_container {
  height: 100%;

  .homepage_header {
    height: 70px;

    .collapse-btn {
      display: flex;
      align-items: center;
      position: relative;
    }

    .collapse-btn::before {
      position: absolute;
      content: '';
      width: 1.2px;
      height: 35%;
      background-color: #000;
      opacity: .3;
      left: -6px;
      cursor: default;
    }
  }

  .homepage_menu {
    position: absolute;
    top: 70px;
    left: 0;
    bottom: 0;
    width: 250px;
    background-color: beige;
  }

  .homepage_content {
    position: absolute;
    top: 70px;
    right: 0;
    left: 250px;
    bottom: 0;
  }
}

.el-main {
  --el-main-padding: 0px;
}

.main-wrap {
  margin: 18px;
}
</style>