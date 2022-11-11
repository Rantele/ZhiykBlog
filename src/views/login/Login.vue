<!-- 登录页面 -->
<template>
  <el-dialog v-model="visible" :before-close="close" :close-on-click-modal="false" width="30%">
    <el-form ref="LoginRef" :model="loginForm" :rules="rules" hide-required-asterisk label-width="120px"
      label-position="top">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密  码" prop="password">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%;" size="large" type="primary" @click="LoginFn()">登录</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { userLogin } from "@/request/api"
import Cookies from 'js-cookie';
const props = defineProps<{
  visible: boolean;
}>()



const loginForm = reactive({ username: "rantele@163.com", password: "123456" })

const LoginRef = ref();
const loginError = ref(false)
// const reload = inject<() => void>("reload", (): void => { });

const emit = defineEmits<{
  (event: 'close', reload?: number): void
}>();

const validatePassword = (rule: unknown, value: string | undefined, callback: (msg?: string) => void) => {
  console.log(loginError.value);
  if (!value) {
    return callback('密码不能为空')
  } else if (loginError.value) {
    loginError.value = false;
    return callback('账户或密码错误')
  } else {
    callback()
  }
}
//校验规则
const rules = reactive({
  username: [{ required: true, message: '账户不能为空', trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
})
//点击关闭
const close = (reload?: number) => {
  // ruleFormRef.value?.clearValidate()
  emit('close', reload);
}

//登录
const LoginFn = () => {
  //调用登录接口
  LoginRef.value.validate().then(() => {
    userLogin({
      "username": loginForm.username,
      "password": loginForm.password
    }).then(res => {
      console.log('res:', res);
      if (res.code === 200) {
        Cookies.set('token', res.data.tokenHead + res.data.token, { expires: 7 })

        close(200)

      }
    }).catch((err) => {
      loginError.value = true;
      LoginRef.value.validateField('password').catch(() => { })
    })
  }).catch(() => { })
}

</script>
<style lang='less' scoped>

</style>