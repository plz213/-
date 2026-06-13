const app = getApp()
const { getHistory, saveHistory } = require('../../utils/storage.js')

Page({
  data: {
    activeTab: 'favorite',
    favoriteList: [],
    historyList: [],
    showAddModal: false,
    newFood: {
      name: '',
      pic: '',
      stapleIndex: 0,
      ingredientIndex: 0,
      methodIndex: 0
    },
    stapleOptions: ['未选择', '饭', '面', '馒头', '包子', '其他'],
    ingredientOptions: ['未选择', '鸡肉', '猪肉', '牛肉', '鱼', '鸡蛋', '青菜', '土豆', '胡萝卜', '黄瓜', '番茄', '香菇', '木耳'],
    methodOptions: ['未选择', '炒', '煮', '蒸', '炖', '煎'],
    isLogin: false
  },

  onLoad() {
    this.checkLoginStatus()
  },

  onShow() {
    this.checkLoginStatus()
  },

  checkLoginStatus() {
    const isLogin = app.globalData.isLogin
    this.setData({ isLogin })

    this.setData({ historyList: getHistory() })

    if (isLogin) {
      this.getFavorites()
    } else {
      this.setData({ favoriteList: [] })
    }
  },

  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab })
  },

  getFavorites() {
    const userId = app.globalData.userId
    if (!userId) {
      this.setData({ favoriteList: [] })
      return
    }

    const key = app.getUserDataKey(userId, 'favorites')
    const savedList = wx.getStorageSync(key)
    this.setData({ favoriteList: savedList || [] })
  },

  saveFavorites(favoriteList) {
    const userId = app.globalData.userId
    if (!userId) return

    const key = app.getUserDataKey(userId, 'favorites')
    wx.setStorageSync(key, favoriteList)
  },

  cancelFavorite(e) {
    const index = e.currentTarget.dataset.index
    const favoriteList = [...this.data.favoriteList]
    favoriteList.splice(index, 1)
    this.setData({ favoriteList })
    this.saveFavorites(favoriteList)
    wx.showToast({ title: '已取消收藏' })
  },

  showAddModal() {
    if (!this.data.isLogin) {
      wx.showToast({ title: '请先登录', icon: 'none' })
      return
    }
    this.setData({ showAddModal: true })
  },

  stopPropagation() {},

  hideAddModal() {
    this.setData({ showAddModal: false })
  },

  onNameInput(e) {
    this.setData({ 'newFood.name': e.detail.value })
  },

  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ 'newFood.pic': res.tempFilePaths[0] })
      }
    })
  },

  onStapleChange(e) {
    this.setData({ 'newFood.stapleIndex': e.detail.value })
  },

  onIngredientChange(e) {
    this.setData({ 'newFood.ingredientIndex': e.detail.value })
  },

  onMethodChange(e) {
    this.setData({ 'newFood.methodIndex': e.detail.value })
  },

  addFood() {
    const { newFood, favoriteList, stapleOptions, ingredientOptions, methodOptions } = this.data

    if (!newFood.name.trim()) {
      wx.showToast({ title: '请输入菜品名称', icon: 'none' })
      return
    }

    if (!newFood.pic) {
      wx.showToast({ title: '请选择菜品图片', icon: 'none' })
      return
    }

    const staple = newFood.stapleIndex === 0 ? '其他' : stapleOptions[newFood.stapleIndex]
    const ingredient = newFood.ingredientIndex === 0 ? '' : ingredientOptions[newFood.ingredientIndex]
    const method = newFood.methodIndex === 0 ? '' : methodOptions[newFood.methodIndex]

    const newItem = {
      name: newFood.name,
      pic: newFood.pic,
      method: method,
      staple: staple,
      ingredient: ingredient
    }

    const updatedList = [...favoriteList, newItem]
    this.setData({
      favoriteList: updatedList,
      showAddModal: false,
      newFood: {
        name: '',
        pic: '',
        stapleIndex: 0,
        ingredientIndex: 0,
        methodIndex: 0
      }
    })

    this.saveFavorites(updatedList)
    wx.showToast({ title: '添加成功' })
  }
})
