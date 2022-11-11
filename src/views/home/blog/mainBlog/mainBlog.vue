<!--  -->
<template>
  <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
    <el-tab-pane label="推荐" name="recommend">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <el-skeleton-item variant="text" style="width: 40%;margin-bottom: 12px;" />
          <el-skeleton-item variant="text" style="width: 100%;margin-bottom: 12px;" />
          <el-skeleton-item variant="text" style="width: 80%;margin-bottom: 12px;" />
          <el-skeleton-item variant="text" style="width: 60%" />
        </template>
        <template #default>
          <BlogItem v-for="(item, index) in recommendList" :key="index + '_' + item.title" :data="item"
            @click="goBlogDetail(item.blogid as number, item)" />
        </template>
      </el-skeleton>
    </el-tab-pane>
    <el-tab-pane label="最新" name="latest">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <el-skeleton-item variant="text" style="width: 40%;margin-bottom: 12px;" />
          <el-skeleton-item variant="text" style="width: 100%;margin-bottom: 12px;" />
          <el-skeleton-item variant="text" style="width: 80%;margin-bottom: 12px;" />
          <el-skeleton-item variant="text" style="width: 60%" />
        </template>
        <template #default>
          <BlogItem v-for="(item, index) in latestList" :key="index + '_' + item.title" :data="item" />
        </template>
      </el-skeleton>
    </el-tab-pane>
    <el-tab-pane label="热榜" name="hot">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <el-skeleton-item variant="text" style="width: 40%;margin-bottom: 12px;" />
          <el-skeleton-item variant="text" style="width: 100%;margin-bottom: 12px;" />
          <el-skeleton-item variant="text" style="width: 80%;margin-bottom: 12px;" />
          <el-skeleton-item variant="text" style="width: 60%" />
        </template>
        <template #default>
          <template v-if="hotList.length > 0">
            <BlogItem v-for="(item, index) in hotList" :key="index + '_' + item.title" :data="item" />
          </template>
          <template v-else>
            <el-empty description="最近没有热门文章,写篇文章登上热门吧" />
          </template>
        </template>
      </el-skeleton>

    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, inject, Ref } from 'vue'
import BlogItem from '../components/BlogItem.vue'
import { getRecommendList, getLatestList, getHotList, getTagList } from '@/request/api'
import { useRouter } from 'vue-router';

const router = useRouter();
//标签页
const activeName = ref('recommend')
//过渡动画状态
const loading = ref<boolean>(true);
const state = reactive<{
  recommendList: MdPostObj[];
  latestList: MdPostObj[];
  hotList: MdPostObj[];
  tagList: TagListItem[];
}>({
  recommendList: [],
  latestList: [],
  hotList: [],
  tagList: [],
})

const { recommendList, latestList, hotList, tagList } = toRefs(state);

//
onMounted(async () => {
  await getRecommendList().then((res) => {
    if (res.code === 200) {
      recommendList.value = res.data
    }
  }).catch((err) => {
    console.log('[catch]:', err);
  })
  await getLatestList().then((res) => {
    if (res.code === 200) {
      latestList.value = res.data
    }
  }).catch((err) => {
    console.log('[catch]:', err);
  })
  await getHotList().then((res) => {
    if (res.code === 200) {
      hotList.value = res.data
    }
  }).catch((err) => {
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

//点击tab事件
const handleClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 800)
}

//点击item 跳转到文章详情页
const toLogin = inject('toLogin') as Ref<boolean>
const hasLogin = inject('hasLogin') as Ref<boolean>
const Login = () => {
  toLogin.value = true
}

const goBlogDetail = (blogid: number, item: MdPostObj) => {
  if (!hasLogin.value) {
    Login()
    return;
  }
  router.push({ name: 'detailBlog', params: { id: blogid }, query: { postid: item.id } })
}

</script>
<style lang='less' scoped>

</style>