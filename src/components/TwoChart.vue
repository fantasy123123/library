<script  lang="ts">
import * as echarts from 'echarts';
import {onMounted, ref} from 'vue';
import api from "../api/index.js";
import {error} from "echarts/types/src/util/log";
//饼状图
const barChart = ref<HTMLElement>();
const myChart = ref<any>();
// 前端接受数组对象
let list = [];
//对象数组
// data: [
//   { value: 1048, name: '学生' },
//   { value: 735, name: '老师' },
//
// ], 

export default {
  name:"TwoChart",
  setup(){
    function initBarEcharts() {
      // api.bingtu("bingtu").then(res => {
      // console.log("bingtu数据", res.data)
      // list = res.data
      var elementById = document.getElementById("barChart2");
       //@ts-ignore
        myChart.value = echarts.init(elementById);
      myChart.value.setOption({
      title: {
        top:'5px',
        text: '借阅比例',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: 
      [
        {
          name: 'Access From',
          type: 'pie',
          radius: '75%',
          //========================================
          data: [
            { value: 1250, name: '学生' },
            { value: 431, name: '老师' },``
          ], 
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }

    onMounted(() => {
      initBarEcharts();
    });
  }
}


</script>
<template>
  <div ref="barChart2" id="barChart2"></div>
</template>
<style scoped>

#barChart2 {
  background-color: #fff;
  width: 400px;
}

</style>