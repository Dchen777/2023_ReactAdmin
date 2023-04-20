export function formateDate(time) {
    if (!time) return ''
    let date = new Date(time)
    // console.log(date.getDay());
    return getZero(date.getFullYear()) + '年' + getZero(date.getMonth() + 1) + '月' + getZero(date.getDate()) + '日 ' + getZero(date.getHours()) + ':' + getZero(date.getMinutes()) + ':' + getZero(date.getSeconds())
}

function getZero(num) {
    if (num < 10) {
        num = '0' + num
    }
    return num
}