//业务模块
const db=require('../db.js')
const moment = require('moment')
const weather =require('./moudle_js/weather')

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
//天气
exports.getweather=(req,res)=>{
    weather.getweather('101250101',(data)=>{
            console.log(data.weatherinfo);
            res.json({
               result:data.weatherinfo
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


//每日统计
exports.getxianmes=(req,res)=>{
    let sql='select day,sum(totalfare) as totaldayfare from 进出记录表  group by day  order by day asc'
    db.base(sql,null,(result)=>{

        //最多返回七个数组 而且按最新时间排列返回
        result=result.slice(0,8)
        console.log(result);
        //去除为出库的数组
        result.forEach((v,i)=>{if(!v.day)
            {result.splice(i,1)}
            v.day=moment(v.day).format('YYYY-MM-DD ');
        })
        res.json({
            result
        })
    })
}