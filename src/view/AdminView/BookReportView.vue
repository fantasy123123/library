<script setup lang="ts">
import FourChart from "../../components/fourChart.vue";
import TwoChart from "../../components/TwoChart.vue";
import ThreeChart from "../../components/ThreeChart.vue";
import FiveChart from "../../components/FiveChart.vue";
import OneChart from "../../components/OneChart.vue";
import CharacterChart from "../../components/characterChart.vue";
</script>

<template>
  <div style="margin: 0 auto;width: 96%;">
    <h1 style="text-align: left;">图书报表</h1>
    <div class="area1">
      <div class="container1">
        <FiveChart/>
      </div>
    </div>
    <div class="area2">
      <OneChart/>
      <TwoChart/>
    </div>
    <div class="area3">
      <ThreeChart/>
      <div class="side1">
        <character-chart/>
      </div>
    </div>
    <div class="area4">
        <FourChart/>
    </div>
  </div>
</template>

<style scoped>
.side1{
  width: 650px;
  background-color: white;
  margin: 20px;

}
.area1 {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  background-color: #eff0f6;
}

.area2 {
  position: relative;
  display: flex;
  box-sizing: border-box;
  /* justify-content: center;
    align-items: center; */
  width: 100%;
  height: 400px;
  background-color: #eff0f6;
  padding: 20px;
  justify-content: space-around;
}

.area3 {
  position: relative;
  display: flex;
  width: 100%;
  height: 510px;
  background-color: #eff0f6;
  padding: 20px;
  box-sizing: border-box;
  justify-content: space-around;
}

.area4 {
  position: relative;
  display: flex;
  width: 100%;
  height: 500px;
  background-color: #eff0f6;
  padding: 20px;
  box-sizing: border-box;
}

.container1 {
  position: absolute;
  top: 25px;

  display: flex;
  width: 96%;
  height: 94%;
  background-color: white;
}

</style>
