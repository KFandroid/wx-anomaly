// compontent/indexPanel/indexPanel.js
import storage from '../../utils/WXStorage'
import {fileFactory108} from '../../utils/fileList'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    indexList:[
      {"stockCode":"A00001","code":"060001","stockName":"上证指数","py":"SZZS","market":"上指","type":"", "y":200},
      {"stockCode":"B00001","code":"060009","stockName":"深证成指","py":"SZCZ","market":"深指","type":"", "y":200},
      {"stockCode":"B00006","code":"060013","stockName":"创业板指","py":"CYBZ","market":"深指","type":""}
    ]
  },
  pageLifetimes: {
    show(){
      let stockList = wx.getStorage('selectIndex')
      if(stockList) {
        this.setData({
          indexList: stockList
        })
      }
      // for(let i = 0; i < this.data.indexList.length; i++) {
      //   storage.addFile(fileFactory108(stock.code))
      // }
    },
    hide() {
      storage.deleteFile()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  },
  
})
