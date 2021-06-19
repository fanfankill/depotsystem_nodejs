export const request=(parmas)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
     ...parmas,
     success:(res)=>{
      resolve(res)
     },
     fail:(err)=>{
      reject(err)
     }
    })
  })
}