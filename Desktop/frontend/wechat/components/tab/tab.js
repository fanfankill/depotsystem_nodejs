// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      //点击事件
      handleitemtap(e)
      {
        const {index}=e.currentTarget.dataset
        this.triggerEvent("tabsitemchange",{index} )
      }
  }
})
