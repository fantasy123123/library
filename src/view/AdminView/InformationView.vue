<template>
    <div class="announcement-container">

        <el-form ref="ruleFormRef" :model="announcement_form" status-icon label-width="120px" class="demo-ruleForm">
            <h1 class="announcement-input-title">请输入标题:</h1>
            <el-form-item label="标题" prop="admin_info_title">
                <el-input v-model="announcement_form.admin_info_title" autocomplete="off" />
            </el-form-item>
            <h1 class="announcement-input-title">请输入内容:</h1>
            <el-form-item label="内容" prop="admin_info_content">
                <textarea v-model="announcement_form.admin_info_content" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button class="addbutton" type="primary" @click="sendFile(ruleFormRef)">提交</el-button>
            </el-form-item>
        </el-form>

        <div class="announcement-list">
            <h2 class="announcement-list-title">公告发布记录</h2>
            <el-table :data="Announcement" style="width: 100%">
                <el-table-column align="left" label="时间" prop="admin_info_send_time"></el-table-column>
                <el-table-column  label="公告标题" prop="admin_info_title"></el-table-column>
                <el-table-column label="公告内容" prop="admin_info_content"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import api from "../../api/index.js";
import {ElMessageBox} from "element-plus";

const Announcement = reactive([])
const ruleFormRef = ref()

onMounted(() => {
    getData()
})
const getData = () => {
    api.getAnnouncement_ad().then(res => {
        Announcement.splice(0, Announcement.length)//清空旧数据
        Announcement.push(...res.data.results)//update,from date results
    })
}

const announcement_form = reactive({
    admin_info_send_time: "",
    admin_info_title:"",
    admin_info_content: ""
})

const  sendFile = (formEl) =>{
    api.pushAnnouncement_ad(announcement_form).then(res => {
        console.log(res)
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
</script>

<style scoped>
textarea {
    flex: 1;
    height: 150px;
    margin-right: 20px;
    padding: 10px;
    border: 1px solid #b4afaf;
}
.addbutton {
    background-color: #6D9773;
    text-align: left;
    justify-content: flex-end;
    margin-left: auto;
}
</style>