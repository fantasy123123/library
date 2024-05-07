<script  lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import api from "../api/index.js";
export  default {
  name:"characterChart",
  setup(){
    //字体描边动画
    const barChart = ref<HTMLElement>();
    const myChart = ref<any>();
    function initBarEcharts() {
      var elementById = document.getElementById("barChart6");
      //@ts-ignore
      myChart.value = echarts.init(elementById);
      myChart.value.setOption({
        graphic: {
          elements: [
            {
              type: 'text',
              left: 'center',
              backgroundColor:'',
              top: 'center',
              style: {
                text: 'Book Hive',
                fontSize: 80,
                fontWeight: 'bold',
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: 'transparent',
                stroke: '#FFBA00',
                lineWidth: 1
              },
              keyframeAnimation: {
                duration: 3000,
                loop: true,
                keyframes: [
                  {
                    percent: 0.7,
                    style: {
                      fill: 'transparent',
                      lineDashOffset: 200,
                      lineDash: [200, 0]
                    }
                  },
                  {
                    // Stop for a while.
                    percent: 0.7,
                    style: {
                      fill: 'transparent'
                    }
                  },
                  {
                    percent: 1,
                    style: {
                      fill: '#D8A67D'
                    }
                  }
                ]
              }
            }
          ]
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
  <div ref="barChart6" id="barChart6"></div>
</template>
<style scoped>

#barChart6 {
  background-color: #fff;
  width: 100%;
  height: 100%;
}

</style>
