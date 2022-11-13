<template>
  <!-- super_admin -->
  <div class="ws-type">
    <el-card class="card">
      <div class="header">
        <span><strong>网站类别</strong></span>
        <el-button class="button" size="small" @click="handleEdit(0, {})">
          <IEpPlus />
        </el-button>
      </div>
      <div>
        <el-table ref="wsItemRef" :data="WSCategory" empty-text="暂无数据">
          <el-table-column prop="title" label="类别">
            <template #default="scope">
              <el-tag :type="filterWSCategory.filter(e => e.value === scope.row.id)[0].type">
                {{ scope.row.title }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="icon" label="图标">
            <template #default="scope">
              <img :src="'/path/index/websites/img/' + scope.row.icon" width="28" height="28" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" />
          <el-table-column align="center" label="操作" fixed="right">
            <template #default="{ row }">
              <div class="handle-box">
                <el-button size="small" type="primary" @click="handleEdit(0, row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
  <!-- admin -->
  <div class="websites">
    <el-card class="card">
      <div class="header">
        <span><strong>网站列表</strong></span>
        <el-button class="button" size="small" @click="handleEdit(1, {})">
          <IEpPlus />
        </el-button>
      </div>
      <div class="text">
        <el-table ref="wsItemRef" :data="getWebsiteItems" empty-text="暂无数据" style="width: 100%;height: 400px;">
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="icon" label="图标">
            <template #default="scope">
              <img :src="'/path/index/websites/img/' + scope.row.icon" width="28" height="28" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="description" label="描述" />
          <el-table-column prop="link" label="网址" />
          <el-table-column prop="parentId" label="类别" :filters="filterWSCategory" :filter-method="filterTag"
            filter-placement="bottom-end">
            <template #default="scope">
              <el-tag :type="filterWSCategory.filter(e => e.value === scope.row.parentId)[0].type">
                {{ filterWSCategory.filter(e => e.value === scope.row.parentId)[0].text }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right">
            <template #default="{ row }">
              <div class="handle-box">
                <el-button size="small" type="primary" @click="handleEdit(1, row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
  <DeleteWS :visible="deleteDialogVisible" :data="deleteRowData" @close="closeDeleteDialog" />
  <EditWS :visible="editDialogvisible" :type="editType" :select="filterWSCategory" @close="closeEditDialog"
    :form="editRowData" />
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, computed } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import EditWS from '../components/EditWS.vue'
import DeleteWS from '../components/DeleteWS.vue'
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css'

const router = useRouter();
const store = useStore();
const state = reactive<{
  editDialogvisible: boolean;
  deleteDialogVisible: boolean;
  editType: 0 | 1;
  filterWSCategory: {
    text: string;
    value: number;
    type?: string;
  }[];
  WSCategory: WebsitesObj[];
  tagType: {
    [key: string]: string[];
  };
  editRowData: WebsitesObj;
  deleteRowData: any
}>({
  editDialogvisible: false,
  deleteDialogVisible: false,
  editType: 0,
  filterWSCategory: [],
  WSCategory: [],
  tagType: {
    0: ["", "s"],
    1: ["success", ""],
    2: ["warning", ""],
    3: ["danger", ""],
    4: ["info", ""]
  },
  editRowData: {},
  deleteRowData: {}
})
const { WSCategory, editType, editDialogvisible, deleteDialogVisible, filterWSCategory, tagType, editRowData, deleteRowData } = toRefs(state)
//获取数据
const fetchData = () => {
  store.dispatch('getWebSites').catch((err) => {
    console.log('[catch]:', err);
  })
}
const filterTag = (value: string, row: any) => {
  return row.parentId === value
}
const getWebsiteItems = computed(() => {
  let itemsData = [];
  WSCategory.value = []
  filterWSCategory.value = []
  const websites = store.getters.getNewWebsite;
  for (let i in websites) {
    const { children, ...s } = websites[i];
    WSCategory.value.push(s);
    filterWSCategory.value.push({
      text: s.title || '',
      value: s.id || 0,
      type: tagType.value[i][0],
    })
    const arr: any = websites[i].children;
    itemsData.push(...arr);
  }
  return itemsData
})


const handleEdit = (type: 0 | 1, row: WebsitesObj) => {
  editDialogvisible.value = true;
  editRowData.value = row
  editType.value = type
}
//删除操作
const handleDelete = (row: any) => {
  deleteDialogVisible.value = true;
  deleteRowData.value = { id: row.id, parentId: row.parentId }
}
//关闭编辑or新增弹窗
const closeEditDialog = (reload: any) => {
  editDialogvisible.value = false;
  editRowData.value = {}; //清空用户编辑弹框内容
  if (!isNaN(reload)) {
    if (reload === 200) {
      //更新表格数据
      ElMessage.success('操作成功')
      fetchData();
    } else {
      ElMessage.error('操作失败，请联系超级管理员')
    }
  }

}
//关闭删除弹窗
const closeDeleteDialog = (reload: any) => {
  deleteDialogVisible.value = false;
  deleteRowData.value = {}; //清空删除弹框内容
  if (!isNaN(reload)) {
    if (reload === 200) {
      //更新表格数据
      ElMessage.success('删除成功')
      fetchData()
    } else if (reload === 201) {
      ElMessage.warning('无法删除含有子项网站的类别')
    } else {
      ElMessage.error('删除失败，请联系超级管理员')
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

// .ws-type {}
</style>