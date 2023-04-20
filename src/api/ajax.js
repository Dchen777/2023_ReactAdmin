/*
能发送异步Ajax请求的函数模块
封装axios库
函数的返回值是promise对象
1. 优化：统一处理请求异常
2. 优化：异步得到不是response，而是response.data
*/

import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data = {}, method = 'GET') {
   
    return new Promise((resolve, reject) => {
        let promise
        if (method === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url, data)
        }

        promise.then(response => {   //请求成功，调用resolve
            resolve(response.data)  // 取出响应内容的data部分(后台实际返回)
        }).catch(error => {         // 请求失败，不使用reject，直接提示错误信息
            message.error('请求出错了' + error.message)
        })
    })

}