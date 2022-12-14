/*
 * @Author: Rantele
 * @Date: 2022-10-12 19:34:57
 * @LastEditors: Rantele
 * @LastEditTime: 2022-11-28 21:19:11
 * @Description:axios.ts全局变量
 *
 */

type PromiseRes<T = {}> = Promise<ResComItf<T>>
type PromiseTableRes<T = {}> = Promise<ResTableItf<T>>

// 返回值标准接口类型
interface ResComItf<T> {
  code?: number
  message: string
  data: T
}

//分页数据返回接口类型
interface ResTableItf<T> {
  code?: number
  message: string
  data: T
  page_num: number
  page_size: number
  total: number
}

//用户登录数据
interface UserLoginData {
  username: string
  password: string
}
//登录接口返回
interface UserLoginRes {
  token: string
  tokenHead: string
}

interface UserRouterRes {
  router: {}[]
  img: string
  nickname: string
}

//用户信息
interface UserInfoRes {
  email: string
  phone: string
  realname: string
  gender: number
  brithday: string
  create_time: string
}

interface UserDataObj {
  [key: string | number]: any
  nickname?: string
  img?: string
  email?: string
  phone?: string
  realname?: string
  gender?: number
  brithday?: string
  create_time?: string
}

interface MdDataObj {
  [key: string | number]: any
  id?: number
  title?: string
  abstract?: string
  cover?: string
  label?: string
  content?: string
  blogid?: number
}

//
interface MdStatisticsRes {
  vote_count?: number
  blog_count?: number
  star_count?: number
}

interface MdPostObj {
  id?: number
  title?: string
  abstract?: string
  cover?: string
  label?: string
  blogid?: number
  nickname?: string
  user_id?: number
  img?: string
  vote_count?: number
  comment_count?: number
  status?: number
  create_time?: string
}
//文章标签
interface TagListItem {
  value: number
  label: string
}

/**
 * vote
 */
interface MdVoteOrStarRes {
  id?: number
  postid?: number
  create_time?: string
}

// Comments
interface CommentObj {
  id?: number
  comment?: string
  parentId?: number
  nickname?: string
  img?: string
  create_time?: string
  user_id?: number
  [key: string]: any
}

interface MdDetailDataRes {
  blogData: MdPostObj
  body: string
  star: {
    star_count?: number
    isStar?: number
  }
  isVote: number
}

interface byLabelMdData extends MdPostObj {
  date?: string
}

interface overviewData {
  total?: number
  examine?: number
  failed?: number
  td_add?: number
  compelete_rate?: number
  pass_rate?: number
}

//博客版本
interface VersionHistoryObj {
  id?: number
  type?: string
  time?: string
  content?: string
}
