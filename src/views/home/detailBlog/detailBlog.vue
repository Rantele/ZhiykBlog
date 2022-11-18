<!--  -->
<template>
  <div class="wrapper">
    <div class="detail_container" style="max-width:1140px;">
      <div v-if="!detailData?.body" class="view">
        <el-card>
          <el-empty description="文章不存在" />
        </el-card>
      </div>
      <div v-else class="view">
        <el-card class="main-card">
          <div class="user-detail">
            <h1 class="article-title">{{ detailData.blogData.title }}</h1>
            <div class="author-info-block">
              <a href="javascript:;" class="avatar-link">
                <img v-if="detailData.blogData.img" class="avatar" :src="'/path/user/avatar/' + detailData.blogData.img"
                  alt="">
              </a>
              <div class="author-info-box">
                <div class="author-name">
                  <a href="javascript:;" class="username">
                    <span class="name" style="max-width:128px;">{{ detailData.blogData.nickname }}</span>
                  </a>
                </div>
                <div class="meta-box">
                  <span class="time">{{ detailData.blogData.create_time }}</span>
                </div>
              </div>

            </div>
            <img v-if="detailData.blogData.cover" :src="'/path/user/md/img/' + detailData.blogData.cover" alt=""
              style="width: 100%;">
          </div>
          <mavon-editor ref="detailRef" :editable="false" defaultOpen="preview" :toolbarsFlag="false" :subfield="false"
            class="mavon_editor" previewBackground="#fff" :boxShadow="false" v-model="detailData.body" :ishljs="true" />
        </el-card>
        <el-card class="comment-card" id="comment-card">
          <div class="comment-title">
            评论
          </div>
          <div class="comment-editArea">
            <div class="user-avatar">
              <a href="javascript:;" class="avatar-link">
                <img v-if="!store.state.img" class="avatar" :src="defaultAvatar" alt="">
                <img v-else class="avatar" :src="'/path/user/avatar/' + store.state.img" alt="">
              </a>
            </div>
            <div class="edit-area">
              <el-input class="comment-input" v-model="addCommentData" :rows="4" show-word-limit maxlength="200"
                type="textarea" resize="none" placeholder="留下你的足迹..." />
              <div class="input-footer">
                <div class="footer-content">
                  <div class="icon-item"></div>
                  <div class="btn-comment">
                    <span>Ctrl + Enter</span>
                    <el-button @click="addComment" type="primary" size="large">发布</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="comment-content">
            <el-empty v-if="commentData.length === 0" description="暂无评论" />
            <template v-else>
              <Comment :data="getCommentList" :userId="detailData.blogData.user_id" @modifyComment="addRely" />
            </template>
          </div>
        </el-card>
        <div class="stickbar">
          <div @click="getVote" :class="{ 'with-badge-avtive': isVote, 'with-badge': !isVote }"
            :badge="detailData.blogData.vote_count" class="icon-tag">
            <svg :class="{ 'icon-active': isVote, 'sprite-icon': !isVote }" t="1667310667747" viewBox="0 0 1024 1024"
              version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3377" width="24" height="48">
              <path
                d="M249 460.2h-71.4c-20.2 0-36.6 16.4-36.6 36.6v372.6c0 20.2 16.4 36.6 36.6 36.6H249c20.2 0 36.6-16.4 36.6-36.6V496.8c-0.1-20.2-16.4-36.6-36.6-36.6zM868.9 462.4c-11.6-15.1-29.2-23.7-48.2-23.7H641.9c-6.9 0-10.4-4.6-11.6-6.5-1.2-2-3.7-7.4-0.2-13.8 13.6-25.1 22-50.1 25.1-74.3 4.5-35.5 8.6-123.2-8.6-170.3-5.4-15-18-50.1-66.8-53.3-1-0.1-2 0-3 0-56.1 4.2-66 44.4-69.2 57.6-2 8.2-4.1 17.7-6.4 28-8.3 37.9-19.7 89.7-39.7 124.6-38.9 67.9-132.5 132.7-133.1 133.1-0.6 0.4-0.9 1-1.5 1.4-7.7 2.7-13.3 9.8-13.3 18.4v400.9c0 6.1 3 11.4 7.4 15 3.9 4 9.3 6.5 15.4 6.5h393.1c25.8 0 48.3-17.4 54.8-42.4L879.6 515c4.8-18.4 0.9-37.5-10.7-52.6z"
                fill="currentColor" p-id="3378"></path>
            </svg>
          </div>
          <div :badge="detailData.blogData.comment_count" class="icon-tag with-badge">
            <a href="#comment-card">
              <svg t="1667310998433" class="sprite-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="6093" width="20" height="48">
                <path
                  d="M867.265818 784.595468 681.177586 784.595468c-62.5895 60.688197-158.625764 169.570024-158.625764 169.570024-5.817496 6.058996-15.288195 6.058996-21.086248 0 0 0-131.200134-135.805012-162.894997-169.570024L156.752602 784.595468c-67.418482 0-122.045637-63.007009-122.045637-131.366933L34.706965 189.078333c0-68.358901 53.43398-123.788328 119.322619-123.788328l715.938786 0c65.907059 0 119.322619 55.429427 119.322619 123.788328l0 464.150202C989.292012 721.578226 934.664857 784.595468 867.265818 784.595468L867.265818 784.595468zM273.353227 373.638769c-32.94432 0-59.661821 27.715225-59.661821 61.898769 0 34.174334 26.716478 61.889559 59.661821 61.889559s59.661821-27.715225 59.661821-61.889559C333.015048 401.353994 306.297546 373.638769 273.353227 373.638769L273.353227 373.638769zM511.999488 373.638769c-32.94432 0-59.661821 27.715225-59.661821 61.898769 0 34.174334 26.735921 61.889559 59.661821 61.889559 32.94432 0 59.661821-27.715225 59.661821-61.889559C571.66131 401.353994 544.943808 373.638769 511.999488 373.638769L511.999488 373.638769zM750.64575 373.638769c-32.9259 0-59.661821 27.715225-59.661821 61.898769 0 34.174334 26.735921 61.889559 59.661821 61.889559 32.963763 0 59.661821-27.715225 59.661821-61.889559C810.307571 401.353994 783.609513 373.638769 750.64575 373.638769L750.64575 373.638769zM750.64575 373.638769"
                  p-id="6094" fill="currentColor"></path>
              </svg>
            </a>
          </div>
          <div class="icon-tag" @click="getStar">
            <svg :class="{ 'star-active': isStar, 'sprite-icon': !isStar }" t="1667311151229" viewBox="0 0 1024 1024"
              version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8085" width="22" height="48">
              <path
                d="M946.44567 407.179676c-3.706415-11.056823-13.268188-19.154245-24.823362-20.929682l-263.117606-40.614L540.930913 93.91802c-5.108345-10.93198-16.071024-17.939581-28.155247-17.971303-0.030699 0-0.062422 0-0.062422 0-12.021801 0-22.985504 6.945179-28.155247 17.84646L365.79001 345.247138l-263.917832 39.507806c-11.399631 1.961678-20.774139 10.060123-24.355711 21.054525-3.613294 10.963703-0.778736 23.047926 7.257288 31.332612l191.202717 196.684568-45.6282 277.132808c-1.930979 11.741415 3.0208 23.608697 12.769838 30.491455 9.717316 6.882757 22.549575 7.630794 32.983205 1.868557l235.366565-129.47177 234.868215 130.282229c4.703115 2.616594 9.904581 3.924379 15.106046 3.924379 6.291287 0 12.551874-1.868557 17.877159-5.699816 9.748015-6.852058 14.763239-18.687618 12.862959-30.460756L747.488339 634.635061l191.669344-195.84341C947.286828 430.476265 950.121386 418.2365 946.44567 407.179676z"
                p-id="8086" fill="currentColor"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, computed } from 'vue'
import { getMdDetail, getMdComment, createStar, deleteStar, createVote, deleteVote, createComment } from '@/request/api'
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import defaultAvatar from '@/assets/defaultAvatar.png'
import { useStore } from 'vuex';
import 'element-plus/es/components/message/style/css'
import convertToArrData from '@/utils/convertToArrData'
import convertToTreeData from '@/utils/convertToTreeData'
import Comment from './components/Comment.vue'

const detailRef = ref()
const store = useStore();
const route = useRoute();

const state = reactive<{
  detailData: MdDetailDataRes;
  addCommentData: string;
  commentData: CommentObj[];
}>({
  detailData: {
    blogData: {},
    body: "",
    star: {},
    isVote: 0
  },
  commentData: [],
  addCommentData: '',
})


const { detailData, addCommentData, commentData } = toRefs(state)

onMounted(() => {
  //获取文章内容
  if (route.params.id && route.query.postid) {
    getMdDetail({ postid: parseInt(route.query.postid as string), blogid: parseInt(route.params.id as string) }).then(res => {
      if (res.code === 200) {
        if (res.data) {
          detailData.value = res.data
        }
      }
    }).catch(err => {
      console.log('[catch]:', err);
    })
    getMdComment({ postid: parseInt(route.query.postid as string) }).then(res => {
      if (res.code === 200) {
        commentData.value = res.data
      }
    }).catch(err => {
      console.log('[catch]:', err);
    })
  }
})

//computed
const isVote = computed(() => {
  return detailData.value.isVote === 1
})

const isStar = computed(() => {
  return detailData.value.star.isStar === 1
})

const getCommentList = computed(() => {
  const data = convertToTreeData(commentData.value, 0);
  data.forEach((value: CommentObj, index: number, arr) => {
    value.children = convertToArrData(value.children || [])
  })
  return data
})

//点击发布评论按钮
const addComment = () => {
  createComment({
    postid: parseInt(route.query.postid as string),
    comment: addCommentData.value,
    parentId: 0
  }).then(res => {
    if (res.code === 200) {
      ElMessage.success('评论成功')
      commentData.value = res.data;
      (detailData.value.blogData.comment_count as number)++
    }
  }).catch(err => {
    console.log('[catch]:', err);
    ElMessage.error('评论失败,请稍后再试！')
  })
}

//点击点赞按钮
const getVote = () => {
  if (!isVote.value) {
    //点赞
    createVote({ postid: parseInt(route.query.postid as string) }).then((res) => {
      if (res.code === 200) {
        detailData.value.isVote = 1;
        (detailData.value.blogData.vote_count as number)++;
      }
    }).catch(err => {
      console.log('[catch]:', err);
    })
  } else {
    //取消点赞
    deleteVote({ postid: parseInt(route.query.postid as string) }).then((res) => {
      if (res.code === 200) {
        detailData.value.isVote = 0;
        (detailData.value.blogData.vote_count as number)--;
      }
    }).catch(err => {
      console.log('[catch]:', err);
    })
  }

}

//点击收藏按钮
const getStar = () => {
  if (!isStar.value) {
    //收藏
    createStar({ postid: parseInt(route.query.postid as string) }).then(res => {
      if (res.code === 200) {
        detailData.value.star.isStar = 1;
        ElMessage.success('收藏成功')
      }
    }).catch(err => {
      console.log('[catch]:', err);
      ElMessage.error('收藏失败,请稍后重试')
    })
  } else {
    // 取消收藏
    deleteStar({ postid: parseInt(route.query.postid as string) }).then(res => {
      if (res.code === 200) {
        detailData.value.star.isStar = 0;
        ElMessage.success('取消收藏')
      }
    }).catch(err => {
      console.log('[catch]:', err);
      ElMessage.error('取消收藏失败,请稍后重试')
    })
  }
}

//获取回复返回的新评论内容
const addRely = (newCommentData: CommentObj[]) => {
  commentData.value = newCommentData;
  (detailData.value.blogData.comment_count as number)++
}


</script>
<style lang='less' scoped>
@btn-color-normal: #8a919f;
@btn-color-hover: #515767;
@btn-color-active: #1e80ff;

.wrapper {
  background-color: #f4f5f5;
  height: 100%;
  width: 100%;
  padding: 1.767rem 0;
  -webkit-font-smoothing: unset !important;
  font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial !important;

  .detail_container {
    background-color: #f4f5f5;
    margin: 0 auto;
    width: 100%;

    .view {
      display: flex;
      flex-direction: column;

      .main-card {
        position: relative;
        max-width: 100%;
        box-sizing: border-box;

        .user-detail {
          padding: 8px 25px 15px 25px;

          .article-title {
            margin: 0 0 1rem;
            font-size: 2rem;
            font-weight: 600;
            line-height: 1.31;
            color: #252933;
          }

          .author-info-block {
            display: flex;
            align-items: center;
            margin-bottom: 20px;

            .avatar-link {
              text-decoration: none;
              cursor: pointer;
              color: #909090;


              .avatar {
                flex: 0 0 auto;
                margin-right: 1rem;
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                display: inline-block;
                position: relative;
                background-position: 50%;
                background-size: cover;
                background-repeat: no-repeat;
              }
            }

            .author-info-box {
              min-width: 0;
              flex: 1;
              min-height: 43px;

              .author-name {
                display: flex;

                .username {
                  font-size: 16px;
                  font-weight: 500;
                  color: #515767;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  align-items: center;
                  text-decoration: none;
                  cursor: pointer;
                }
              }

              .meta-box {
                color: #8a919f;
                margin-top: 2px;
                line-height: 22px;

                .time {
                  letter-spacing: 1px;
                  font-size: 14px;
                }
              }
            }
          }
        }

        .v-note-wrapper {
          border: unset;
        }
      }

      .comment-card {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        max-width: 100%;
        margin-top: 24px;
        padding: 12px;

        .comment-title {
          font-size: 1.15rem;
          font-weight: 600;
          height: 42px;
        }

        .comment-editArea {
          display: flex;
          width: 100%;

          .user-avatar {
            .avatar-link {
              text-decoration: none;
              cursor: pointer;
              color: #909090;

              .avatar {
                flex: 0 0 auto;
                margin-right: 1rem;
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                display: inline-block;
                position: relative;
                background-position: 50%;
                background-size: cover;
                background-repeat: no-repeat;
              }
            }

          }

          .edit-area {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 8px;

            .comment-input {
              width: 100%;
              font-size: 1rem;
              color: #000;



            }

            .input-footer {
              .footer-content {
                display: flex;
                justify-content: space-between;

                .btn-comment {
                  span {
                    opacity: .6;
                    margin-right: 12px;
                  }
                }
              }

            }


          }
        }
      }

      .stickbar {
        position: fixed;
        margin-left: -6rem;
        top: 140px;
        display: flex;
        flex-direction: column;
        gap: 24px;

        .icon-tag {
          width: 48px;
          height: 48px;
          background-color: #fff;
          border-radius: 50%;
          text-align: center;
          box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);
          cursor: pointer;
          font-size: 1.67rem;
          position: relative;

          .sprite-icon {
            color: @btn-color-normal;
          }

          .icon-active {
            color: @btn-color-active;
          }

          .star-active {
            color: #ffb800;
          }

          .sprite-icon:hover {
            color: @btn-color-hover;
          }
        }



        .with-badge::after {
          content: attr(badge);
          position: absolute;
          top: 0;
          left: 75%;
          height: 17px;
          line-height: 17px;
          padding: 0 5px;
          border-radius: 9px;
          font-size: 11px;
          text-align: center;
          white-space: nowrap;
          background-color: #c2c8d1;
          color: #fff;
        }

        .with-badge-avtive::after {
          content: attr(badge);
          position: absolute;
          top: 0;
          left: 75%;
          height: 17px;
          line-height: 17px;
          padding: 0 5px;
          border-radius: 9px;
          font-size: 11px;
          text-align: center;
          white-space: nowrap;
          background-color: @btn-color-active;
          color: #fff;
        }
      }
    }
  }
}
</style>