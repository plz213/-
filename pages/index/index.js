const { foodLibrary } = require('../../utils/foodLibrary.js')
const { getFoodImage, addToHistory } = require('../../utils/storage.js')

Page({
  data: {
    recommendList: [],
    randomFood: null,
    showModal: false,
    randomFoodName: '',
    randomFoodImage: ''
  },

  onLoad() {
    this.getTodayRecommend()
  },

  getTodayRecommend() {
    const shuffled = [...foodLibrary].sort(() => 0.5 - Math.random())
    const recommendList = shuffled.slice(0, 3).map(food => ({
      name: food.name,
      pic: getFoodImage(food.name)
    }))
    this.setData({ recommendList })
  },

  startTurntable() {
    wx.showToast({
      title: '正在随机选择...',
      icon: 'loading',
      duration: 1000
    })

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * foodLibrary.length)
      const randomFood = foodLibrary[randomIndex]
      const foodImage = getFoodImage(randomFood.name)

      this.setData({
        randomFood,
        showModal: true,
        randomFoodName: randomFood.name,
        randomFoodImage: foodImage
      })
    }, 1000)
  },

  hideModal() {
    this.setData({ showModal: false })
  },

  stopPropagation() {},

  cancelModal() {
    this.setData({ showModal: false })
    this.startTurntable()
  },

  confirmModal() {
    this.setData({ showModal: false })
    const foodName = this.data.randomFoodName
    const matchedFood = foodLibrary.find(food => food.name === foodName)
    if (matchedFood) {
      addToHistory({ name: matchedFood.name })
      wx.showToast({
        title: '已添加到最近吃过',
        icon: 'success',
        duration: 1500
      })
    }
    wx.navigateTo({
      url: `/pages/fresh/fresh?foodName=${encodeURIComponent(foodName)}`
    })
  }
})
