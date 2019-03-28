// 初始化设置
import storage from 'utils/util.js'
const util = require('./utils/util.js')
const socket = require('./utils/socket.js')


//app.js
App({
  onLaunch: function () {
    wx.onMemoryWarning(() => {
      console.log('警告内存占用过多！！！')
    })
    // wx.onSocketOpen(() => {
    //   console.log('open!!!!')
    // })
  },
  onShow() {
    
  },
  onHide() {
  },
  globalData: {
  }
})