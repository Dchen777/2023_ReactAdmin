import React from 'react'
import './login.css'
import logo from '../../assets/images/logo.png'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { message } from 'antd';
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { useNavigate } from 'react-router-dom';

//登录的路由组件
export default function Login() {
  const navigate = useNavigate()

  React.useEffect(() => {//页面挂载完和将要更新执行
    console.log(memoryUtils.user);
    if (memoryUtils.user) {
      console.log(memoryUtils.user);    //如果未退出登录，则保持登录状态，页面处于管理界面
      return navigate('/admin')
    }
  })

  const onFinish = async (values) => {
    //请求登录
    const { username, password } = values

    const result = await reqLogin(username, password)

    if (result.status === 0) {//登录成功
      //提示登录成功
      message.success('登录成功！')
      const user = result.data
      memoryUtils.user = user
      storageUtils.saveUser(user)
      //跳转到管理对象,并发送数据
      return navigate('/admin', { replace: false })
    } else {
      message.error('登录失败！' + result.msg)
    }
  }

  return (
    <div className='login'>

      <header className='login-header'>
        <img src={logo} alt="logo" />
        <h1>后台管理系统</h1>
      </header>

      <section className='login-content'>
        <h2>用户登录</h2>

        <Form name="normal_login" className="login-form" initialValues={{
          username: "admin",      //初始化表单内部项的值
        }} onFinish={onFinish}>

          <Form.Item name="username"
            /*申明式验证：使用定义好的验证规则进行验证*/
            rules={[
              { required: true, whitespace: true, message: '请输入用户名!' },
              { min: 4, message: '用户名至少4位!' },
              { max: 12, message: '用户名最多12位!' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线!' }
            ]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>

          <Form.Item name="password"
            rules={[
              { required: true, message: '请输入密码!', },
              { min: 4, message: '用户名至少4位!' },
              { max: 12, message: '用户名最多12位!' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线!' }
            ]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}

// 1. 前台表单验证
// 2. 收集表单输入数据
