import { createStore } from "vuex";
//这里放置全局状态管理
export default createStore({
    state: {
        status: 0,
        id: '',
        book_id:'',
        name:'',
    },

    //访问过滤，这里没有使用，可以对输出值进行控制
    getters: {
        getStatus(state) {
            return state.status
        },

    },
    mutations: {
        setStatus(state, payload) {
            state.status = payload
        },
        setID(state,userid){
            state.id = userid
        },
        setBookID(state,book_id){
            state.book_id = book_id
        },
        setName(state,name){
            state.name = name    
        }
    }
})



