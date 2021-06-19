// pages/category/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //左侧菜单数据
      leftmenuslist:[],
      //右侧商品数据
      rightmenuslist:[],
    
  },
    //接口返回数据
  cates:[],
  
   //获取分类数据
   getcates(){
    request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'
    }).then(res=>{
      //这个不在data里面所有可以this去获取
      this.cates=res.data.message 
      console.log(res);
    })
   },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this.getcates()
  },  

 
})