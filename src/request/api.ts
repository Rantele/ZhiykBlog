/*
 * @Author: Rantele
 * @Date: 2022-10-12 18:59:39
 * @LastEditors: Rantele
 * @LastEditTime: 2022-11-30 19:37:12
 * @Description:接口统一管理
 *
 */

// 使用自定义的axios实例
import request from './http'

//登录返回token
export const userLogin = (data: UserLoginData): PromiseRes<UserLoginRes> => request.post('/user/login', data)

//获取动态路由信息
export const getUserRouterApi = (): PromiseRes<UserRouterRes> => request.get('/user/router')

//获取WebSiteList信息
export const getWSList = (): PromiseRes => request.get('/index/websites/list')

//获取WebSite图片信息
export const getWSImage = (name: string): PromiseRes => request.get('/index/websites/img/' + name)

//添加WebSite信息
export const createWSInfo = (data: FormData): PromiseRes => request.post('/index/websites/create', data)

//修改WebSite信息
export const updateWSInfo = (data: FormData): PromiseRes => request.post('/index/websites/update', data)

//删除WebSite信息
export const deleteWSInfo = (data: { id: number; parentId: number }): PromiseRes =>
  request.post('/index/websites/delete', data)

//获取bannerList信息
export const getBannerList = (): PromiseRes => request.get('/index/banners/list')

//添加Banner信息
export const createBanner = (data: FormData): PromiseRes => request.post('/index/banners/create', data)

//删除WebSite信息
export const deleteBanner = (data: { id: number; img: string }): PromiseRes =>
  request.post('/index/banners/delete', data)

//获取用户信息
export const getUserInfo = (): PromiseRes<UserInfoRes[]> => request.get('/user/info')

//上传md中的图片
export const uploadMdImg = (data: FormData): PromiseRes => request.post('/user/md/createImg', data)

//删除上传的图片
export const deleteMdImg = (data: { img: string }): PromiseRes => request.post('/user/md/deleteImg', data)

//获取用户文章的统计信息
export const getMdStatistics = (): PromiseRes<MdStatisticsRes> => request.get('/user/md/statistics')

//获取用户全部文章
export const getUserMdList = (data?: { search: string }): PromiseRes<MdPostObj[]> =>
  request.get('/user/md/list', { params: data })

//获取用户未审核文章
export const getUserMdNoAuditList = (): PromiseRes<MdPostObj[]> => request.get('/user/md/auditList')

//获取用户审核未通过的文章
export const getUserMdNoPassList = (): PromiseRes<MdPostObj[]> => request.get('/user/md/noPassList')

//获取用户文章内容
export const getUserMd = (id: string | number): PromiseRes<MdDataObj> => request.get('/user/md/' + id)

//新建文章
export const createMd = (data: MdDataObj): PromiseRes => request.post('/user/md/create', data)

//修改文章
export const updateMd = (data: MdDataObj): PromiseRes => request.post('/user/md/update', data)

//删除文章
export const deleteMd = (data: { id: number; blogid: number }): PromiseRes => request.post('/user/md/delete', data)

//获取文章
export const getMdContent = (blogid: number | string): PromiseRes<{ id: number; body: string }> =>
  request.get('/blog/content/' + blogid)

//获取文章标签列表
export const getTagList = (): PromiseRes<TagListItem[]> => request.get('/user/taglist')

//推荐文章列表
export const getRecommendList = (): PromiseRes<MdPostObj[]> => request.get('/blog/recommend')

//最新文章列表
export const getLatestList = (): PromiseRes<MdPostObj[]> => request.get('/blog/latest')

//热榜文章列表
export const getHotList = (): PromiseRes<MdPostObj[]> => request.get('/blog/hot')

//获取文章内容
export const getMdDetail = (data: { postid: number; blogid: number }): PromiseRes<MdDetailDataRes> =>
  request.get('/blog/detail', { params: data })

//获取搜索文章
export const getSearchMdData = (data: { label: string; search: string }): PromiseRes<MdPostObj[]> =>
  request.get('/blog/search', { params: data })

//获取文章评论
export const getMdComment = (data: { postid: number }): PromiseRes<CommentObj[]> =>
  request.get('/blog/comment', { params: data })

//获取用户收藏列表
export const getStarList = (): PromiseRes<MdVoteOrStarRes[]> => request.get('/user/star/list')

//收藏 star
export const createStar = (data: { postid: number }): PromiseRes => request.post('/user/star/create', data)
//取消收藏 star
export const deleteStar = (data: { postid: number }): PromiseRes => request.post('/user/star/delete', data)

//获取用户点赞文章列表
export const getStarPostList = (data?: { search: string }): PromiseRes<MdPostObj[]> =>
  request.get('/user/star/postlist', { params: data })

//获取用户点赞id列表
export const getUserVoteList = (): PromiseRes<MdVoteOrStarRes[]> => request.get('/user/vote/list')

//点赞 vote
export const createVote = (data: { postid: number }): PromiseRes => request.post('/user/vote/create', data)

//取消点赞
export const deleteVote = (data: { postid: number }): PromiseRes => request.post('/user/vote/delete', data)

//发布评论
export const createComment = (data: { comment: string; postid: number; parentId: number }): PromiseRes<CommentObj[]> =>
  request.post('/user/comment/create', data)

//按日期范围获取博客统计信息
export const getBlogStatistics = (data: { startDate: string; endDate: string }): PromiseRes =>
  request.get('/blog/statistics', { params: data })

//根据标签获取博客统计信息
export const getBlogFilterStatistics = (data: { label: number }): PromiseRes<byLabelMdData[]> =>
  request.get('/blog/filterstatistics', { params: data })

//获取博客概述信息
export const getBlogOverviewData = (): PromiseRes<overviewData> => request.get('/blog/overviewData')

//获取博客审核概述信息
export const getBlogAuditOverviewData = (): PromiseRes<overviewData> => request.get('/blog/auditOverviewData')
//获取博客审核概述信息
export const getAuditMdDataList = (): PromiseRes<MdPostObj[]> => request.get('/blog/auditMdDataList')

//修改文章审核结果
export const updateBlogauditStatus = (data: { id: number; status: number }): PromiseRes<UserLoginRes> =>
  request.post('/blog/auditStatus', data)

//获取博客版本历史
export const getBlogVersionHistory = (): PromiseRes<VersionHistoryObj[]> => request.get('/index/about/log')

//新增博客版本历史
export const createBlogVersionHistory = (data: VersionHistoryObj): PromiseRes<VersionHistoryObj[]> =>
  request.post('/index/about/create', data)

//修改博客版本历史
export const updateBlogVersionHistory = (data: VersionHistoryObj): PromiseRes<VersionHistoryObj[]> =>
  request.post('/index/about/update', data)

//删除博客版本历史
export const deleteBlogVersionHistory = (data: { id: number }): PromiseRes => request.post('/index/about/delete', data)

//获取管理员用户列表
export const getSearchAdminList = (data: searchItf): PromiseTableRes<AdminObjItf[]> =>
  request.get('/user/ums/admin/list', { params: data })

//获取用户列表
export const getSearchUserList = (data: searchItf): PromiseTableRes<AdminObjItf[]> =>
  request.get('/user/ums/user/list', { params: data })

//获取管理员类型列表
export const getAdminRoleList = (): PromiseRes<{ id: number; name: string; value: string }[]> =>
  request.get('/user/ums/admin/rolelist')

//获取邮箱是否存在
export const isExistEmail = (data: { id: number; email: string }): PromiseRes<boolean> =>
  request.get('/user/isExistEmail', { params: data })

//修改管理员信息
export const updateAdmin = (data: AdminObjItf): PromiseRes => request.post('/user/ums/admin/update', data)
