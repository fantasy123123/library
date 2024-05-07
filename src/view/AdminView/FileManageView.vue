<template>
  <div class="announcement-list">
    <h2 class="announcement-list-title">读者来信记录</h2>
    <el-table :data="files" style="width: 100%">
      <el-table-column align="left" label="时间" prop="user_letter_send_time"></el-table-column>
      <el-table-column label="信件内容" prop="user_letter_content"></el-table-column>
<!--      <el-table-column align="right" label="操作" width="200px">-->
<!--        <template #default="scope">-->

<!--          <el-button size="small" type="danger" @click="deleteButton(scope.$index, scope.row)">-->
<!--            删除-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
  </div>

</template>

<script setup>


//编辑表单
import {onMounted, reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import api from "../../api/index.js";

const edit_dialog_visible = ref(false)



const files = reactive([])

onMounted(() => {
  getData()
})

const getData = () => {
  api.getFiles_ad().then(res => {
    files.splice(0, files.length)//清空旧数据
    files.push(...res.data.results)//update,from date results
  })
}

const file_form = reactive({
  letter_send_time: "",
  letter_content: "",
})
const handleEdit = (index, scope) => {
  for (let key in scope) {
    file_form[key] = scope[key]
  }
  edit_dialog_visible.value = true
}
//删除表中内容
const deleteButton = (index, scope) => {
  ElMessageBox.confirm(
      '确认删除？',
      '警告，不可逆',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        api.deleteLetter(scope.letter_content).then(() => {
          getData()
        })
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '删除取消',
        })
      })
}

const handleClose = (done) => {
  ElMessageBox.confirm('确认关闭？').then(() => {
    done();
  })
      .catch(() => {

      });
}

const resetForm = (formEl) => {
  formEl.resetFields()
}


// const submitEditForm = (formEl) => {
//   api.pushFile_ad(file_form.file_time, file_form).then((res) => {
//     formEl.resetFields()
//     edit_dialog_visible.value = false
//     getData()
//   })
// }
</script>

<style scoped>

</style>