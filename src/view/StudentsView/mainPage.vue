<script setup>

import {onMounted, reactive, ref} from "vue";
import api from "../../api";
import { Search } from '@element-plus/icons-vue';
import { useStore } from 'vuex'

const store = useStore()

const books = reactive([])
const hotBooks = reactive([])
const recBooks = reactive([])
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

const searchTable_visible = ref(false)
const table_visible = ref(true)

//初始化————————————————————————
onMounted(() => {
  getData()
})

const getData = () => {
  //热门书籍
  api.getHotBooks().then(res => {
    hotBooks.splice(0, hotBooks.length)//清空旧数据
    hotBooks.push(...res.data.results)//update,from date results
  })
  //推荐
  api.getRecBooks(store.state.id).then(res => {
    recBooks.splice(0, recBooks.length)//清空旧数据
    recBooks.push(...res.data.results)//update,from date results
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

  searchTable_visible.value  = true
  table_visible.value  = false

  if (select.value === '1') {                      //按书号查询
    api.getBooksByBookId(searchWord).then(res => {
      books.splice(0, books.length)
      if (res.data.status === 'success')
        books.push(...res.data.results)
    })
  }else {
    api.getBooksByName(searchWord).then(res => {   //按书名查询
      books.splice(0, books.length)
      if (res.data.status === 'success')
        books.push(...res.data.results)
    })
  }

}

//查看详情————————————————————————
const handleDetail = (book_id) => {

  console.log(book_id)
  store.commit("setBookID", book_id)
  console.log("跳转详情页面")

}

//下拉框刷新——————————————————————
const changeSelect = () => {
  this.$forceUpdate() // 强制刷新
}

</script>

<template>

  <div style="margin: 0 auto;width: 95%;">

    <div style="text-align: end;">

      <!--      搜索-->
      <el-input v-model="input" placeholder="请输入" size="small" class="input-with-select">

        <template #prepend>

          <el-select v-model="select" @change="changeSelect"
                     placeholder="书名" style="width: 75px">
            <el-option label="书名" value="0" />
            <el-option label="书号" value="1" />
          </el-select>

        </template>
        <template #append>
          <el-button :icon="Search" @click="search(input)"/>
        </template>

      </el-input>

    </div>

    <!--    查询表格-->
    <el-table :data="books" style="margin: 20px auto;" v-if="searchTable_visible">
      <el-table-column label="书号" prop="books_book_id"/>
      <el-table-column label="ISBN" prop="books_isbn"/>
      <el-table-column label="书名" prop="books_name"/>
      <el-table-column label="作者" prop="books_author"/>
      <el-table-column label="类别" prop="books_category"/>
      <el-table-column label="是否在馆" prop="books_is_in_library"/>

      <el-table-column align="right" label="操作" width="200px">
        <template #default="scope">
          <RouterLink to="/bookDetails">
            <el-button size="small" @click="handleDetail(scope.row['books_book_id'])">
              查看详情
            </el-button>
          </RouterLink>
        </template>
      </el-table-column>

    </el-table>

    <div v-if="table_visible">
      <!--    热门-->
      <div><h2>热门图书</h2></div>

      <el-row style="margin-left: 200px;">
        <el-col :span="6" v-for="book in hotBooks" v-bind:key="book.books_book_id"
                  @click="handleDetail(book.books_book_id)" style="margin: 5px">
          <RouterLink to="/bookDetails"
                      style="text-decoration: none;color: black">
              <img :src="book.books_img" style="width: 206px;height: 280px;"/>

            <h5>书名:{{ book.books_name }}</h5>
            <p>作者:{{ book.books_author }}</p>
          </RouterLink>
        </el-col>

      </el-row>

      <!--    推荐表格-->
      <div><h2>推荐</h2></div>

      <el-table :data="recBooks" style="margin: 20px auto;">
        <el-table-column prop="books_img" label="图片">
          <template #default="scope">
            <el-image :src="scope.row.books_img" fit="fill"></el-image>
          </template>
        </el-table-column>
        <!--        <el-table-column label="书号" prop="books_book_id"/>-->
        <!--        <el-table-column label="ISBN" prop="books_isbn"/>-->
        <el-table-column label="书名" prop="books_name"/>
        <el-table-column label="作者" prop="books_author"/>
        <el-table-column label="类别" prop="books_category"/>
        <el-table-column label="是否在馆" prop="books_is_in_library"/>
        <el-table-column label="借阅次数" prop="books_borrow_times"/>


        <el-table-column align="right" label="操作" width="200px">
          <template #default="scope">
            <RouterLink to="/bookDetails">
              <el-button size="small" @click="handleDetail(scope.row['books_book_id'])">
                查看详情
              </el-button>
            </RouterLink>
          </template>
        </el-table-column>

      </el-table>

    </div>

  </div>

</template>

<script>
export default {
  name: "mainPage"
}
</script>

<style scoped>
.input-with-select {
  width: 300px;
  background-color: var(--el-fill-color-blank);
}

.addButton {
  margin: 8px;
}
</style>