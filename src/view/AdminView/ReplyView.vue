<!--<template>-->
<!--  <div class="question-list">-->
<!--    <h2 class="question-list-title">咨询记录</h2>-->
<!--    <el-table :data="questions" style="width: 100%">-->
<!--      <el-table-column align="left" label="姓名" prop="username"></el-table-column>-->
<!--      <el-table-column label="咨询内容" prop="question"></el-table-column>-->
<!--      <el-table-column label="回答" prop="answer"></el-table-column>-->
<!--      <el-table-column label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="primary" @click="handleReply(scope.$index, scope.row)">回复</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->


<!--    <el-dialog title="咨询回复" v-model="reply_dialog" width="30%" :before-close="handleClose">-->
<!--      <el-form ref="replyFormRef" :model="reply_form" status-icon label-width="120px" class="demo-ruleForm">-->
<!--        <el-form-item label="用户名" prop="username">-->
<!--          <el-input v-model="reply_form.username" autocomplete="off" disabled />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="回复" prop="reply">-->
<!--          <el-input v-model="reply_form.reply" autocomplete="off" />-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button @click="resetForm(editFormRef)">重置</el-button>-->
<!--          <el-button type="primary" @click="submitEditForm(editFormRef)">提交</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->
<!--<script setup>-->

<!--import { reactive, ref, onMounted } from "vue";-->
<!--import { ElMessage, ElMessageBox } from 'element-plus';-->
<!--import { Search } from '@element-plus/icons-vue';-->
<!--import api from "../../api/index";-->

<!--const questions = reactive([])-->
<!--const reply_form = reactive({-->
<!--  username: " ",-->
<!--  answer: " "-->
<!--})-->


<!--const getData = () => {-->
<!--  api.getQuestions_ad().then(res => {-->
<!--    questions.splice(0, questions.length)//清空旧数据-->
<!--    questions.push(...res.data.results)//update,from date results-->
<!--  })-->
<!--}-->

<!--const reply_dialog = ref(false)-->
<!--const editFormRef = ref()-->
<!--const resetForm = (formEl) => {-->
<!--  formEl.resetFields()-->
<!--}-->

<!--const handleReply = (index, scope) => {-->
<!--  for (let key in scope) {-->
<!--    reply_form[key] = scope[key]-->
<!--  }-->
<!--  reply_dialog.value = true-->
<!--}-->
<!--const submitEditForm = (formEl) => {-->
<!--  //API-->
<!--   api.putReply(reply_form.username, reply_form).then((res) => {-->
<!--    formEl.resetFields()-->
<!--    reply_dialog.value = false-->
<!--    getData()-->
<!--  })-->
<!--}-->



<!--const handleClose = (done) => {-->
<!--  ElMessageBox.confirm('确认关闭？').then(() => {-->
<!--    done();-->
<!--  })-->
<!--      .catch(() => {-->

<!--      });-->
<!--}-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
<template>
    <div style="margin: 0 auto;width: 95%;">
        <h1 class="question-list-title" style="font-size: 30px">咨询记录</h1>
        <el-table :data="questions" style="width: 100%">
            <el-table-column align="left" label="姓名" prop="qa_username"></el-table-column>
            <el-table-column label="咨询内容" prop="qa_question"></el-table-column>
            <el-table-column label="回答" prop="qa_answer"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleReply(scope.$index, scope.row)">
                        回复
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog title="咨询回复" v-model="reply_dialog" width="30%" :before-close="handleClose">
            <el-form ref="editFormRef" :model="reply_form" status-icon label-width="120px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="qa_username">
                    <el-input v-model="reply_form.qa_username" autocomplete="off" disabled />
                </el-form-item>
                <el-form-item label="回复" prop="qa_answer">
                    <el-input v-model="reply_form.qa_answer" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm(editFormRef)">重置</el-button>
                    <el-button type="primary" @click="submitEditForm(editFormRef)">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script setup>

import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import api from "../../api/index";

const questions = reactive([])
const reply_form = reactive({
    qa_id: "",
    qa_username: " ",
    qa_answer: " "
})

onMounted(() => {
    getData()
})

const getData = () => {
    api.getqaReply().then(res => {
        questions.splice(0, questions.length)//清空旧数据
        questions.push(...res.data.results)//update,from date results
    })
}

const reply_dialog = ref(false)
const editFormRef = ref()
const resetForm = (formEl) => {
    formEl.resetFields()
}

const handleReply = (index, scope) => {
    for (let key in scope) {
        reply_form[key] = scope[key]
    }
    reply_dialog.value = true
}
const submitEditForm = (formEl) => {
    //API
    api.putqaReply(reply_form.qa_id, reply_form).then((res) => {
        formEl.resetFields()
        reply_dialog.value = false
        getData()
    })
}



const handleClose = (done) => {
    ElMessageBox.confirm('确认关闭？').then(() => {
        done();
    })
        .catch(() => {

        });
}

</script>

<style scoped>

</style>