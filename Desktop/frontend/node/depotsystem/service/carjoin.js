//业务模块
const db = require('../db.js')
const moment = require('moment')




//添加进出车位信息
exports.addcarjoin = (req, res) => {
    let sql = 'insert into 进出记录表 set?'
    let info = req.body
    let nowtime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

    let data = {
        CarNumber: info.CarNumber,
        ComeTime: nowtime,
        IsDone:0,
        position: info.position,
        CarportNumber: info.CarportNumber
    }

    let sql2 = 'select * from 进出记录表 where CarNumber=?'
    let data2 = [info.CarNumber]
    db.base(sql2, data2, (result => {

        if (result.length == 0) {
            //修改车位信息的车位状态
            let sql3 = 'update 车位信息 set HaveCar=? ,CarNumber=? where CarportNumber=?'
            let data3 = [0,info.CarNumber, info.CarportNumber]
            db.base(sql3, data3, (result3 => {
              
                //录入进出记录表中
                db.base(sql, data, (result2 => {
                    if (result2.affectedRows == 1) {
                        res.json({
                            "code": 1,
                            "message": "录入信息成功"
                        })
                    }
                }))
            }))

        }
        else {
            res.json({
                "code": 0,
                "message": "记录失败，该车牌号已在库中"
            })
        }

    }))
}

//获取所有进出车辆表数据
exports.getallcarjoin=(req,res)=>{
    let sql='select * from 进出记录表 where IsDone=? group by ComeTime'
    let data=[req.query.isdone]
    console.log(req.query.isdone);
    db.base(sql,data,(result=>{
        result.forEach(v=>{
            v.ComeTime=moment(v.ComeTime).format('YYYY-MM-DD HH:mm:ss')
            v.LeaveTime=moment(v.LeaveTime).format('YYYY-MM-DD HH:mm:ss')
        })
        res.json(result)
    }))
}

//查询车辆出库时的小时和价格 未完成出库的接口
exports.searchcarjoin=(req,res)=>{
    console.log(req.query);
        let info=req.query
        let Id=info.Id
        let nowtime=moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        let sql='select * from 进出记录表 where Id=?'
        let data=[Id]
        db.base(sql,data,(result=>{
       
            let cometime=moment(result[0].ComeTime).format('YYYY-MM-DD HH:mm:ss');
           
            let time1=moment(nowtime)
            let time2=moment(cometime)
            
            let allhours=moment(time1).diff(moment(time2), 'hours')

            console.log(allhours);

            let leavetime=moment(result[0].LeaveTime).format('YYYY-MM-DD HH:mm:ss');

            //区域
            let position=result[0].position
            //车位编号
            let carport=result[0].CarportNumber
            //总小时数
          
            
            //查询该区域价格
            let sql2='select * from 停车区域 where position=?'
            let data2=[position]

            db.base(sql2,data2,(result2=>{
             
                if(result[0].LeaveTime==null)
                {
                    res.json({
                        'code':1,
                        'message':'查询成功',
                       'list':{
                           'startime':cometime.substr(0,16),
                           'leavetime':nowtime.substr(0,16),
                        'position':position,
                        'fare':result2[0].fare,
                        'hours':allhours,
                        'carport':carport
                       }
    
                    })
                }
               else{
                res.json({
                    'code':1,
                    'message':'查询成功',
                   'list':{
                       'startime':cometime.substr(0,16),
                       'leavetime':leavetime.substr(0,16),
                    'position':position,
                    'fare':result2[0].fare,
                    'hours':allhours,
                    'carport':carport
                   }

                })
               }

            }))

           
        }))
}

//驶出车辆计费登记
exports.removecarjoin=(req,res)=>{
    let info=req.body
    //进出记录表收费
    let sql='update 进出记录表 set LeaveTime=?,totalfare=?,IsDone=? ,day=?where Id=?'

    //当前日期
    let day=moment(Date.now()).format('YYYY-MM-DD')
    console.log(day);

    let nowtime=moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    console.log("Id是"+info.CarPortNumber);
    console.log("时间"+nowtime);
    console.log("总费用"+info.totalfare);
    let data=[nowtime,info.totalfare,1,day,info.Id]
    console.log(info);
    db.base(sql,data,(result=>{
        
        //总收费表更新记录
        let sql2='insert into 收费详细  set ?'
        let data2={
            type:0,
            fare:info.totalfare,
            date:day
        }

        db.base(sql2,data2,result2=>{

           
            //关联表更新
            let sql3='update 车位信息 set HaveCar=?,CarNumber=? where CarPortNumber=?'
            let data3=[1,null,info.CarPortNumber]
            db.base(sql3,data3,(result3=>{
                res.json({
                    'code':1,
                    'message':'出库成功',
                    result,
                    result3
                    
                })
            }))
        })


    
    }))

}