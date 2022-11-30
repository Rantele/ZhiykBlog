<template>
    <el-dialog v-model="visible" :before-close="close" :title="title">
        <el-form ref="formRef" :model="newForm" :rules="rules" label-position="top">
            <el-form-item label="操作类别" prop="type">
                <el-select v-model="newForm.type">
                    <el-option v-for="(item, index) in select" :label="item.name" :value="index" :key="index" />
                </el-select>
            </el-form-item>
            <el-form-item label="描述信息" prop="content">
                <el-input v-model="newForm.content" autocomplete="off" maxlength="50" placeholder="请输入描述内容"
                    show-word-limit />
            </el-form-item>
            <el-form-item label="日期" prop="time">
                <el-date-picker v-model="newForm.time" type="date" placeholder="请选择日期" value-format="YYYY-MM-DD" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="modifyWS()">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, watch, } from 'vue'
import { FormInstance } from 'element-plus'
import { createBlogVersionHistory, updateBlogVersionHistory } from '@/request/api'

const formRef = ref<FormInstance>()
const props = defineProps<{
    visible: boolean;
    form: VersionHistoryObj;
    select: {
        [key: string]: {
            color: string;
            name: string
        }
    };
}>()
const state = reactive<{
    newForm: VersionHistoryObj;
    title: string;
}>({
    newForm: {},
    title: '',
})

const { newForm, title } = toRefs(state);

//监听
watch(() => props.form, () => {
    newForm.value = { ...props.form };
    let titleRes = '';
    if (Object.keys(newForm.value).length === 0) {
        titleRes = '添加'
    } else {
        titleRes = '编辑'
    }
    title.value = titleRes + '信息'
})

//校验规则
const rules = reactive({
    type: [{ required: true, message: '类型不能为空', trigger: 'blur' }],
    content: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
    time: [{ required: true, message: '日期不能为空', trigger: 'blur' }],
})

const emit = defineEmits<{
    (event: 'close', reload?: number): void
    (event: 'modify'): void
}>();

//点击关闭
const close = (reload?: number) => {
    emit('close', reload);
    if (!formRef.value) return
    formRef.value.clearValidate()
}

//点击确认
const modifyWS = async () => {
    if (!formRef.value) return
    await formRef.value.validate((valid, fields) => {
        if (valid) {
            if (Object.keys(props.form).length === 0) {
                createBlogVersionHistory(newForm.value).then(res => {
                    close(res.code)
                }).catch((err) => { close() })
            } else {
                updateBlogVersionHistory(newForm.value).then(res => {
                    close(res.code)
                }).catch((err) => { close() })
            }
        }
    })

}

</script>
<style lang='less' scoped>

</style>