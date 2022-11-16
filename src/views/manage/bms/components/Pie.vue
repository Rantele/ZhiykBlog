<!--  -->
<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  data: {}[]
  id: string
}>()

//watch -> data
watch(() => props.data, () => {
  initPie();
})

//echart Init
let myChart: echarts.ECharts;
const initPie = () => {
  let arr: {}[] = [];
  if (props.data.length === 0) {
    arr = [
      { name: '无数据', value: 0 }
    ]
  } else {
    arr = props.data.map((item: { [key: string]: string; }) => ({ name: item.name, value: item.value }));
  }

  //初始化实例
  if (!myChart) {
    myChart = echarts.init(document.getElementById(props.id) as HTMLElement);
  }
  //配置图表的配置项和数据
  let option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '文章类型数据',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: arr
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