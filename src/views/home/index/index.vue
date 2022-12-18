<!--  -->
<template>
  <div class="home">
    <el-carousel class="home-carousel hidden-xs-only" height="500px" :interval="5000">
      <div class="affix-container bg-secondary">
        <h1 class="tagline">知音库</h1>
        <p class="sub_main">这是博客笔记和在线工具分享的聚集地</p>
      </div>
      <template v-for="(item, index) in store.state.banners">
        <el-carousel-item v-if="item.location === 'home_banner'" :key="index">
          <el-image style="width: 100%;height: 500px" :src="'/path/index/banners/img/' + item.img" fit="cover" />
        </el-carousel-item>
      </template>
    </el-carousel>
    <el-divider style="margin-top: 0px" />
    <div v-for="(card, index) in store.getters.getNewWebsite" :key="index">
      <WebSites>
        <template #websiteTitleIcon>
          <el-image :src="'/path/index/websites/img/' + card.icon"></el-image>
        </template>
        <template #websiteTitle>{{ card.title }}</template>
        <template #websiteContent>
          <el-row :gutter="24">
            <el-col v-for="item in card.children" :key="item.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="6"
              style="margin-bottom:20px">
              <a :href="item.link" style="display: block;text-decoration: none;color:#409EFF;">
                <el-card>
                  <div class="webitem">
                    <div class="webitem-header">
                      <el-image class="webitem-img" :src="'/path/index/websites/img/' + item.icon">
                      </el-image>
                      <span class="webitem-title">
                        {{ item.title }}
                      </span>
                    </div>
                    <small class="webitem-abstract">{{ item.description }}</small>
                  </div>
                </el-card>
              </a>
            </el-col>
          </el-row>
        </template>
      </WebSites>
    </div>

  </div>

</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, computed } from 'vue'
import store from '@/store';
import WebSites from './WebSites.vue';
import 'element-plus/theme-chalk/display.css'

// import axios from "axios"

// const card_data = ref([])
// const card_items = ref([])
// const bannerData = ref([])
// const done = ref(false)
// const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']

// //axios 请求数据
// function getCardData() {
//   return axios.get('/home/api/getcard')
// }
// function getCardItem() {
//   return axios.get('/home/api/getitem')
// }
// function getBanner() {
//   return axios.get('/home/api/getBanner', {
//     params: {
//       name: 'home_banner',
//     }
//   })
// }
// axios.all([getCardData(), getCardItem(), getBanner()])
//   .then(axios.spread(function (carData_resp, cardItem_resp, banner_resp) {
//     card_data.value = carData_resp.data.list;
//     card_items.value = cardItem_resp.data.list;
//     bannerData.value = banner_resp.data.list;

//   })).then(() => {
//     done.value = true;
//   })

// const resCardItems = computed(() => {
//   return (id) => {
//     return card_items.value.filter(
//       function (e) {
//         return e.card_id == id
//       }
//     )
//   }
// })
</script>
<style lang='less' scoped>
.block {
  width: 192px;
  height: 45px;
  background-color: cornflowerblue;
}

.home-carousel {
  position: relative;
}

.affix-container {
  position: absolute;
  z-index: 1;
  text-align: center;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  .tagline {
    font-size: 5rem;
    font-weight: 900;
    letter-spacing: -1.5px;
    max-width: 960px;
    margin: 0 auto;
    color: #213547;
    background: -webkit-linear-gradient(-45deg, #0184ff 25%, #d900ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .sub_main {
    font-size: 36px;
    font-weight: 600;
    line-height: 2;
    background: -webkit-linear-gradient(315deg, #0fd253 25%, #00b7ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.affix-container h1,
p {
  margin: 0;
  padding: 0;
}

// webicon-item
.webitem {
  display: flex;
  flex-direction: column;

  .webitem-header {
    display: flex;
    align-items: center;

    .webitem-img {
      flex: 3;
      width: 30%;
      max-width: 32px;
      min-width: 16px;
    }

    .webitem-title {
      flex: 7;
      font-size: 1.1em;
      font-weight: 530;
      margin-left: 6px;
    }
  }

  .webitem-abstract {
    color: #606266;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    margin-top: 12px;
  }
}
</style>