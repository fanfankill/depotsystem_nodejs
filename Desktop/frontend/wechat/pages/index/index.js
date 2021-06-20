// index.js
// 获取应用实例
import {request} from '../../request/index.js'
Page({
  data: {
 /**轮播图数组 */
 swiperlist:[],
 /**导航数组 */
 catelist:[],
 /**楼层数据 */
 floorlist:[],
  },

//获取轮播图数据
  getswiperlist()
  {
    
    request({url:'/home/swiperdata'}).then(res=>{
      console.log(res);
      this.setData({
        swiperlist:res.data.message
      })
    })
  },

  //获取分类导航数据
  getcatelist()
  {
    request({url:'/home/catitems'}).then(res=>{
      console.log(res);
      this.setData({
        catelist:res.data.message
      })
    })
  },
  
  //获取楼层数据
  getcatelis2()
  {
    request({url:'/home/floordata'}).then(res=>{
      console.log(res);
      this.setData({
        floorlist:res.data.message
      })
    })
  },
 onLoad(){
   //发送异步请求 封装
  this.getswiperlist()
  this.getcatelist()
  this.getcatelis2()
 }
})
