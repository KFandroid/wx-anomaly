// components/bargraph/barGraph.js
import EventBus from '../../utils/pubsub.js'
import debounce from '../../utils/debounce.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: Number,
      value: 300,
      observer(newData) {
        
        this.data.yRange = [0, newData]
        if (newData > 0 && this.data.data.length > 0) {
          this.processData()
          this.draw()
        }
      }
    },
    minNum: {
      type: Number,
      value: 200,
      observer(newData) {
        this.data.yDomain = [newData, this.data.yDomain[1]]
        if (newData > 0 && this.data.data.length > 0) {
          this.processData()
          this.draw()
        }
      }
    },
    type: {
      type: String,
      value: 'normal',
      observer(newData) {
        if (this.data.data.length > 0) {
          this.processData()
          this.draw()
        }
      }
    },
    maxNum: {
      type: Number,
      value: 200,
      observer(newData) {
        this.data.yDomain = [this.data.yDomain[0], newData]
        if (newData > 0 && this.data.data.length > 0) {
          this.processData()
          this.draw()
        }
      }
    },
    width: {
      type: Number,
      value: 200,
      observer(newData) {
        this.data.xRange = [0, newData]
        if (newData > 0 && this.data.data.length > 0) {
          this.processData()
          this.draw()
        }
      }
    },
    rectWidth: {
      type: Number,
      value: 1,
      observer(newData) {
        
        if (newData > 0 && this.data.data.length > 0) {
          this.processData()
          this.draw()
        }
      }
    },
    rectInterval: {
      type: Number,
      value: 1,
      observer(newData) {
        
        if (newData > 0 && this.data.data.length > 0) {
          this.processData()
          this.draw()
        }
      }
    },
    data: {
      type: Array,
      value: [
      ],
      observer(newData) {
        if (this.data.data.length > 0) {
          this.processData()
          this.draw()
        } 
        if(this.data.data.length === 0) {
          this.clearCanvas()
        }
      }
    },
    key: {
      type: String,
      value: 'kline'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    xRange: [],
    xDomain: [],
    yRange: [0, 60],
    yDomain: [],
    zeroPostion: 0,
    showCrosshair: false,
    crosshair: {
      x: 0
    }
  },
  attached() { 
    EventBus.on('movecrosshair', this.moveCrosshair.bind(this))
    EventBus.on('closecrosshair', this.closeCrosshair.bind(this))
  },
  pageLifetimes: {
    show(){
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    longTapMove:debounce(function(e, isDate = false) {
      let x 
      x = e.changedTouches[0].x
      let width = this.data.rectInterval + this.data.rectWidth
      let index = Math.floor(x / width)
      if(index < 0) {
        index = 0
      }
      if(index > this.data.data.length) return
      let realX = index * width + this.data.rectWidth / 2
      
      EventBus.emit('movecrosshair', {x: realX, type: this.data.key})
    }, 0),
    closeCrosshair() {
      this.data.showCrosshair = false
      this.draw()
    },
    moveCrosshair(crosshairPosition) {
      
      if(crosshairPosition.type !== this.data.key) {
        return 
      }
      let width = this.data.rectInterval + this.data.rectWidth
      let index = Math.floor(crosshairPosition.x / width)
      
      if(index < 0) {
        index = 0
      }
      if(index >= this.data.data.length) {
        index = this.data.data.length - 1
      }
      
      
      let realX = index * width + this.data.rectWidth / 2
      
      this.setData({
        showCrosshair: true,
        crosshair: {x: realX}
      })
      this.draw()
    },
    clearCanvas() {
      const ctx = wx.createCanvasContext('bar', this)
      ctx.draw()
      
    },
    drawCrosshair(ctx) {
      ctx.beginPath()
      if(this.data.crosshair.hasOwnProperty('x')) {
        ctx.moveTo(this.data.crosshair.x, 0)
        ctx.lineTo(this.data.crosshair.x, this.data.yRange[1])
      }
      if(this.data.crosshair.hasOwnProperty('y')) {
        ctx.moveTo(0, this.data.crosshair.y)
        ctx.lineTo(this.data.xRange[1], this.data.crosshair.y)
      }
      
      ctx.closePath()
      ctx.setStrokeStyle('black')
      ctx.stroke()
    },
    processData() {
      let data = this.data.data
      this.data.zeroPostion = this.transfer2y(0)
      data.forEach((element, index) => {
        element.xPostion = this.transfer2x(index)
        switch(this.data.type) {
          case 'updown':
          element.y1Postion = this.transfer2y(element.y1)
          element.y2Postion = this.transfer2y(element.y2)
          break
          case 'single':
          element.yPostion = this.data.yRange[1] * 0.2
          break
          case 'normal':
          element.yPostion = this.transfer2y(element.y)
          break
        }

      });
    },
    drawRect(ctx, x, y, w, h, color) {
      
      let context = ctx
      context.beginPath()
      context.rect(x, y, w, h)
      context.fillStyle = color
      context.setFillStyle(color)
      context.fill()
      context.closePath()
    },
    drawMidLine(ctx) {
      
      ctx.beginPath()
      ctx.setLineDash([3, 3], 3)
      ctx.moveTo(0, this.data.yRange[1] / 2)
      ctx.lineTo(this.data.xRange[1], this.data.yRange[1] / 2)
      ctx.setStrokeStyle('black')
      
      ctx.stroke()
      ctx.closePath()
      ctx.setLineDash([0, 0], 0)
    },
    draw() {
      const ctx = wx.createCanvasContext('bar', this)
      let data = this.data.data
      if(this.data.type === 'updown') {
        this.drawMidLine(ctx)
      }
      data.forEach((element) => {
        let color
        let w = this.data.rectWidth
        let h
        switch(this.data.type) {
          case 'updown':
          if (element.y1 > 0) {
            color = 'red'
            h = this.data.zeroPostion - element.y1Postion
            this.drawRect(ctx, element.xPostion, element.y1Postion, w, h, color)
          } else {
            h = element.y1Postion - this.data.zeroPostion
            color = 'green'
            this.drawRect(ctx, element.xPostion, this.data.zeroPostion, w, h, color)
          }
          if (element.y2 > 0) {
            color = 'red'
            h = this.data.zeroPostion - element.y2Postion
            this.drawRect(ctx, element.xPostion, element.y2Postion, w, h, color)
          } else {
            h = element.y2Postion - this.data.zeroPostion
            color = 'green'
            this.drawRect(ctx, element.xPostion, this.data.zeroPostion, w, h, color)
          }
          break
          case 'normal':
          if (element.y > 0) {
            color = 'red'
            h = this.data.zeroPostion - element.yPostion
            this.drawRect(ctx, element.xPostion, element.yPostion, w, h, color)
          } else {
            h = element.yPostion - this.data.zeroPostion
            color = 'green'
            this.drawRect(ctx, element.xPostion, this.data.zeroPostion, w, h, color)
          }
          break
          case 'single':
          if (element.y > 0) {
            color = 'red'
            
          } else if(element.y < 0){
            color = 'green'
          } else if(element.y === 0) {
            color = 'gray'
          }
          h = this.data.zeroPostion - 2 * element.yPostion
            this.drawRect(ctx, element.xPostion, element.yPostion, w, h, color)
          break
        }
      })
      if(this.data.showCrosshair) {
        this.drawCrosshair(ctx)
      }
      ctx.draw()
    },
    transfer2x(index) {
      return index * (this.data.rectInterval + this.data.rectWidth)
    },
    transfer2y(value) {
      
      let yRange = this.data.yRange
      let yDomain = [this.data.minNum, this.data.maxNum]
      return (yDomain[1] - value) / (yDomain[1] - yDomain[0]) * (yRange[1] - yRange[0]) + yRange[0]
    }
  }
})
