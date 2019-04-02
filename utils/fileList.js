import * as utils from './util.js'
import { createStaticFileKeyStr, createStockInfoKeyStr } from './createKeyFn.js'
import EventBus from './pubsub.js'
const app = getApp()

export const file109 = { // 交易日历
    type: '109',
    changeCb: (data) => {
      let key = utils.addZeroAfter('a109', 31)
      let newTradeDate = data.data[data.data.length - 1]
      
    //   this.setData({
    //     date: newTradeDate.year + '-' + addZero(newTradeDate.month, 2) + '-' + addZero(newTradeDate.day, 2),
    //     date2: newTradeDate.year + '-' + addZero(newTradeDate.month, 2) + '-' + addZero(newTradeDate.day, 2)
    //   })
    app.globalData.static109 = true
      wx.setStorage({ key, data })
      EventBus.emit('loginsuccess')
    //   this.isHasStaticData()
      
    },
    createKey: () => {
      let val = createStaticFileKeyStr(109)
      return val
    }
    // isCallMainBack: false
  }

export const file105 = { // 所有股票代码名称信息列表
    type: '105',
    changeCb: (data) => {
      app.globalData.a105 = data
      app.globalData.stockList = data.data
      let key = utils.addZeroAfter('a105', 31)
    //   this.data.static105 = true
    EventBus.emit('loginsuccess')
      wx.setStorage({ key, data })
    //   this.isHasStaticData()
    },
    createKey: () => {
      let val = createStaticFileKeyStr(105)
      return val
    }
  }

export const file106 = { // 项目名称对应表
    type: '106',
    changeCb: (data) => {
      let itemArr = []
      let a106 = data.data
      for (let i = 0; i < a106.length; i++) {
        let cno = a106[i].no
        let temp = {}
        if (a106[i].hasOwnProperty('children')) {
          let children = a106[i].children
          for (let j = 0; j < children.length; j++) {
            temp = Object.assign({}, children[j])
            temp.cno = '' + cno + children[j].cno
            temp.name = a106[i].name
            temp.code = utils.addZero(cno, 3) + utils.addZero(children[j].cno, 3)
            temp.totalName = '' + temp.name + '-' + temp.cname
            itemArr.push(temp)
          }
        }
      }
      let key = utils.addZeroAfter('a106', 31)
      wx.setStorage({ key, data })
    //   this.setData({
    //     t106: data,
    //     itemList: itemArr
    //   })
    EventBus.emit('loginsuccess')
    app.globalData.static106 = true
    //   this.isHasStaticData()
    },
    createKey: () => {
      let val = createStaticFileKeyStr(106)
      return val
    }
  }

  export const fileFactory108 = function(stockCode) {
    return {
      type: '108',
      changeCb: (data) => {
        let stockInfo = {
          current: data.data.current,
          rise: data.data.rise,
          high: data.data.high,
          low: data.data.low,
          close: data.data.close,
          open: data.data.open,
          hand: data.data.hand,
          volume: data.data.volume
        }
        this.setData({
          stockInfo: Object.assign({}, this.data.stockInfo, stockInfo)
        })
      },
      intervalTime: 10000,
      createKey: () => {
        let val = this.createStockInfoKeyStr(108, stockCode)
        return val
      }
      // isCallMainBack: false
    }
  }