<script>
export default {
    name: "TeachersView"
}
</script>

<template>
    <div class="container">
        <el-container style="width: 100%;height: 100%">
            <el-aside width="10%" style="height: 100%;background-color:#87bcf5" >
                <el-scrollbar >
                    <el-menu :default-openeds="['1', '3']">
                        <el-sub-menu index="1" style="background-color: #4a9dfa;">
                            <template #title>
                                <el-icon style="color:#0012c0;">
                                    <setting />
                                </el-icon>
                                <p style="color: #0012c0;font-size: 18px;">用户端</p>
                            </template>
                            <el-menu-item-group style="background-color: #87bcf5;">
                                <template #title>
                                    <div style="color: white;font-size: 30px;margin-top: 30px;margin-bottom: 20px;text-align: left">
                                        教师导航
                                    </div>
                                </template>
                                <el-menu-item index="1" >
                                    <RouterLink to="/teachers" style="text-decoration: none;color: #0c1dfd;font-size: 20px;text-align: center;">
                                            首页
                                    </RouterLink>
                                </el-menu-item>
                                <el-menu-item index="2">
                                    <RouterLink to="/teachers/history" style="text-decoration: none;color: #0c1dfd;font-size: 20px;text-align: center;">
                                            借阅历史
                                    </RouterLink>
                                </el-menu-item>
                                <el-menu-item index="3">
                                    <RouterLink to="/teachers/books_borrow" style="text-decoration: none;color: #0c1dfd;font-size: 20px;text-align: center;">
                                            借阅中图书
                                    </RouterLink>
                                </el-menu-item>
                                <el-menu-item index="4">
                                    <RouterLink to="/teachers/announcement" style="text-decoration: none;color: #0c1dfd;font-size: 20px;text-align: center;">
                                            公告
                                    </RouterLink>
                                </el-menu-item>
                                <el-menu-item index="5">
                                    <RouterLink to="/teachers/file" style="text-decoration: none;color: #0c1dfd;font-size: 20px;text-align: center;">
                                            信件专区
                                    </RouterLink>
                                </el-menu-item>
                                <el-menu-item index="6">
                                    <RouterLink to="/teachers/information" style="text-decoration: none;color: #0c1dfd;font-size: 20px;text-align: center;">
                                        读者咨询
                                    </RouterLink>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <el-container>
                <el-header style="height:56px;display: flex;justify-content: center;align-items:center;background-color:#87bcf5;">
                    <h1 style="font-size: 30px;color: white;">图书管理系统</h1>
                </el-header>
                <el-main>
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.el-menu-item{
    height: 60px;
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
</style>