<!--  -->
<template>
  <div>
    <el-card class="card">
      <div class="header">
        <span><strong>管理员权限</strong></span>
        <el-button class="button" size="small" @click="editAdmin({})">
          <IEpPlus />
        </el-button>
      </div>
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
        <el-table-column label="权限">
          <template #default="scope">
            <el-tag v-for="(item, index) in handleRoels(scope.row.roles)" :key="item + index">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
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
  </div>


  <EditAdmin :visible="visible" @close="closeDialog" :form="rowData" :selectList="roleList" />
  <!-- <EditRole :visible="roleVisible" @colse="closeRoleDialog" :form="roleData" /> -->
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, computed } from 'vue'
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

//处理权限显示
const handleRoels = computed(() => (role: string) => {
  const userRoleList = role.split(',') //转成列表
  const isSuperAdmin = roleList.value.every((val) => userRoleList.includes(val.value))
  if (isSuperAdmin) {
    //超级管理员
    return ['超级管理员']
  } else {
    console.log(roleList.value);
    const filterRes = roleList.value.filter(e => userRoleList.includes(e.value)).map(e => e.name)
    return filterRes
  }
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
const closeDialog = (reload: any) => {
  visible.value = false;
  rowData.value = {}; //清空用户编辑弹框内容

  if (!isNaN(reload)) {
    if (reload === 200) {
      // fetchData();
      //更新表格数据
      // getBlogVersionHistory().then(res => {
      //   if (res.code === 200) {
      //     versionHistory.value = res.data
      //     ElMessage.success('操作成功')
      //   }
      // }).catch(err => {
      //   console.log('[catch]:', err);
      // })
    } else {
      // ElMessage.error('操作失败，请联系超级管理员')
    }
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