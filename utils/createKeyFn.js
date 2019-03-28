import * as util from './util.js' 

let app = getApp()

export function createStaticFileKeyStr (fileType) {
    fileType = '' + fileType
    let key = util.addZeroAfter(fileType, 26)
    let sortCode = '0000'
    let kData = app.globalData['a' + key + sortCode]
    let timestamp
    if (kData) {
      timestamp = util.addZero(kData.timestamp, 10)
    } else {
      timestamp = util.addZero('', 10)
    }
    let value = {
      storage: key + sortCode,
      query: key + timestamp + sortCode
    }
    return value
  }