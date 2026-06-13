Page({
  data: {
    content: '',
    anonymous: false
  },
  
  bindContentInput(e) {
    this.setData({ content: e.detail.value })
  },
  
  bindAnonymousChange(e) {
    this.setData({ anonymous: e.detail.value[0] === 'anonymous' })
  },
  
  submitFeedback() {
    if (!this.data.content.trim()) {
      wx.showToast({ title: '请输入反馈内容', icon: 'none' })
      return
    }
    
    wx.showToast({
      title: '提交中...',
      icon: 'loading',
      duration: 1000
    })
    
    setTimeout(() => {
      wx.showToast({ title: '反馈提交成功' })
      this.setData({ content: '', anonymous: false })
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
    }, 1000)
  }
})