//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    items: [
      {name: 'vs1', value: '异动版1.0'},
      {name: 'CHN', value: '中国', checked: 'true'},
      {name: 'BRA', value: '巴西'},
      {name: 'JPN', value: '日本'},
      {name: 'ENG', value: '英国'},
      {name: 'TUR', value: '法国'},
    ],
    showContent: true,
    hideContent: true,
    isLoading: true,
    
  },
  radioChange(e) {
    if(e.detail.value=='vs1'){
      this.setData({
        isLoading: false
      })
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //点击登录
  login:function(e){
    this.setData({
      showContent: false,
      hideContent: false
    })
  },
  //点击注册
  register: function(e){
    wx.navigateTo({
      url: '../register/register'
    })
  },
  showLoad:function(e){
    debugger
     this.setData({
       isLoading:false
     })
  },

  onLoad: function () {
    
  },
  onShow() {
    console.log(this.route)
  }
})
