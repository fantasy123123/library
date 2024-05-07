<template>
  <div>
    <h2>公告列表</h2>
    <el-table :data="announcement" style="margin: 20px auto;">
      <el-table-column label="时间" prop="admin_info_send_time" />
      <el-table-column label="标题" prop="admin_info_title" />
      <el-table-column label="详情" prop="admin_info_content"/>
<!--        <template slot-scope="scope">-->
<!--          <el-button type="text" @click="viewAnnouncement(scope.row)">-->
<!--            查看-->
<!--          </el-button>-->
<!--        </template>-->

    </el-table>
<!--    <el-dialog :visible="dialogVisible" @close="dialogVisible = false">-->
<!--      <h2>{{ currentAnnouncement.title }}</h2>-->
<!--      <p>{{ currentAnnouncement.content }}</p>-->
<!--    </el-dialog>-->
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import api from "../../api/index";

const announcement = reactive([])

onMounted(() => {
  getData()
})

const getData = () => {
  api.getAnnouncement().then(res => {
    announcement.splice(0, announcement.length)//清空旧数据
    announcement.push(...res.data.results)//update,from date results
  })
}


</script>

<style scoped>

</style>
