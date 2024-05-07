<template>
  <div class="announcement-container">
    <h2 class="announcement-title">读者寄信</h2>

    <div class="announcement-input">
      <h1 class="announcement-input-title">在此输入:</h1>

      <el-form ref="ruleFormRef" :model="File" status-icon label-width="120px" class="demo-ruleForm">

        <el-form-item label="信件内容" prop="file_content">
            <textarea v-model="File.user_letter_content" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendLetter(ruleFormRef)"  size="small" class="addbutton">发送信件</el-button>
        </el-form-item>
      </el-form>
    </div>

<!--    <div class="announcement-list">-->
<!--      <h2 class="announcement-list-title">信件发送记录</h2>-->
<!--      <el-table :data="Files" style="width: 100%">-->
<!--        <el-table-column align="left" label="时间" prop="time"></el-table-column>-->
<!--        <el-table-column label="信件内容" prop="file_content"></el-table-column>-->
<!--      </el-table>-->
<!--    </div>-->

  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import api from "../../api/index.js";
import {ElMessageBox} from "element-plus";
const Files = reactive([])

onMounted(() => {
  getData()
})
const getData = () => {
  api.getFiles_ad().then(res => {
    Files.splice(0, Files.length)//清空旧数据
    Files.push(...res.data.results)//update,from date results
  })
}
const ruleFormRef = ref()
const File = reactive({
  user_letter_content: "",
})

const  sendLetter = (formEl) =>{
  api.sendLetter(File).then(res => {
    console.log(res)
    formEl.resetFields()
    getData()
    if (res.data.status === 'success')
      handleSuccess()
    else
      handleFault()
  })
}

const handleSuccess = (done) => {
  ElMessageBox.confirm('发送信件成功！请等待回复！').then(() => {
    done();
  })
      .catch(() => {
      });
}

const handleFault = (done) => {
  ElMessageBox.confirm('添加失败！').then(() => {
    done();
  })
      .catch(() => {

      });
}

</script>

<style scoped>
textarea {
    flex: 1;
    height: 150px;
    margin-right: 20px;
    padding: 10px;
    border: 1px solid #b4afaf;
}

.addbutton {
    background-color: #6D9773;
    margin-left: auto;
    width: 100px;
    height: 50px;
    vertical-align:middle;
    text-align: left;
}
</style>