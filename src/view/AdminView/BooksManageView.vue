<script setup>
//use setup language style 
//import packages 
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import api from "../../api/index";
// import axios from 'axios'

const books = reactive([])

//mouthed , life hook 
onMounted(() => {
    getData()
})

//first come in the page
//will use this function to get data
const getData = () => {

    //修改了这里
    api.getBooks().then(res => {
        books.splice(0, books.length)//清空旧数据
        books.push(...res.data.results)//update,from date results
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
            api.deleteBooks(scope.books_book_id).then(() => {
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
const books_form = reactive({
    books_book_id:'' ,
    books_isbn:'' ,
    books_name: '',
    books_author: '',
    books_is_in_library:'',
    books_category:'',
    books_img:'' ,
    books_borrow_times:'',
    books_press:'' ,
    books_brief: '',
    books_pages: ''
})

//submit form
const submitForm = (formEl) => {

    //now we can use api
    books_form.books_img='src/assets/红楼梦.jpg'
    api.pushBooks(books_form).then(res => {
        console.log(res)
        add_dialog_visible.value = false
        formEl.resetFields()
        getData()
        if (res.data.status == 'success')
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
        books_form[key] = scope[key]
    }
    console.log('进入test3');
    console.log(books_form.book_author);
    edit_dialog_visible.value = true
}

//submit edit form
const submitEditForm = (formEl) => {

    api.putBooks(books_form.books_book_id, books_form).then((res) => {
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
    api.getBooksByBooksId(searchWord).then(res => {
        books.splice(0, books.length)//清空旧数据
        console.log('进入这里test1');
        if (res.data.status == 'success'){
            console.log('进入这里test2');
            books.push(...res.data.results)//update,from date results
            //res.data就是后端返回来的那个json
        }
    })
}

</script>

<template>
    <div style="margin: 0 auto;width: 95%;">
        <h1 style="text-align: left;">书籍管理</h1>

        <div style="text-align: end;">
            <el-button type="primary" @click="add_dialog_visible = true" size="small" class="addButton">
                添加新图书
            </el-button>
            <el-input v-model="input" placeholder="请输入" size="small" class="input-with-select">
                <template #prepend>
                    <!-- 注意，这里默认是直接搜索账号，无法选择，但是解开注释以后可以开启选择 -->
                    <el-select v-model="select" placeholder="图书编号" style="width: 75px">
                        <!-- <el-option label="账号" value="1" />
                        <el-option label="密码" value="2" /> -->
                    </el-select>
                </template>
                <template #append>
                    <el-button :icon="Search" @click="search(input)" />
                </template>
            </el-input>
        </div>
        <el-table :data="books" style="margin: 20px auto;">
            <!--
                这里做了修改，但是这个prop不知道在哪里改
            -->

            <el-table-column label="图书编号" prop="books_book_id" />
            <el-table-column label="ISBN" prop="books_isbn" />
            <el-table-column label="图书名称" prop="books_name" />
            <el-table-column label="图书作者" prop="books_author" />
            <el-table-column label="是否在馆" prop="books_is_in_library" />
            <el-table-column label="图书类别" prop="books_category" />
            <el-table-column label="图片" prop="books_img">
<!--                <template slot-scope="scope">-->
<!--                  <img :src="scope.row.img" alt="图片">-->
<!--                </template>-->
            </el-table-column>
            <el-table-column label="借阅次数" prop="books_borrow_times" />
            <el-table-column label="出版社" prop="books_press" />
            <el-table-column label="简介" prop="books_brief" />
            <el-table-column label="页数" prop="books_pages" />
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

  <!-- 弹窗 -->
    <el-dialog title="添加新图书" v-model="add_dialog_visible" width="30%" :before-close="handleClose">
        <el-form ref="ruleFormRef" :model="books_form" status-icon label-width="120px" class="demo-ruleForm">
            <!--
                同样的，这里做了修改，但是不知道prop去哪里改
            -->
            <el-form-item label="图书编号" prop="book_id">
                <el-input v-model="books_form.books_book_id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="ISBN" prop="book_isbn">
                <el-input v-model="books_form.books_isbn" autocomplete="off" />
            </el-form-item>
            <el-form-item label="图书名称" prop="book_name">
                <el-input v-model="books_form.books_name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="图书作者" prop="book_author">
                <el-input v-model="books_form.books_author" autocomplete="off" />
            </el-form-item>
            <el-form-item label="是否在馆" prop="book_is_in_library">
                <el-input v-model="books_form.books_is_in_library" autocomplete="off" />
            </el-form-item>
            <el-form-item label="图书类别" prop="book_category">
                <el-input v-model="books_form.books_category" autocomplete="off" />
            </el-form-item>
            <el-form-item label="图片" prop="book_img">
              <input type="file"
                     id="avatar" name="avatar"
                     accept="image/png, image/jpeg">
            </el-form-item>

            <el-form-item label="借阅次数" prop="book_borrow_times">
                <el-input v-model="books_form.books_borrow_times" autocomplete="off" />
            </el-form-item>
            <el-form-item label="出版社" prop="book_press">
                <el-input v-model="books_form.books_press" autocomplete="off" />
            </el-form-item>
            <el-form-item label="简介" prop="book_brief">
                <el-input v-model="books_form.books_brief" autocomplete="off" />
            </el-form-item>
            <el-form-item label="页数" prop="book_pages">
                <el-input v-model="books_form.books_pages" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog title="编辑图书信息" v-model="edit_dialog_visible" width="30%" :before-close="handleClose">
        <el-form ref="editFormRef" :model="books_form" status-icon label-width="120px" class="demo-ruleForm">
            <el-form-item label="图书编号" prop="book_id">
                <el-input v-model="books_form.books_book_id" autocomplete="off" disabled/>
            </el-form-item>
            <el-form-item label="ISBN" prop="book_isbn">
                <el-input v-model="books_form.books_isbn" autocomplete="off" />
            </el-form-item>
            <el-form-item label="图书名称" prop="book_name">
                <el-input v-model="books_form.books_name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="图书作者" prop="book_author">
                <el-input v-model="books_form.books_author" autocomplete="off" />
            </el-form-item>
            <el-form-item label="是否在馆" prop="book_is_in_library">
                <el-input v-model="books_form.books_is_in_library" autocomplete="off" />
            </el-form-item>
            <el-form-item label="图书类别" prop="book_category">
                <el-input v-model="books_form.books_category" autocomplete="off" />
            </el-form-item>
            <el-form-item label="图片" prop="book_img">
                <el-input v-model="books_form.books_img" autocomplete="off" />
            </el-form-item>
            <el-form-item label="借阅次数" prop="book_borrow_times">
                <el-input v-model="books_form.books_borrow_times" autocomplete="off" />
            </el-form-item>
            <el-form-item label="出版社" prop="book_press">
                <el-input v-model="books_form.books_press" autocomplete="off" />
            </el-form-item>
            <el-form-item label="简介" prop="book_brief">
                <el-input v-model="books_form.books_brief" autocomplete="off" />
            </el-form-item>
            <el-form-item label="页数" prop="book_pages">
                <el-input v-model="books_form.books_pages" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm(editFormRef)">重置</el-button>
                <el-button type="primary" @click="submitEditForm(editFormRef)">提交</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<!-- scoped means the css style won't
use in other components  -->
<style scoped>
.input-with-select {
    width: 300px;
    background-color: var(--el-fill-color-blank);
}

.addButton {
    background-color: #6D9773;
    text-align: right;
    justify-content: flex-end;
    margin-left: auto;
}
</style>
