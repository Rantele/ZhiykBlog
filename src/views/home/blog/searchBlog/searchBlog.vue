<!--  -->
<template>
  <div>
    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="text" style="width: 40%;margin-bottom: 12px;" />
        <el-skeleton-item variant="text" style="width: 100%;margin-bottom: 12px;" />
        <el-skeleton-item variant="text" style="width: 80%;margin-bottom: 12px;" />
        <el-skeleton-item variant="text" style="width: 60%" />
      </template>
      <template #default>
        <div class="header">搜索结果</div>
        <template v-if="searchData.length > 0">
          <BlogItem v-for="(item, index) in searchData" :key="index + '_' + item.id" :data="item"
            @click="goBlogDetail(item.blogid as number, item)" :search="search" />
        </template>
        <template v-else>
          <el-empty description="没有帮您找到想要搜索的内容🥺" />
        </template>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, watch, inject, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSearchMdData } from '@/request/api'
import BlogItem from '../components/BlogItem.vue'

const route = useRoute();
const router = useRouter();

//state
const state = reactive<{
  search: string;
  label: string;
  searchData: MdPostObj[];
}>({
  search: '',
  label: '',
  searchData: []
})
const { search, label, searchData } = toRefs(state);
const loading = ref<boolean>(true);

//route
watch(route, async (to, form) => {
  if (to.name === 'searchBlog' && form.name === 'searchBlog') {
    loading.value = true;
    //获取label（blog页面sidebar的标签项）相关的数据
    label.value = route.query.label ? route.query.label as string : '';
    //获取search（TODO:topbar上的搜索框）搜索的文章相关的数据
    search.value = route.query.search ? route.query.search as string : '';
    await getSearchMdData({ label: label.value, search: search.value }).then(res => {
      if (res.code === 200) {
        searchData.value = res.data;
      }
    }).catch(err => {
      console.log('[catch]:', err);
    })
    setTimeout(() => {
      loading.value = false;
    }, 500)
  }
})
onMounted(async () => {
  if (route.query.label || route.query.search) {
    //获取label（blog页面sidebar的标签项）相关的数据
    label.value = route.query.label ? route.query.label as string : '';
    //获取search（TODO:topbar上的搜索框）搜索的文章相关的数据
    search.value = route.query.search ? route.query.search as string : '';
    await getSearchMdData({ label: label.value, search: search.value }).then(res => {
      if (res.code === 200) {
        searchData.value = res.data;
      }
    }).catch(err => {
      console.log('[catch]:', err);
    })
  }
  setTimeout(() => {
    loading.value = false;
  }, 500)
})
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
.header {
  margin-bottom: 12px;
}
</style>