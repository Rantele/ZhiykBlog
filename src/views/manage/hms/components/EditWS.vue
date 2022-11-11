<template>
    <el-dialog v-model="visible" :title="titles" :before-close="close">
        <el-form ref="ruleFormRef" :model="newForm" status-icon :rules="rules" :label-width="formLabelWidth">
            <el-form-item label="图标" prop="uploadicon">
                <el-upload ref="upload" action="" :limit=1 :auto-upload="false" :on-change="onchange"
                    list-type="picture" :on-exceed="handleExceed" :on-remove="handleOnRemove"
                    accept="image/jpeg,image/x-icon,image/svg+xml,image/png">
                    <div v-if="props.form.icon && !uploadIcon">
                        <img :src="'/path/index/websites/img/'+props.form.icon" width="32" height="32"
                            style="float:left" />
                        <el-button type="primary" link style="margin-left: 10px;">
                            <IEpEdit />修改
                        </el-button>
                    </div>
                    <div v-else>
                        <el-button>
                            <IEpUploadFilled />上传
                        </el-button>
                    </div>
                    <div slot="tip" class="el-upload__tip">支持ico/svg/jpg/png图片</div>
                </el-upload>
            </el-form-item>
            <el-row>
                <el-col :span="10">
                    <el-form-item :label="type!==0?'标题':'类别'" prop="title">
                        <el-input v-model="newForm.title" autocomplete="off" />
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="newForm.name" autocomplete="off" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="类别" v-if="type!==0" prop="parentId">
                <el-select v-model="newForm.parentId">
                    <el-option v-for="(item,index) in select" :label="item.text" :value="item.value" :key="index" />
                </el-select>
            </el-form-item>
            <el-form-item label="网址" v-if="type!==0" prop="link">
                <el-input v-model="newForm.link" autocomplete="off" />
            </el-form-item>
            <el-form-item label="描述" v-if="type!==0" prop="description">
                <el-input v-model="newForm.description" autocomplete="off" type="textarea" />
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
import type { UploadInstance, UploadProps, UploadRawFile, UploadFile, UploadFiles, FormInstance } from 'element-plus'
import { genFileId } from 'element-plus'
import { createWSInfo, updateWSInfo } from '@/request/api'
const upload = ref<UploadInstance>()

const props = defineProps<{
    visible: boolean;
    form: any;
    type: 0 | 1;
    select: {
        text: string;
        value: number;
        type?: string;
    }[];
}>()
const state = reactive<{
    formLabelWidth: string;
    newForm: any;
    titles: string;
    multForm: FormData;
    uploadIcon: boolean;
    allowFile: boolean;
}>({
    formLabelWidth: '80px',
    newForm: {},
    titles: '',
    multForm: new FormData(),
    uploadIcon: false,
    allowFile: false
})

const { formLabelWidth, newForm, titles, multForm, uploadIcon, allowFile } = toRefs(state);


const ruleFormRef = ref<FormInstance>()

//上传图片规则
const validateIcon = (rule: unknown, value: string | undefined, callback: (msg?: string) => void) => {
    if (Object.keys(props.form).length === 0 && !uploadIcon.value) {
        return callback('图标不能为空')
    }
    if (Object.keys(props.form).length === 0 && !allowFile.value) {
        return callback('仅支持ico/svg/jpg/png格式且大小不能超过500kb')
    }
    callback()
}
const validateSelect = (rule: unknown, value: string | undefined, callback: (msg?: string) => void) => {
    if (!value && props.type !== 0) {
        callback('所属类别不能为空')
    } else {
        callback()
    }
}
//校验规则
const rules = reactive({
    title: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
    name: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
    uploadicon: [{ required: true, validator: validateIcon, trigger: 'blur' }],
    parentId: [{ required: true, validator: validateSelect, trigger: 'blur' }],
})
//监听
watch(() => props.form, () => {
    newForm.value = { ...props.form };
    let titleRes = '';
    if (newForm.value.title) {
        titleRes = '修改'
    } else {
        titleRes = '添加'
    }
    if (props.type === 0) {
        titles.value = titleRes + '网站类别'
    } else {
        titles.value = titleRes + '网站信息'
    }
})

const emit = defineEmits<{
    (event: 'close', reload?: number): void
    (event: 'modify'): void
}>();

//点击关闭
const close = (reload?: number) => {
    titles.value = ''
    multForm.value = new FormData()
    upload.value!.clearFiles()
    ruleFormRef.value?.clearValidate()
    emit('close', reload);
}

//点击确认
const modifyWS = () => {
    //如果新增 && 没有上传 返回提示 必须上传
    ruleFormRef.value?.validate().then(() => {
        for (let item in newForm.value) {
            multForm.value.append(item, newForm.value[item])
        }
        if (Object.keys(props.form).length === 0) {
            return createWSInfo(multForm.value)
        } else {
            return updateWSInfo(multForm.value)
        }
    }).then(res => {
        close(res.code);
    }).catch((err) => { })
}
//移除上传文件
const handleOnRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    uploadIcon.value = false;
    allowFile.value = false;
    ruleFormRef.value?.validateField('uploadicon').catch((err) => { })
}
//替换上传文件
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}
//改变上传文件
const onchange: UploadProps['onChange'] = (uploadFile: any, uploadFiles) => {
    let fileExe = ['jpg', 'png', 'ico', 'svg'].indexOf(uploadFile.name.replace(/.+\./, "").toLowerCase()) !== -1
    if (fileExe && uploadFile.size / 1024 < 500) {
        allowFile.value = true;
    } else {
        allowFile.value = false;
    }
    uploadIcon.value = true
    multForm.value.set('iconfile', uploadFile.raw, uploadFile.name);
    ruleFormRef.value?.validateField('uploadicon').catch((err) => { })
}

</script>
<style lang='less' scoped>

</style>