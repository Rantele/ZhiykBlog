<!--  -->
<template>
  <div class="affix-container">
    <el-row :gutter="24">
      <el-col :span="16">
        <el-card style="min-height:600px">
          审核文章
          <el-result v-if="overviewData.examine === 0" style="width:100%;margin-top: 15%;" icon="success" title="全部审核完毕"
            sub-title="辛苦你啦，年底给你加薪哦🤞">
          </el-result>
          <el-descriptions v-else title="审核文章" :column="3" :size="size" border>
            <template #extra>
              <el-button type="primary">Operation</el-button>
            </template>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <user />
                  </el-icon>
                  用户名
                </div>
              </template>
              kooriookami
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <Clock />
                  </el-icon>
                  创建时间
                </div>
              </template>
              2022-11-30
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <CollectionTag />
                  </el-icon>
                  文章标签
                </div>
              </template>
              <el-tag size="small">School</el-tag>
              <el-tag size="small">School</el-tag>
              <el-tag size="small">School</el-tag>
              <el-tag size="small">School</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <Tickets />
                  </el-icon>
                  文章标题
                </div>
              </template>
              No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div style="margin-bottom:20px;display: flex;justify-content: space-between;">
            <span>审核概况</span>
            <span>
              <el-tag effect="dark" type="danger" v-if="overviewData.examine as number > 100">{{ overviewData.examine
              }} 待审核</el-tag>
              <el-tag effect="dark" type="warning" v-else-if="overviewData.examine as number > 0">{{
                  overviewData.examine
              }} 待审核</el-tag>
              <el-tag type="success" v-else>无待审核</el-tag>
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
        <el-affix target=".affix-container" :offset="200">
          <div class="addfix-item">
            <button class="addfix-btn" title="审核通过">
              <el-icon :size="24">
                <Check />
              </el-icon>
              审核通过
            </button>
          </div>
          <div class="addfix-item">
            <button class="addfix-btn" title="不通过">
              <el-icon :size="24">
                <Close />
              </el-icon>
              不通过
            </button>
          </div>
          <div class="addfix-item">
            <el-button class="addfix-btn" title="跳过">
              <el-icon :size="24">
                <Finished />
              </el-icon>
              暂不评审
            </el-button>
          </div>
        </el-affix>
      </el-col>
    </el-row>
  </div>

</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, computed } from 'vue'
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

const size = ref('')
const iconStyle = computed(() => {
  const marginMap: { [key: string]: string } = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})
const blockMargin = computed(() => {
  const marginMap: { [key: string]: string } = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})

</script>
<style lang='less' scoped>
.cell-item {
  display: flex;
  align-items: center;
}



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

//侧边固定按钮
.addfix-item {
  width: 120px;
  height: 56px;
  transition: .3s;
  margin: 28px 0;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  position: relative;



  .addfix-btn {
    width: 100%;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    transition: .1s;
    font-weight: 500;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    -webkit-appearance: none;
    border: 1px solid #dcdfe6;
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 4px;
  }
}


.addfix-item::after {
  position: absolute;
  top: 50%;
  left: -3px;
  content: '';
  border-bottom: 10px solid transparent;
  border-top: 10px solid transparent;
  transform: translate(-50%, -50%);
  transition: .1s;
  transition-duration: 0.1s;
  transition-timing-function: ease;
  transition-delay: 0s;
  transition-property: all;
}

.addfix-item:nth-of-type(1)::after {
  border-right: 10px solid #67c23a;
}

.addfix-item:nth-of-type(2)::after {
  border-right: 10px solid #e6a23c;
}

.addfix-item:nth-of-type(3)::after {
  border-right: 10px solid #409eff;
}

.addfix-item:nth-of-type(1):hover>.addfix-btn {
  background-color: #95d475;
}

.addfix-item:nth-of-type(1):hover::after {
  border-right: 10px solid #95d475;
}

.addfix-item:nth-of-type(2):hover>.addfix-btn {
  background-color: #eebe77;
}

.addfix-item:nth-of-type(2):hover::after {
  border-right: 10px solid #eebe77;
}

.addfix-item:nth-of-type(3):hover>.addfix-btn {
  background-color: #79bbff;
}

.addfix-item:nth-of-type(3):hover::after {
  border-right: 10px solid #79bbff;
}

.addfix-item:nth-of-type(1):active>.addfix-btn {
  background-color: #529b2e;
}

.addfix-item:nth-of-type(1):active::after {
  border-right: 10px solid #529b2e;
}

.addfix-item:nth-of-type(2):active>.addfix-btn {
  background-color: #b88230;
}

.addfix-item:nth-of-type(2):active::after {
  border-right: 10px solid #b88230;
}

.addfix-item:nth-of-type(3):active>.addfix-btn {
  background-color: #337ecc;
}

.addfix-item:nth-of-type(3):active::after {
  border-right: 10px solid #337ecc;
}

.addfix-item:nth-of-type(1) .addfix-btn {
  color: #fff;
  border-color: #67c23a;
  background-color: #67c23a;
}

.addfix-item:nth-of-type(2) .addfix-btn {
  color: #fff;
  border-color: #E6A23C;
  background-color: #E6A23C;
}

.addfix-item:nth-of-type(3) .addfix-btn {
  color: #fff;
  border-color: #409EFF;
  background-color: #409EFF;
}
</style>