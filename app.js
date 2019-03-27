// 初始化设置
const util = require('./utils/util.js')


//app.js
const defaultStockCode = '010001'
App({
  onLaunch: function () {
    wx.onMemoryWarning(() => {
      console.log('警告内存占用过多！！！')
    })

    
  },
  onShow() {
    
  },
  onHide() {
  },
  globalData: {
  }
})