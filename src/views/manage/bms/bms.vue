<!--  -->
<template>
  <router-view></router-view>
</template>

<script lang='ts' setup>
import { reactive, toRefs } from 'vue'


</script>
<style lang='less' scoped>
:deep(.el-date-editor--daterange) {
  --el-date-editor-width: 220px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #0a0a0a;
  }

  .right {}
}

.total-overview {
  .content {
    .card-overview {
      height: 100%;
      width: 100%;
    }

    .el-card {
      min-width: 100%;
      height: 100%;

    }

    .card-item {
      margin: 10px 20px;
    }
  }
}
</style>