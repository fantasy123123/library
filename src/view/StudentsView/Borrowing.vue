<template>
  <div style="margin: 0 auto;width: 95%;">
    <h1 style="text-align: left;">借阅中</h1>

    <el-table :data="books_borrow" style="margin: 20px auto;">
      <el-table-column label="借阅书名" prop="books_borrow_book_name" />
      <el-table-column label="书籍编号" prop="books_borrow_book_id" />
      <el-table-column label="借阅时间" prop="books_borrow_start_date" />
      <el-table-column label="还阅截止" prop="books_borrow_end_date" />
      <el-table-column label="状态" prop="books_borrow_status" />

    </el-table>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import api from "../../api/index";
import { useStore } from 'vuex'
const store_borrowing = useStore()

const student_id = store_borrowing.state.id

const books_borrow = reactive([])

onMounted(() => {
  getData()
})

const getData = () => {

  api.getBorrowingBookById(student_id).then(res => {
    books_borrow.splice(0,books_borrow.length)
    books_borrow.push(...res.data.results)
  })
}



</script>

