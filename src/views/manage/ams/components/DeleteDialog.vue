<!--  -->
<template>
    <el-dialog v-model="visible" title="删除确认框" width="30%" :before-close="close">
        <span>确认要删除吗？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="danger" @click="modify">
                    确认删除
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang='ts' setup>
import { deleteBlogVersionHistory } from '@/request/api'


const props = defineProps<{
    visible: boolean;
    data: { id: number, parentId: number }
}>()

const emit = defineEmits<{
    (event: 'close', reload?: number): void
}>();

//点击关闭
const close = (reload?: number) => {
    emit('close', reload);
}
//点击确认
const modify = async () => {
    await deleteBlogVersionHistory({ id: props.data.id }).then((res) => {
        close(res.code);
    }).catch((err) => { close() })
}


</script>
<style lang='less' scoped>

</style>