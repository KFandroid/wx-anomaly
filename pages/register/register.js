// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    pwd:'',
    vpwd: '',
    code:'',
    result: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  accNull: function(e){
    this.setData({
      account: e.detail.value
    })

  },
  pwdNull: function(e){
    this.setData({
      pwd: e.detail.value
    })
  },
  vpwdNull: function(e){
    this.setData({
      vpwd: e.detail.value
    })
  },
  codeNull: function(e){
    this.setData({
      code: e.detail.value
    })
  },
  send_code:function(){
    let tel= JSON.stringify(this.data.account);
    console.log(this.data.account);
    var regTel=new RegExp('0?(13|14|15|18)[0-9]{9}','g');//判断用户输入的是否为手机号码
    var rsTel=regTel.exec(this.data.account);
    if(!rsTel){
      
      wx.showToast({
        title: '请输入的是正确的手机号码',
        icon: 'none',
        duration: 4000
      })
    }else{
      wx.request({
        url: 'http://192.168.0.106:8081/userLogin/sendVerificationCode', // 获取验证码
        method:'POST',
        data: {
          subscriberPhone: tel
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {    //请求失败
          console.log(res)
        },
        fail:function(err){
          console.log(err)
        },
      })
    }

  } , 
  submit:function(){
    console.log('231')
    var regTel=new RegExp('0?(13|14|15|18)[0-9]{9}','g');//判断用户输入的是否为手机号码
    var regPwd=new RegExp('^[A-Za-z0-9]+$','g');//判断用户输入的是否为小写字母加数字
    var regCode=new RegExp('/^\d{6}$/','g');//判断用户输入的是否为数字
    var rsTel=regTel.exec(this.data.account);
    var rsPwd=regPwd.exec(this.data.pwd);
    var rsVpwd=regVpwd.exec(this.data.vpwd);
    var rsCode=regCode.exec(this.data.code);
    if(!rsTel){
      
      wx.showToast({
        title: '请输入的是正确的手机号码',
        icon: 'none',
        duration: 4000
      })
    }else if(!rsPwd&&!rsVpwd){
      wx.showToast({
        title: '请输入正确的密码',
        icon: 'none',
        duration: 4000
      })
    }else if(this.data.code==''){
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 4000
      })
    }else{


      wx.login({
        success(res) {
          if (res.code) {
            console.log('token',res.code)
            // 发起网络请求
            wx.request({
              url: '192.168.0.106:8081/userLogin/userRegister', // 注册
              data: {
                subscriberPhone: this.data.account,
                verificationCode: this.data.code,
                passWord: this.data.pwd,
                secondPassword: this.data.pwd,
                code:res.code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
      
      /* wx.navigateTo({
        url: '../login/login',
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      }); */
    }
    /* if(this.data.account==""){
      console.log('手机号不能为空')
    }
    if(this.data.pwd==''){
      console.log('密码不能为空')
    }
    if(this.data.code==''){
      console.log('验证码不能为空')
    } */
    }

/*  register: function(e){
     this.setData({
      account    :    e.detail.value.account,
      pwd   :     e.detail.value.pwd,
      code: e.detail.value.code,
    }) 
    console.log( e)
      if(account!=''&&pwd!=''&&code!=''){
      wx.navigateTo({
        url: '../login/login',
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
     } 
        
  }*/
})