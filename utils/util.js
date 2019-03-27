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