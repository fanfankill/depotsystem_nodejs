// pages/good_detail/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goodsobj:{}
  },
  //商品全局对象
  goodsinfo:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //取url参数
      const {goods_id}=options
      console.log(goods_id);
      this.getgoodsdetail(goods_id)
  },

  //获取商品详情数据
  getgoodsdetail(goods_id)
  {
    request({url:'/goods/detail',data:{goods_id}}).then(res=>{
      console.log(res);
      this.goodsinfo=res.data.message
      this.setData({
        goodsobj:res.data.message
      })
    })
  },

  //点击轮播图放大预览
  handlebgiimage(e)
  {
    
    //微信的API 先构造要预览的图片数组
    const urls=this.goodsinfo.pics.map(v=>v.pics_mid)
    //接收当前图片的url 从data-imgurl里面获取的
    const {imgurl}=e.currentTarget.dataset
    wx.previewImage({
      current: imgurl,
      urls
    
    });
  }

  
})