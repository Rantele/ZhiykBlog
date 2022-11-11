<!--  -->
<template>
  <div class="essays-container">
    <a href="javascript:;" class="link" @click.prevent="toBlog">
      <div class="essay-list">
        <div class="first-line">
          <span class="title">{{data.title}}</span>
          <div class="byte-dropdown" @click.stop>
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon>
                  <IEpMoreFilled />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click.stop="handleEdit">编辑</el-dropdown-item>
                  <el-dropdown-item @click.stop="handleDelete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="infos">
          <span>{{data.create_time}}</span>
          <span class="split-line"></span>
          <span>{{data.vote_count}}点赞</span>
          <span class="dot">·</span>
          <span>{{data.comment_count}}评论</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
//接收父组件传递的数据
const props = defineProps<{
  data: MdPostObj;
  index: number;
}>()

const emits = defineEmits<{
  (e: 'delete', id: number, blogid: number, index: number): void
}>()

//跳转到文章内容页面
const toBlog = () => {
  console.log('跳转到文章内容页');
}

//点击编辑按钮
const handleEdit = () => {
  router.push({ name: 'editorBlog', params: { id: props.data.id } });
}

//点击删除按钮
const handleDelete = () => {
  emits('delete', props.data.id as number, props.data.blogid as number, props.index);
}

</script>
<style lang='less' scoped>
.essays-container {
  .link {
    display: block;
    padding: 0 20px;
    text-decoration: none;
    cursor: pointer;
    color: #909090;

    .essay-list {
      box-sizing: border-box;
      width: 100%;
      padding: 16px 0;
      border-bottom: 1px solid #e5e6eb;

      .first-line {
        position: relative;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;

        .title {
          max-width: calc(100% - 20px);
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: #1d2129;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: auto;
        }

        .byte-dropdown {
          display: inline-block;
        }
      }

      .infos {
        font-weight: 400;
        font-size: 14px;
        height: 22px;
        line-height: 22px;
        display: flex;
        align-items: center;
        color: #86909c;

        .split-line {
          height: 14px;
          width: 0;
          border-left: 1px solid #e5e6eb;
          margin: 0 16px;
        }

        .dot {
          margin: 0 6px;
        }
      }
    }
  }

  .link:hover {
    background: #fafafa;
  }

}
</style>