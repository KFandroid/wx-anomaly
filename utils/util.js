export const getStorage = function (key, defaultValue) {
    let val = wx.getStorageSync(key)
    if (val == '') {
      val = defaultValue
    }
    return val
  }
  
 export const addZeroAfter = function (code, zeroNum) {
    code = String(code).split('')
    let leftZero = zeroNum - code.length
    for (let i = 0; i < leftZero; i++) {
      code.push('0')
    }
    return code.join('')
  }

export const formatTimeYmd = oldTime => { // 将毫秒时间戳转化为年月日（2001-01-01）
  let newTime = new Date(oldTime)
  let ytime = newTime.getFullYear() + '-'
  let mtime = ((newTime.getMonth() + 1) < 10 ? '0' : '') + (newTime.getMonth() + 1) + '-'
  let dtime = (newTime.getDate() < 10 ? '0' : '') + newTime.getDate()
  return ytime + mtime + dtime
}

/**
*
* @param code
* @param zeroNum
* @returns {string}
*/
export const addZero = function (code, zeroNum) {
 code = String(code).split('')
 let leftZero = zeroNum - code.length
 for (let i = 0; i < leftZero; i++) {
   code.unshift('0')
 }
 return code.join('')
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

 export const formatDate = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    return [year, month, day].map(formatNumber).join('-')
  }
  