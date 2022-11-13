<!--  -->
<template>
  <div class="wrap">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-for="(banner, index) in data" :key="index"
        style="padding:0px">
        <el-card class="masonry" @click="clickDeleteIcon">
          <img class="masonry_item" :src="'/path/index/banners/img/' + banner.img" @click.stop="viewImg(index)"
            :_index="index" />
        </el-card>

      </el-col>
    </el-row>
  </div>



  <el-image-viewer v-if="ImageViewerVisible" @close="closeViewer" :url-list="[imgUrl]" hide-on-click-modal />

  <el-dialog v-model="deleteDialogVisible" title="删除确认框" width="30%" :before-close="closeDialogVisible">
    <span>确认要删除吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialogVisible">取消</el-button>
        <el-button type="danger" @click="modify">
          确认删除
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, computed, watch, onMounted } from 'vue'
import { ElImage } from 'element-plus';
import { deleteBanner } from '@/request/api'
import store from '@/store';
const props = defineProps<{ data: BannerObj[] }>()

const state = reactive<{
  deleteDialogVisible: boolean;
  ImageViewerVisible: boolean;
  srcList: string[];
  imgUrl: string;
  deleteData: {
    id: number;
    img: string;
  };
}>({
  deleteDialogVisible: false,
  ImageViewerVisible: false,
  srcList: [],
  imgUrl: '',
  deleteData: {
    id: -1,
    img: '',
  },
})

const { deleteDialogVisible, ImageViewerVisible, srcList, imgUrl, deleteData } = toRefs(state);


const emit = defineEmits<{
  (event: 'closeDeleteDialog', reload?: number): void
}>()




//点击全屏预览图片
function viewImg(index: number) {
  ImageViewerVisible.value = true;
  imgUrl.value = srcList.value[index];
  return false
}
//关闭图片预览事件
const closeViewer = () => {
  imgUrl.value = '';
  ImageViewerVisible.value = false
}
//点击删除冒泡事件
function clickDeleteIcon(e: any) {
  if (e.target.className !== "el-image masonry_item") {
    return false;
  } else {
    const deleteIndex = e.target.children[0].attributes._index.value
    deleteData.value = {
      id: props.data[deleteIndex].id,
      img: props.data[deleteIndex].img
    }
    deleteDialogVisible.value = true;
  }
}
//关闭删除弹窗
const closeDialogVisible = (reload?: number) => {
  console.log('close dialog');
  deleteDialogVisible.value = false;
  deleteData.value = {
    id: -1,
    img: ''
  }
  emit('closeDeleteDialog', reload);
}
//确认删除
const modify = () => {
  console.log('确认删除');
  console.log(deleteData.value);
  deleteBanner(deleteData.value).then((res) => {
    closeDialogVisible(res.code);
  })
}

</script>
<style lang='less' scoped>
:deep(.el-card__body) {
  padding: 0px;
}

.wrap {
  padding: 0 12px;
}

.masonry {
  position: relative;
  margin: 10px 10px;


  .masonry_item {
    width: 100%;
  }
}

.masonry:hover::after {
  position: absolute;
  display: block;
  top: 0px;
  right: 0px;
  content: 'x';
  line-height: 32px;
  text-align: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;

}
</style>