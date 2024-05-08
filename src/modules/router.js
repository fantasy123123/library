import { createRouter, createWebHashHistory } from "vue-router"

const route = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('../view/LoginView.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            //默认页面
            redirect: '/admin/admin_manage',
            component: () => import('../view/AdminView.vue'),
            //子页面
            children:[
                {
                    path: 'admin_manage',
                    name: 'admin_manage',
                    component: () => import('../view/AdminView/AdminManageView.vue')
                },
                {
                    path: 'users_manage',
                    name: 'users_manage',
                    component: () => import('../view/AdminView/UsersManageView.vue')
                },
                {
                    path: 'books_manage',
                    name: 'books_manage',
                    component: () => import('../view/AdminView/BooksManageView.vue')
                },
                {
                    path: 'information_manage',
                    name: 'information_manage',
                    component: () => import('../view/AdminView/InformationView.vue')
                },
                {
                    path: 'reply',
                    name: 'reply',
                    component: () => import('../view/AdminView/ReplyView.vue')
                },
                {
                    path: 'file_manage',
                    name: 'file_manage',
                    component: () => import('../view/AdminView/FileManageView.vue')
                },
                {
                    path: 'return_manage',
                    name: 'return_manage',
                    component: () => import('../view/AdminView/BorrowManageView.vue')
                },
                {
                    path: 'booksReport',
                    name: 'booksReport',
                    component: () => import('../view/AdminView/BookReportView.vue')
                },
            ]
        },
        {
            path: '/students',
            name: 'students',
            //默认页面
            redirect: '/students/main',
            component: () => import('../view/StudentsView.vue'),
            //子页面
            children:[
                {
                    path: 'history',
                    name: 'history_stu',
                    component: () =>import('../view/StudentsView/BorrowHistory.vue')
                },
                {
                    path: 'main',
                    name: 'main_stu',
                    component: () => import('../view/StudentsView/mainPage.vue')
                },
                {
                    path: 'announcement',
                    name: 'announcement_stu',
                    component: () => import('../view/StudentsView/AnnouncementView.vue')
                },
                {
                    path: 'file',
                    name: 'file_stu',
                    component: () => import('../view/StudentsView/FileView.vue')
                },
                {
                    path: 'question',
                    name: 'question',
                    component: () => import('../view/StudentsView/InformationView.vue')
                },
                {
                    path: 'books_borrow',
                    name: 'books_borrow_stu',
                    component: () => import('../view/StudentsView/Borrowing.vue')
                },
                {
                    path: '/bookDetails',
                    name: 'bookDetails_stu',
                    component: () => import('../view/StudentsView/BookDetailsView.vue'),
                },

            ]


        },
        {
            path: '/teachers',
            name: 'teachers',
            //默认页面
            redirect: '/teachers/main',
            component: () => import('../view/TeachersView.vue'),
            //子页面
            children:[
                {
                    path: 'history',
                    name: 'history_tea',
                    component: () => import('../view/TeachersView/BorrowHistoryTea.vue')
                },
                {
                    path: 'main',
                    name: 'main_tea',
                    component: () => import('../view/TeachersView/mainPage.vue')
                },
                {
                    path: 'books_borrow',
                    name: 'books_borrow_tea',
                    component: () => import('../view/TeachersView/Borrowing.vue')
                },
                {
                    path: '/bookDetails',
                    name: 'bookDetails_tea',

                    component: () => import('../view/TeachersView/BookDetailsView.vue'),
                },
                {
                    path: 'announcement',
                    name: 'announcement_tea',
                    component: () => import('../view/TeachersView/AnnouncementView.vue')
                },
                {
                    path: 'file',
                    name: 'file_tea',
                    component: () => import('../view/TeachersView/FileView.vue')
                },
                {
                    path: 'information',
                    name: 'information_tea',
                    component: () => import('../view/TeachersView/InformationView.vue')
                }
            ]


        },
    ]
})

export default route;
