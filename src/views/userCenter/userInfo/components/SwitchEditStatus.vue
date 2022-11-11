<template>
    <div :class="{ 'eidt-show': props.editShow, 'edit-status': editStatus }">
        <span v-if="!props.hidden">
            {{props.value?props.value:'未设置'}}
        </span>
        <span v-else>
            已设置
        </span>
        <el-button class="edit-normal" link type="primary" @click="showEdit">
            <el-icon>
                <Edit />
            </el-icon>
            <slot name="edit-icon-text">编辑</slot>
        </el-button>
    </div>
    <el-form ref="formRef" :inline="true" :class="{ 'edit-status': !editStatus }" :model="formState.formDataObj"
        :rules="formState.rules">
        <el-form-item label="" prop="data">
            <el-input v-model="formState.formDataObj.data" />
        </el-form-item>
        <el-button @click="submitClick">提交</el-button>
        <el-button style="margin-left: 8px;" @click="showEdit">取消</el-button>
    </el-form>

    <!-- <div :class="{ 'edit-status': !editStatus }">
        <el-row :gutter="24">
            <el-col :span="14">
                <el-input v-model="data" />
            </el-col>
            <el-button @click="submitClick">提交</el-button>
            <el-button style="margin-left: 8px;" @click="showEdit">取消</el-button>
        </el-row>
    </div> -->

</template>
<script setup>
import { ref } from 'vue';
import { Edit } from '@element-plus/icons-vue'
const emit = defineEmits(['submit']);
const props = defineProps({
    editShow: {
        type: Boolean,
        default: () => true
    },
    value: {
        default: ''
    },
    hidden: {
        type: Boolean,
        default: () => false
    },
    validatorRules: {
        type: Function,
        default: () => { }
    }
})
const editStatus = ref(false)

const showEdit = () => {
    editStatus.value = !editStatus.value
    formState.value.formDataObj.data = props.hidden ? '' : props.value
}
const colseEdit = () => {
    editStatus.value = false
}

const formRef = ref(null);

//定义表单数据
const formState = ref({
    //表单提交数据
    formDataObj: {
        data: props.value,
    },
    //表单验证规则
    rules: {
        data: [
            { validator: props.validatorRules, trigger: 'blur' },
        ],
    }
})

const submitClick = () => {
    if (!formRef.value) return false
    formRef.value.validate((valid) => {
        if (valid) {
            emit('submit', formState.value.formDataObj.data)
        }
    })


}

defineExpose({
    colseEdit,
})
</script>
<style scoped>
.eidt-show:hover .edit-normal {
    display: unset;
}

.edit-normal {
    display: none;
    margin-left: 8px;
}

.edit-status {
    display: none;
}
</style>