<!--  -->
<template>
  <div class="blog_container">
    <div class="main">
      <el-row :gutter="24" justify="center">
        <el-col :md="18" :xl="20" :sm="22" :xs="22">
          <el-card class="blog_list" v-infinite-scroll="handleScroll">
            <router-view></router-view>
          </el-card>
        </el-col>
        <el-col :md="6" class="hidden-sm-and-down">
          <el-affix position="top" :offset="70">
            <el-card class="sidebar">
              <header>
                <span class="left">🌈推荐标签</span>
                <span class="right">
                  <el-button link type="primary" @click="getRandomTag(14)">
                    <el-icon>
                      <Refresh />
                    </el-icon>
                    换一批
                  </el-button>
                </span>
              </header>
              <ul>
                <li v-for="(item, index) in randomTag" :key="index + '_' + item.value">
                  <el-button round size="small" @click="clickTag(item.value)">{{ item.label }}</el-button>
                </li>
              </ul>
            </el-card>
          </el-affix>

        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script lang='ts' setup>
import { reactive, toRefs, onMounted, inject, Ref, computed, provide, watch } from 'vue'
import { getTagList } from '@/request/api'
import { useRouter } from 'vue-router';
import 'element-plus/theme-chalk/display.css'

const router = useRouter();

const state = reactive<{
  tagList: TagListItem[];
  randomTag: TagListItem[];
}>({
  tagList: [],
  randomTag: []
})

const { tagList, randomTag } = toRefs(state);

const getMdLabel = computed(() => (value: string): TagListItem[] => {
  return tagList.value.filter(e => JSON.parse(value).includes(e.value))
})
provide('getLabel', getMdLabel)

//
onMounted(async () => {
  await getTagList().then(res => {
    if (res.code === 200) {
      tagList.value = res.data
    }
  }).catch((err) => {
    console.log('[catch]:', err);
  })
})

//随机推荐标签
watch(tagList, () => {
  getRandomTag(14)
})

const getRandomTag = (count: number) => {
  const result: TagListItem[] = [];
  var i = tagList.value.length, min = i - count, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    result.push(tagList.value[index])
  }
  randomTag.value = result
}
//点击标签 搜索相关的文章
const clickTag = (value: number) => {
  router.push({
    name: 'searchBlog',
    query: {
      label: value
    }
  })
}

const handleScroll = () => {
  console.log('scroll');

}

</script>
<style lang='less' scoped>
.blog_container {
  height: 100%;
  padding: 20px 0 0 0;
  background-color: #f4f5f5;

  .main {
    max-width: 1024px;
    margin: 0 auto;

    .blog_list {
      margin-bottom: 20px;
    }
  }
}

.sidebar {
  header {
    padding: 0 0 12px;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
    font-size: 14px;
    line-height: 1.29;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;

    .left {
      color: #333;
    }
  }

  ul {
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    justify-content: space-evenly;
    align-items: center;
    row-gap: 14px;
  }

  ul>li {
    margin-right: 4px;
  }
}
</style>