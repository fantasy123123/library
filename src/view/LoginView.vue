<script setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox, textProps } from 'element-plus';
import { useStore } from 'vuex'
import api from "../api";
import { RouterLink, useRouter } from "vue-router";
import characterChart from "../components/characterChart.vue";
import {WarnTriangleFilled} from "@element-plus/icons-vue";
const store = useStore()
const router = useRouter()
const account = ref()
const password = ref()
const number = ref()

const adminLogin = () => {
  store.commit("setStatus", 0)//admin
}

const teacherLogin = () => {
  store.commit("setStatus", 1)//teacher
}

const studentLogin = () => {
  store.commit("setStatus", 2)//student
}

//这里可以使用全局状态管理，例如把管理员登录后状态设为0，学生为2等
const loginButton = () => {
  store.commit("setName", account.value) //点击登录以后获取该用户的name

  //not null
  if (account.value && password.value) {
      console.log(account.value)
      console.log(password.value)
      console.log(store.state.status)
    if (store.state.status == 0)//admin login
      api.getAdminsByAccount(account.value).then(res => {
          console.log(res.data)
        if (res.data.status == 'success') {
          if (password.value == res.data.results[0].admin_password)
            router.push({ path: "/admin" })
          else
            handleError()
        }
        else
          handleError()
      })

    else {
      api.getUserByUsernameToLogin(account.value).then(res => {
        if (res.data.status == 'success') {
          store.commit("setID", res.data.results[0].user_cardID)
          if (password.value == res.data.results[0].user_password) {
            if (store.state.status == 1)
              router.push({ path: "/teachers" })
            if (store.state.status == 2)
              router.push({ path: "/students" })
          }
          else
            handleError()
        }
        else
          handleError()
      })
    }
  }
  //null
  else {
    ElMessage({
      type: 'warning',
      message: '请输入账号和密码',
    })
  }

}

const handleError = () => {
  ElMessage({
    type: 'error',
    message: '账号或密码有误',
  })
}

</script>

<template>
    <div class="container">
        <div style="height: 70%;width: 80%;display: flex;flex-direction: row;background-color: white;box-shadow: 0 0 10px #8d8d8d;border-radius: 20px">
            <div style="width: 70%;height: 100%;">
                <img src="../assets/library_3.jpg" style="width: 100%;height:100%; object-fit: cover;border-top-left-radius: 20px;border-bottom-left-radius: 20px" />
            </div>
            <div style="display: flex;height: 100%; width:30%;justify-content: center;align-items: center;">
                <div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
                    <div>
                        <!-- todo:change it to beautiful txt -->
                        <el-row style="justify-content: center;margin-bottom: 50px">
                            <span style="font-size: 40px">欢迎来到图书管理系统</span>
                        </el-row>

                        <!-- todo:make button move -->
                        <el-row style="justify-content: center;">
                            <el-button @click="adminLogin" size="large" style="margin: 20px;width: 90px;font-size: 18px">管理员</el-button>
                            <el-button @click="teacherLogin" size="large" style="margin:20px;width: 90px;font-size: 18px">老师</el-button>
                            <el-button @click="studentLogin" size="large" style="margin:20px;width: 90px;font-size: 18px">学生</el-button>
                        </el-row>
                        <br />
                        <el-row style="justify-content: center;">
                            <el-input v-model="account" placeholder="请输入账号" class="account_input">
                                <template #prepend>
                                    <el-icon size="20">
                                        <User />
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-row>
                        <el-row style="justify-content: center;">
                            <el-input v-model="password" placeholder="请输入密码" class="password_input">
                                <template #prepend>
                                    <el-icon size="20">
                                        <Lock />
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-row>
                        <el-row style="justify-content: center;">
                            <el-input v-model="number" placeholder="验证码" class="number_input">
                                <template #prepend>
                                    <el-icon size="20">
                                        <WarnTriangleFilled />
                                    </el-icon>
                                </template>
                            </el-input>
                            <img src="../assets/number.jpg" class="img"/>
                        </el-row>
                        <el-row style="justify-content: center;">
                            <div>
                                <el-button type="primary" @click="loginButton" style="margin-top: 20px;width: 300px;height: 50px;font-size: 25px">登录</el-button>
                            </div>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
a {
  text-decoration: none;
}

.container{
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background:url('../assets/backgroundImage.png');
    background-size: 100% 100%;;
    display: flex;
    justify-content: center;
    align-items: center
}

.account_input {
  width: 350px;
  margin-bottom: 30px;
    height: 50px;
}

.password_input {
  width: 350px;
  margin-bottom: 30px;
    height: 50px;
}

.number_input {
  width: 250px;
  margin-bottom: 30px;
    height: 50px;
    margin-right: 10px;
}

.img{
  height: 37px;
  width: 90px;
    margin-top: 5px;
}
</style>
