//业务模块
const db=require('../db.js')

//返回首页的总车位数目 空闲车位数 固定车位数
exports.gettotalcar=(req,res)=>{
    let sql='select count(*) as totalcarport from 车位信息'
    let sql2='select count(*) as totalfreecar from 车位信息 where HaveCar=1'
    let sql3='select  count(*) as totalfixcar  from 车位信息 where FixCar=0' 
    db.base(sql,null,(result)=>{
      let res1=result[0].totalcarport
      db.base(sql2,null,(result2)=>{
        let res2=result2[0].totalfreecar

        db.base(sql3,null,(result3)=>{
            let res3=result3[0].totalfixcar
            
            res.json({
                'message':'获取车位数据成功',
                'flag':'1',
                'totalcar':res1,
                'totalfreecar':res2,
                'totalfixcar':res3
            })
          })
      })
   
    })
}

//停车区域划分图的接口
exports.getciclemes=(req,res)=>{
        let sql='select position as name, count(*) as value from 车位信息 group by position '
        db.base(sql,null,(result)=>{
            res.json({
                'message':'成功获取圈圈数据',
                'flag':'1',
                'circlemessage':result
            })
        })
}