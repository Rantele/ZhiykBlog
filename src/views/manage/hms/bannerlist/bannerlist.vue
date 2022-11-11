<!--  -->
<template>
  <div>
    <el-upload ref="upload" class="upload" drag :show-file-list="false" :before-upload="beforeBannerUpload"
      :http-request="uploadBannerFile">
      <el-icon class="el-icon--upload">
        <IEpupload-filled />
      </el-icon>
      <div class="el-upload__text">
        将图片拖放到此处或 <em>点击上传</em>
      </div>
      <div class="el-upload__text" style="margin-top:10px">
        接收jpg/png格式文件并且文件不能大于1MB
      </div>
    </el-upload>
  </div>
  <el-card class="BannerFall card">
    <div class="header">
      <span><strong>首页轮播图列表
        </strong></span>
    </div>
    <div class="text" style="height:600px;">
      <BannerWaterFall :data="bannerWaterFall" @closeDeleteDialog="closeDeleteDialog" />
    </div>
  </el-card>

</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, computed } from 'vue'
import BannerWaterFall from '../components/BannerWaterFall.vue'
import store from '@/store';
import { createBanner } from '@/request/api'
import { UploadInstance, UploadProps, ElMessage, UploadRequestOptions } from 'element-plus';
import 'element-plus/es/components/message/style/css'

//上传ref
const upload = ref<UploadInstance>()

const bannerWaterFall = computed(() => {
  return [...store.state.banners]
})


const beforeBannerUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('图片必须为JPG/PNG格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 1) {
    ElMessage.error('图片大小不能超过1MB!')
    return false
  }
  return true
}

const uploadBannerFile = (param: UploadRequestOptions) => {
  console.log(param.file);
  const uploadFile = param.file;
  const formData = new FormData();
  formData.set('bannerfile', uploadFile, uploadFile.name);
  createBanner(formData).then((res) => {
    if (res.code === 200) {
      ElMessage.success('上传成功');
      store.dispatch('getBanners').catch((err) => {
        console.log('[cathc]:', err);
      })
    } else {
      ElMessage.error('上传失败')
    }
  }).catch(err => {
    ElMessage.error('上传失败,请联系超级管理员')
  })
}

const closeDeleteDialog = (reload: any) => {
  if (!isNaN(reload)) {
    if (reload === 200) {
      ElMessage.success('删除成功')
      store.dispatch('getBanners').catch((err) => {
        console.log('[cathc]:', err);
      })
    } else {
      ElMessage.error('删除失败，请联系超级管理员')
    }
  }
}

</script>
<style lang='less' scoped>
.BannerFall {
  margin: 18px 0;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // line-height: 40px;
    margin-bottom: 14px;
  }

  .text {
    font-size: 14px;
    // overflow: auto;
  }
}
</style>