import React from 'react'
import './index.css'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import { formateDate } from '../../utils/dateUtils'
// import qing from '../../assets/images/icon_weather/晴.png'
import { getWeather } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils';
import { useNavigate } from 'react-router-dom';


export default function Header(props) {

    const navigate = useNavigate()
    const [weatherState, setWeatherState] = React.useState({ city: '', weather: '', temperature: '' })
    const [currentTime, setTime] = React.useState('')

    const adcode = 420100  //城市编码

    React.useEffect(() => {
        /*初始先渲染一次天气和时间信息，防止出现空白*/
        setTime(formateDate(Date.now()))
        getWeather(adcode).then(result => {
            const { city, weather, temperature } = result.lives[0]
            setWeatherState({ city, weather, temperature })
        })
        /*1秒更一次时间*/
        const timer1 = setInterval(() => {
            setTime(formateDate(Date.now()))
        }, 1000)
        /*半小时更一次天气信息*/
        const timer2 = setInterval(() => {
            getWeather(adcode).then(result => {
                const { city, weather, temperature } = result.lives[0]
                setWeatherState({ city, weather, temperature })
            })
        }, 1800000)

        return (() => {
            clearInterval(timer1)
            clearInterval(timer2)
        })

    }, [])/*[]:useEffect只执行一次*/

    const { confirm } = Modal;
    const showConfirm = () => {
        confirm({
            title: '你想退出登录吗？',
            icon: <ExclamationCircleFilled style={{ color: '#00b96b' }} />,
            content: '退出后需要重新输入用户名和密码才能再次进入管理界面哦！',
            onOk() {
                storageUtils.removeUser()
                // console.log('storageUtils.getUser为', storageUtils.getUser());
                memoryUtils.user = null  //此处必须为null，空数组{}不为null

                navigate("/login")

            },
        });
    };

    // let q = '晴'//
    // let x = '../../assets/images/icon_weather/'
    // let y = weatherState.weather
    // let z = '.png'
    //   晴.png
    let i = require('../../assets/images/icon_weather/' + '晴.png')
    // let e = require(x + y + z)
    return (
        <div className='header'>
            <div className="header-top">

                <span>你好，{memoryUtils.user.username}</span>
                <Button type="link" style={{ padding: 0, margin: 0, color: '#00b96b' }} onClick={showConfirm} >退出</Button>

            </div>

            <div className="header-bottom">
                <div className="header-bottom-left">{memoryUtils.detail}</div>
                <div className="header-bottom-right">
                    <span>{currentTime}</span>
                    <img src={i} alt="weather" />
                    <span>{weatherState.city}，{weatherState.temperature}℃，{weatherState.weather}</span>
                </div>
            </div>
        </div>
    )
}
