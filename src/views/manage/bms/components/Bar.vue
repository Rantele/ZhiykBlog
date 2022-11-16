<!--  -->
<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  data: {}
  id: string
}>()

//watch -> data
watch(() => props.data, () => {
  initBar();
})

//echart Init
let myChart: echarts.ECharts;
const initBar = () => {
  //初始化实例
  if (!myChart) {
    myChart = echarts.init(document.getElementById(props.id) as HTMLElement);
  }
  //配置图表的配置项和数据
  let option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b0} <br/>文章数量：{c0}',

      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    xAxis: {
      name: '日期',
      type: 'category',
      data: Object.keys(props.data),
      axisLabel: {
        rotate: 30
      }
    },
    yAxis: {
      type: 'value',
      name: '文章量'
    },
    series: [
      {
        data: Object.values(props.data),
        type: 'bar',
        emphasis: {
          focus: 'series'
        },

      },
      {
        data: Object.values(props.data),
        type: 'line',

      }
    ]
  };
  //使用配置项和数据显示图表
  myChart.setOption(option)
  nextTick(() => {
    myChart.resize()
  })
}
</script>
<style lang='less' scoped>

</style>