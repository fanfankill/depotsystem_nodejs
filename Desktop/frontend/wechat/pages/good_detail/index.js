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
  },

  //商品加入购物车
  handlecartadd()
  {
    //先获取缓存中的购物车数组
    let cart=wx.getStorageSync("cart")||[];
    //判断是否存在数组中
    let index=cart.findIndex(v=>v.goods_id===this.goodsinfo.goods_id)
    if(index==-1)
    {
      //不存在 第一次添加
      this.goodsinfo.num=1;
      //对应复选框的打钩
      this.goodsinfo.checked=true
      cart.push(this.goodsinfo)

    }else{
      //已经存在 num++
      console.log('2');
      cart[index].num++;
    }
    //重新加入缓存
    wx.setStorageSync("cart", cart);

    //弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'succees',
      mask: true,
     
    });
  },

  
})