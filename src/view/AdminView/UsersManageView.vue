<script setup>

//use setup language style
//import packages
import {reactive, ref, onMounted} from "vue";
import {ElMessage, ElMessageBox} from 'element-plus';
import {Search} from '@element-plus/icons-vue';
import api from "../../api/index";
// import axios from 'axios'

const users = reactive([])
const user_login_form = reactive({
  user_login_cardID: "",
  user_login_username: "",
  user_login_password: "",
  user_login_role: "",
  user_login_money: ""
})

//mouthed , life hook
onMounted(() => {
  getData()
})

//页面初始化
const getData = () => {
  api.getUsers().then(res => {
    users.splice(0, users.length)//清空旧数据
    users.push(...res.data.results)//update,from date results
  })
}

//查找————————————————————————
const input = ref()
const select = ref()

//点击查找
const search = (searchWord) => {

  if(searchWord === undefined){
    searchWord = ''
  }

  console.log(searchWord)
  console.log(select.value)

  if (select.value === '1') {            //按用户名
    api.getUsersByUsername(searchWord).then(res => {
      users.splice(0, users.length)//清空旧数据
      if (res.data.status === 'success')
        users.push(...res.data.results)//update,from date results
    })
  } else {                               //按卡号
    api.getUsersByCardID(searchWord).then(res => {
      users.splice(0, users.length)
      if (res.data.status === 'success')
        users.push(...res.data.results)
    })
  }

}

//删除————————————————————————
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

        api.deleteUser(scope.user_login_cardID).then(() => {
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

//添加———————————————————————
const add_dialog_visible = ref(false)
const ruleFormRef = ref()

//提交添加
const submitForm = (formEl) => {
  api.pushUser(user_login_form).then(res => {
    console.log(res)
    add_dialog_visible.value = false
    formEl.resetFields()
    getData()
    if (res.data.status === 'success')
      handleSuccess()//添加成功
    else
      handleFault()//添加失败
  })
}

//确认添加状态
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

//修改————————————————————————
const edit_dialog_visible = ref(false)
const editFormRef = ref()

//启用修改
const handleEdit = (index, scope) => {
  for (let key in scope) {
    user_login_form[key] = scope[key]
  }
  edit_dialog_visible.value = true
}

//提交修改
const submitEditForm = (formEl) => {
  api.putUser(user_login_form.user_login_cardID, user_login_form).then((res) => {
    formEl.resetFields()
    edit_dialog_visible.value = false
    getData()
    if (res.data.status === 'success')
      putSuccess()//添加成功
    else
      putFault()//添加失败
  })
}

const putSuccess = (done) => {
  ElMessageBox.confirm('修改成功！').then(() => {
    done();
  })
      .catch(() => {

      });
}

const putFault = (done) => {
  ElMessageBox.confirm('修改失败！').then(() => {
    done();
  })
      .catch(() => {

      });
}

//弹窗控制————————————————————————
//关闭弹窗
const handleClose = (done) => {
  ElMessageBox.confirm('确认关闭？').then(() => {
    done();
  })
      .catch(() => {

      });
}

//重置弹窗
const resetForm = (formEl) => {
  formEl.resetFields()
}

//下拉框刷新——————————————————————
const changeSelect = () => {
  this.$forceUpdate() // 强制刷新
}

</script>

<template>

  <div style="margin: 0 auto;width: 95%;">


      <div style="display: flex;flex-direction: row;align-items: center;">
          <h1 style="text-align: left;font-size: 30px">用户管理</h1>
          <!--      添加-->
          <el-button type="primary" @click="add_dialog_visible = true" size="large" class="addButton">
              添加用户
          </el-button>
      </div>

    <div style="text-align: end;">



      <!--      搜索-->
      <el-input v-model="input" placeholder="请输入" size="large" class="input-with-select">

        <template #prepend>

          <el-select v-model="select" size="large" @change="changeSelect"
                     placeholder="卡号" style="width: 100px">
            <el-option label="卡号" value="0" />
            <el-option label="账号" value="1" />
<!--            <el-option label="身份" value="2" />-->
          </el-select>

        </template>
        <template #append>
          <el-button :icon="Search" @click="search(input)"/>
        </template>

      </el-input>
    </div>

    <!--    编辑、删除-->
    <el-table :data="users" style="margin: 20px auto;">
      <el-table-column label="卡号" prop="user_login_cardID"/>
      <el-table-column label="账号" prop="user_login_username"/>
      <el-table-column label="密码" prop="user_login_password"/>
      <el-table-column label="身份" prop="user_login_role"/>
      <el-table-column label="金额" prop="user_login_money"/>
      <el-table-column align="right" label="操作" width="200px">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="deleteButton(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

  <!-- 添加弹窗 -->
  <el-dialog title="添加用户" v-model="add_dialog_visible" width="30%" :before-close="handleClose">
    <el-form ref="ruleFormRef" :model="user_login_form" status-icon label-width="120px" class="demo-ruleForm">
      <el-form-item label="账号" prop="user_login_username">
        <el-input v-model="user_login_form.user_login_username" autocomplete="off" size="large" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="密码" prop="user_login_password">
        <el-input v-model="user_login_form.user_login_password" autocomplete="off" size="large" style="width: 80%"/>
      </el-form-item>

      <el-form-item label="身份" prop="user_login_role">
<!--        <el-input v-model="user_login_form.user_login_role" autocomplete="off"/>-->
        <el-select v-model="user_login_form.user_login_role" @change="changeSelect" placeholder="请选择" size="large">
          <el-option label="教师" value="教师" />
          <el-option label="学生" value="学生" />
        </el-select>
      </el-form-item>

      <el-form-item label="金额" prop="user_login_money">
        <el-input v-model="user_login_form.user_login_money" autocomplete="off" size="large" style="width: 80%"/>
      </el-form-item>
      <el-form-item>
        <el-button size="large" @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button size="large" type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!--  编辑弹窗-->
  <el-dialog title="编辑用户信息" v-model="edit_dialog_visible" width="30%" :before-close="handleClose">
    <el-form ref="editFormRef" :model="user_login_form" status-icon label-width="120px" class="demo-ruleForm">
      <el-form-item label="卡号" prop="user_login_cardID">
        <el-input v-model="user_login_form.user_login_cardID" autocomplete="off" disabled size="large" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="账号" prop="user_login_account">
        <el-input v-model="user_login_form.user_login_username" autocomplete="off" size="large" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="密码" prop="user_login_password">
        <el-input v-model="user_login_form.user_login_password" autocomplete="off" size="large" style="width: 80%"/>
      </el-form-item>

      <el-form-item label="身份" prop="user_login_role">
<!--        <el-input v-model="user_login_form.user_login_role" autocomplete="off"/>-->
        <el-select v-model="user_login_form.user_login_role" @change="changeSelect" placeholder="{{user_login_form.user_login_role}}" size="large">
          <el-option label="教师" value="教师" />
          <el-option label="学生" value="学生" />
        </el-select>

      </el-form-item>

      <el-form-item label="金额" prop="user_login_money">
        <el-input v-model="user_login_form.user_login_money" autocomplete="off" size="large" style="width: 80%"/>
      </el-form-item>
      <el-form-item>
        <el-button size="large" @click="resetForm(editFormRef)">重置</el-button>
        <el-button size="large" type="primary" @click="submitEditForm(editFormRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>


</template>

<style scoped>
.input-with-select {
  width: 400px;
  background-color: var(--el-fill-color-blank);
}

.addButton {
    background-color: #4a9dfa;
    text-align: center;
    justify-content: center;
    margin-left: auto;
    font-size: 20px;
}
</style>