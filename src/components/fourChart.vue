<script  lang="ts">
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
export default {
  name:"FourChart",
  setup(){
    const barChart = ref<HTMLElement>();
    const myChart = ref<any>();
    
let dataAxis = ['自动化学院', '数学与统计学院', '电子信息学院', '法学院', 
                '计算机学院', '商学院', '公共管理学院', '湘雅医学院',
                '物理与电子学院','土木工程学院','物理与电子学院', 
                '交通运输工程学院', '机电工程学院', '体育教研部'];
// prettier-ignore
let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122];
let yMax = 500;
let dataShadow = [];
for (let i = 0; i < data.length; i++) {
    // @ts-ignore
  dataShadow.push(yMax);
}

function initBarEcharts() {
  var elementById = document.getElementById("barChart4");
    //@ts-ignore
    myChart.value = echarts.init(elementById);
    myChart.value.setOption({
      title: {
        top:'15px',
        text: '各学院借阅情况',
        left:'center'
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          color: '#fff'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#999'
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        {
          type: 'bar',
          barWidth: '75%', // 调整柱子宽度
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
          data: data
        }
      ]
    });

  // @ts-ignore
  //柱状图

  const zoomSize = 6;
  myChart.value.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.value.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
          dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
  });
}

onMounted(() => {
  initBarEcharts();
});
  }
}


</script>
<template>
  <div ref="barChart" id="barChart4"></div>
</template>
<style scoped>
#barChart4 {
  background-color: #fff;
  width: 120%;
  height: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
</style>

