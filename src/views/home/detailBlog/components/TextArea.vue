<!--  -->
<template>
  <div v-if="isShow" class="input-area">
    <el-input ref="inputRef" class="comment-input" v-model="addCommentData" :autosize="{ minRows: 3, maxRows: 6 }"
      show-word-limit maxlength="200" type="textarea" resize="none" :placeholder="'回复' + nickname + '...'" />
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
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const props = defineProps<{
  nickname: string;
  replyUserId: number;
  isShow: boolean
}>()
const emits = defineEmits<{
  (e: 'modify', commentData: { comment: string; postid: number; parentId: number }): void
}>()

const inputRef = ref();
const addCommentData = ref<string>('');
watch(() => props.isShow, () => {
  if (props.isShow) {
    nextTick(() => {
      inputRef.value.focus()
    })
  }
})
const addComment = () => {
  console.log(addCommentData.value);

  emits('modify', {
    comment: addCommentData.value,
    postid: parseInt(route.query.postid as string),
    parentId: props.replyUserId
  });
}


// const handleBlur = () => {
//   emits('close', false);

// }

</script>
<style lang='less' scoped>
.input-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;

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
</style>