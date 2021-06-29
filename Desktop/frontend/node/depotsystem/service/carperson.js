//业务模块
const db = require('../db.js')
const moment = require('moment')


//获取所有车主信息
exports.getpersonmes=(req,res)=>{
    let sql='select * from 车主信息 left join 车位信息  on  车主信息.CarportNumber=车位信息.CarportNumber '
db.base(sql,null,(result)=>{
    res.json({
        result    
    })
})
}

//新增车主信息
exports.addpersonmes=(req,res)=>{
    let sql='insert into  车主信息 set?'
    let info=req.body
    console.log(info);
    let data={
        CarNumber:info.CarNumber,
        CarportNumber:info.CarportNumber,
        PersonName:info.PersonName,
        Adress:info.Adress,
        Age:info.Age,
        Phone:info.Phone
    }
    
    console.log(info.duetime);
   //计算到期时间
    let nowtime=new Date()
    let duetime=info.duetime
   let lasttime= moment(nowtime).add(duetime, 'months')
    //格式化时间
    lasttime=moment(lasttime).format()
    console.log(lasttime);

 

    let sql2='update 车位信息 set FixCar =0,CarpersonName=? ,CarNumber=?,DueDate=? where CarportNumber=?'
    let data2=[info.PersonName,info.CarNumber,lasttime,info.CarportNumber]
    //先修改这个车位的固定状态
    db.base(sql2,data2,(result)=>{
            console.log(result);
            //插入语句
            db.base(sql,data,(result2)=>{
                if(result2.affectedRows==1)
                {
                    res.json({
                      'flag':1,
                      'message':'新增车主信息成功' 
                    })
                }
                
            })
    })


}

//删除车主信息并且删除车位信息对应的车主姓名 车牌编号  固定车位 到期时间
exports.deletepersonmes=(req,res)=>{
        let sql='delete from 车主信息 where CarNumber=?'
        let data=req.body.CarNumber
        console.log(data);

        let sql2='update 车位信息 set FixCar=?,CarpersonName=?,DueDate=?,CarNumber=?  where CarportNumber=?'
        let data2=[1,'',new Date(0),'',req.body.CarportNumber]
       
        db.base(sql,data,result=>{  

            console.log(result);
            db.base(sql2,data2,result2=>{
                console.log(result2);
                       
                res.json({
                    result, 
                    'message':'车主信息删除成功'
                }) 
               })   
        })
}

//修改车主信息
exports.editpersonmes=(req,res)=>{
    let sql='updata 车主信息 set CarNumber=?  , PersonName=? , Adress=?, Age=? , Phone=?'
    let info=req.body
    let data=[info.CarNumber,,info.PersonName,info.PersonName,info.Adress,info.Age,info.Phone  ]
}

//返回不是固定车位的数据 左连接两个表
exports.getnotfixport=(req,res)=>{
    let sql='select * from 车位信息 left join 停车区域 on 车位信息.position=停车区域.position where FixCar=1 and HaveCar=1'

    db.base(sql,null,result=>{
        res.json({
            result
        })
    }) 
}


//计算总收费表
exports.getfare=(req,res)=>{
        let sql='insert into 收费详细 set?'
        let info=req.body
        console.log(info);
        //后端自己获取当前时间
        let day=moment(Date.now()).format('YYYY-MM-DD')
        console.log(day);   
        let data={
            type:info.type,
            fare:info.fare,
            date:day    
        }

        db.base(sql,data,result=>{
            console.log(result);
            res.json({
                'message':'收费插入成功',
                'flag':1
            })
        })
}



//停车区域部分

//获取所有停车区域

exports.getallposition=(req,res)=>{
        let sql='select * from 停车区域'
        db.base(sql,null,result=>{
            res.json({
                lists:result,
                'message':'获取停车区域信息成功',
                'flag':1
            })
        })
}


//删除区域  要保证这个区域没有车的情况下才能删除 车位信息外键相连
exports.deleteposition=(req,res)=>{
    let info=req.body
    console.log(info.position);
    let sql='select * from 车位信息 where position= ?'
    let data=[info.position]

    db.base(sql,data,result=>{

        //如果和车位信息
        if(result.length==0)
        {
            let sql2='delete from 停车区域 where position= ?'
            db.base(sql2,data,result2=>{
                res.json({
                    'message':'删除成功',
                    'flag':1
                })
            })
        }
        else{
            res.json({
                'message':'该区域还存在相关联车位，无法删除！',
                'flag':0
            })
        }
    })

}

