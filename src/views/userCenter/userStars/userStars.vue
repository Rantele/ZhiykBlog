<!--  -->
<template>
  <div class="blog-container">
    <el-card>
      <template #header>
        <div class="header">
          <span>收藏列表({{ starDataList.length }})</span>
          <el-input class="search" placeholder="请输入标题关键字">
            <template #suffix>
              <el-link :underline="false">
                <el-icon class="el-input__icon">
                  <IEpsearch />
                </el-icon>
              </el-link>
            </template>
          </el-input>
        </div>
      </template>
      <BlogItem v-loading="loading" v-for="(item, index) in starDataList" :index="index" :key="item.title" :data="item"
        @click="goBlogDetail(item.blogid as number, item)" @delete="deletePostStar" />
    </el-card>
  </div>
  <el-dialog v-model="deleteDialogVisible" title="确定删除此文章吗" width="30%" :before-close="handleDeleteDialogClose">
    <span>删除后此文章将被从当前收藏集中移除</span>
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
import { reactive, toRefs, ref, onMounted, computed, provide } from 'vue'
import BlogItem from './components/BlogItem.vue'
import { getStarPostList, deleteStar, getTagList } from '@/request/api'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css'

const router = useRouter();

const state = reactive<{
  starDataList: MdPostObj[],
  loading: boolean;
  deleteDialogVisible: boolean;
  deleteData: {
    id: number;
    blogid: number;
    index: number;
  };
  tagList: TagListItem[];
}>({
  starDataList: [],
  loading: true,
  deleteDialogVisible: false,
  deleteData: {
    id: -1,
    blogid: -1,
    index: -1,
  },
  tagList: []
})

const { starDataList, loading, deleteDialogVisible, deleteData, tagList } = toRefs(state)
const getMdLabel = computed(() => (value: string): TagListItem[] => {
  return tagList.value.filter(e => JSON.parse(value).includes(e.value))
})
provide('getLabel', getMdLabel)

onMounted(async () => {
  await getStarPostList().then(res => {
    if (res.code === 200) {
      starDataList.value = res.data
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
  await getTagList().then(res => {
    if (res.code === 200) {
      tagList.value = res.data
    }
  }).catch((err) => {
    console.log('[catch]:', err);
  })
  loading.value = false;
})

//点击item 跳转到文章详情页
const goBlogDetail = (blogid: number, item: MdPostObj) => {
  router.push({ name: 'detailBlog', params: { id: blogid }, query: { postid: item.id } })
}



//点击删除按钮
const deletePostStar = (id: number, blogid: number, index: number) => {
  deleteDialogVisible.value = true;
  deleteData.value.id = id;
  deleteData.value.blogid = blogid;
  deleteData.value.index = index;
  console.log(id, blogid);
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
  deleteStar({ postid: deleteData.value.blogid }).then((res) => {
    if (res.code === 200) {
      starDataList.value.splice(deleteData.value.index, 1);
    }
  }).catch(err => {
    console.log('[catch]:', err);
    ElMessage.error('取消收藏失败,请稍后再试');
  })
  deleteDialogVisible.value = false;
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