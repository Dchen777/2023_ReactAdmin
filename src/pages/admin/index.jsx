import React, { Fragment } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import { Layout } from 'antd';
const { Footer, Sider, Content } = Layout;



//后台管理的路由组件
export default function Admin() {

  const navigate = useNavigate()

  React.useEffect(() => {
    if (!memoryUtils.user) {
      console.log('there');
      navigate('/login')
    }
  })

  return (
    <Fragment>
      {/* <div>Hello！{user.username}</div> */}
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{ backgroundColor: '#fff', margin: 20 }}>
            <Outlet />
          </Content>
          <Footer style={{ color: '#ccc', textAlign: 'center' }}>Footer</Footer>
        </Layout>
      </Layout>
    </Fragment>
  )
}
