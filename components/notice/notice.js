// components/notice/notice.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: Number,
      value: 200,
      observer(data){
      }
    },
    t146: {
      type: Object,
      value: {},
      observer(newData) {
        
        if(newData) {
          this.setData({
            currentPage: parseInt(newData.page),
            totalPage: parseInt(newData.totalPage),
            notieItems: newData.data
          })
        }
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentPage: 1,
    totalPage: 1,
    notieItems: [{
      content:'关于对二级债券行驶赎回选择权的公告',
      time: '2019-03-08'
    },{
      content: '中信证券股份有限公司、平安证券股份有限公司关于公司公开发行A股可转换公司债券之上...',
      time: '2019-01-16'
    },{
      content: '中信证券股份有限公司、平安证券股份有限公司关于公司公开发行A股可转换公司债券之上...',
      time: '2019-01-16'
    },{
      content: '中信证券股份有限公司、平安证券股份有限公司关于公司公开发行A股可转换公司债券之上...',
      time: '2019-01-16'
    },{
      content: '中信证券股份有限公司、平安证券股份有限公司关于公司公开发行A股可转换公司债券之上...',
      time: '2019-01-16'
    },{
      content: '中信证券股份有限公司、平安证券股份有限公司关于公司公开发行A股可转换公司债券之上...',
      time: '2019-01-16'
    }]
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    pageUp() {
      if(this.data.currentPage > 1) {
        EventBus.emit('get146', {page: this.data.currentPage - 1})
      }
    },
    pageDown() {
      if(this.data.currentPage < this.data.totalPage) {
        EventBus.emit('get146', {page: this.data.currentPage + 1})
      }
    }
  }
})