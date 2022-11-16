/*
 * @Author: Rantele
 * @Date: 2022-10-12 19:34:57
 * @LastEditors: Rantele
 * @LastEditTime: 2022-11-13 11:58:18
 * @Description:axios.ts全局变量
 *
 */

type PromiseRes<T = {}> = Promise<ResComItf<T>>

// 返回值标准接口类型
interface ResComItf<T> {
  code?: number
  message: string
  data: T
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
