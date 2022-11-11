<template>
    <div class="websites">
        <el-row :gutter="24" justify="center" style="margin-left: 0px; margin-right: 0px;">
            <el-col :span="18">
                <el-skeleton :loading="loading" animated>
                    <template #template>
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <el-skeleton-item variant="h1" style="width: 30%;" />
                                </div>
                            </template>
                            <el-skeleton :rows="4" />
                        </el-card>
                    </template>
                    <template #default>
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <el-icon class="icon" size="24px">
                                        <slot name="websiteTitleIcon"></slot>
                                    </el-icon>
                                    <span class="icon-content">
                                        <slot name="websiteTitle"></slot>
                                    </span>
                                </div>
                            </template>
                            <slot name="websiteContent">
                            </slot>
                        </el-card>
                    </template>
                </el-skeleton>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const timer = setInterval(function () {
    // 判断文档和所有子资源(图片、音视频等)已完成加载
    if (document.readyState === 'complete') {
        //执行方法
        loading.value = false
        window.clearInterval(timer)
    }
}, 100)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.websites {
    margin-bottom: 20px;
}

.icon {
    vertical-align: text-bottom;
}

.icon-content {
    margin-left: 5px;
    font-size: larger;
}
</style>
