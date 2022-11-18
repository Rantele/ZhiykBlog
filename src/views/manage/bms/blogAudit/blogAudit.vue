<!--  -->
<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="16">
        <el-card>
          asdasd
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div style="margin-bottom:20px;display: flex;justify-content: space-between;">
            <span>审核概况</span>
            <span>
              <el-tag class="ml-2" type="danger">{{ overviewData.examine
              }} 待审核</el-tag>
            </span>
          </div>
          <el-row :gutter="24" justify="space-around">
            <el-col :span="12" style="text-align: center;">
              <el-progress type="dashboard" :percentage="(overviewData.compelete_rate as number) * 100">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                  <span class="percentage-label">审核完成度</span>

                </template>
              </el-progress>
            </el-col>
            <el-col :span="12" style="text-align: center;">
              <el-progress type="dashboard" :percentage="(overviewData.pass_rate as number) * 100" status="success">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                  <span class="percentage-label">审核通过率</span>
                </template>
              </el-progress>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>
  </div>

</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getBlogAuditOverviewData } from '@/request/api'

const state = reactive<{
  overviewData: overviewData
}>({
  overviewData: {}
})
const { overviewData } = toRefs(state)

onMounted(() => {
  //获取概况信息
  getBlogAuditOverviewData().then(res => {
    if (res.code === 200) {
      overviewData.value = res.data
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
})

</script>
<style lang='less' scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  color: #606266;

}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>