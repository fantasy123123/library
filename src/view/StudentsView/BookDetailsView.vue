<script setup>
import { useStore } from 'vuex'
import {onMounted, reactive, ref} from "vue";
import api from "../../api";
import { ElMessage, ElMessageBox } from 'element-plus';

const store = useStore()
const book_id = store.state.book_id
const add_dialog_visible = ref(false)
const books = reactive([])
const books_form = reactive({
  // books_book_id: "",
  // books_isbn: "",
  // books_name: "",
  // books_author: "",
  // books_is_in_library: "",
  // books_category: "",
  // books_img: "",
  // books_borrow_times: "",
  // books_press: "",
  // books_brief: "",
  // books_pages: "",

  books_borrow_book_id:"",
  books_borrow_borrower_id:"",
  books_borrow_start_date:"",
  books_borrow_end_date:"",
  books_borrow_status:"",
  books_borrow_book_name:""

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

const submitBorrow = () => {

  //now we can use api
  // books_form.books_book_id=books[0].books_book_id;
  // books_form.books_isbn=books[0].books_isbn;
  // books_form.books_name=books[0].books_name;
  // books_form.books_author=books[0].books_author;
  // books_form.books_is_in_library=books[0].books_is_in_library;
  // books_form.books_category=books[0].books_category;
  // books_form.books_img=books[0].books_img;
  // books_form.books_borrow_times=books[0].books_borrow_times;
  // books_form.books_press=books[0].books_press;
  // books_form.books_brief=books[0].books_brief;
  // books_form.books_pages=books[0].books_pages;
  var timeStr = new Date().toLocaleTimeString('zh-CN', { hour12: false });
  var dateStr = new Date().toLocaleDateString('zh-CN');
  console.log(dateStr + ' ' + timeStr);
  books_form.books_borrow_book_id = books[0].books_book_id;
  books_form.books_borrow_borrower_id = 0;
  books_form.books_borrow_start_date = dateStr + ' ' + timeStr;
  books_form.books_borrow_status = 0;
  books_form.books_borrow_book_name = books[0].books_name;

  api.pushBorrowBooks(books_form).then(res => {
    console.log(res)
    add_dialog_visible.value = false
    //formEl.resetFields()
    getData()
    if (res.data.status == 'success'){
      handleSuccess()
      add_dialog_visible.value = true
    }
    else
      handleFault()
  })
}

//confirm after add admin
const handleSuccess = (done) => {
  ElMessageBox.confirm('添加成功！请自行保存还书二维码').then(() => {
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

    <el-button size="large" v-if="book.books_is_in_library" @click="submitBorrow()" class="button">
      借书
    </el-button>

  </table>

  <!--二维码弹窗-->
  <el-dialog title="借书二维码凭证" v-model="add_dialog_visible" width="30%" :before-close="handleClose">
    <img src="../../assets/二维码.jpg" alt="二维码图片"/>
  </el-dialog>

</template>

<script>
export default {
  name: "BookDetailsView.vue"
}
</script>

<style scoped>
.button{
    background-color: #4a9dfa;
    text-align: center;
    justify-content: center;
    font-size: 20px;
}
</style>