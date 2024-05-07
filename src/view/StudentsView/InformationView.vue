<!--<template>-->
<!--    <div class="comment-container">-->
<!--      <h2 class="comment-title">用户咨询</h2>-->
<!--      <div class="comment">-->
<!--        <h2 class="comment-input-title">咨询区</h2>-->
<!--        <form class="comment-form" @submit.prevent="addComment">-->
<!--          <textarea v-model="state.newComment"></textarea>-->
<!--          <el-button type="primary" native-type="submit" class="comment-submit-btn">咨询</el-button>-->
<!--        </form>-->
<!--        <ul class="comment-list">-->
<!--          <li v-for="(comment, index) in state.comments" :key="index" class="comment-item">-->
<!--            <span class="comment-content">{{ comment }}</span>-->
<!--            <el-button class="comment-delete-btn" size="mini" type="danger" @click="deleteComment(index)">删除</el-button>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->

<!--  <div class="question-list">-->
<!--    <h2 class="question-list-title">咨询记录</h2>-->
<!--    <el-table :data="questions" style="width: 100%">-->
<!--      <el-table-column align="left" label="姓名" prop="username"></el-table-column>-->
<!--      <el-table-column label="咨询内容" prop="question"></el-table-column>-->
<!--      <el-table-column label="回答" prop="answer"></el-table-column>-->
<!--    </el-table>-->
<!--  </div>-->
<!--</template>-->


<!--<script>-->
<!--import { reactive, ref, onMounted } from "vue";-->
<!--import { ElMessage, ElMessageBox } from 'element-plus';-->
<!--import { Search } from '@element-plus/icons-vue';-->
<!--import api from "../../api/index";-->


<!--  export default {-->
<!--    setup() {-->

<!--      const state = reactive({-->
<!--        comments: [],-->
<!--        newComment: '',-->
<!--        username : 'student',-->
<!--      })-->
<!--      const questions = reactive([])-->

<!--      onMounted(() => {-->
<!--        getData()-->
<!--      })-->
<!--      const getData = () => {-->
<!--        api.getQuestions().then(res => {-->
<!--          questions.splice(0, questions.length)//清空旧数据-->
<!--          questions.push(...res.data.results)//update,from date results-->
<!--        })-->
<!--      }-->
<!--      const addComment = (formEl) => {-->
<!--        if (state.newComment) {-->
<!--          state.comments.push(state.newComment)-->
<!--          state.newComment = ''-->
<!--        }-->

<!--        api.pushQuestion(state.newComment , state.username ).then(res => {-->
<!--          console.log(res)-->
<!--          add_dialog_visible.value = false-->
<!--          formEl.resetFields()-->
<!--          getData()-->
<!--          if (res.data.status === 'success')-->
<!--            handleSuccess()-->
<!--          else-->
<!--            handleFault()-->
<!--        })-->
<!--      }-->

<!--      const handleSuccess = (done) => {-->
<!--        ElMessageBox.confirm('添加成功！').then(() => {-->
<!--          done();-->
<!--        })-->
<!--            .catch(() => {-->

<!--            });-->
<!--      }-->
<!--      const handleFault = (done) => {-->
<!--        ElMessageBox.confirm('添加失败！').then(() => {-->
<!--          done();-->
<!--        })-->
<!--            .catch(() => {-->

<!--            });-->
<!--      }-->

<!--      const deleteComment = index => {-->
<!--        api.deleteQuestions(index)-->
<!--            .then(() => {-->
<!--              state.comments = state.comments.filter((comment, idx) => idx !== index)-->
<!--            })-->
<!--            .catch(error => console.log(error))-->
<!--        state.comments.splice(index, 1)-->
<!--      }-->

<!--      return {-->
<!--        questions,-->
<!--        state,-->
<!--        addComment,-->
<!--        deleteComment-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--</script>-->

<!--<style scoped>-->
<!--.announcement-container {-->
<!--  max-width: 800px;-->
<!--  margin: 0 auto;-->
<!--  padding: 20px;-->
<!--  background-color: #f8f8f8;-->
<!--  box-shadow: 0 0 10px rgba(0, 0, 0, .2);-->
<!--}-->

<!--.announcement-title {-->
<!--  font-size: 24px;-->
<!--  font-weight: bold;-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.announcement-input {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.announcement-input-title {-->
<!--  font-size: 18px;-->
<!--  font-weight: bold;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.announcement-input .el-input {-->
<!--  width: 100%;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.announcement-input .el-button {-->
<!--  margin-left: 10px;-->
<!--}-->

<!--.question-list {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.question-list-title {-->
<!--  font-size: 18px;-->
<!--  font-weight: bold;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.comment-container {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.comment-title {-->
<!--  font-size: 24px;-->
<!--  font-weight: bold;-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.comment {-->
<!--  width: 100%;-->
<!--  margin-bottom: 20px;-->
<!--  border: 1px solid #e6e6e6;-->
<!--  background: #fff;-->
<!--}-->

<!--.comment-input-title {-->
<!--  font-size: 18px;-->
<!--  font-weight: bold;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.comment-form {-->
<!--  display: flex;-->
<!--  margin: 20px;-->
<!--}-->

<!--.comment-form textarea {-->
<!--  flex: 1;-->
<!--  height: 50px;-->
<!--  margin-right: 20px;-->
<!--  padding: 10px;-->
<!--  border: 1px solid #e6e6e6;-->
<!--}-->

<!--.comment-submit-btn {-->
<!--    background-color: #6D9773;-->
<!--    margin-left: auto;-->
<!--    width: 100px;-->
<!--    height: 50px;-->
<!--    vertical-align:middle;-->
<!--    text-align: left;-->
<!--}-->

<!--.comment-list {-->
<!--  list-style: none;-->
<!--  margin: 0;-->
<!--  padding: 0 20px;-->
<!--}-->

<!--.comment-item {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  margin-bottom: 10px;-->
<!--  padding: 10px;-->
<!--  border: 1px solid #e6e6e6;-->
<!--  border-radius: 3px;-->
<!--}-->

<!--.comment-content {-->
<!--  flex: 1;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.comment-delete-btn {-->
<!--  height: 30px;-->
<!--  width: 60px;-->
<!--  font-size: 12px;-->
<!--  margin-left: 10px;-->
<!--}-->


<!--</style>-->

<!-- <template>
    <div class="comment-container">
      <h2 class="comment-title">用户咨询</h2>
      <div class="comment">
        <h2 class="comment-input-title">咨询区</h2>
        <form class="comment-form" @submit.prevent="addComment">
          <textarea v-model="state.newComment"></textarea>
          <el-button type="primary" native-type="submit" class="comment-submit-btn">咨询</el-button>
        </form>
        <ul class="comment-list">
          <li v-for="(comment, index) in state.comments" :key="index" class="comment-item">
            <span class="comment-content">{{ comment }}</span>
            <el-button class="comment-delete-btn" size="mini" type="danger" @click="deleteComment(index)">删除</el-button>
          </li>
        </ul>
      </div>
    </div>

  <div class="question-list">
    <h2 class="question-list-title">咨询记录</h2>
    <el-table :data="questions" style="width: 100%">
      <el-table-column align="left" label="姓名" prop="username"></el-table-column>
      <el-table-column label="咨询内容" prop="question"></el-table-column>
      <el-table-column label="回答" prop="answer"></el-table-column>
    </el-table>
  </div>
</template>


<script>
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import api from "../../api/index";


  export default {
    setup() {

      const state = reactive({
        comments: [],
        newComment: '',
        username : 'student',
      })
      const questions = reactive([])

      onMounted(() => {
        getData()
      })
      const getData = () => {
        api.getQuestions().then(res => {
          questions.splice(0, questions.length)//清空旧数据
          questions.push(...res.data.results)//update,from date results
        })
      }
      const addComment = (formEl) => {
        if (state.newComment) {
          state.comments.push(state.newComment)
          state.newComment = ''
        }

        api.pushQuestion(state.newComment , state.username ).then(res => {
          console.log(res)
          add_dialog_visible.value = false
          formEl.resetFields()
          getData()
          if (res.data.status === 'success')
            handleSuccess()
          else
            handleFault()
        })
      }

      const handleSuccess = (done) => {
        ElMessageBox.confirm('添加成功！').then(() => {
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

      const deleteComment = index => {
        api.deleteQuestions(index)
            .then(() => {
              state.comments = state.comments.filter((comment, idx) => idx !== index)
            })
            .catch(error => console.log(error))
        state.comments.splice(index, 1)
      }

      return {
        questions,
        state,
        addComment,
        deleteComment
      }
    }
  }

</script>

<style scoped>
.announcement-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
}

.announcement-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.announcement-input {
  margin-bottom: 20px;
}

.announcement-input-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.announcement-input .el-input {
  width: 100%;
  margin-bottom: 10px;
}

.announcement-input .el-button {
  margin-left: 10px;
}

.question-list {
  margin-bottom: 20px;
}

.question-list-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.comment-container {
  margin-bottom: 20px;
}

.comment-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.comment {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #e6e6e6;
  background: #fff;
}

.comment-input-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.comment-form {
  display: flex;
  margin: 20px;
}

.comment-form textarea {
  flex: 1;
  height: 50px;
  margin-right: 20px;
  padding: 10px;
  border: 1px solid #e6e6e6;
}

.comment-submit-btn {
  height: 50px;
  width: 100px;
}

.comment-list {
  list-style: none;
  margin: 0;
  padding: 0 20px;
}

.comment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
}

.comment-content {
  flex: 1;
  margin-right: 10px;
}

.comment-delete-btn {
  height: 30px;
  width: 60px;
  font-size: 12px;
  margin-left: 10px;
}


</style> -->

<template>
    <div class="announcement-container">

        <el-form ref="ruleFormRef" :model="announcement_form" status-icon label-width="120px" class="demo-ruleForm">
            <h1 class="announcement-input-title">请输入用户名:</h1>
            <el-form-item label="用户名" prop="qa_username" style="margin-right: 19px;">
                <el-input v-model="announcement_form.qa_username" autocomplete="off" />
            </el-form-item>
            <h1 class="announcement-input-title">请输入咨询内容:</h1>
            <el-form-item label="咨询内容" prop="qa_question">
                <textarea v-model="announcement_form.qa_question" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button class="addbutton" type="primary" @click="sendFile(ruleFormRef)">提交</el-button>
            </el-form-item>
        </el-form>

        <div class="announcement-list">
            <h2 class="announcement-list-title">用户咨询记录</h2>
            <el-table :data="Announcement" style="width: 100%">
                <el-table-column align="left" label="用户名" prop="qa_username"></el-table-column>
                <el-table-column  label="咨询内容" prop="qa_question"></el-table-column>
                <el-table-column label="咨询回复" prop="qa_answer"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import api from "../../api/index.js";
import {ElMessageBox} from "element-plus";

const Announcement = reactive([])
const ruleFormRef = ref()

onMounted(() => {
    getData()
})
const getData = () => {
    api.getqaReply().then(res => {
        Announcement.splice(0, Announcement.length)//清空旧数据
        Announcement.push(...res.data.results)//update,from date results
    })
}

const announcement_form = reactive({
    qa_username: "",
    qa_question:"",
    //qa_answer: ""
})

const  sendFile = (formEl) =>{
    api.pushqaReply(announcement_form).then(res => {
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
    ElMessageBox.confirm('添加成功！').then(() => {
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
    text-align: left;
    justify-content: flex-end;
    margin-left: auto;
}
</style>