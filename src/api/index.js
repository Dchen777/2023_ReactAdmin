/*
 包含应用中所有接口请求函数的模块
 每个函数的返回值都是promise
*/
import ajax from './ajax'
//检查用户名和密码
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

export const reqAdduser = (user) => ajax('/manage/user/add', user, 'POST')

//获取天气信息
export const getWeather = (adcode) => ajax('https://restapi.amap.com/v3/weather/weatherInfo', { city: adcode, key: '492846e56bbd55fb96e19fb3b8bd6002' }, 'GET')



//获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', { parentId })

//添加分类
export const reqAddCategory = (categoryName, parentId)=>ajax('/manage/category/add', {categoryName, parentId },'POST')

//更新分类
export const reqUpdateCategory = (categoryId, categoryName)=>ajax('/manage/category/update', {categoryId, categoryName },'POST')

