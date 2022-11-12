<!--  -->
<template>
  <div class="blog-container">
    <el-card>
      <template #header>
        <div class="header">
          <span>文章管理({{ dataList.length }})</span>
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
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div style="padding:10px 20px">
            <el-skeleton-item variant="text" style="width: 40%;margin-bottom: 12px;" />
            <el-skeleton-item variant="text" style="width: 100%;margin-bottom: 12px;" />
            <el-skeleton-item variant="text" style="width: 80%;margin-bottom: 12px;" />
            <el-skeleton-item variant="text" style="width: 60%" />
          </div>

        </template>
        <template #default>
          <template v-if="dataList.length > 0">
            <BlogItem v-for="(item, index) in dataList" :index="index" :key="item.title" :data="item"
              @delete="deleteBlog" />
          </template>
          <template v-else>
            <el-empty />
          </template>
        </template>
      </el-skeleton>

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
import { getUserMdList, deleteMd } from '@/request/api'
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css'

const state = reactive<{
  dataList: MdPostObj[];
  deleteDialogVisible: boolean;
  deleteData: {
    id: number;
    blogid: number;
    index: number;
  };
  loading: boolean;
  searchVal: string;
}>({
  dataList: [],
  deleteDialogVisible: false,
  deleteData: {
    id: -1,
    blogid: -1,
    index: -1,
  },
  loading: true,
  searchVal: ''
})

const { dataList, deleteDialogVisible, deleteData, loading, searchVal } = toRefs(state)

onMounted(async () => {
  //init->SearchVal
  // searchVal.value = '';
  await getUserMdList().then((res) => {
    if (res.code === 200) {
      dataList.value = res.data
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
      dataList.value.splice(deleteData.value.index, 1);
    }
  }).catch(err => {
    console.log('[catch]:', err);
    ElMessage.error('删除失败');
  })
  deleteDialogVisible.value = false;

}

//搜索文章操作
const handleSearch = async () => {
  loading.value = true;
  await getUserMdList({ search: searchVal.value }).then((res) => {
    if (res.code === 200) {
      dataList.value = res.data
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
  padding: 0px 20px;

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
  padding: 0px;
}
</style>