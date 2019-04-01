//index.js
//获取应用实例
import {
  createConnect,
  connect
} from '../../utils/socket'
import EventBus from '../../utils/pubsub.js'
import storage from '../../utils/WXStorage.js'
import * as fileList from '../../utils/fileList'
const app = getApp()

Page({
  data: {
    items: [
      {name: 'vs1', value: '异动版1.0'},
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
      createConnect()
    connect((data) => {
      storage.observeFileChange(data.type, data)
    })
    wx.onSocketOpen(() => {
      storage.addFile(fileList.file109)
      storage.addFile(fileList.file106)
      storage.addFile(fileList.file105)
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
  loginSuccessFn:function() {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  onLoad: function () {
    EventBus.on('loginsuccess', this.loginSuccessFn.bind(this))
  },
  onShow() {
    console.log(this.route)
  }
})
