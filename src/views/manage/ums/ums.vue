<!--  -->
<template>
  <div>
    <el-card>
      <template #header>
        管理员信息
      </template>
      <el-table :data="tableData" height="380" style="width: 100%;">
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="realname" label="姓名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column label="添加时间">
          <template #default="scope">
            {{ formateDate(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="roles" label="权限" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <!-- <el-button type="primary" link @click="allocRole(row.id)">分配角色</el-button> -->
            <el-button type="primary" link @click="editAdmin(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="padding: 16px;" :total="10" background layout="sizes, prev, pager, next"
        :page-size="paginationData.page_size" :page-sizes="[10, 20, 50, 100]" :current-page="paginationData.page_num"
        @size-change="adminSizeChange" @current-change="adminCurrPageChange" />
    </el-card>
    <el-select v-model="value" multiple placeholder="Select" style="width: 240px">
      <el-option v-for="item in roleList" :key="item.value" :label="item.name" :value="item.value" />
    </el-select>
  </div>


  <EditAdmin :visible="visible" @close="closeDialog" :form="rowData" />
  <EditRole :visible="roleVisible" @colse="closeRoleDialog" :form="roleData" />
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getSearchAdminList, getAdminRoleList } from "@/request/api"
import EditAdmin from './components/EditAdmin.vue'
import EditRole from './components/EditRole.vue';

const value = ref(['1', '2', '3'])
const state = reactive<{
  tableData: AdminObjItf[];
  visible: boolean;
  rowData: AdminObjItf;
  roleVisible: boolean;
  roleData: AdminRoleFormData;
  paginationData: {
    page_num: number;
    page_size: number;
    total: number;
  }
  roleList: {
    id: number;
    name: string;
    value: string;
  }[]
}>({
  tableData: [],
  visible: false,
  rowData: {},
  roleVisible: false,
  roleData: {
    userRoles: [],
    roleLists: [],
    adminId: 0
  },
  paginationData: {
    page_num: 1,
    page_size: 10,
    total: 0
  },
  roleList: []
})

const { tableData, visible, rowData, roleVisible, roleData, paginationData, roleList } = toRefs(state)
//获取用户数据列表
const fetchData = () => {
  getSearchAdminList({
    search: '',
    page_num: paginationData.value.page_num,
    page_size: paginationData.value.page_size
  }).then(res => {
    if (res.code === 200) {
      tableData.value = res.data
      paginationData.value.total = res.total
    }
  })
}
fetchData();

onMounted(() => {
  getAdminRoleList().then(res => {
    if (res.code === 200) {
      roleList.value = res.data
    }
  }).catch(err => {
    console.log('[catch]:', err);
  })
})

//监听管理员表切换分页
const adminCurrPageChange = (current_page: number) => {
  paginationData.value.page_num = current_page
  console.log('curr page');
  fetchData();
}
//监听管理员表切换每页显示数据
const adminSizeChange = (page_size: number) => {
  console.log('page_size');
  paginationData.value.page_size = page_size
  paginationData.value.page_num = 1
  fetchData();
}

//获取所有角色
// getRoleListAll().then(res => {
//   if (res.code === 200) {
//     roleData.value.roleLists = res.data;
//   }
// })
//点击分配角色按钮
// const allocRole = (id: number) => {
//   getAdminRoleById(id).then(res => {
//     if (res.code === 200) {
//       roleVisible.value = true;
//       roleData.value.userRoles = res.data;
//       roleData.value.adminId = id;
//     }
//   })

// }
//隐藏分配角色弹框
const closeRoleDialog = () => {
  roleVisible.value = false;
  roleData.value = {
    userRoles: [],
    roleLists: [],
    adminId: 0
  };
}

//点击编辑按钮
const editAdmin = (row: AdminObjItf) => {
  visible.value = true;
  rowData.value = row
}
//隐藏弹窗
const closeDialog = (reload?: string) => {
  visible.value = false;
  rowData.value = {}; //清空用户编辑弹框内容

  if (reload === 'reload') {
    //更新表格数据
    fetchData();
  }
}

//格式化时间
function formateDate(time: string) {
  if (!time) return '';
  const date = new Date(time);
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');
  let hour = String(date.getHours()).padStart(2, '0');
  let min = String(date.getMinutes()).padStart(2, '0');
  let sec = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}
</script>
<style lang='less' scoped>
:deep(.el-card__body) {
  padding: 0 20px;
  // margin: 0 20px;
}
</style>