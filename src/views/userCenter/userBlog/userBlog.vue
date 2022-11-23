<!--  -->
<template>
  <div class="blog-container">
    <el-card>
      <template #header>
        <div class="header">
          <el-button link @click="clearSearch">文章管理</el-button>
          <el-input class="search" v-model="searchVal" placeholder="请输入标题关键字" @keyup.enter="handleSearch">
            <template #suffix>
              <el-button link @click="handleSearch">
                <el-icon :size="16">
                  <Search />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </div>
      </template>
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
        <el-tab-pane name="total">
          <template #label>
            <span>全部({{ totalDataList.length }})</span>
          </template>
          <el-skeleton :loading="loading" animated>
            <template #template>
              <el-skeleton-item variant="text" style="width: 40%;margin-bottom: 12px;" />
              <el-skeleton-item variant="text" style="width: 100%;margin-bottom: 12px;" />
              <el-skeleton-item variant="text" style="width: 80%;margin-bottom: 12px;" />
              <el-skeleton-item variant="text" style="width: 60%" />
            </template>
            <template #default>
              <template v-if="totalDataList.length > 0">
                <BlogItem v-for="(item, index) in totalDataList" :index="index" :key="item.title" :data="item"
                  @delete="deleteBlog" />
              </template>
              <template v-else>
                <el-empty />
              </template>
            </template>
          </el-skeleton>
        </el-tab-pane>
        <el-tab-pane label="待审核" name="audit">
          <el-skeleton :loading="loading" animated>
            <template #template>
              <el-skeleton-item variant="text" style="width: 40%;margin-bottom: 12px;" />
              <el-skeleton-item variant="text" style="width: 100%;margin-bottom: 12px;" />
              <el-skeleton-item variant="text" style="width: 80%;margin-bottom: 12px;" />
              <el-skeleton-item variant="text" style="width: 60%" />
            </template>
            <template #default>
              <template v-if="auditDataList.length > 0">
                <BlogItem v-for="(item, index) in auditDataList" :index="index" :key="item.title" :data="item"
                  @delete="deleteBlog" />
              </template>
              <template v-else>
                <el-empty />
              </template>
            </template>
          </el-skeleton>
        </el-tab-pane>
        <el-tab-pane label="未通过" name="nopass">
          <el-skeleton :loading="loading" animated>
            <template #template>
              <el-skeleton-item variant="text" style="width: 40%;margin-bottom: 12px;" />
              <el-skeleton-item variant="text" style="width: 100%;margin-bottom: 12px;" />
              <el-skeleton-item variant="text" style="width: 80%;margin-bottom: 12px;" />
              <el-skeleton-item variant="text" style="width: 60%" />
            </template>
            <template #default>
              <template v-if="noPassDataList.length > 0">
                <BlogItem v-for="(item, index) in noPassDataList" :index="index" :key="item.title" :data="item"
                  @delete="deleteBlog" />
              </template>
              <template v-else>
                <el-empty />
              </template>
            </template>
          </el-skeleton>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
  <el-dialog v-model="deleteDialogVisible" title="删除文章" width="30%" :before-close="handleDeleteDialogClose">
    <span>删除内容后不可恢复，确定删除吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleDeleteDialogClose">取消</el-button>
        <el-button type="primary" @click="handleDeleteConfirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { reactive, toRefs, onMounted, watch } from 'vue'
import BlogItem from './components/BlogItem.vue'
import { getUserMdList, deleteMd, getUserMdNoAuditList, getUserMdNoPassList } from '@/request/api'
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css'

const state = reactive<{
  totalDataList: MdPostObj[];
  auditDataList: MdPostObj[];
  noPassDataList: MdPostObj[];
  deleteDialogVisible: boolean;
  deleteData: {
    id: number;
    blogid: number;
    index: number;
  };
  loading: boolean;
  searchVal: string;
  activeName: string;
}>({
  totalDataList: [],
  auditDataList: [],
  noPassDataList: [],
  deleteDialogVisible: false,
  deleteData: {
    id: -1,
    blogid: -1,
    index: -1,
  },
  loading: true,
  searchVal: '',
  activeName: 'total'
})

const { totalDataList, auditDataList, noPassDataList, deleteDialogVisible, deleteData, loading, searchVal, activeName } = toRefs(state)


//点击tab事件
const handleClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 800)
}

onMounted(async () => {
  await getUserMdList().then((res) => {
    if (res.code === 200) {
      totalDataList.value = res.data
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
  await getUserMdNoAuditList().then(res => {
    if (res.code === 200) {
      auditDataList.value = res.data
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
  await getUserMdNoPassList().then(res => {
    if (res.code === 200) {
      noPassDataList.value = res.data
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
  setTimeout(() => {
    loading.value = false;
  }, 500)
})

//点击删除按钮
const deleteBlog = (id: number, blogid: number, index: number) => {
  deleteDialogVisible.value = true;
  deleteData.value.id = id;
  deleteData.value.blogid = blogid;
  deleteData.value.index = index;
}

//关闭删除提示框
const handleDeleteDialogClose = () => {
  deleteData.value.id = -1;
  deleteData.value.blogid = -1;
  deleteData.value.index = -1;
  deleteDialogVisible.value = false;
}

//确认删除操作
const handleDeleteConfirm = () => {
  deleteMd(deleteData.value).then((res) => {
    if (res.code === 200) {
      ElMessage.success('删除成功');
      if (activeName.value === 'total') {
        totalDataList.value.splice(deleteData.value.index, 1);
      } else if (activeName.value === 'audit') {
        auditDataList.value.splice(deleteData.value.index, 1);
      } else if (activeName.value === 'nopass') {
        noPassDataList.value.splice(deleteData.value.index, 1);
      }
    }
  }).catch(err => {
    console.log('[catch]:', err);
    ElMessage.error('删除失败');
  })
  deleteDialogVisible.value = false;
}

const clearSearch = async () => {
  loading.value = true;
  searchVal.value = ''
  activeName.value = 'total'
  await getUserMdList().then((res) => {
    if (res.code === 200) {
      totalDataList.value = res.data
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
  setTimeout(() => {
    loading.value = false;
  }, 500)
}

//搜索文章操作
const handleSearch = async () => {
  loading.value = true;
  activeName.value = 'total'
  await getUserMdList({ search: searchVal.value }).then((res) => {
    if (res.code === 200) {
      totalDataList.value = res.data
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
  setTimeout(() => {
    loading.value = false;
  }, 500)
}
</script>
<style lang='less' scoped>
.blog-container {
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search {
      width: 240px;
      height: 32px;
      margin-right: 20px;
    }
  }
}

:deep(.el-card__body) {
  padding: 6px 18px;
}
</style>