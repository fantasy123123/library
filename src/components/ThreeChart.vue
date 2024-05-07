<script  lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import api from "../api/index.js";
const barChart = ref<HTMLElement>();
const myChart = ref<any>();
export default{
  name:"ThreeChart",
  setup(){
    //花图
let list=[];
    //接受对象数组
    // { value: 40, name: 'rose 1' },
    // { value: 38, name: 'rose 2' },
    // { value: 32, name: 'rose 3' },
    // { value: 30, name: 'rose 4' },
    // { value: 28, name: 'rose 5' },
    // { value: 26, name: 'rose 6' },
    // { value: 22, name: 'rose 7' },
    // { value: 18, name: 'rose 8' }
    // ]
function initBarEcharts() {
      // @ts-ignore
      var elementById = document.getElementById("barChart3");
      //@ts-ignore
      myChart.value = echarts.init(elementById);
      myChart.value.setOption({
        title: {
            top:'5px',
            text: '最受欢迎书籍类型',
            left: 'center'
          },
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
          mark: { show: true },
         }
       },
       series: [
         {
           name: 'Nightingale Chart',
           type: 'pie',
           radius: [20, 200],
           center: ['50%', '50%'],
           roseType: 'area',
           itemStyle: {
             borderRadius: 8
           },
           data: [
            { value: 40, name: '科普读物' },
            { value: 38, name: '文学杂志' },
            { value: 32, name: '玄幻小说' },
            { value: 30, name: '绘本图册' },
            { value: 28, name: '时尚杂志' },
            { value: 26, name: '幼儿绘本' },
            { value: 22, name: '学术杂志' },
            { value: 18, name: '专业教材' }
           ]
         }
       ]
     });

}
onMounted(() => {
  initBarEcharts();
});

  }
}


</script>
<template>
  <div ref="barChart" id="barChart3"></div>
</template>
<style scoped>

#barChart3 {
  background-color: #fff;
  width: 100%;
  
}

</style>