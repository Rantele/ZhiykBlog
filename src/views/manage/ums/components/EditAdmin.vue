<!--  -->
<template>
    <el-dialog v-model="visible" title="编辑管理员信息" :before-close="close">
        <el-form :model="form" :label-width="formLabelWidth">
            <el-form-item label="昵称">
                <el-input v-model="newForm.nickname" autocomplete="off" />
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="newForm.realname" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="newForm.email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="权限">
                <el-input v-model="newForm.roles" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="modifyAdmin">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, watch } from 'vue'
// import { updateAdmin } from '@/request/api'

const props = defineProps<{
    visible: boolean;
    form: AdminObjItf;
}>()
const state = reactive<{
    formLabelWidth: string;
    newForm: AdminObjItf
}>({
    formLabelWidth: '120px',
    newForm: {}
})

const { formLabelWidth, newForm } = toRefs(state);


//监听
watch(() => props.form, () => {
    newForm.value = { ...props.form }
})

const emit = defineEmits<{
    (event: 'close', reload?: string): void
    (event: 'modifyAdmin'): void
}>();
//点击关闭
const close = (reload?: string) => {
    //传到父组件
    emit('close', reload);
}
//点击确认
const modifyAdmin = () => {
    if (newForm.value.id) {
        // updateAdmin(newForm.value.id, newForm.value).then(res => {
        //     if (res.code === 200) {
        //         close('reload');
        //     }
        // })

        //传到父组件
        // emit('modifyAdmin');
    }


}

</script>
<style lang='less' scoped>

</style>