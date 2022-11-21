<!--  -->
<template>
  <div class="affix-container">
    <el-row :gutter="24">
      <el-col :span="16" :class="{ 'loaded': loaded }">
        <el-card class="audit-container stamp" :data-content="auditCheckStatus.content"
          :style="{ '--data-color': auditCheckStatus.color }">
          <template v-if="overviewData.examine === 0 && auditMdListData">
            <span class="header">审核文章</span>
            <el-result class="empty-content" icon="success" title="全部审核完毕" sub-title="辛苦你啦，年底给你加薪哦🤞">
            </el-result>
          </template>
          <el-descriptions class="audit-content" v-else title="审核文章" :column="3" border>
            <template #extra>
              <el-button type="primary">操作</el-button>
            </template>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon class="label-icon">
                    <user />
                  </el-icon>
                  用户名
                </div>
              </template>
              <span v-if="currentBlog.header">{{ currentBlog.header.nickname }}</span>

            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon class="label-icon">
                    <Clock />
                  </el-icon>
                  创建时间
                </div>
              </template>
              <span v-if="currentBlog.header">{{ currentBlog.header.create_time }}</span>

            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon class="label-icon">
                    <CollectionTag />
                  </el-icon>
                  文章标签
                </div>
              </template>
              <el-tag class="label-tag" size="small">School</el-tag>
              <el-tag class="label-tag" size="small">School</el-tag>
              <el-tag class="label-tag" size="small">School</el-tag>
              <el-tag class="label-tag" size="small">School</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon class="label-icon">
                    <Tickets />
                  </el-icon>
                  文章标题
                </div>
              </template>
              <span v-if="currentBlog.header">{{ currentBlog.header.title }}</span>
            </el-descriptions-item>
          </el-descriptions>
          <div class="">
            <mavon-editor ref="detailRef" :editable="false" defaultOpen="preview" :toolbarsFlag="false"
              :subfield="false" class="mavon_editor" previewBackground="#fff" :boxShadow="false"
              v-model="currentBlog.body" :ishljs="true" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="audit-overview-card">
          <div class="audit-overview-header">
            <span>审核概况</span>
            <el-badge :value="overviewData.examine" :max="99" :hidden="overviewData.examine === 0" title="待审核文章">
              <el-button link>
                <el-icon :size="20">
                  <Bell />
                </el-icon>
              </el-button>
            </el-badge>
          </div>
          <el-row class="audit-over-content" :gutter="24" justify="space-around">
            <el-col :span="12">
              <el-progress v-if="overviewData.compelete_rate" type="dashboard"
                :percentage="(overviewData.compelete_rate as number) * 100">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                  <span class="percentage-label">审核完成度</span>
                </template>
              </el-progress>
            </el-col>
            <el-col :span="12">
              <el-progress v-if="overviewData.pass_rate" type="dashboard"
                :percentage="(overviewData.pass_rate as number) * 100" status="success">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                  <span class="percentage-label">审核通过率</span>
                </template>
              </el-progress>
            </el-col>
          </el-row>
        </el-card>
        <el-affix class="sidebar-btn" target=".affix-container" :offset="80">
          <div class="addfix-item audit-pass">
            <button class="addfix-btn" title="通过" @click="handleAuditPass">
              <el-icon :size="20">
                <Check />
              </el-icon>
              审核通过
            </button>
          </div>
          <div class="addfix-item audit-nopass">
            <button class="addfix-btn" title="不通过" @click="handleAuditNoPass">
              <el-icon :size="20">
                <Close />
              </el-icon>
              审核不通过
            </button>
          </div>
          <div class="addfix-item audit-recheck">
            <button class="addfix-btn" title="重新审核" @click="handleAuditReCheck">
              <el-icon :size="20">
                <RefreshLeft />
              </el-icon>
              重新审核
            </button>
          </div>
          <div class="addfix-item audit-back">
            <button class="addfix-btn" title="返回上一个" @click="handleAuditBack">
              <el-icon :size="20">
                <DArrowLeft />
              </el-icon>
              返回上篇
            </button>
          </div>
        </el-affix>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, watch } from 'vue'
import { getBlogAuditOverviewData, getAuditMdDataList, getMdContent } from '@/request/api'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

const state = reactive<{
  overviewData: overviewData;
  auditCheckStatus: {
    status: number,
    content: string;
    color: string;
  }
  auditMdListData: MdPostObj[];
  currentBlog: {
    id: number;
    body: string;
    header: MdPostObj
  };
}>({
  overviewData: {},
  auditCheckStatus: {
    status: -1,
    content: '',
    color: ''
  },
  auditMdListData: [],
  currentBlog: {
    id: -1,
    body: '',
    header: {}
  }
})
const { overviewData, auditCheckStatus, auditMdListData, currentBlog } = toRefs(state)

watch(() => currentBlog.value.id, () => {
  if (currentBlog.value.id > 0) {
    getMdContent(currentBlog.value.id).then(res => {
      currentBlog.value.body = res.data.body
      currentBlog.value.header = auditMdListData.value[currentBlog.value.id]
    }).catch(err => {
      console.log('[catch]:', err);
    })
  }
})

onMounted(() => {
  //获取概况信息
  getBlogAuditOverviewData().then(res => {
    if (res.code === 200) {
      overviewData.value = res.data
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
  //获取待审核文章列表
  getAuditMdDataList().then(res => {
    if (res.code === 200) {
      auditMdListData.value = res.data
      if (res.data.length > 0) {
        currentBlog.value.id = res.data[0].blogid as number
        currentBlog.value.header = res.data[0]
      }
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
})



const loaded = ref<boolean>(false)

//处理审核通过
const handleAuditPass = () => {
  if (auditCheckStatus.value.status !== 1) {
    loaded.value = false
    ElMessage.success('审核通过')
    auditCheckStatus.value = {
      status: 1,
      content: '审核通过',
      color: '#67C23A'
    }
    setTimeout(() => {
      loaded.value = true
    }, 300)
  }
}


//处理审核不通过
const handleAuditNoPass = () => {
  if (auditCheckStatus.value.status !== 0) {
    loaded.value = false
    ElMessage.error('审核不通过')
    auditCheckStatus.value = {
      status: 0,
      content: '审核不通过',
      color: '#F56C6C'
    }
    setTimeout(() => {
      loaded.value = true
    }, 300)
  }
}


//处理重新审核
const handleAuditReCheck = () => {
  if (auditCheckStatus.value.status !== -1) {
    loaded.value = false
    ElMessage.warning('重新审查')
    setTimeout(() => {
      auditCheckStatus.value = {
        status: -1,
        content: '',
        color: ''
      }
    }, 300)

  }
}
//处理返回上篇
const handleAuditBack = () => {
  loaded.value = false
  ElMessage.warning('返回上篇')
}

</script>
<style lang='less' scoped>
.audit-container {
  min-height: 600px;
  position: relative;

  .header {
    color: #303133;
    font-size: 16px;
    font-weight: 700;
  }

  .empty-content {
    width: 100%;
    margin-top: 15%;
  }

  .audit-content {
    z-index: 222;

    .cell-item {
      display: flex;
      align-items: center;

      .label-icon {
        margin-right: 6px;
      }
    }

    .label-tag+.label-tag {
      margin-left: 10px;
    }
  }
}

.affix-container {
  position: relative;
}



.audit-overview-card {
  .audit-overview-header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .audit-over-content {
    text-align: center;

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
  }
}

.sidebar-btn {
  position: relative;

  //侧边固定按钮
  .addfix-item {
    width: 120px;
    height: 48px;
    transition: .3s;
    margin: 24px 0;
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
    border-right: 10px solid;
    transform: translate(-50%, -50%);
    transition: .1s;
    transition-duration: 0.1s;
    transition-timing-function: ease;
    transition-delay: 0s;
    transition-property: all;
  }


  .audit-pass .addfix-btn {
    color: #fff;
    border-color: #67c23a;
    background-color: #67c23a;
  }

  .audit-nopass .addfix-btn {
    color: #fff;
    border-color: #F56C6C;
    background-color: #F56C6C;
  }

  .audit-recheck .addfix-btn {
    color: #fff;
    border-color: #409EFF;
    background-color: #409EFF;
  }

  .audit-back .addfix-btn {
    color: #626266;
    border-color: #dcdfe6;
    background-color: #ffffff;
  }

  .audit-pass::after {
    border-right-color: #67c23a;
  }

  .audit-nopass::after {
    border-right-color: #F56C6C;
  }

  .audit-recheck::after {
    border-right-color: #409eff;
  }

  .audit-back::after {
    border-right-color: #fff;
  }

  .audit-pass:hover .addfix-btn {
    background-color: #95d475;
    border-color: #95d475;
  }

  .audit-pass:hover::after {
    border-right-color: #95d475;
  }

  .audit-nopass:hover .addfix-btn {
    background-color: #f89898;
    border-color: #f89898;
  }

  .audit-nopass:hover::after {
    border-right-color: #f89898;
  }

  .audit-recheck:hover .addfix-btn {
    background-color: #79bbff;
    border-color: #79bbff;
  }

  .audit-recheck:hover::after {
    border-right-color: #79bbff;
  }

  .audit-back:hover .addfix-btn {
    background-color: #ecf5ff;
    border-color: #c6e2ff;
    color: #409eff;
  }

  .audit-back:hover::after {
    border-right-color: #ecf5ff;
  }


  .audit-pass:active .addfix-btn {
    background-color: #529b2e;
    border-color: #529b2e;
  }

  .audit-pass:active::after {
    border-right-color: #529b2e;
  }

  .audit-nopass:active .addfix-btn {
    background-color: #c45656;
    border-color: #c45656;
  }

  .audit-nopass:active::after {
    border-right-color: #c45656;
  }

  .audit-recheck:active .addfix-btn {
    background-color: #337ecc;
    border-color: #337ecc;
  }

  .audit-recheck:active::after {
    border-right-color: #337ecc;
  }

  .audit-back:active .addfix-btn {
    background-color: #ecf5ff;
    border-color: #409eff;
    color: #409eff;
  }

  .audit-back:active::after {
    border-right-color: #ecf5ff;
  }
}


.stamp {
  &::after {
    border: solid 5px;
    border-color: var(--data-color);
    border-radius: 8px;
    color: var(--data-color);
    content: attr(data-content);
    font-size: 50px;
    font-weight: bold;
    line-height: 1;
    position: absolute;
    padding: 10px 15px;
    margin: 0 auto;
    bottom: 5%;
    right: 15%;
    text-transform: uppercase;
    opacity: 0;
    transform-origin: 50% 50%;
    transform: rotate(-15deg) scale(5);
    transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
    z-index: 2000;
  }
}

.loaded .stamp:after {
  opacity: .75;
  transform: rotate(-15deg) scale(1);
}
</style>