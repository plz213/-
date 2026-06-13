const app = getApp()

Page({
  data: {
    isLogin: false,
    userInfo: {}
  },
  
  onLoad() {
    this.checkLoginStatus()
  },
  
  checkLoginStatus() {
    const isLogin = app.globalData.isLogin
    const userInfo = app.globalData.userInfo || {}
    this.setData({ isLogin, userInfo })
  },
  
  login() {
    wx.getUserProfile({
      desc: '用于完善用户信息',
      success: (res) => {
        const userInfo = res.userInfo
        userInfo.avatarUrl = '/images/头像.png'
        
        let userId = wx.getStorageSync('lastUserId')
        if (!userId) {
          userId = app.generateUserId()
        }
        
        app.globalData.isLogin = true
        app.globalData.userInfo = userInfo
        app.globalData.userId = userId
        wx.setStorageSync('token', 'mock-token')
        wx.setStorageSync('currentUserId', userId)
        wx.setStorageSync('lastUserId', userId)
        
        this.setData({ isLogin: true, userInfo })
        wx.showToast({ title: '登录成功' })
      },
      fail: (err) => {
        console.log('登录失败', err)
      }
    })
  },
  
  logout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.globalData.isLogin = false
          app.globalData.userInfo = null
          wx.removeStorageSync('token')
          this.setData({ isLogin: false, userInfo: {} })
          wx.showToast({ title: '已退出登录' })
        }
      }
    })
  },
  
  editUserInfo() {
    if (!this.data.isLogin) {
      this.login()
    } else {
      wx.showToast({ title: '修改个人信息功能开发中' })
    }
  },
  
  goFeedback() {
    if (!this.data.isLogin) {
      this.login()
    } else {
      wx.navigateTo({
        url: '/pages/feedback/feedback'
      })
    }
  },
  
  clearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除所有缓存数据吗？这将删除所有历史记录和收藏。',
      success: (res) => {
        if (res.confirm) {
          app.clearAllCache()
          this.checkLoginStatus()
        }
      }
    })
  }
})