<!--  -->
<template>
    <el-dialog v-model="visible" title="Shipping address" :before-close="colse">
        <el-form :model="form">
            <el-form-item>
                <el-select multiple v-model="roles" placeholder="Please select a zone">
                    <el-option v-for="role in form.roleLists" :label="role.name" :value="role.id" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="colse">取消</el-button>
                <el-button type="primary" @click="updateRole">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, watch } from 'vue'
// import { updateAdminRole } from '@/request/api'

const roles = ref<number[]>([]);

const props = defineProps<{
    visible: boolean;
    form: AdminRoleFormData;
}>();

const emits = defineEmits<{
    (event: 'colse'): void;
}>();

watch(() => props.form.userRoles, () => {
    roles.value = props.form.userRoles?.map(item => item.id);
})

const colse = () => {
    emits('colse');
}

const updateRole = () => {
    // updateAdminRole({ adminId: props.form.adminId, roleIds: roles.value.join(',') }).then(res => {
    //     if (res.code === 200) {
    //         colse();
    //     }
    // })
}
</script>
<style lang='less' scoped>

</style>