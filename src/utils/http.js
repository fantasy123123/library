//封装axios
import axios from 'axios';

const errorHandle = (status, info) => {
    switch (status) {

        case 400:
            info = '400错误'
            break;
        case 401:
            info = '401错误'
            break;
        case 403:
            info = '403错误'
            break;
        case 404:
            info = '网络错误'
            break;
        case 500:
            info = '服务器错误'
            break;
        default:
            info = '这是后端后台返回的错误信息'
            break;
    }

}

const http = axios.create({
    timeout: 5000

})

//拦截器，在发送数据之前使用，这里没有处理
http.interceptors.request.use((config) => {
    return config
},
    (error) => {
        return Promise.reject(error)
    }

)

//获取数据之前
http.interceptors.response.use((response) => {
    return response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
}
    , (error) => {
        const { status, data } = error.response
        errorHandle(status, data)
        return Promise.reject(error)
    }
)

export default http;