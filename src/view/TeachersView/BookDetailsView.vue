<script setup>
import { useStore } from 'vuex'
import {onMounted, reactive} from "vue";
import api from "../../api";

const store = useStore()
const book_id = store.state.book_id

const books = reactive([])
const books_form = reactive({
  books_book_id: "",
  books_isbn: "",
  books_name: "",
  books_author: "",
  books_is_in_library: "",
  books_category: "",
  books_img: "",
  books_borrow_times: "",
  books_press: "",
  books_brief: "",
  books_pages: "",

})

//初始化—————————————————————————————————————————————————
onMounted(() => {
  getData()
})

const getData = () => {
  api.getBook(book_id).then(res => {
    books.splice(0, books.length)//清空旧数据
    books.push(...res.data.results)//update,from date results
  })
}

</script>

<template>
  <h2>{{ book_id }}</h2>


  <table v-for="book in books" style="margin: 20px auto;">
    <tr>
      <td colspan="2">
        <img :src="book.books_img" style="width: 206px;height: 280px;"/>
      </td>
    </tr>
    <tr>
      <td>
        书号
      </td>
      <td>
        {{ book.books_book_id }}
      </td>
    </tr>
    <tr>
      <td>
        ISBN
      </td>
      <td>
        {{ book.books_isbn }}
      </td>
    </tr>
    <tr>
      <td>
        书名
      </td>
      <td>
        {{ book.books_name }}
      </td>
    </tr>
    <tr>
      <td>
        作者
      </td>
      <td>
        {{ book.books_author }}
      </td>
    </tr>
    <tr>
      <td>
        类别
      </td>
      <td>
        {{ book.books_category }}
      </td>
    </tr>
    <tr>
      <td>
        状态
      </td>
      <td v-if="book.books_is_in_library">
        在馆
      </td>
      <td v-if="!book.books_is_in_library">
        外借中
      </td>
    </tr>
    <tr>
      <td>
        出版社
      </td>
      <td>
        {{ book.books_press }}
      </td>
    </tr>
    <tr>
      <td>
        借阅次数
      </td>
      <td>
        {{ book.books_borrow_times }}
      </td>
    </tr>
    <tr>
      <td>
        简介
      </td>
      <td>
        {{ book.books_brief }}
      </td>
    </tr>
    <tr>
      <td>
        页数
      </td>
      <td>
        {{ book.books_pages }}
      </td>
    </tr>

    <el-button size="small" v-if="book.books_is_in_library" @click="">
      借书
    </el-button>

  </table>

</template>

<script>
export default {
  name: "BookDetailsView.vue"
}
</script>

<style scoped>

</style>