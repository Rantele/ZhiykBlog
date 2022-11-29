<!--  -->
<template>
    <el-dialog v-model="visible" :title="title" :before-close="close">
        <el-form ref="formRef" :rules="rules" hide-required-asterisk label-position="top" :model="form"
            :label-width="formLabelWidth">
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="newForm.nickname" autocomplete="off" />
            </el-form-item>
            <el-form-item label="姓名" prop="realname">
                <el-input v-model="newForm.realname" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="newForm.email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="分配权限">
                <el-select v-model="roles" multiple placeholder="请分配权限" @change="handleSelectChange"
                    style="width: 240px">
                    <el-option v-for="item in selectList" :key="item.value" :label="item.name" :value="item.value" />
                    <el-option label="超级管理员" :value="selectList.map(e => e.value).join(',')" />
                </el-select>
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
import { reactive, toRefs, ref, watch, computed, onMounted } from 'vue'
import { FormInstance } from 'element-plus'

// import { updateAdmin } from '@/request/api'

const formRef = ref<FormInstance>()

const props = defineProps<{
    visible: boolean;
    form: AdminObjItf;
    selectList: {
        id: number;
        name: string;
        value: string;
    }[]
}>()
const state = reactive<{
    formLabelWidth: string;
    newForm: AdminObjItf;
    roles: string[];
    title: string;
}>({
    formLabelWidth: '120px',
    newForm: {},
    roles: [],
    title: ''
})

const { formLabelWidth, newForm, roles, title } = toRefs(state);

//校验规则
const rules = reactive({
    nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
    realname: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
    email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
})


//监听表单数据
watch(() => props.form, () => {
    newForm.value = { ...props.form }
    let titleRes = '';
    if (Object.keys(newForm.value).length === 0) {
        titleRes = '添加'
    } else {
        titleRes = '编辑'
    }
    title.value = titleRes + '管理员信息'
    const _role = props.form.roles?.split(',').filter(e => e !== '0') || []
    const isSuperAdmin = props.selectList.every((val) => _role.includes(val.value))
    //如果有全部权限则为超级管理员
    if (isSuperAdmin) {
        //超级管理员
        roles.value = [props.selectList.map(e => e.value).join(',')]
    } else {
        const filterRes = props.selectList.filter(e => _role.includes(e.value)).map(e => e.value)
        roles.value = filterRes
    }

})


//处理显示权限
const handleSelectChange = (val: string[]) => {
    const sp_val = props.selectList.map(e => e.value).join(',')
    const sp_index = val.indexOf(sp_val)
    if (val.length === 0) {
        roles.value = []
    } else {
        //新添加的是超级管理员选项
        if (val.at(-1) == sp_val) {
            //点击添加的是超级管理员，只显示超级管理员
            roles.value = [sp_val]
        } else {
            //新添加的不是超级管理员
            //移除超级管理员选项
            if (sp_index > -1) {
                val.splice(sp_index, 1)
            }
            console.log('be change', val);
            //添加其他管理员除普通管理员都有带有普通管理员
            if (val.indexOf('1') === -1 && val.at(-1) !== '1') {
                val.unshift('1')
            }
            //当全部管理员被选是即为超级管理员
            if (props.selectList.every((e) => val.includes(e.value))) {
                roles.value = [sp_val]
            } else {
                roles.value = val
            }
        }
    }





}

const emit = defineEmits<{
    (event: 'close', reload?: number): void
    (event: 'modifyAdmin'): void
}>();
//点击关闭
const close = (reload?: number) => {
    //传到父组件
    emit('close', reload);
    if (!formRef.value) return
    formRef.value.clearValidate()
}
//点击确认
const modifyAdmin1 = () => {
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

//点击确认
const modifyAdmin = async () => {
    if (!formRef.value) return
    await formRef.value.validate((valid, fields) => {
        if (valid) {
            //将权限重新赋值
            let roles_list: string[] = ['0']
            roles_list.push(...roles.value)
            console.log([...new Set(roles_list)].join(','));

            newForm.value.roles = [...new Set(roles_list)].join(',') //去重
            console.log(newForm.value);

            // updateBlogVersionHistory(newForm.value).then(res => {
            //     close(res.code)
            // }).catch((err) => { close() })
        }
    })

}

</script>
<style lang='less' scoped>

</style>