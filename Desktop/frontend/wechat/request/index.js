//处理一个页面多次请求的加载图标问题
let ajaxtimes=0

export const request=(parmas)=>{
  ajaxtimes++;
  //显示加载中的效果
    wx.showLoading({
    title: "加载中",
    mask: true,
  });


  //定义公共的url
  const baseUrl='https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve,reject)=>{
    wx.request({
     ...parmas,
     url:baseUrl+parmas.url,
     success:(res)=>{
      resolve(res)
     },
     fail:(err)=>{
      reject(err)
     },
     //不管成功失败都会执行
     complete:()=>{
      ajaxtimes--

      if(ajaxtimes==0)
      {
        //关闭加载中图标
       wx.hideLoading();
      }
     }
    })
  })
}