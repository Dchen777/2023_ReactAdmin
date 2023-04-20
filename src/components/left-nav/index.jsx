import React from 'react'
import './index.css'
import logo from '../../assets/images/logo.png'
import { NavLink, useLocation } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'

import {
    HomeOutlined,
    AppstoreOutlined,
    UnorderedListOutlined,
    ToolFilled,
    SafetyOutlined,
    UserOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    PieChartOutlined,
    LineChartOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
function getItem(label, key, icon, children, type) {

    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem(<NavLink to="home">首页</NavLink>, '/admin/home', <HomeOutlined />),
    getItem('商品', 'sub1', <AppstoreOutlined />, [
        getItem(<NavLink to="category">品类管理</NavLink>, '/admin/category', <UnorderedListOutlined />),
        getItem(<NavLink to="product">商品管理</NavLink>, '/admin/product', <ToolFilled />),
        // getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
    getItem(<NavLink to="user">用户管理</NavLink>, '/admin/user', <UserOutlined />),
    getItem(<NavLink to="role">角色管理</NavLink>, '/admin/role', <SafetyOutlined />),
    getItem('图形图表', 'sub2', <AreaChartOutlined />, [
        getItem(<NavLink to="bar">柱形图</NavLink>, '/admin/bar', <BarChartOutlined />),
        getItem(<NavLink to="line">折线图</NavLink>, '/admin/line', <LineChartOutlined />),
        getItem(<NavLink to="pie">饼状图</NavLink>, '/admin/pie', <PieChartOutlined />),
    ]),
];

export default function LeftNav() {
    // console.log('aaa');
    const location = useLocation()
    let openKey
    let detail
    //查找子key等于当前路径的父key，并指派给openkey以便刷新时默认展开
    items.forEach(item => {
        if (item.key === location.pathname) { detail = item.label.props.children }
        if (item.children) {
            // console.log(1);
            item.children.forEach(child => {
                if (child.key === location.pathname) { openKey = item.key; detail = child.label.props.children }
            })
        }
    })

    memoryUtils.detail = detail
    // console.log(detail);
    // console.log(openKey);
    return (
        <div className='left-nav'>
            <NavLink to="home" className='left-nav-header'>
                <img src={logo} alt="logo" />
                <h1>硅谷后台</h1>
            </NavLink>

            <div >
                <Menu
                    selectedKeys={[location.pathname]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                    items={items}
                />
            </div>

        </div>
    )
}
