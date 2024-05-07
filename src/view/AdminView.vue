<script setup>

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
                      <setting/>
                  </el-icon>
                  <p style="color: #0012c0;font-size: 18px;">管理端</p>
              </template>
              <el-menu-item-group style="background-color: #87bcf5;">
                  <template #title>
                      <div style="color: white;font-size: 30px;margin-top: 30px;margin-bottom: 20px;">
                          信息管理
                      </div>
                  </template>
                <el-menu-item index="1-1">
                  <RouterLink to="/admin/admin_manage" style="text-decoration: none;color: #0c1dfd;font-size: 20px;text-align: center;">
                      管理人员管理
                  </RouterLink>
                </el-menu-item>

                <el-menu-item index="1-2">
                  <RouterLink to="/admin/users_manage" style="text-decoration: none;color: #0c1dfd;font-size: 20px;text-align: center;">
                      用户管理
                  </RouterLink>
                </el-menu-item>

                <el-menu-item index="1-3">
                  <RouterLink to="/admin/books_manage" style="text-decoration: none;color:  #0c1dfd;font-size: 20px;text-align: center;">
                      书籍管理
                  </RouterLink>
                </el-menu-item>

                <el-menu-item index="1-5">
                <RouterLink to="/admin/return_manage" style="text-decoration: none;color:  #0c1dfd;font-size: 20px;text-align: center;">
                    还阅管理
                </RouterLink>
                </el-menu-item>

              </el-menu-item-group>

              <el-menu-item-group style="background-color:#87bcf5;">
                  <template #title>
                      <p style="color: white;font-size: 30px;">
                          读者互动
                      </p>
                  </template>
                <el-menu-item index="2-1">
                  <RouterLink to="/admin/information_manage" style="text-decoration: none;color: #0c1dfd;font-size: 20px;text-align: center;">
                      公告编辑
                  </RouterLink>
                </el-menu-item>

                <el-menu-item index="2-2">
                  <RouterLink to="/admin/booksReport" style="text-decoration: none;color: #0c1dfd;font-size: 20px;text-align: center;">
                      图书报表展示
                  </RouterLink>
                </el-menu-item>

                  <el-menu-item index="2-3">
                      <RouterLink to="/admin/reply" style="text-decoration: none;color: #0c1dfd;font-size: 20px;text-align: center;">
                          咨询回复
                      </RouterLink>
                  </el-menu-item>


                  <el-menu-item index="2-4">
                      <RouterLink to="/admin/file_manage" style="text-decoration: none;color: #0c1dfd;font-size: 20px;text-align: center;">
                      读者来信查看
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
.el-menu-item{
    height: 60px;
}
</style>

