<!--  -->
<template>
  <div class="comment-list">
    <div v-for="(item, index) in data" class="comment" :key="item.id">
      <div class="popover">
        <a href="javascript:;" class="user-link">
          <img :src="'/path/user/avatar/' + item.img" alt="" class="avatar">
        </a>
      </div>
      <div class="content-box">
        <div class="comment-main">
          <div class="user-box">
            <div class="popover-box">
              <a href="" class="username">
                <span class="name">{{ item.nickname }}</span>
              </a>
            </div>
            <span v-if="item.user_id === userId" class="author-badge-text">
              （作者）
            </span>

            <div class="time">{{ item.create_time }}</div>
          </div>
          <div class="content">{{ item.comment }}</div>
          <div class="action-box">
            <div class="item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M8.56162 2.16952C8.66569 2.09661 8.78195 2.06124 8.88247 2.0912C8.97653 2.11923 9.23851 2.25916 9.50988 2.96799C9.64419 3.31881 9.9356 4.2424 9.42155 6.05431C9.29751 6.49152 9.61394 6.95303 10.0926 6.95971L13.492 7.00716L13.492 7.00721H13.4991C13.6049 7.00721 13.7228 7.01986 13.8134 7.05898C13.8544 7.07671 13.8815 7.09639 13.8999 7.116C13.9166 7.13375 13.9368 7.16247 13.9515 7.21636C13.9848 7.33784 14.0228 7.74712 13.9473 8.42262C13.874 9.07857 13.698 9.94479 13.341 10.9598C13.0424 11.8088 12.6601 12.5292 12.0684 13.4879C12.0558 13.5052 12.0462 13.5197 12.0418 13.5265L12.0404 13.5285C12.0292 13.5454 12.0242 13.5531 12.018 13.5618C12.0076 13.5764 12.0018 13.582 11.9983 13.585C11.996 13.587 11.9908 13.5912 11.9777 13.5959C11.9638 13.6009 11.9311 13.61 11.8706 13.61H5.56278L5.56373 6.58489C5.87126 6.41901 6.19881 6.20128 6.54112 5.84059C6.93883 5.42152 7.33789 4.8294 7.76254 3.94183C7.84974 3.75957 7.91745 3.55962 7.97574 3.37762C7.99264 3.32486 8.0087 3.27379 8.02438 3.22393L8.02439 3.22389C8.066 3.09158 8.10495 2.96776 8.14985 2.84312C8.2758 2.49352 8.40247 2.28101 8.56162 2.16952ZM10.452 2.60729C10.1323 1.77209 9.70208 1.28277 9.17063 1.12437C8.64564 0.967902 8.20308 1.18891 7.98278 1.34325C7.55169 1.64525 7.33837 2.11908 7.20071 2.5012C7.14817 2.64705 7.10002 2.80016 7.05661 2.93824C7.0422 2.98405 7.02832 3.02821 7.01496 3.0699C6.95791 3.24804 6.90763 3.39115 6.85248 3.50643C6.45683 4.3334 6.1121 4.8271 5.80935 5.14611C5.51322 5.45815 5.23983 5.6219 4.9473 5.76821C4.71095 5.88641 4.55494 6.12906 4.55491 6.40159L4.55388 13.9125C4.55383 14.3026 4.87002 14.6188 5.26008 14.6188H11.8706C12.2097 14.6188 12.4663 14.5113 12.6519 14.3535C12.7387 14.2797 12.7988 14.2043 12.8387 14.1484C12.8556 14.1248 12.8704 14.1025 12.8786 14.09L12.8813 14.0859L12.8826 14.0839L12.8955 14.0685L12.9142 14.0382C13.5304 13.0414 13.9578 12.247 14.2927 11.2945C14.6745 10.209 14.8679 9.26811 14.9499 8.5347C15.0297 7.82084 15.009 7.25845 14.9246 6.95014C14.805 6.51285 14.5104 6.26112 14.2134 6.13284C13.9385 6.01407 13.661 5.99859 13.5028 5.99836L10.4907 5.95631C10.9296 4.15791 10.648 3.11902 10.452 2.60729ZM1.0008 6.46783C0.981809 6.0652 1.30313 5.72836 1.70621 5.72836H2.75264C3.14266 5.72836 3.45883 6.04454 3.45883 6.43456V13.9442C3.45883 14.3342 3.14266 14.6504 2.75264 14.6504H2.06044C1.68335 14.6504 1.37279 14.3541 1.35502 13.9775L1.0008 6.46783Z">
                </path>
              </svg>
              点赞
            </div>
            <div v-if="replyid !== item.id" class="item" @click="addReply(item.id as number)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M2.30136 10.1142L2.30019 3.45191C2.30024 2.6778 2.92779 2.05019 3.70191 2.05019H12.3989C13.1731 2.05019 13.8006 2.67785 13.8006 3.452L13.8018 10.1144C13.8017 10.8885 13.1742 11.516 12.4001 11.516H10.1322C9.97329 11.516 9.81862 11.5675 9.69142 11.6629L6.65162 13.9406C6.62173 13.9598 6.58148 13.9444 6.57209 13.91L6.15416 12.0869C6.07758 11.7528 5.78033 11.516 5.43761 11.516H3.70308C2.92893 11.516 2.30136 10.8884 2.30136 10.1142ZM3.70191 1C2.34776 1 1.25 2.09776 1.25 3.45191L1.25117 10.1144C1.25122 11.4685 2.34896 12.5662 3.70308 12.5662H5.18661L5.54953 14.1495L5.55107 14.1558C5.73515 14.9153 6.62879 15.248 7.26458 14.7937L10.2372 12.5662H12.4001C13.7542 12.5662 14.852 11.4684 14.852 10.1142L14.8508 3.45182C14.8508 2.09771 13.753 1 12.3989 1H3.70191ZM4.78612 7.91404C5.35027 7.91404 5.8076 7.45671 5.8076 6.89257C5.8076 6.32842 5.35027 5.87109 4.78612 5.87109C4.22198 5.87109 3.76465 6.32842 3.76465 6.89257C3.76465 7.45671 4.22198 7.91404 4.78612 7.91404ZM8.98631 6.89257C8.98631 7.45671 8.52898 7.91404 7.96483 7.91404C7.40069 7.91404 6.94336 7.45671 6.94336 6.89257C6.94336 6.32842 7.40069 5.87109 7.96483 5.87109C8.52898 5.87109 8.98631 6.32842 8.98631 6.89257ZM11.1484 7.91404C11.7126 7.91404 12.1699 7.45671 12.1699 6.89257C12.1699 6.32842 11.7126 5.87109 11.1484 5.87109C10.5843 5.87109 10.127 6.32842 10.127 6.89257C10.127 7.45671 10.5843 7.91404 11.1484 7.91404Z">
                </path>
              </svg>
              {{ item.children.length > 0 ? item.children.length : '回复' }}
            </div>
            <div v-if="replyid === item.id" @click="replyid = -1" class="item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M2.30136 10.1142L2.30019 3.45191C2.30024 2.6778 2.92779 2.05019 3.70191 2.05019H12.3989C13.1731 2.05019 13.8006 2.67785 13.8006 3.452L13.8018 10.1144C13.8017 10.8885 13.1742 11.516 12.4001 11.516H10.1322C9.97329 11.516 9.81862 11.5675 9.69142 11.6629L6.65162 13.9406C6.62173 13.9598 6.58148 13.9444 6.57209 13.91L6.15416 12.0869C6.07758 11.7528 5.78033 11.516 5.43761 11.516H3.70308C2.92893 11.516 2.30136 10.8884 2.30136 10.1142ZM3.70191 1C2.34776 1 1.25 2.09776 1.25 3.45191L1.25117 10.1144C1.25122 11.4685 2.34896 12.5662 3.70308 12.5662H5.18661L5.54953 14.1495L5.55107 14.1558C5.73515 14.9153 6.62879 15.248 7.26458 14.7937L10.2372 12.5662H12.4001C13.7542 12.5662 14.852 11.4684 14.852 10.1142L14.8508 3.45182C14.8508 2.09771 13.753 1 12.3989 1H3.70191ZM4.78612 7.91404C5.35027 7.91404 5.8076 7.45671 5.8076 6.89257C5.8076 6.32842 5.35027 5.87109 4.78612 5.87109C4.22198 5.87109 3.76465 6.32842 3.76465 6.89257C3.76465 7.45671 4.22198 7.91404 4.78612 7.91404ZM8.98631 6.89257C8.98631 7.45671 8.52898 7.91404 7.96483 7.91404C7.40069 7.91404 6.94336 7.45671 6.94336 6.89257C6.94336 6.32842 7.40069 5.87109 7.96483 5.87109C8.52898 5.87109 8.98631 6.32842 8.98631 6.89257ZM11.1484 7.91404C11.7126 7.91404 12.1699 7.45671 12.1699 6.89257C12.1699 6.32842 11.7126 5.87109 11.1484 5.87109C10.5843 5.87109 10.127 6.32842 10.127 6.89257C10.127 7.45671 10.5843 7.91404 11.1484 7.91404Z">
                </path>
              </svg>
              取消评论
            </div>

          </div>
        </div>
        <TextArea :replyUserId="item.id as number" @modify="addRely" :isShow="item.id === replyid"
          :nickname="item.nickname as string" />
        <div v-if="item.children?.length !== 0" class="subcomment-wrapper">
          <div class="sub-comment-list">
            <div v-for="(subitem, subindex) in item.children" class="subcomment">
              <div class="popover">
                <a href="javascript:;" class="user-link">
                  <img :src="'/path/user/avatar/' + subitem.img" alt="" class="avatar sub-avatar">
                </a>
              </div>
              <div class="content-box">
                <div class="comment-main">
                  <div class="user-box">
                    <div class="popover-box">
                      <a href="" class="username">
                        <span class="name">{{ subitem.nickname }}</span>
                      </a>
                    </div>
                    <span v-if="subitem.user_id === userId" class="author-badge-text">
                      （作者）
                    </span>
                    <div class="rely-box" v-if="subitem.parentId !== item.id">
                      <span>回复</span>
                      <div class="popover-box">
                        <a href="" class="username">
                          <span class="name">{{ getRelyUser(item.children, subitem.parentId) }}</span>
                        </a>
                      </div>
                    </div>

                    <div class="time">{{ subitem.create_time }}</div>
                  </div>
                  <div class="content">{{ subitem.comment }}</div>
                  <div class="action-box">
                    <div class="item">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M8.56162 2.16952C8.66569 2.09661 8.78195 2.06124 8.88247 2.0912C8.97653 2.11923 9.23851 2.25916 9.50988 2.96799C9.64419 3.31881 9.9356 4.2424 9.42155 6.05431C9.29751 6.49152 9.61394 6.95303 10.0926 6.95971L13.492 7.00716L13.492 7.00721H13.4991C13.6049 7.00721 13.7228 7.01986 13.8134 7.05898C13.8544 7.07671 13.8815 7.09639 13.8999 7.116C13.9166 7.13375 13.9368 7.16247 13.9515 7.21636C13.9848 7.33784 14.0228 7.74712 13.9473 8.42262C13.874 9.07857 13.698 9.94479 13.341 10.9598C13.0424 11.8088 12.6601 12.5292 12.0684 13.4879C12.0558 13.5052 12.0462 13.5197 12.0418 13.5265L12.0404 13.5285C12.0292 13.5454 12.0242 13.5531 12.018 13.5618C12.0076 13.5764 12.0018 13.582 11.9983 13.585C11.996 13.587 11.9908 13.5912 11.9777 13.5959C11.9638 13.6009 11.9311 13.61 11.8706 13.61H5.56278L5.56373 6.58489C5.87126 6.41901 6.19881 6.20128 6.54112 5.84059C6.93883 5.42152 7.33789 4.8294 7.76254 3.94183C7.84974 3.75957 7.91745 3.55962 7.97574 3.37762C7.99264 3.32486 8.0087 3.27379 8.02438 3.22393L8.02439 3.22389C8.066 3.09158 8.10495 2.96776 8.14985 2.84312C8.2758 2.49352 8.40247 2.28101 8.56162 2.16952ZM10.452 2.60729C10.1323 1.77209 9.70208 1.28277 9.17063 1.12437C8.64564 0.967902 8.20308 1.18891 7.98278 1.34325C7.55169 1.64525 7.33837 2.11908 7.20071 2.5012C7.14817 2.64705 7.10002 2.80016 7.05661 2.93824C7.0422 2.98405 7.02832 3.02821 7.01496 3.0699C6.95791 3.24804 6.90763 3.39115 6.85248 3.50643C6.45683 4.3334 6.1121 4.8271 5.80935 5.14611C5.51322 5.45815 5.23983 5.6219 4.9473 5.76821C4.71095 5.88641 4.55494 6.12906 4.55491 6.40159L4.55388 13.9125C4.55383 14.3026 4.87002 14.6188 5.26008 14.6188H11.8706C12.2097 14.6188 12.4663 14.5113 12.6519 14.3535C12.7387 14.2797 12.7988 14.2043 12.8387 14.1484C12.8556 14.1248 12.8704 14.1025 12.8786 14.09L12.8813 14.0859L12.8826 14.0839L12.8955 14.0685L12.9142 14.0382C13.5304 13.0414 13.9578 12.247 14.2927 11.2945C14.6745 10.209 14.8679 9.26811 14.9499 8.5347C15.0297 7.82084 15.009 7.25845 14.9246 6.95014C14.805 6.51285 14.5104 6.26112 14.2134 6.13284C13.9385 6.01407 13.661 5.99859 13.5028 5.99836L10.4907 5.95631C10.9296 4.15791 10.648 3.11902 10.452 2.60729ZM1.0008 6.46783C0.981809 6.0652 1.30313 5.72836 1.70621 5.72836H2.75264C3.14266 5.72836 3.45883 6.04454 3.45883 6.43456V13.9442C3.45883 14.3342 3.14266 14.6504 2.75264 14.6504H2.06044C1.68335 14.6504 1.37279 14.3541 1.35502 13.9775L1.0008 6.46783Z">
                        </path>
                      </svg>
                      点赞
                    </div>
                    <div class="item" v-if="replyid !== subitem.id" @click="addReply(subitem.id as number)">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M2.30136 10.1142L2.30019 3.45191C2.30024 2.6778 2.92779 2.05019 3.70191 2.05019H12.3989C13.1731 2.05019 13.8006 2.67785 13.8006 3.452L13.8018 10.1144C13.8017 10.8885 13.1742 11.516 12.4001 11.516H10.1322C9.97329 11.516 9.81862 11.5675 9.69142 11.6629L6.65162 13.9406C6.62173 13.9598 6.58148 13.9444 6.57209 13.91L6.15416 12.0869C6.07758 11.7528 5.78033 11.516 5.43761 11.516H3.70308C2.92893 11.516 2.30136 10.8884 2.30136 10.1142ZM3.70191 1C2.34776 1 1.25 2.09776 1.25 3.45191L1.25117 10.1144C1.25122 11.4685 2.34896 12.5662 3.70308 12.5662H5.18661L5.54953 14.1495L5.55107 14.1558C5.73515 14.9153 6.62879 15.248 7.26458 14.7937L10.2372 12.5662H12.4001C13.7542 12.5662 14.852 11.4684 14.852 10.1142L14.8508 3.45182C14.8508 2.09771 13.753 1 12.3989 1H3.70191ZM4.78612 7.91404C5.35027 7.91404 5.8076 7.45671 5.8076 6.89257C5.8076 6.32842 5.35027 5.87109 4.78612 5.87109C4.22198 5.87109 3.76465 6.32842 3.76465 6.89257C3.76465 7.45671 4.22198 7.91404 4.78612 7.91404ZM8.98631 6.89257C8.98631 7.45671 8.52898 7.91404 7.96483 7.91404C7.40069 7.91404 6.94336 7.45671 6.94336 6.89257C6.94336 6.32842 7.40069 5.87109 7.96483 5.87109C8.52898 5.87109 8.98631 6.32842 8.98631 6.89257ZM11.1484 7.91404C11.7126 7.91404 12.1699 7.45671 12.1699 6.89257C12.1699 6.32842 11.7126 5.87109 11.1484 5.87109C10.5843 5.87109 10.127 6.32842 10.127 6.89257C10.127 7.45671 10.5843 7.91404 11.1484 7.91404Z">
                        </path>
                      </svg>
                      回复
                    </div>
                    <div class="item" v-if="replyid === subitem.id" @click="replyid = -1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M2.30136 10.1142L2.30019 3.45191C2.30024 2.6778 2.92779 2.05019 3.70191 2.05019H12.3989C13.1731 2.05019 13.8006 2.67785 13.8006 3.452L13.8018 10.1144C13.8017 10.8885 13.1742 11.516 12.4001 11.516H10.1322C9.97329 11.516 9.81862 11.5675 9.69142 11.6629L6.65162 13.9406C6.62173 13.9598 6.58148 13.9444 6.57209 13.91L6.15416 12.0869C6.07758 11.7528 5.78033 11.516 5.43761 11.516H3.70308C2.92893 11.516 2.30136 10.8884 2.30136 10.1142ZM3.70191 1C2.34776 1 1.25 2.09776 1.25 3.45191L1.25117 10.1144C1.25122 11.4685 2.34896 12.5662 3.70308 12.5662H5.18661L5.54953 14.1495L5.55107 14.1558C5.73515 14.9153 6.62879 15.248 7.26458 14.7937L10.2372 12.5662H12.4001C13.7542 12.5662 14.852 11.4684 14.852 10.1142L14.8508 3.45182C14.8508 2.09771 13.753 1 12.3989 1H3.70191ZM4.78612 7.91404C5.35027 7.91404 5.8076 7.45671 5.8076 6.89257C5.8076 6.32842 5.35027 5.87109 4.78612 5.87109C4.22198 5.87109 3.76465 6.32842 3.76465 6.89257C3.76465 7.45671 4.22198 7.91404 4.78612 7.91404ZM8.98631 6.89257C8.98631 7.45671 8.52898 7.91404 7.96483 7.91404C7.40069 7.91404 6.94336 7.45671 6.94336 6.89257C6.94336 6.32842 7.40069 5.87109 7.96483 5.87109C8.52898 5.87109 8.98631 6.32842 8.98631 6.89257ZM11.1484 7.91404C11.7126 7.91404 12.1699 7.45671 12.1699 6.89257C12.1699 6.32842 11.7126 5.87109 11.1484 5.87109C10.5843 5.87109 10.127 6.32842 10.127 6.89257C10.127 7.45671 10.5843 7.91404 11.1484 7.91404Z">
                        </path>
                      </svg>
                      取消评论
                    </div>
                  </div>
                </div>
                <TextArea @modify="addRely" :replyUserId="subitem.id" :isShow="subitem.id === replyid"
                  :nickname="subitem.nickname as string" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, computed, watch } from 'vue'
import TextArea from './TextArea.vue'
import { createComment } from '@/request/api';
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus';

const props = defineProps<{
  data: CommentObj[];
  userId?: number;
}>()

const emits = defineEmits<{
  (e: 'modifyComment', newCommentData: CommentObj[]): void
}>()

const replyid = ref<number>(-1);
const commentData = ref<CommentObj[]>([])
watch(() => props.data, () => {
  commentData.value = [...props.data]
})

const addReply = (id: number) => {
  console.log('click this id:', id);
  replyid.value = id
}

//发布回复评论
const addRely = (relydata: { comment: string; postid: number; parentId: number }) => {
  if (!relydata.comment) {
    ElMessage.error('评论内容不能为空！');
    return;
  }
  createComment({
    comment: relydata.comment,
    postid: relydata.postid,
    parentId: relydata.parentId
  }).then(res => {
    console.log(res);

    if (res.code === 200) {
      ElMessage.success('评论成功')
      replyid.value = -1;
      emits('modifyComment', res.data);
    }
  }).catch(err => {
    console.log('[catch]:', err);
    ElMessage.error('评论失败,请稍后再试！')
  })
}

//获取回复的用户信息
const getRelyUser = computed(() => (item: any, parentId: number) => {
  return item.filter((e: CommentObj) => e.id === parentId)[0].nickname
})
</script>
<style lang='less' scoped>
.comment-list {
  .comment {
    display: flex;
    padding: 16px 0;

    .content-box {
      flex: 1 1 auto;
      margin-left: 16px;

      .comment-main {
        position: relative;
      }

      .subcomment-wrapper {
        .sub-comment-list {
          margin-top: 16px;
          padding: 16px;
          background: rgba(247, 248, 250, .7);
          border-radius: 4px;

          .subcomment {
            display: flex;
          }

          .subcomment:not(:first-child) {
            margin-top: 2rem;
          }
        }
      }
    }
  }
}



.user-box {
  display: flex;
  align-items: center;
  position: relative;

  .author-badge-text {
    font-size: 14px;
    color: #8a919f;
    margin-left: 5px;
  }

  .rely-box {
    display: flex;
    align-items: center;

    span {
      padding: 0 12px;
      font-size: 14px;
      line-height: 22px;
      color: #8a919f;
    }
  }

  .popover-box {
    align-items: unset;
    display: flex;

    .username {
      display: flex;
      align-items: center;
      font-size: 1.25rem;
      font-weight: 600;
      color: #252933;
      text-decoration: none;
      cursor: pointer;
      margin: initial;
      background-color: transparent;

      .name {
        display: inline-block;
        vertical-align: top;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 128px;
        font-weight: 500;
        font-size: 16px;
        color: #252933;
        max-width: 90px;
        line-height: 26px;

      }
    }
  }

  .time {
    margin-left: auto;
    font-size: 14px;
    color: #8a919f;
    line-height: 22px;
  }
}

.content {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  font-weight: 400;
  font-size: 14px;
  line-height: 2rem;
  color: #515767;
  margin-top: 8px;
  -webkit-line-clamp: 6;
}

.popover {
  align-items: unset;
  display: flex;

  .user-link {
    flex: 0 0 auto;
    text-decoration: none;
    cursor: pointer;
    color: #909090;
    margin: initial;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      background-position: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      object-fit: cover;
      border-style: none;
    }

    .sub-avatar {
      width: 24px;
      height: 24px;
    }
  }
}

.action-box {
  display: flex;
  align-items: center;
  margin-top: 8px;
  user-select: none;

  .item {
    margin-right: 16px;
    line-height: 22px;
    font-size: 14px;
    cursor: pointer;
    color: #8a919f;
    display: flex;
    align-items: center;

    svg {
      fill: #8a919f;
      margin-right: 4px;
      overflow: hidden;
    }
  }
}
</style>