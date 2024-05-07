<script  lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import * as echarts from "echarts"
import 'echarts-wordcloud'
import api from "../api/index.js";
export default{
  name:"FiveChart",
  setup(){
    
onMounted(() => {
  let data = [
    {
      name: '软件工程',
      value: 65
    },
    {
      name: '百年孤独',
      value: 71
    },
    {
      name: '红楼梦',
      value: 58
    },
    {
      name: '三国演义',
      value: 80
    },
    {
      name: '盗墓笔记',
      value: 78
    },
    {
      name: '哈利波特',
      value: 37
    },
    {
      name: '明朝那些事儿',
      value: 83
    },
    {
      name: '人间失格',
      value: 45
    },
    {
      name: '围城',
      value: 29
    },
    {
      name: '老人与海',
      value: 40
    },
    {
      name: '骆驼祥子',
      value: 55
    },
    {
      name: '红星照耀中国',
      value: 95
    },
    {
      name: '把一切献给党',
      value: 85
    },
    {
      name: '狂人日记',
      value: 37
    },
    {
      name: '朝花夕拾',
      value: 20
    },
    {
      name: '傅雷家书',
      value: 40
    },
    {
      name: '毛泽东选集',
      value: 72
    },
    {
      name: '乡土中国',
      value: 49
    },
    {
      name: '千年一叹',
      value: 18
    },
    {
      name: '水浒传',
      value: 10
    },
    {
      name: '钢铁是怎样炼成的',
      value: 50
    },
    {
      name: '丝绸之路：一部全新的世界史',
      value: 43
    },
    {
      name: '巨人的陨落',
      value: 30
    },
    {
      name: '月亮和六便士',
      value: 48
    },
    {
      name: '杀死一只知更鸟',
      value: 68
    },
    {
      name: '小王子',
      value: 15
    },
    {
      name: '活着',
      value: 89
    },
    {
      name: '简爱',
      value: 56
    },
    {
      name: '追风筝的人',
      value: 44
    },
  ]
 
    initWordCloud(data)

})
// 初始化词云
const initWordCloud = (data: any, max = 72) => {
  var elementById = document.getElementById("wordcloudRef");
  //@ts-ignore
  var myChart = echarts.init(elementById);
  const option = {
    title: {
      text: '关键词',
      show: false
    },
    tooltip: {},
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      left: 'center',
      top: 'center',
      width: '80%',
      height: '75%',
      right: null,
      bottom: null,
      sizeRange: [14, max],
      rotationRange: [-45, 45],
      rotationStep: 15, // 0 15 30 45 度倾斜
      gridSize: 12,
      drawOutOfBound: false,
      
      // 这是全局的文字样式，相对应的还可以对每个词设置字体样式
      textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        // 颜色可以用一个函数来返回字符串
        color: function () {
          // Random color
          return 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')';
        },
        emphasis: {
          shadowBlur: 2,
          shadowColor: '#333'
        }
      },
      // Data is an array. Each array item must have name and value property.
      data: data
    }]
  }
  option && myChart.setOption(option);
  window.addEventListener("resize", () => {
    if (myChart) {
      myChart.resize();
    }
  });
}

  }
}

</script>

<template>
  <div ref="wordcloudRef" class="wordcloud" id="wordcloudRef"></div>
</template>

<style lang="scss" scoped>
.wordcloud {
  width: 100%;
  height: 100%;
}
</style>
