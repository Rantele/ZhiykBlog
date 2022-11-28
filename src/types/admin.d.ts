interface AdminObjItf {
  id?: number
  realname?: string
  nickname?: string
  email?: string
  create_time?: string
  roles?: string
}

interface AdminRoleFormData {
  userRoles: RoleObjItf[]
  roleLists: RoleObjItf[]
  adminId: number
}

interface searchItf {
  search: string
  page_num: number
  page_size: number
}
