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
        totalprice+=(v.goods_price*v.num);
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

  //结算方法
  hanlepay()
  {
    const {address,totalnum}=this.data
    if(!address.userName)
    {
      wx.showToast({
        title: '未添加收货地址',
        icon: 'none',
        mask: false,  
      });
    }
    //用户没有选择商品
    if(totalnum==0)
    {
      wx.showToast({
        title: '购物车还未选购商品',
        icon: 'none',
        mask: false,  
      });
    }
    //正常的话跳转支付界面
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  },
  //减加数量变化点击方法
  handlenumber(e)
  { 
    const {operation,id}=e.currentTarget.dataset
    //获取购物车数组来匹配
    const {cart}=this.data

    //对找到的值进行修改
    const index=cart.findIndex(v=>v.goods_id==id)

    //当商品数量为1时候点击为删除
    if(cart[index].num==1&&operation==-1)
    {
      //弹窗提示
      wx.showModal({
        title: '商品删除',
        content: '是否要删除该商品',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if(result.confirm){
              //存入缓存
              cart.splice(index,1)
             this.setcart(cart)
          }
        },
  
      });

    }
    //都要记得存进去
    else{
      cart[index].num+=operation
      this.setcart(cart)
    }
    
  },

  //全选反选复选框方法
  handeleallchecked(e)
  {

    let {cart,allchecked}=this.data
    //取反
    allchecked=!allchecked

    //forEach会改变原数组
    cart.forEach(v=>v.checked=allchecked);
    //返回data
      this.setcart(cart)
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