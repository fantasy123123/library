<template>
  <div style="margin: 0 auto;width: 95%;">
      <h1 style="font-size: 30px">借阅历史</h1>

    <el-table :data="history1" style="margin: 20px auto;">
      <el-table-column label="用户名" prop="requests_username" />
      <el-table-column label="借阅书名" prop="requests_book_name" />
      <el-table-column label="借阅时间" prop="requests_requestdate" />
      <el-table-column label="借阅状态" prop="requests_status" />
      <el-table-column label="书号" prop="requests_book_id" />
    </el-table>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import api from "../../api/index";
import {useStore} from "vuex";
const store2 = useStore()

const teacher_id = store2.state.id


const history1 = reactive([])

onMounted(() => {
  getData()
})


//初始得到数据
const getData = () => {

  api.getTeachersHistory(teacher_id).then(res => {
    history1.splice(0,history1.length)
    history1.push(...res.data.results)
  })
}

</script>

<style scoped>

</style>