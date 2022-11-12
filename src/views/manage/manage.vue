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

          <el-button link class="collapse-btn">
            <el-icon size="20px" @click="isCollapse = !isCollapse">
              <Expand v-if="isCollapse" />
              <Fold v-else />
            </el-icon>
          </el-button>

        </el-menu>
      </el-header>
      <el-container style="height: calc(100vh - 70px);">
        <el-aside width="null">
          <el-scrollbar>
            <el-menu class="el-menu-vertical" :default-active="$route.path" :collapse="isCollapse" :unique-opened="true"
              :router="true">
              <template v-for="(menu, menuindex) in manageMenus">
                <el-sub-menu v-if="menu.children?.length !== 0" :index="'/' + menu.location + '/' + menu.name"
                  :key="menuindex">
                  <template #title>
                    <el-icon>
                      <!-- <location /> -->
                      <component :is="menu.icon"></component>
                    </el-icon>
                    <span>{{ menu.title }}</span>
                  </template>
                  <el-menu-item v-for="(submenu, index) in menu.children"
                    :index="'/' + menu.location + '/' + menu.name + '/' + submenu.name" :key="index">
                    <el-icon>
                      <!-- <location /> -->
                      <component :is="submenu.icon"></component>
                    </el-icon>
                    <span>{{ submenu.title }}</span>
                  </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="'/' + menu.location + '/' + menu.name" :key="menuindex + 1">
                  <el-icon>
                    <!-- <document /> -->
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