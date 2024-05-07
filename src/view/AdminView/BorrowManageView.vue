<template>
  <div style="margin: 0 auto;width: 95%;">
    <h1 style="text-align: left;">借还管理</h1>

    <div style="text-align: end;">
      <el-input v-model="input" placeholder="请输入" size="small" class="input-with-select">
        <template #prepend>
          <!-- 注意，这里默认是直接搜索账号，无法选择，但是解开注释以后可以开启选择 -->
          <el-select placeholder="书籍编号" style="width: 75px"></el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="search(input)" />
        </template>
      </el-input>

      <video ref="video" width="640" height="480" autoplay style="display: none"></video>
    </div>


    <el-table :data="BooksBorrow" style="margin: 20px auto;">
      <el-table-column label="书籍编号" prop="books_borrow_book_id" />
      <el-table-column label="书名" prop="books_borrow_book_name" />
      <el-table-column label="借阅人" prop="books_borrow_borrower_id" />
      <el-table-column label="借阅时间" prop="books_borrow_start_date" />
      <el-table-column label="归还时间" prop="books_borrow_end_date" />
      <el-table-column label="当前状态" prop="books_borrow_status" />

      <el-table-column align="right" label="操作" width="200px">
        <template #default="scope">
          <el-button size="small" @click="returnMessage()">
            短信催还
          </el-button>
          <el-button size="small" type="danger" @click="returnButton(scope.$index, scope.row)">
            还书
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import api from "../../api/index";

const input = ref()
const BooksBorrow = reactive([])
const books_borrow_form = reactive({
  books_borrow_book_id :"",
  books_borrow_book_name:"",
  books_borrow_borrower_id:"",
  books_borrow_start_date:"",
  books_borrow_end_date:"",
  books_borrow_status:""





})


onMounted(() => {
  getData()
})

const returnMessage = () => {
  api.getRenturnMessage().then(res => {
    ElMessageBox.confirm(
        '确认发送短信？',
        '确定催还',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
    )
    console(...res.data.results)//打印返回的results
  })
}


//进入页面得到当前所有的借书记录
const getData = () => {


  api.getAllBorrowBooks().then(res => {
    BooksBorrow.splice(0, BooksBorrow.length)//清空旧数据
    BooksBorrow.push(...res.data.results)//update,from date results
  })
}

const search = (bookId) => {
  console.log(bookId)
  api.getBorrowBooksByBookId(bookId).then(res => {
    BooksBorrow.splice(0, BooksBorrow.length)//清空旧数据
    if (res.data.results)
      BooksBorrow.push(...res.data.results)//update,from date results


  })
}


const returnButton = (index, scope) => {
  ElMessageBox.confirm(
      '确认还书？',
      '警告，不可逆',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {

        api.returnBook(scope.books_borrow_book_id).then(() => {
          getData()
        })
        ElMessage({
          type: 'success',
          message: '还书成功',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '还书取消',
        })
      })
}
</script>

<style scoped>

</style>