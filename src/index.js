import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils';

const user = storageUtils.getUser()  //初始和清除(退出登录)后为null；
memoryUtils.user = user              //如未清除本地（未退出登录）则保持登录状态
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(


  <BrowserRouter>

    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b', } }}>
      <App />
    </ConfigProvider>

  </BrowserRouter>

);

