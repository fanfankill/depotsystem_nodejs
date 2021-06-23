// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allchecked:false,
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

    //计算全选 空数组调用也是返回true
    //const allchecked=cart.length?cart.every(v=>v.checked):false
    this.setcart(cart)

    this.setData({
      address
    })
  },

  //对购物车状态的变化计算方法 方法优化
  setcart(cart)
  {

    let allchecked=true
    
    //总价格 总数量
    let totalprice=0;
    let totalnum=0;
    cart.forEach(v=>{
      if(v.checked)
      {
        totalprice+=v.goods_price;
        totalnum+=v.num
      }else{
        allchecked=false
      }
    })
    //判断数组是否为空
    allchecked=cart.length!=0?allchecked:false
   
     //更新数据 并且更新缓存
     wx.setStorageSync("cart",cart)

    this.setData({
     cart,
     totalprice,
     totalnum,
     allchecked
   })
   
  },
  //对复选框的方法 改变总价格和数量
  handleitemchoose(e)
  {
    //获取被修改的商品的id
    const goods_id=e.currentTarget.dataset.id
   
   //获取购物车数组
   let {cart}=this.data

  //找对应值
  let index=cart.findIndex(v=>v.goods_id===goods_id)

  //取反
  cart[index].checked=!cart[index].checked

  this.setcart(cart)


  },

  //权限给与设置  ***
  //调用小程序内置api 获取用户的收货地址 追踪授权状态 SCOPE
  //增加收货地址
  handleaddress() {

    //打印授权的状态
    wx.getSetting({
      success: (res) => { 
        console.log(res);
        //判断用户是否给权限
        const scopeaddress = res.authSetting["scope.address"]
        //用户同意权限 直接调用
        if (scopeaddress==true || scopeaddress == undefined) {
          wx.chooseAddress({
            success: (result) => {
              //存地址到缓存
              wx.setStorageSync('address', result);
              console.log(result);
            },
          });
        }
        //如果没给 调用接口让用户同意  打开授权页面
        else {
          wx.openSetting({
            success: (result) => {
              console.log(result);
              //调用用户同意权限接口
              wx.chooseAddress({
                success: (res) => {
                  wx.setStorageSync('address', res);
                  console.log(res);

                },

              });
            },

          });
        }
      },
    });
  },

})