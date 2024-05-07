import axios from "../utils/http";
import path from "./path";
import store from "../store/index.js";
import { useStore } from 'vuex'
const store1 = useStore()

//这里放所有api接口
const api = {
    getAdmins() {
        return axios.get(path.baseUrl + path.admins);
    },
    getAdminsByAccount(admin_account) {
        return axios.get(path.baseUrl + path.admins + admin_account);
    },

    deleteAdmin(admin_account) {
        return axios.delete(path.baseUrl + path.admins + admin_account);
    },
    putAdmin(admin_account, admin_form) {
        return axios.put(path.baseUrl + path.admins + admin_account, admin_form);
    },
    pushAdmin(admin_form) {
        return axios.post(path.baseUrl + path.admins, admin_form);
    },

    // 登录------------------------------------------------------
    getUserByUsernameToLogin(username){
        return axios.get(path.baseUrl+'/users/login/'+ username);
    },

    // 借阅历史--------------------------------------------------
    getStudentsHistory(student_id){
        return axios.get(path.baseUrl+path.students+'history/'+ student_id);
    },
    getTeachersHistory(teacher_id){
        return axios.get(path.baseUrl+path.teachers+'history/'+ teacher_id)
    },
    pushStudentsHistory(student_form){
        return axios.post(path.baseUrl+path.students+'history/'+ student_form)
    },



    // 用户管理方法--------------------------------------------------
    getUsers() {
        return axios.get(path.baseUrl + path.users);
    },
    getUsersByUsername(user_login_username) {
        return axios.get(path.baseUrl + path.users + user_login_username);
    },
    getUsersByCardID(user_login_cardID) {
        return axios.get(path.baseUrl + path.users + 'get_by_cardID/'+ user_login_cardID);
    },
    // getUsersByRole(user_login_role) {
    //     return axios.get(path.baseUrl + path.users + 'by_role/' + user_login_role);
    // },
    deleteUser(user_login_cardID) {
        return axios.delete(path.baseUrl + path.users + user_login_cardID);
    },
    putUser(user_login_cardID, user_login_form) {
        return axios.put(path.baseUrl + path.users + user_login_cardID, user_login_form);
    },
    pushUser(user_login_form) {
        return axios.post(path.baseUrl + path.users, user_login_form);
    },


    //信息专栏---------------------------------------------------------------
    //学生界面获取咨询答案以及，提出咨询
    getQuestions(){
        return axios.get(path.baseUrl + path.students +'questions/');
    },
    pushQuestion(question, username) {
        return axios.post(path.baseUrl + path.students + question, username);
    },
    deleteQuestions(index){
        return axios.delete(path.baseUrl + path.students + index);
    },
    getAnnouncement(){
      return axios.get(path.baseUrl + path.admin_info);
    },
    getFiles(){
        return axios.get(path.baseUrl + path.users + 'files/');
    },
    pushFile(File){
        return axios.post(path.baseUrl +path.users , File )
    },
    // deleteLetter(){
    //     return axios.delete();
    // },
    sendLetter(Letter){
        return axios.post(path.baseUrl +'/users/letters' , Letter )
    },
    //管理端
    getFiles_ad(){
        return axios.get(path.baseUrl +'/users/letters');
    },
    pushFile_ad(file_form){
        return axios.post(path.baseUrl +path.admins , file_form )
    },
    getQuestions_ad(){
        return axios.get(path.baseUrl + path.admins +'questions/');
    },
    putReply(reply_username , reply_form){
        return axios.put(path.baseUrl + path.admins + reply_username , reply_form)
    },
    getAnnouncement_ad(){
        return axios.get(path.baseUrl + path.admin_info );
    },
    pushAnnouncement_ad(announcement_form){
        return axios.post(path.baseUrl + path.admin_info , announcement_form )
    },
    //教师端
    getQuestions_te(){
        return axios.get(path.baseUrl + path.teachers +'questions/');
    },
    pushQuestion_te(question, username) {
        return axios.post(path.baseUrl + path.teachers + question, username);
    },
    deleteQuestions_te(index){
        return axios.delete(path.baseUrl + path.teachers + index);
    },
    getAnnouncement_te(){
        return axios.get(path.baseUrl + path.teachers +'announcement/');
    },
    getFiles_te(){
        return axios.get(path.baseUrl + path.teachers + 'files/');
    },
    pushFile_te(File){
        return axios.post(path.baseUrl +path.teachers , File )
    },
    //咨询
    getqaReply(){
        return axios.get(path.baseUrl + path.admin_qa);
    },
    getqaReplyByqaId(qa_id){
        return axios.get(path.baseUrl + path.admin_qa + qa_id);
    },
    putqaReply(qa_id, qa_form){
        return axios.put(path.baseUrl + path.admin_qa + qa_id, qa_form);
    },
    pushqaReply(qa_form){
        return axios.post(path.baseUrl + path.admin_qa, qa_form);
    },
    //发送短信
    getRenturnMessage(){
        return axios.get(path.baseUrl + path.admin_returnMessage);
    },

    //还书功能---------------------------------------------------------------
    getBorrowBooksByBookId(bookId){
        return axios.get(path.baseUrl+path.borrow_books+bookId)
    },
    getAllBorrowBooks(){
        return axios.get(path.baseUrl+path.borrow_books)
    },
    returnBook(bookId){
        return axios.delete(path.baseUrl+path.borrow_books+bookId)
    },


    //查看正在借的书---------------------------------------------------------------
    getBorrowingBookById(cardId){
        return axios.get(path.baseUrl+path.borrow_books+cardId)
    },

    //书籍————————————————————————————————————————————————————————————————————
    getHotBooks(){
        return axios.get(path.baseUrl + '/users/' + path.books )
    },
    getRecBooks(cardID){
        return axios.get(path.baseUrl + path.booksRec + cardID)
    },
    getBooksByName(book_name){
        return axios.get(path.baseUrl+ '/users/'  + path.books + 'by_book_name/' + book_name)
    },
    getBooksByBookId(book_id){
        return axios.get(path.baseUrl+ '/users/'  + path.books + 'by_book_id/' + book_id)
    },
    getBook(book_id){
        return axios.get(path.baseUrl + '/users/' + path.books + book_id)
    },


    //图书报表---------------------------------------------------------------
    //获取柱状图
    zhuzhuangtu(Param){
        return axios.get(path.baseUrl + path.admins+Param);
    },
    //获取饼图
    bingtu(Param){
        return axios.get(path.baseUrl + path.admins+Param);
    },
    //获取花图
    flower(Param){
        return axios.get(path.baseUrl + path.admins+Param);
    },
    //渐变柱状图
    fourtu(Param){
        return axios.get(path.baseUrl + path.admins+Param);
    },
    //词云
    cloudtu(Param){
        return axios.get(path.baseUrl + path.admins+Param);
    },


    //书籍管理-------------------------------------------------------------
    getBooks() {
        return axios.get(path.baseUrl + '/admins' + path.books);
    },
    getBooksByBooksId(book_id) {
        return axios.get(path.baseUrl + '/admins' + path.books + book_id);
    },
    deleteBooks(book_id) {
        return axios.delete(path.baseUrl + '/admins' + path.books + book_id);
    },
    putBooks(book_id, book_form) {
        return axios.put(path.baseUrl + '/admins' + path.books + book_id, book_form);
    },
    pushBooks(book_form) {
        return axios.post(path.baseUrl + '/admins' + path.books, book_form);
    },
    pushBorrowBooks(book_form) {
        return axios.post(path.baseUrl + path.borrow_books, book_form);
    }

}

export default api