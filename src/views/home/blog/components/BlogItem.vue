<!--  -->
<template>
  <div class="blogItem">
    <div class="meta-container">
      <div class="user-message">
        <div class="popover-box user-popover">{{ data.nickname }}</div>
      </div>
      <div class="date">{{ dateRes }}</div>
      <div class="tag_list">
        <div class="tag" v-for="(tag, index) in getLabel(data.label as string)" :key="index">
          <a class="tag-btn">{{ tag.label }}</a>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content-main">
        <div class="title-row" v-html="replaceKeywordColor(data.title as string)"></div>
        <div class="abstract" v-html="replaceKeywordColor(data.abstract as string)"></div>
        <div class="action-list">
          <div class="item">
            <i>
              <svg viewBox="0 0 1024 1024" width="1.2em" height="1.2em">
                <path fill="currentColor"
                  d="M897.045333 400.917333A106.346667 106.346667 0 0 0 815.253333 362.666667h-125.589333c19.285333-78.997333 9.749333-158.464-26.24-208.426667A106.944 106.944 0 0 0 576 106.666667c-49.792 0-49.792 46.122667-49.792 79.786666 0 63.850667-0.576 158.976-188.778667 213.162667A106.432 106.432 0 0 0 128 426.666667v341.333333a106.346667 106.346667 0 0 0 191.978667 63.381333A106.133333 106.133333 0 0 0 405.205333 874.666667h355.712a106.496 106.496 0 0 0 104.789334-87.466667l54.378666-298.965333a106.325333 106.325333 0 0 0-23.04-87.317334zM234.666667 832a64.064 64.064 0 0 1-64-64V426.666667a64 64 0 0 1 128 0v341.333333a64.064 64.064 0 0 1-64 64z m643.413333-351.424l-54.378667 298.965333A63.786667 63.786667 0 0 1 760.917333 832H405.205333A63.957333 63.957333 0 0 1 341.333333 768.128V442.773333c226.901333-62.634667 227.541333-188.074667 227.541334-256.32a130.197333 130.197333 0 0 1 2.666666-36.586666A12.266667 12.266667 0 0 1 576 149.333333a63.765333 63.765333 0 0 1 52.842667 29.866667c32 44.416 36.906667 124.010667 12.245333 198.037333A21.376 21.376 0 0 0 661.333333 405.333333h153.92a63.850667 63.850667 0 0 1 62.826667 75.242667z"
                  p-id="2859"></path>
              </svg>
            </i>
            <span>{{ data.vote_count }}</span>
          </div>
          <div class="item">
            <i>
              <IEpChatRound />
            </i>
            <span>{{ data.comment_count }}</span>
          </div>

        </div>
      </div>
      <img v-if="data.cover" class="thumb" :src="'/path/user/md/img/' + data.cover" alt="" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, computed, inject, ComputedRef } from 'vue'

const props = defineProps<{
  data: MdPostObj;
  search?: string;
}>()

const getLabel = (inject('getLabel') as ComputedRef<(value: string) => TagListItem[]>)

const dateRes = computed(() => {
  const ct_date = Date.parse(props.data.create_time as string);
  const stamp = new Date(new Date().setHours(0, 0, 0, 0)).getTime() //获取当天零点的时间
  const subTime = (Date.now() - ct_date) / 1000;
  if (subTime / 60 < 60) {
    //几分钟前
    return Math.ceil(subTime / 60) + '分钟前'
  }
  if (subTime > stamp) {
    return Math.ceil(subTime / (60 * 60)) + '小时前'
  }
  if (subTime / (60 * 60 * 24) < 30) {
    return Math.ceil(subTime / (60 * 60 * 24)) + '天前'
  }
  if (subTime / (60 * 60 * 24 * 30) < 12) {
    return Math.ceil(subTime / (60 * 60 * 24 * 30)) + '月前'
  }
  if (subTime / (60 * 60 * 24 * 30 * 12) > 1) {
    return Math.floor(subTime / (60 * 60 * 24 * 30 * 12)) + '年前'
  }
})

//搜索关键词高亮
function replaceKeywordColor(val: string) {
  if (props.search !== '') {
    var reg = new RegExp(props.search as string, 'gi')
    return val.replace(
      reg, function (text) {
        return '<font color="#f03535">' + text + '</font>';
      }
    )
  } else {
    return val
  }
}

</script>
<style lang='less' scoped>
.blogItem {
  padding: 12px 20px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .meta-container {
    display: flex;
    height: 22px;
    width: 100%;
    color: #86909c;

    .user-message {
      display: flex;
      align-items: center;
      margin-right: 8px;
      max-width: 162px;
      font-size: 13px;
      line-height: 22px;
      color: #4e5969;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;

      .popover-box {
        display: flex;
        align-items: center;
      }

      .popover-box:hover {
        color: #337ecc;
      }
    }

    .date {
      position: relative;
      padding: 0 10px;
      line-height: 22px;
      font-size: 13px;
      flex-shrink: 0;
    }

    .date::before {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      display: block;
      width: 1px;
      height: 14px;
      background: #e5e6eb;
      content: " ";
    }

    .date::after {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      display: block;
      width: 1px;
      height: 14px;
      background: #e5e6eb;
      content: " ";
    }

    .tag_list {
      display: flex;
      align-items: center;


      .tag {
        position: relative;
        flex-shrink: 0;
        font-size: 13px;
        line-height: 22px;
        padding: 0 8px;
        color: #86909c;
        display: flex;
        align-items: center;

        .tag-btn:hover {
          color: #337ecc;
        }
      }

      .tag::after {
        position: absolute;
        right: -1px;
        display: block;
        content: " ";
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: #4e5969;
      }

      .tag:last-child::after {
        content: none;
      }
    }
  }

  .content-wrapper {
    display: flex;
    margin-top: 10px;
    padding-bottom: 12px;
    width: 100%;
    border-bottom: 1px solid rgba(228, 230, 235, 0.5);

    .content-main {
      flex: 1 1 auto;

      .title-row {
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #1d2129;
        width: 100%;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        margin-bottom: 8px;
      }

      .abstract {
        margin-bottom: 10px;
        color: #86909c;
        font-size: 13px;
        line-height: 22px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }

      .action-list {
        position: relative;
        margin-right: 20px;
        font-size: 13px;
        line-height: 20px;
        color: #4e5969;
        flex-shrink: 0;
        display: flex;
        align-items: center;

        .item {
          position: relative;
          margin-right: 20px;
          font-size: 13px;
          line-height: 20px;
          color: #4e5969;
          flex-shrink: 0;
          display: flex;
          align-items: center;

          span {
            margin-left: 4px;
          }

          i {
            display: block;
            width: 16px;
            height: 16px;
            background-size: 100%;
          }
        }

        .item:hover {
          color: #337ecc;
        }
      }
    }

    .thumb {
      flex: 0 0 auto;
      width: 120px;
      height: 80px;
      margin-left: 24px;
      background-color: #fff;
      border-radius: 2px;
    }
  }
}

.blogItem:hover {
  background: #fafafa;
}
</style>