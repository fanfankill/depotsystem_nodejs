export const request=(parmas)=>{
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
     }
    })
  })
}