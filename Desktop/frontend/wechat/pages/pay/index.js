// pages/cart/index.js

/*可以用的微信支付
                1 企业账号  
                2 企业账号的小程序后台中必须给开发者添加白名单 
                    1 一个appid可以绑定多个开发者
                个人账号就算了
                */  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    //过滤后的购物车
    checkedcart:[],
    totalprice:0,
    totalnum:0
  },

  //每次返回该页面都会调用
  onShow()
  {
    //获取缓存中的收货地址 
    const address=wx.getStorageSync('address');

    //获取缓存中的购物车信息
    const cart=wx.getStorageSync('cart')||[]
      //过滤后的购物车结算数组
      let checkedcart=cart.filter(v=>v.checked)
    //计算全选 空数组调用也是返回true
    //const allchecked=cart.length?cart.every(v=>v.checked):false
    this.setcart(checkedcart)

    this.setData({
      address
    })
  },

  //对购物车状态的变化计算方法 方法优化
  setcart(cart)
  {

    //总价格 总数量
    let totalprice=0;
    let totalnum=0;
    cart.forEach(v=>{
     
    totalprice+=(v.goods_price*v.num);
    totalnum+=v.num
    })
   
    this.setData({
     cart, 
     totalprice,
     totalnum,
   })
   
  },

    //从缓存中渲染checked为true的才展示
  //结算方法
  hanlepayto()  
  {
    
  },



})