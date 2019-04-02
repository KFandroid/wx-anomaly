//index.js
//获取应用实例
import {
  createConnect,
  connect
} from '../../utils/socket'
import EventBus from '../../utils/pubsub.js'
import storage from '../../utils/WXStorage.js'
import * as fileList from '../../utils/fileList'
//import reStatus from '../../utils/reStatus'
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
  changeInput(e) {
    let key = e.target.dataset.key
    let obj = {}
    obj[key] = e.detail.value
    this.setData(obj)
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
  wxLogin: function() {

  },
  accountLogin: function(e){
    
    if(e.target.dataset.type=='1'){
      wx.login({
        success: (res)=>{
          let wxLoginData = {
            type: 1,
            code: res.code,  
          }
          this.login(wxLoginData)
        }
      })
      
    }else if(e.target.dataset.type=='3'){
      let loginData = {
        type: 3,
          subscriberPhone: this.data.loginName,
          passWord: this.data.passsWord
      }
      this.login(loginData)
    }
    
    
  },
  //点击登录
  login:function(data){
    wx.request({
      url: 'http://192.168.0.106:8081/userLogin/userLoginMode',
      method:'POST',
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) =>{
        console.log(res);
        let code = res.data.code 
        //reStatus(code); 
        if(code === '01') {
          this.setData({
            showContent: false,
            hideContent: false
          })
        } else if(code === '10004') {
          wx.showToast({
            title: '请输入正确的密码！',
            icon: 'none',
            duration: 4000
          })
        } else if(code === '02'){
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
            duration: 4000
          })
        }else if(code ==='10002'){
          wx.showToast({
            title: '该用户未注册',
            icon: 'none',
            duration: 4000
          })
        }
      },
      fail:function(err){  //请求失败
        console.log(err)
      },
    })
    
  },
  //点击注册
  register: function(e){
    wx.navigateTo({
      url: '../register/register'
    })
  },
  //忘记密码
  fg_pass: function(){
    wx.navigateTo({
      url: '../fgPwd/fgPwd'
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
