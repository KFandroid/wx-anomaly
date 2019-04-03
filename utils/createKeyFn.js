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

 export function createStockInfoKeyStr (fileType, stockCode) {
    let page
    let dateStr
    let sortCode
    let itemCode = '000000'
    page = '000'
    dateStr = '00000000'
    sortCode = '0000'
    let timestamp = ''
    let key = '' + fileType + itemCode + page + stockCode + dateStr
    let kData = app.globalData['a' + key + sortCode]
    if (kData) {
      timestamp = addZero(kData.timestamp, 10)
    } else {
      timestamp = util.addZero('', 10)
    }
    let value = {
      storage: key + sortCode,
      query: key + timestamp + sortCode
    }
    return value
  }
  export function createItemPageKeyStr(fileType, itemCode, dateStr, customPage = 0, sort) {
    let page = '000'
    let sortCode = '0000'
    let stockCode = '000000'
    if (customPage) {
      page = addZero(customPage, 3)
    }
    if (sort) {
      sortCode = sort
    }
    let timestamp = ''
    let key = '' + fileType + itemCode + page + stockCode + dateStr
    let kData = app.globalData['a' + key + sortCode]
    if (kData) {
      timestamp = addZero(kData.timestamp, 10)
    } else {
      timestamp = addZero('', 10)
    }
    let value = {
      storage: key + sortCode,
      query: key + timestamp + sortCode
    }
    return value
  }
  export function createDateKeyStr (fileType, dateStr) {
    let page
    let sortCode
    let stockCode = '000000'
    let itemCode = '000000'
    page = '000'
    dateStr = util.addZero(dateStr, 8)
    sortCode = '0000'
    let timestamp = ''
    let key = '' + fileType + itemCode + page + stockCode + dateStr
    let kData = app.globalData['a' + key + sortCode]
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

  export function createItemKeyStr (fileType, itemCode, dateStr) {
    let page = '000'
    let sortCode = '0000'
    let stockCode = '000000'
    page = '000'
    dateStr = util.addZero(dateStr, 8)
    sortCode = '0000'
    let timestamp = ''
    let key = '' + fileType + itemCode + page + stockCode + dateStr
    let kData = app.globalData['a' + key + sortCode]
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