<template>
    <div style="margin: 0 auto;width: 95%;">
        <div class="comment-container">
            <h1 style="font-size: 30px">用户咨询</h1>
            <div class="comment">
                <h2 class="comment-input-title">咨询区</h2>
                <form class="comment-form" @submit.prevent="addComment">
                    <textarea v-model="state.newComment"></textarea>
                    <el-button type="primary" size="large" native-type="submit" class="comment-submit-btn">咨询</el-button>
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
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

.comment-container {
  margin-bottom: 50px;
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
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
    margin-left: 20px;
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
    background-color: #4a9dfa;
    text-align: center;
    justify-content: center;
    font-size: 20px;
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



</style>