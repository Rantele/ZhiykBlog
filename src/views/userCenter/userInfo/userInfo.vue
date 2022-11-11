<!--  -->
<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="2">
          <el-avatar :size="92" v-if="!userData.img" :src="defaultAvatar" />
          <el-avatar :size="92" v-else :src="'/path/user/avatar/'+userData.img" />
        </el-col>
        <el-col :span="16">
          <div class="username" style="font-size: 1.2rem;font-weight: 500;line-height: 40px;">
            {{ userData.nickname }}
          </div>
          <div class="small-tag">
            <el-tag :type="codeTagType" round>
              <el-icon class="tag-icon">
                <IEpMedal />
              </el-icon>
              码龄：{{ getCreateAge }}
            </el-tag>
          </div>
          <div class="small-tag">
            <el-tag effect="plain" round>
              <el-icon class="tag-icon">
                <IEpIphone />
              </el-icon>
              {{ userData?.phone }}
            </el-tag>
          </div>
          <div class="small-tag">
            <el-tag effect="plain" round>
              <el-icon class="tag-icon">
                <IEpMessage />
              </el-icon>
              {{ userData?.email }}
            </el-tag>
          </div>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="card-header-title">基本信息</span>
        </div>
      </template>
      <div>
        <el-form label-position="right" label-width="100px">
          <template v-for="(value,key, index) in mapData">
            <el-form-item :label="value">
              <SwitchEditStatus ref="sesRefs" :editShow="unEdit.includes(key as string) ? false : true"
                :hidden="key === 'password'" :validatorRules="userEditRules[key]? userEditRules[key] : null"
                :value="userData[key] ? userData[key] : ''" />
              <!-- @submit="updateUserInfo($event, key, index)" -->
            </el-form-item>
          </template>

        </el-form>
      </div>
    </el-card>
  </div>
  <!-- <el-dialog v-model="updateUserInfoDialog.visible" width="30%">
    <span>确认要修改 <span style="color: red;">{{ updateUserInfoDialog.content }}</span> 吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateUserInfoDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="updateUserInfoClick">确认修改</el-button>
      </span>
    </template>
  </el-dialog> -->
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, computed, watch, onMounted } from 'vue'
import { getUserInfo } from '@/request/api'
import { useStore } from 'vuex';
import defaultAvatar from '@/assets/defaultAvatar.png'
import SwitchEditStatus from './components/SwitchEditStatus.vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';
const store = useStore();
const unEdit = ['create_time'];

//state
const state = reactive<{
  userData: UserDataObj;
  mapData: {
    [key: string | number]: string;
  };
  codeTagType: string;
}>({
  userData: {},
  mapData: {
    nickname: '用户名',
    password: '密码',
    email: '邮箱',
    phone: '手机号',
    realname: '姓名',
    gender: '性别',
    brithday: '出生日期',
    create_time: '注册日期'
  },
  codeTagType: 'info',
})

const { userData, mapData, codeTagType } = toRefs(state);

//
onMounted(() => {
  getUserInfo().then((res) => {
    if (res.code === 200) {
      userData.value = res.data[0]
      userData.value.nickname = store.state.nickname
      userData.value.img = store.state.img
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
})

const Textvalidate = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('内容不能为空！'));
  }
  if (value.length > 8) {
    callback(new Error('昵称最大长度不能超过8位'))
  }
  callback()
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空！'));
  }
  //使用正则表达式进行验证密码
  if (value.length < 6) {
    callback(new Error('密码不能小于6位！'));
  }
  callback()
}
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('手机号不能为空！'));
  }
  //使用正则表达式进行验证手机号码
  if (!/^1[3456789]\d{9}$/.test(value)) {
    callback(new Error('手机号不正确！'));
  }
  callback()
}
const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('邮箱不能为空！'));
  }
  //使用正则表达式进行验证邮箱
  if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
    callback(new Error('邮箱不正确！'));
  }
  callback()
}
const userEditRules = ref<{
  [key: string | number]: any
}>({
  nickname: Textvalidate,
  password: validatePassword,
  email: validateEmail,
  phone: validatePhone,
})

const getCreateAge = computed(() => {
  const createDate = new Date(userData.value.create_time as string);
  const diffTime = Date.now() - createDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 12))
  if (diffDays < 30) {
    codeTagType.value = 'success'
    return diffDays + '天'
  } else if (diffDays < 365) {
    codeTagType.value = ''
    return Math.floor(diffDays / 30) + '月'
  } else {
    codeTagType.value = 'danger'
    return Math.floor(diffDays / (12 * 30)) + '年'
  }
})

// //修改用户信息
// const updateUserInfoDialog = ref({
//   visible: false,
//   visibleIndex: null,
//   content: '',
//   type: '',
//   data: ''
// })
// const updateUserInfo = (data, key, index) => {
//   updateUserInfoDialog.value.visible = true;
//   updateUserInfoDialog.value.visibleIndex = index;
//   updateUserInfoDialog.value.content = userData.value[key].name;
//   updateUserInfoDialog.value.type = key;
//   updateUserInfoDialog.value.data = data;
// }
// // 自定义手机号验证规则

// const sesRefs = ref([])
// function updateUserInfoClick() {
//   axios({
//     url: '/path/user/api/updateUserInfo',
//     method: 'post',
//     headers: { Authorization: localStorage.getItem("Authorization") },
//     data: {
//       type: updateUserInfoDialog.value.type, //获取字段名
//       data: updateUserInfoDialog.value.data//获取修改后的值
//     }
//   }).then((req) => {
//     if (req.data.code === 200) {
//       store.dispatch('setUserInfoItem', req.data.data);
//     }
//     ElMessage({
//       type: req.data.type,
//       message: req.data.msg
//     })
//     updateUserInfoDialog.value.visible = false;
//     sesRefs.value[updateUserInfoDialog.value.visibleIndex].colseEdit();
//   })
//   //数据验证
//   //修改数据不能为空
//   //格式验证
//   //获取对应的修改类型
//   //昵称


// }

</script>
<style lang='less' scoped>
.wrap {
  padding: 0px 20px;
}

.box-card {
  margin-bottom: 16px;
  margin-top: 20px;
}

.card-header-title {
  font-weight: 600;
}

.small-tag {
  margin-top: 8px;
}

.tag-icon {
  vertical-align: text-bottom !important;
}

.username {
  position: relative;

}
</style>