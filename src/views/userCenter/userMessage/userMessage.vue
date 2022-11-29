<!--  -->
<template>
  <div>
    <el-card class="card">
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="私信" name="privateMessage" v-loading="loading">
          <div class="pane-content">
            Route1
          </div>
        </el-tab-pane>
        <el-tab-pane label="赞和收藏" name="voteStarMessage" v-loading="loading">
          <div class="pane-content">
            Route2
          </div>
        </el-tab-pane>
        <el-tab-pane label="系统消息" name="blogMessage" v-loading="loading">
          <div class="pane-content">
            Route3
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'

const loading = ref<boolean>(true);
const activeName = ref('privateMessage')

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000);
})

//点击tab事件
const handleClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000)
}

</script>
<style lang='less' scoped>
.card {
  height: 600px;

  .pane-content {
    height: 420px;
  }
}
</style>
