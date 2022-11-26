<template>
  <div class="about">
    <el-row :gutter="20" justify="center">
      <el-col :span="18">
        <el-card :body-style="{ padding: '0px' }" style="margin:20px 0px">
          <img class="image" src="/path/index/banners/img/aboutbanner_jpg" alt="Card image" />
          <div style="padding: 20px 40px">
            <div class="common-style">
              <h1 class="h1-style">关于本站</h1>
              <el-divider />
              <p>
                知音库博客网站主要分享个人的一些笔记，和一些常用的在线工具。
              </p>
              <p>如果您对本网站有什么建议和问题，可以通过邮箱联系我们: <span style="color: blue;">zhiyinku@163.com</span></p>
            </div>
            <div class="common-style">
              <h2>维护日志</h2>
              <p class="lead">博客网站维护日志内容如下：</p>
              <el-timeline>
                <el-timeline-item v-for="(item, index) in versionHistory" :key="index"
                  :type="typeList[item.type as string].color" :hollow="true" :timestamp="item.time">
                  {{ item.content }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
          <div class="card-footer border-top-0" style="background-color:rgb(250,158,31);height:45px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang='ts' setup>
import { reactive, toRefs, onMounted } from 'vue'
import { getBlogVersionHistory } from '@/request/api'

const state = reactive<{
  versionHistory: VersionHistoryObj[];
  typeList: {
    [key: string]: {
      color: string;
      name: string;

    }
  }
}>({
  versionHistory: [],
  typeList: {
    add: {
      color: 'success',
      name: '新增'
    },
    update: {
      color: 'primary',
      name: '修改'
    },
    maintain: {
      color: "warning",
      name: '维护'
    },
    delete: {
      color: 'danger',
      name: '删除'
    }
  }
})


const { versionHistory, typeList } = toRefs(state)

onMounted(() => {
  getBlogVersionHistory().then(res => {
    if (res.code === 200) {
      versionHistory.value = res.data
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
})

</script>

<style scoped>
.common-style {
  margin-bottom: 50px;
}

.h1-style {
  font-size: 3rem;
  font-weight: 300;
}

.image {
  width: 100%;
  display: block;
}
</style>