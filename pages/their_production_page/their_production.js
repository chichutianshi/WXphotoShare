Page({
  data: {
    text: '\n',
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 1000,
    circular: true,
    selectRow: 0,
    id:''
  },

  onLoad: function(options) {
    var id = options.userid
    console.log(id)
    var that = this;
    that.setData({
      id:id
    })
    wx.request({
      url: 'https://www.xqdiary.top/sp/lookOtherPro',
      data: {
        selectRow:that.data.selectRow,
        userid:id
      },
      success: function (res) {
        //console.log(that.data.selectRow)
        let notes = res.data
        //console.log(notes)
        //console.log("assad")
        let photoURLs = JSON.stringify(notes[0].photoURL)
        //console.log(photoURLs)
        for (var ck = 0; ck < notes.length; ck++) {
          let photoURLs = notes[ck].photoURL;
          that.data.items.push({
            imgUrls: photoURLs,
            instruction: notes[ck].instruction,
            avatarURL: notes[ck].avatarURL,
            nickname: notes[ck].nickname,
            likeNum: notes[ck].likeNum,
            photoid: notes[ck].photoId,
          })

          that.data.imgUrls.push({
            imgUrls2: photoURLs,
          })
        }
        that.setData({
          selectRow: that.data.selectRow + 6,
          items: that.data.items,
          imgUrls: that.data.imgUrls
        });
        console.log(that.data.imgUrls)
      },
    })


   
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },

  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标

      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.items.forEach(function(v, i) {
      v.isTouchMove = false

      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })

    //更新数据
    that.setData({
      items: that.data.items
    })
  },

  /**

  * 计算滑动角度

  * @param {Object} start 起点坐标

  * @param {Object} end 终点坐标

  */

  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  //删除事件
  del: function(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定删除吗?',
      success: function(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          console.log(e.currentTarget.dataset.photoid)
          wx.getStorage({
            key: 'thirdSessionKey',
            success: function(res) {
              wx.request({
                url: 'https://www.xqdiary.top/sp/delSend',
                data: {
                  photoId: e.currentTarget.dataset.photoid,
                  thirdSessionKey: res.data
                },
                success: function(res2) {
                  if (res2.data == 1) {
                    that.data.items.splice(e.currentTarget.dataset.index, 1)
                    that.setData({
                      items: that.data.items
                    })

                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 1000
                    })

                  } else if (res2.data == -1) {
                    wx.showToast({
                      title: '删除失败',
                      icon: 'success',
                      duration: 1000
                    })
                  }
                }
              })
            },
          })


        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })

  },

  //展示图片
  //转详情页
  previewImage: function(e) {
    // console.log(e.currentTarget.dataset.index)
    // wx.previewImage({
    //   current: this.data.imgUrls[e.currentTarget.dataset.index],
    //   // 当前显示图片的http链接		  	
    //   urls: this.data.imgUrls[e.currentTarget.dataset.index]
    //   // 需要预览的图片http链接列表		
    // })
    let index = e.currentTarget.dataset.index
    console.log("序号：" + index)
    console.log(this.data.items)
    console.log(this.data.items[index].instruction)
    wx.request({
      url: 'https://www.xqdiary.top/sp/GetPhotoDetail',
      // url: 'https://www.xqdiary.top/sp/GetPhotoDetail',
      data: {
        photoId: e.currentTarget.dataset.photoid
      },
      success: (res) => {
        if (this.data.items[index].location != undefined) {
          wx.navigateTo({
            url: '../photo_page/photo?photoUrls=' + JSON.stringify(res.data.photoUrls) + "&photoId=" + this.data.items[index].photoid + "&introduce=" + this.data.items[index].instruction + "&avatarURL=" + this.data.items[index].avatarURL + "&nickname=" + this.data.items[index].nickname + "&likeNum=" + this.data.items[index].likeNum + "&like=" + this.data.items[index].like + "&location=" + this.data.items[index].location
          })
        } else {
          wx.navigateTo({
            url: '../photo_page/photo?photoUrls=' + JSON.stringify(res.data.photoUrls) + "&photoId=" + this.data.items[index].photoid + "&introduce=" + this.data.items[index].instruction + "&avatarURL=" + this.data.items[index].avatarURL + "&nickname=" + this.data.items[index].nickname + "&likeNum=" + this.data.items[index].likeNum + "&like=" + this.data.items[index].like + "&location=" + "未知"
          })
        }

      },
      fail: (res) => {

      }
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '加载中...',
    })
    this.loadMore()
  },
  loadMore: function() {
    var that = this
    wx.request({
      url: 'https://www.xqdiary.top/sp/loadMorePro',
      data: {
        selectRow: that.data.selectRow,
        userid: that.data.id
      },
      success: function (res) {
        if (res.data != '') {
          let notes = res.data
          //console.log(temp)
          //var notes = that.data.items.concat(temp)
          //console.log(notes)
          //let photoURLs = notes[0].photoURL
          //console.log(photoURLs)
          for (var ck = 0; ck < notes.length; ck++) {
            let photoURLs = notes[ck].photoURL;
            that.data.items.push({
              imgUrls: photoURLs,
              instruction: notes[ck].instruction,
              avatarURL: notes[ck].avatarURL,
              nickname: notes[ck].nickname,
              likeNum: notes[ck].likeNum,
              photoid: notes[ck].photoId,
              
            })

            that.data.imgUrls.push({
              imgUrls2: photoURLs,
            })
          }
          that.setData({
            selectRow: that.data.selectRow + 6,
            items: that.data.items,
            imgUrls: that.data.imgUrls
          });
          wx.hideLoading()
          console.log(that.data.imgUrls)
        } else {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '到底了',
            duration: 2000
          })
        }
      },
    })
  }
})