<template>
  <div class="common-layout">
    <el-container direction="vertical" style="height: 100%;">
      <el-header class="homepage_header">
        <el-menu mode="horizontal" :ellipsis="false" style="height:70px">
          <el-button link @click="goBack">
            <el-icon>
              <ArrowLeftBold />
            </el-icon>返回
          </el-button>
        </el-menu>
      </el-header>
      <el-container style="height: calc(100vh - 70px);">
        <el-aside width="null">
          <el-scrollbar>

            <el-menu class="el-menu-vertical" :default-active="$route.path" :unique-opened="true" :collapse="isCollapse"
              @open="handleOpen" @close="handleClose" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
              <template v-for="(menu, menuindex) in userCenterMenus">
                <el-sub-menu v-if="menu.children?.length !== 0" :index="'/' + menu.location + '/' + menu.name"
                  :key="menuindex">
                  <template #title>
                    <el-icon>
                      <component :is="menu.icon"></component>
                      <!-- <location /> -->
                    </el-icon>
                    <span>{{ menu.title }}</span>
                  </template>
                  <el-menu-item v-for="(submenu, index) in menu.children"
                    :index="'/' + menu.location + '/' + menu.name + '/' + submenu.name" :key="index"
                    @click="goItemComp('/' + menu.location + '/' + menu.name + '/' + submenu.name)">
                    <el-icon>
                      <component :is="submenu.icon"></component>
                      <!-- <location /> -->
                    </el-icon>
                    <span>{{ submenu.title }}</span>
                  </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="'/' + menu.location + '/' + menu.name" :key="menuindex + 1"
                  @click="goItemComp('/' + menu.location + '/' + menu.name)">
                  <el-icon>
                    <component :is="menu.icon"></component>
                    <!-- <document /> -->
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
import { Setting, User, Star, DataAnalysis, ChatLineSquare, Clock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const router = useRouter();
const store = useStore();
const isCollapse = ref(true)
//侧边导航打开
const handleOpen = (key: string, keyPath: string[]) => {
}

// 侧边导航缩小
const handleClose = (key: string, keyPath: string[]) => {
}

//鼠标移入菜单打开
const handleMouseEnter = () => {
  isCollapse.value = false;
}

const handleMouseLeave = () => {
  isCollapse.value = true;
}

const goBack = () => {
  router.back();
}

//子路由间跳转使用replace
const goItemComp = (link: any) => {
  router.replace(link)
}


const userCenterMenus = computed<NewMenus>(() => {
  let item = "0";
  for (let index in store.getters.getNewMenus) {
    if (store.getters.getNewMenus[index].name === "userCenter") {
      item = index;
      break;
    }
  }
  return store.getters.getNewMenus[item].children;
})


</script>
<style lang='less' scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-vertical {
  height: calc(100vh - 70px);
  ;
}

.common-layout {
  height: 100%;

  .homepage_header {
    height: 70px;
  }
}

.el-main {
  --el-main-padding: 0px;
}

.el-header,
.header {
  border-bottom: 1px solid var(--el-border-color);
  height: 72px;
  line-height: 72px;
  padding-left: 30px;
}


.main-wrap {
  margin: 18px;
}
</style>

