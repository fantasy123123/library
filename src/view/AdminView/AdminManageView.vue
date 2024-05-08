<script setup>
//use setup language style
//import packages
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import api from "../../api/index";

// import axios from 'axios'
const admins = reactive([])

//mouthed , life hook
onMounted(() => {
  getData()
})

//first come in the page
//will use this function to get data
const getData = () => {

  //原始写法，已经弃用，api接口全部封装至api目录下，直接function调用即可
  // axios.get("http://127.0.0.1:5000/admins/",).then(res => {
  //   admins.splice(0, admins.length)//清空旧数据
  //   admins.push(...res.data.results)//update,from date results
  // })

  api.getAdmins().then(res => {
    admins.splice(0, admins.length)//清空旧数据
    admins.push(...res.data.results)//update,from date results
  })
}

//if user push the delete button
//then will show a message box
//if he confirm
//update the table
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
      // axios.delete(`http://127.0.0.1:5000/admins/${scope.admin_account}`).then(() => {
      //   getDates()
      // })

      api.deleteAdmin(scope.admin_account).then(() => {
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

//添加form
const add_dialog_visible = ref(false)
const ruleFormRef = ref()
const admin_form = reactive({
  admin_account: "",
  admin_password: "",
})

//submit form
const submitForm = (formEl) => {

  //a way to use axios, this way is more short
  // axios.post("http://127.0.0.1:5000/admins/", admin_form).then(() => {
  //   add_dialog_visible.value = false
  //   formEl.resetFields()
  //   getDates()
  // })

  //another way,this way is more long
  // axios({
  //   method: "post",
  //   url: "http://127.0.0.1:5000/admins/",
  //   data: {
  //     admin_account: admin_form.admin_account,
  //     admin_password: admin_form.admin_password
  //   }
  // }).then(res => {
  //   console.log(res)
  //   add_dialog_visible.value = false
  //   formEl.resetFields()
  //   getDates()
  //   if (res.data.status == 'success')
  //     handleSuccess()
  // })

  //now we can use api

  api.pushAdmin(admin_form).then(res => {
    // console.log(res)
    add_dialog_visible.value = false
    formEl.resetFields()
    getData()
    if (res.data.status === 'success')
      handleSuccess()
    else
      handleFault()
  })
}

//reset form's input
const resetForm = (formEl) => {
  formEl.resetFields()
}

//confirm before close the form
const handleClose = (done) => {
  ElMessageBox.confirm('确认关闭？').then(() => {
    done();
  })
    .catch(() => {

    });
}

//confirm after add admin
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

//编辑表单
const edit_dialog_visible = ref(false)
const editFormRef = ref()
const handleEdit = (index, scope) => {
  for (let key in scope) {
    admin_form[key] = scope[key]
  }
  edit_dialog_visible.value = true
}

//submit edit form
const submitEditForm = (formEl) => {
  // axios.put(`http://127.0.0.1:5000/admins/${admin_form.admin_account}`, admin_form).then((res) => {
  //   formEl.resetFields()
  //   edit_dialog_visible.value = false
  //   getDates()
  // })
  api.putAdmin(admin_form.admin_account, admin_form).then((res) => {
    formEl.resetFields()
    edit_dialog_visible.value = false
    getData()
  })
}

//search function
const input = ref()
const select = ref()
const search = (searchWord) => {
  // console.log(searchWord)
  api.getAdminsByAccount(searchWord).then(res => {
    admins.splice(0, admins.length)//清空旧数据
    // console.log(res.data.results[0].admin_account)
    if (res.data.status === 'success')
      admins.push(...res.data.results)//update,from date results
  })
}
const rowStyle = ({row, rowIndex}) => rowIndex%2 === 0 ? 'table-row-even' : 'table-row-odd';

</script>

<template>
  <div style="margin: 0 auto;width: 95%;">
      <div style="display: flex;flex-direction: row;align-items: center;">
          <h1 style="text-align: left;font-size: 30px">管理员管理</h1>
          <el-button type="primary" @click="add_dialog_visible = true" size="large" class="addButton">
              添加管理员
          </el-button>
      </div>

    <div style="text-align: end;">

      <el-input v-model="input" placeholder="请输入" size="large" class="input-with-select">
        <template #prepend>
          <!-- 注意，这里默认是直接搜索账号，无法选择，但是解开注释以后可以开启选择 -->
          <el-select v-model="select" placeholder="账号" size="large" style="width: 100px">
            <!-- <el-option label="账号" value="1" />
            <el-option label="密码" value="2" /> -->
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="search(input)" />
        </template>
      </el-input>
    </div>


      <el-table :data="admins" style="margin: 20px auto;" class = "admin_form">
      <el-table-column label="账号" :row-class-name="rowStyle" prop="admin_account" />
      <el-table-column label="密码" prop="admin_password" />
      <el-table-column align="right" label="操作" width="200px">
        <template #default="scope"  class="table-row-even" >
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

<!-- 弹窗 -->
  <el-dialog title="添加管理员" v-model="add_dialog_visible" width="30%" :before-close="handleClose">
    <el-form ref="ruleFormRef" :model="admin_form" status-icon label-width="120px" class="demo-ruleForm">
      <el-form-item label="账号" prop="admin_account">
        <el-input v-model="admin_form.admin_account" autocomplete="off" size="large" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="密码" prop="admin_password">
        <el-input v-model="admin_form.admin_password" autocomplete="off"  size="large" style="width: 80%"/>
      </el-form-item>
      <el-form-item>
        <el-button size="large" @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button size="large" type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog title="编辑管理员信息" v-model="edit_dialog_visible" width="30%" :before-close="handleClose">
    <el-form ref="editFormRef" :model="admin_form" status-icon label-width="120px" class="demo-ruleForm">
      <el-form-item label="账号" prop="admin_account">
        <el-input v-model="admin_form.admin_account" autocomplete="off" disabled size="large" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="密码" prop="admin_password">
        <el-input v-model="admin_form.admin_password" autocomplete="off" size="large" style="width: 80%"/>
      </el-form-item>
      <el-form-item>
        <el-button size="large" @click="resetForm(editFormRef)">重置</el-button>
        <el-button size="large" type="primary" @click="submitEditForm(editFormRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<!-- scoped means the css style won't
use in other components  -->
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

/* 修改表格某一行的背景色 */
.admin_form .el-table__row--odd {
    background-color: lightblue;
}

</style>
