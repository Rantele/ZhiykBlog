<!--  -->
<template>
  <div class="edit_container">
    <el-header class="header-wrap">
      <div class="editorHeader">
        <input placeholder="输入文章标题..." spellcheck="false" maxlength="80" class="title-input" v-model="editData.title" />
        <div class="right-box">
          <el-button class="with-padding publish-btn" type="primary" @click="onSubmit">发布</el-button>
          <el-avatar class="with-padding" :src="'/path/user/avatar/' + store.state.img" :size="32" />
        </div>
      </div>
    </el-header>
    <el-main class="main_editor">
      <mavon-editor ref="editorRef" class="mavon_editor" @imgDel="imgDel" v-model="editData.content" :scrollStyle="true"
        :ishljs="true" @imgAdd="imgAdd" />
    </el-main>
  </div>
  <el-dialog v-model="dialogVisible" :before-close="dialogClose">
    <el-form ref="editFormRef" :model="editData" label-width="120px" :rules="rules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="editData.title" />
      </el-form-item>
      <el-form-item label="文章标签">
        <el-select v-model="editDataLabel" multiple placeholder="请选择" style="width: 240px" filterable
          :multiple-limit="3" :reserve-keyword="false">
          <el-option v-for="item in labels" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-upload ref="coverRef" action="" :limit=1 :auto-upload="false" v-model:file-list="coverList"
          :on-change="onCoverchange" list-type="picture-card" :on-exceed="handleCoverExceed"
          :on-remove="handleCoverOnRemove" accept="image/jpeg,image/png">
          <el-icon>
            <IEpPlus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modify">{{ isCreate ? '确认发布' : '确认修改' }}</el-button>
        <el-button @click="dialogClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, watch, computed, onMounted } from 'vue'
import store from '@/store';
import { useRouter, useRoute } from 'vue-router';
import { uploadMdImg, deleteMdImg, createMd, updateMd, getUserMd, getTagList } from '@/request/api'
import { ElMessage, UploadProps, UploadRawFile, UploadFile, UploadFiles, UploadUserFile, genFileId, FormInstance } from 'element-plus';
import 'element-plus/es/components/message/style/css'

const route = useRoute();
const router = useRouter();
// 用户本人的文章数据 

//存放编辑的文章
const state = reactive<{
  editData: MdDataObj;
  isCreate: boolean;
  dialogVisible: boolean;
  coverList: UploadUserFile[];
}>({
  editData: {
    title: '',
    abstract: '',
    cover: '',
    label: '[]',
    blogid: -1,
    content: '',
  },
  isCreate: true,
  dialogVisible: false,
  coverList: [],
})

const labels = ref<TagListItem[]>()

const editDataLabel = computed({
  get() {
    return JSON.parse(editData.value.label as string)
  },
  set(newValue) {
    editData.value.label = JSON.stringify(newValue)
  }
})

const { editData, isCreate, dialogVisible, coverList } = toRefs(state)
onMounted(() => {
  console.log(route.query.create);
  console.log(route.params);

  if (route.query.create !== 'true' && route.params.id !== '') {
    //修改文章
    isCreate.value = false;
    //获取文章的信息
    getUserMd(route.params.id as string).then((res) => {
      if (res.code === 200) {
        editData.value = res.data
        if (res.data.cover) {
          coverList.value = [{ name: res.data.cover, url: '/path/user/md/img/' + res.data.cover }]
        }
      }
    }).catch(err => {
      console.log('[catch]:', err);
    })
  }
  getTagList().then(res => {
    if (res.code === 200) {
      labels.value = res.data
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
})

const editorRef = ref();
const editFormRef = ref<FormInstance>()

//图片上传事件
const imgAdd = (filename: string, imgfile: File) => {
  const formData = new FormData();
  formData.append('imgfile', imgfile);
  uploadMdImg(formData).then((res) => {
    if (res.code === 200) {
      console.log(res.data);
      editorRef.value.$img2Url(filename, '/path/user/md/img/' + res.data)
    }
  }).catch((err) => {
    console.log('[catch]:', err);
  })
}
//删除图片事件
const imgDel = (filename: string) => {
  //获取上传的图片并删除
  const deleteImg = filename[0].split('/').at(-1)
  deleteMdImg({ img: deleteImg as string }).catch(err => {
    console.log('[catch]:', err);
  })
}


// 除去标题部分，截取200个字用来显示
const getabstract = computed(() => {
  return editorRef.value.d_render.replace(/<[^>]*>/g, "").replace(/\n/g, "").slice(0, 100);
})

//保存
const onSubmit = () => {
  if (!editData.value.content || !editData.value.title) {
    ElMessage.error('文章标题和内容不能为空');
  } else {
    //允许保存文章
    dialogVisible.value = true;
  }
}

//弹窗操作

//校验规则
const rules = reactive({
  title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
})

//确认提交操作
const coverRef = ref()
const modify = () => {
  editFormRef.value?.validate()
    .then(() => {
      //验证通过
      editData.value.abstract = getabstract.value;
      if (isCreate.value) {
        //新建操作
        createMd(editData.value).then((res) => {
          if (res.code === 200) {
            //创建成功
            ElMessage.success('新建文章成功')
            dialogVisible.value = false;
            setTimeout(() => {
              router.back()
            }, 1000)
          }
        }).catch(err => {
          console.log('[catch]:', err);
          ElMessage.error('创建失败')

        })
      } else {
        //修改操作
        console.log('修改文章');
        updateMd(editData.value).then((res) => {
          if (res.code === 200) {
            //修改成功
            ElMessage.success('修改成功')
            dialogVisible.value = false;
            setTimeout(() => {
              router.back()
            }, 1000)
          }
        }).catch(err => {
          console.log('[catch]:', err);
          ElMessage.error('修改失败')
        })
      }
    }).catch((err) => {
      console.log('[catch]:', err);
    })

}

//关闭弹窗
const dialogClose = () => {
  dialogVisible.value = false;
  editFormRef.value?.clearValidate()
}

//替换上传封面
const handleCoverExceed: UploadProps['onExceed'] = (files) => {
  coverRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  coverRef.value!.handleStart(file)
}
//移除上传文件
const handleCoverOnRemove = async (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  await deleteMdImg({ img: editData.value.cover as string }).catch(err => {
    console.log('[catch]:', err);
    ElMessage.error('删除封面失败')
  })
}

//改变上传封面
const onCoverchange: UploadProps['onChange'] = async (uploadFile: any, uploadFiles) => {
  let fileExe = ['jpg', 'png'].indexOf(uploadFile.name.replace(/.+\./, "").toLowerCase()) !== -1
  if (!fileExe || !(uploadFile.size / 1024 < 500)) {
    //上传的图片不符合条件
    coverRef.value!.clearFiles()
    ElMessage.error('仅支持jpg/png格式的图片且大小不能超过500kb')
  } else {
    // 上传封面
    const formData = new FormData();
    formData.set('imgfile', uploadFile.raw, uploadFile.name);
    if (editData.value.cover !== '') {
      await deleteMdImg({ img: editData.value.cover as string }).catch(err => {
        console.log('[catch]:', err);
        ElMessage.error('删除旧封面失败')
      })
    }
    await uploadMdImg(formData).then((res) => {
      if (res.code === 200) {
        console.log(res);
        editData.value.cover = res.data as string;
      }
    }).catch(err => {
      console.log('[catch]:', err);
      ElMessage.error('上传封面失败')
    })
  }

}


</script>
<style lang='less' scoped>
.edit_container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-main {
    --el-main-padding: 0px;
  }

  .header-wrap {
    border-bottom: 1px solid #ddd;
    height: 60px;
  }

  .editorHeader {
    display: flex;
    align-items: center;
    height: 100%;

    .title-input {
      flex: 1 1 auto;
      height: 100%;
      margin: 0;
      padding: 0;
      font-size: 24px;
      font-weight: 500;
      color: #1d2129;
      border: none;
      outline: none;
    }

    .right-box {
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: end;
      justify-content: flex-end;

      .with-padding {
        margin-left: 8px;
        margin-right: 8px;
      }

      .publish-btn {
        background-color: #1d7dfa;
      }
    }
  }

  .main_editor {
    height: calc(100vh - 61px);

    .mavon_editor {
      height: 100%;
    }
  }
}
</style>