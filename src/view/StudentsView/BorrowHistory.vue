<template>
  <div style="margin: 0 auto;width: 95%;">
      <h1 style="font-size: 30px">借阅历史</h1>

    <el-table :data="history" style="margin: 20px auto;">
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
import { ElMessage, ElMessageBox } from 'element-plus';
import api from "../../api/index";
import { useStore } from 'vuex'
const store1 = useStore()

const student_id = store1.state.id

const history = reactive([])

onMounted(() => {
  getData()
})


//初始得到数据
const getData = () => {

  api.getStudentsHistory(student_id).then(res => {
    history.splice(0,history.length)
    history.push(...res.data.results)
  })
}



</script>








<style scoped>
.input-with-select {
  width: 300px;
  background-color: var(--el-fill-color-blank);
}

.addButton {
  margin: 8px;
}
</style>