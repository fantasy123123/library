<script  lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import api from "../api/index.js";
export  default {
  name:"OneChart",
  setup(){
    //柱状图
    const barChart = ref<HTMLElement>();
    const myChart = ref<any>();
    function initBarEcharts() {
       var elementById = document.getElementById("barChart1");
       //@ts-ignore
        myChart.value = echarts.init(elementById);
        myChart.value.setOption({
          title: {
            top:'5px',
            text: '借阅数量',
            left: 'center'
          },
          xAxis: {
            type: 'category',
            data: ["2022.10","2022.11","2022.12","2023.1","2023.2","2023.3","2023.4",]
          },
          yAxis: {
            type: 'value'
          },
          grid: {
            left: '10%',
            top: 60,
            right: 20,
            bottom: 30,
            containLabel: true // 调整图表容器的大小以适应更长的柱状图
          },
          series: [
            {
              data: [1403,1200,1021,942,1123,1028,1326],
              type: 'bar',
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              },
              barWidth: '60%', // 调整柱子宽度
              barHeight: '80%', // 调整柱子高度

            }
          ],
          tooltip: {
            show: true
          }
        });
    }

    onMounted(() => {
      initBarEcharts();
    });


  }
}

</script>
<template>
  <div ref="barChart1" id="barChart1"></div>
</template>
<style scoped>

#barChart1 {
  background-color: #fff;
  width: 720px;
}

</style>