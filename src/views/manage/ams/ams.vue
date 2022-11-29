<!--  -->
<template>
  <el-card class="card">
    <div class="header">
      <span><strong>版本更新信息</strong></span>
      <el-button class="button" size="small" @click="handleEdit({})">
        <IEpPlus />
      </el-button>
    </div>
    <div>
      <el-table :data="versionHistory" :key="tableKey" empty-text="暂无数据">
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="type" label="操作类型">
          <template #default="scope">
            <el-tag :type="typeList[scope.row.type].color">
              {{ typeList[scope.row.type].name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="time" label="时间" />
        <el-table-column align="center" label="操作" fixed="right">
          <template #default="{ row }">
            <div class="handle-box">
              <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
  <DeleteDialog :visible="deleteDialogVisible" :data="deleteRowData" @close="closeDeleteDialog" />
  <EditDialog :visible="editDialogvisible" :select="typeList" @close="closeEditDialog" :form="editRowData" />

</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, nextTick, watch } from 'vue'
import DeleteDialog from './components/DeleteDialog.vue'
import EditDialog from './components/EditDialog.vue'
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css'
import { getBlogVersionHistory } from '@/request/api'

const state = reactive<{
  versionHistory: VersionHistoryObj[];
  editDialogvisible: boolean;
  deleteDialogVisible: boolean;
  tableKey: number;
  typeList: {
    [key: string]: {
      color: string;
      name: string;
    }
  };
  editRowData: VersionHistoryObj;
  deleteRowData: any
}>({
  versionHistory: [],
  editDialogvisible: false,
  deleteDialogVisible: false,
  tableKey: Math.random(),
  typeList: {
    add: {
      color: 'success',
      name: '新增'
    },
    update: {
      color: 'primary',
      name: '修改'
    },
    maintain: {
      color: "warning",
      name: '维护'
    },
    delete: {
      color: 'danger',
      name: '删除'
    }
  },
  editRowData: {},
  deleteRowData: {}
})
const { versionHistory, tableKey, editDialogvisible, deleteDialogVisible, typeList, editRowData, deleteRowData } = toRefs(state)

onMounted(() => {
  getBlogVersionHistory().then(res => {
    if (res.code === 200) {
      versionHistory.value = res.data
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
})

const handleEdit = (row: WebsitesObj) => {
  editDialogvisible.value = true;
  editRowData.value = row
}

//删除操作
const handleDelete = (row: any) => {
  deleteDialogVisible.value = true;
  deleteRowData.value = { id: row.id, parentId: row.parentId }
}

//关闭删除弹窗
const closeDeleteDialog = (reload: any) => {
  deleteDialogVisible.value = false;
  deleteRowData.value = {}; //清空删除弹框内容
  if (!isNaN(reload)) {
    if (reload === 200) {
      //更新表格数据
      getBlogVersionHistory().then(res => {
        if (res.code === 200) {
          versionHistory.value = res.data
          ElMessage.success('删除成功')
        }
      }).catch(err => {
        console.log('[catch]:', err);
      })
    } else {
      ElMessage.error('删除失败，请联系超级管理员')
    }
  }

}

//关闭编辑or新增弹窗
const closeEditDialog = (reload: any) => {
  editDialogvisible.value = false;
  editRowData.value = {}; //清空用户编辑弹框内容
  if (!isNaN(reload)) {
    if (reload === 200) {
      //更新表格数据
      getBlogVersionHistory().then(res => {
        if (res.code === 200) {
          versionHistory.value = res.data
          ElMessage.success('操作成功')
        }
      }).catch(err => {
        console.log('[catch]:', err);
      })
    } else {
      ElMessage.error('操作失败，请联系超级管理员')
    }
  }
}
</script>
<style lang='less' scoped>
.card {
  margin: 18px 0;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // line-height: 40px;
    margin-bottom: 14px;
  }

  .text {
    font-size: 14px;
  }
}

.handle-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  row-gap: 6px;
  column-gap: 6px;

  .el-button {
    margin-left: 0 !important;
  }
}
</style>