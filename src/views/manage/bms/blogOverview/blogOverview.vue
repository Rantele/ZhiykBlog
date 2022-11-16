<!--  -->
<template>
  <div>
    <el-card class="total-overview">
      <template #header>
        <div class="card-header">
          <div class="title">文章信息概述</div>
          <div class="right">
            <el-date-picker v-model="calendarData" :clearable="false" :editable="false" type="daterange"
              @change="calendarChange" format="YYYY/MM/DD" value-format="YYYY-MM-DD HH:mm:ss" :shortcuts="shortcuts"
              :disabled-date="disabledDate"
              :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]" />
          </div>
        </div>
      </template>
      <div class="content">
        <el-row :gutter="24" justify="center">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6">
            <el-row class="card-overview" :gutter="24">
              <el-col class="card-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <el-card>
                  <div class="title">今日新增文章数量</div>
                  <div class="content" style="color: #3498db;">60</div>
                </el-card>
              </el-col>
              <el-col class="card-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <el-card>
                  <div class="title">文章总数量</div>
                  <div class="content" style="color: #2ecc71;">160</div>
                </el-card>
              </el-col>
              <el-col class="card-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <el-card>
                  <div class="title">待审核文章数量</div>
                  <div class="content" style="color: #e67e22;">12</div>
                </el-card>
              </el-col>
              <el-col class="card-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <el-card>
                  <div class="title">未通过文章数量</div>
                  <div class="content" style="color: #c0392b;">5</div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
            <div class="pie" style="height: 300px">
              <Pie :id="'pie1'" :data="data" />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="total-overview">
      <template #header>
        <div class="card-header">
          <div class="title">博客列表</div>
          <div class="right">
            <el-select v-model="label" placeholder="请选择" style="width: 240px" filterable :reserve-keyword="false">
              <el-option v-for="item in labelList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
      </template>
      <div class="content">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="12">
            <div class="bar" style="height: 400px">
              <el-scrollbar style="height: 100%;">
                <el-table :data="byLabelMdData" stripe style="width: 100%">
                  <el-table-column prop="id" label="ID" width="80" />
                  <el-table-column prop="title" label="标题" />
                  <el-table-column prop="nickname" label="作者" />
                  <el-table-column prop="create_time" label="创建时间" />
                </el-table>
              </el-scrollbar>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="12">
            <div class="bar" style="height: 400px">
              <Bar :id="'bar1'" :data="labelBarData" />
            </div>
          </el-col>

        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, computed, onMounted, watch } from 'vue'
import Pie from '../components/Pie.vue'
import Bar from '../components/Bar.vue'
import { getBlogStatistics, getTagList, getBlogFilterStatistics } from '@/request/api'

// state
const state = reactive<{
  data: {}[];
  show: boolean;
  calendarData: string[];
  byLabelMdData: byLabelMdData[];
  label: number;
}>({
  data: [],
  show: false,
  calendarData: [
    `${new Date().getFullYear()}-${new Date().getMonth() - 2}-${new Date().getDate()} 00:00:00`,
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`
  ],
  byLabelMdData: [],
  label: 19
})
const { data, show, calendarData, byLabelMdData, label } = toRefs(state);

//watch
watch(label, () => {
  getBlogFilterStatistics({ label: label.value }).then((res: any) => {
    if (res.code === 200) {
      byLabelMdData.value = res.data
    }
  })
})

const labelBarData = computed(() => {
  var now = new Date();
  let result: { [key: string]: number } = {};
  for (var i = 0; i < 12; i++) {
    var month: number = now.getMonth() + 1;
    let index: string = now.getFullYear() + "-" + (month < 10 ? "0" + month : month + '')
    result[index] = 0;
    now.setMonth(now.getMonth() - 1);
  }
  byLabelMdData.value.forEach((e) => {
    if (e?.date && result.hasOwnProperty(e?.date)) {
      result[e.date] += 1
    }
  })
  return result
})

// getBlogStatistics
getBlogStatistics({ startDate: calendarData.value[0], endDate: calendarData.value[1] }).then((res: any) => {
  if (res.code === 200) {
    data.value = res.data
  }
})
// getBlogStatistics
getBlogFilterStatistics({ label: label.value }).then((res: any) => {
  if (res.code === 200) {
    byLabelMdData.value = res.data
  }
})


//日期快捷选择
const shortcuts = [
  {
    text: '近7天',
    value: () => {
      const end = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      const date = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()} 00:00:00`
      return [date, end]
    },
  },
  {
    text: '近30天',
    value: () => {
      const end = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      const date = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()} 00:00:00`
      return [date, end]
    },
  },
  {
    text: '近3个月',
    value: () => {
      const end = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      const date = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()} 00:00:00`
      return [date, end]
    },
  },
]
//disable unInvalid Date
const disabledDate = (time: any) => {
  if (calendarData.value[0]) {
    const maxTime = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`).getTime()
    return time.getTime() < 0 || time.getTime() > maxTime
  } else {
    return false
  }
}

// 触发日期改变事件
const calendarChange = () => {
  console.log('change');
  getBlogStatistics({ startDate: calendarData.value[0], endDate: calendarData.value[1] }).then((res: any) => {
    if (res.code === 200) {
      data.value = res.data
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
  show.value = true;

}

const labelList = ref<TagListItem[]>()
onMounted(() => {
  getTagList().then(res => {
    if (res.code === 200) {
      labelList.value = res.data
    }
  })
})


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
  margin-bottom: 16px;

  .content {
    .card-overview {
      justify-content: center;
      height: 100%;
      width: 100%;
    }

    .el-card {
      // max-width: 90%;
      min-height: 120px;
      // height: 80%;
    }

    .card-item {
      font-size: 16px;

      .title {
        font-size: .8rem;
        font-weight: 600;
        color: #0a0a0a
      }

      .content {
        font-size: 2rem;
        margin-top: 20px;
        text-align: center;

      }

    }
  }
}
</style>