import React from 'react'
import Login from '../pages/login';
import Admin from '../pages/admin';
import Home from '../pages/home'
import Product from '../pages/product'
import Category from '../pages/category'
import Bar from '../pages/charts/bar'
import Line from '../pages/charts/line'
import Pie from '../pages/charts/pie'
import Role from '../pages/role'
import User from '../pages/user'
import { Navigate } from 'react-router-dom'
const routeArr = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/admin',
        element: <Admin />,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'product',
                element: <Product />
            },
            {
                path: 'category',
                element: <Category />
            },
            {
                path: 'role',
                element: <Role />
            },
            {
                path: 'user',
                element: <User />
            },
            {
                path: 'bar',
                element: <Bar />
            },
            {
                path: 'line',
                element: <Line />
            },
            {
                path: 'pie',
                element: <Pie />
            },
            {
                path: '',
                element: <Navigate to="home" />
            }
        ]
    },
    {
        path: '/',
        element: <Navigate to="/login" />
    }
]
export default routeArr
