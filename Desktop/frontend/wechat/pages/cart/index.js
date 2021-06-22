// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}
  },

  //每次返回该页面都会调用
  onShow()
  {
    //获取缓存中的收货地址 并且
    
    const address=wx.getStorageSync('address');
    console.log(address);
    this.setData({
      address
    })

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