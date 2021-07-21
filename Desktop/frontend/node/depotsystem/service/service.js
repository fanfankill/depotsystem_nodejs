//业务模块
const db=require('../db.js')
const moment = require('moment')


//登录
exports.login = (req, res) => {
        let sql='select * from 人员登录 where username=? and password=?'
        let info=req.body
        let data=[info.username,info.password]
        
//        //计数器操作
//        settime.settime(3000)

        //数据操作
        db.base(sql,data,(result)=>{
                console.log(result);
                if(result.length==0)
                {
                        res.json({
                                'code':0,
                                'message':'用户名或密码不正确'
                        })  
                }
                else{

                        res.json({
                                result,
                                'code':1,
                                'message':'登录成功!'

                        })  
                }
            
        })
} 

//注册
exports.register=(req,res)=>{
        let info=req.body
        let sql='insert into 人员登录 set?'
        let data={
                username:info.username,
                password:info.password,
                userimg:'public/imgs/moren.jpg',
                nickname:'默认姓名',
                sex:'男',
                address:'默认地址',
                privatemes:'默认签名',
                jointime:moment(Date.now()+84600000).format('YYYY-MM-DD')
        }

        //查重
        let sql2='select * from  人员登录 where username=?'
        let data2=[info.username]


        db.base(sql2,data2,result=>{
               if(result.length==0)
               {        
                        db.base(sql,data,result=>{
                                res.json({
                                        'message':'注册成功',
                                        'flag':1
                                })
                        })
               }else{
                       res.json({
                               'message':'已存在该手机号码',
                               'flag':0
                       })
               }
        })
}

//管理员基本信息修改
exports.editadminmessage=(req,res)=>{
        let info=req.body
        let sql='update 人员登录 set nickname=? , sex=? , address=? , privatemes=? where AdminId=?'
        let data=[info.nickname,info.sex,info.address,info.privatemes,info.AdminId]

        db.base(sql,data,result=>{
                console.log(result);
                res.json({
                  'message':'修改基本信息成功',
                  'flag':1
                })
        })
}


//通过ID获取登录人员信息
exports.getadminmessage=(req,res)=>{
        let sql='select * from 人员登录 where AdminId=?'
        let data=req.query.AdminId

        db.base(sql,data,result=>{
                res.json({
                        'Adminmessage':result,
                        'code':1,
                })
        })
}
//获取所有车位信息+分页
exports.getallparking=(req,res)=>{
     setTimeout(()=>{
        let info=req.query
        let pagesize=info.pagesize||5
        let currentpage=((info.currentpage-1)*pagesize)||0
        let lastpage=parseInt(currentpage)+parseInt(pagesize)
        console.log(currentpage,(parseInt(lastpage)-1));
        
        let sql='select * from 车位信息 limit '+currentpage+','+pagesize

        let sql2='select count (*) as pagecount from 车位信息' 
        db.base(sql2,null,(result)=>{
          
               
                   //分页函数
        db.base(sql,null,(result2)=>{
                console.log(result);
                 res.json({
                        result2,
                        'count':result[0].pagecount,
                         'code':1,
                         'message':'分页获取所有车位信息成功'
                 })
         })
         })

     },0)

      
        
}
//新增车位
exports.addnewparking=(req,res)=>{
        let sql='insert into 车位信息 set? '
        let info=req.body
        console.log(req.body);
        let sql2='select *from 停车区域 where position=?'
        let data2=[info.position]
        db.base(sql2,data2,(result2)=>{
                console.log(result2[0]);
                let data={
                        HaveCar:1,
                        FixCar:1,
                        CarCost:result2[0].fare,
                        position:info.position,         
                }; 
        db.base(sql,data,(result)=>{
              
                res.json({result,
                'message':'新增车位成功'})
        })
        })

       

}
//根据车位编号搜索
exports.searchId = (req, res) => {
        let sql='select * from 车位信息 where CarportNumber=? '
        let info=req.body
        let data=[info.CarportNumber]

        //数据操作
        db.base(sql,data,(result)=>{
                console.log(result);
                if(result.length==0)
                {
                        res.json({
                                'code':0,
                                'message':'不存在该车位信息'
                        })
                }else{
                        res.json({
                                result,
                                'code':1,
                                'message':'查询车位信息成功'
                        })
                }
        })
}
//根据车位编号删除车位
exports.deleteparking = (req, res) => {
        let sql='delete  from 车位信息 where CarportNumber=?'
        let info=req.body
        let data=[info.CarportNumber]

        //数据操作
        db.base(sql,data,(result)=>{
                console.log(result);
                if(result.length==0)
                {
                        res.json({
                                'code':0,
                                'message':'不存在该车位信息'
                        })
                }else{
                        res.json({
                                result,
                                'code':1,
                                'message':'删除车位信息成功'
                        })
                }
        })
}
//根据车位编号修改车位
exports.editparking = (req, res) => {
        let sql='update  车位信息 set HaveCar=?,position=?,CarCost=?,FixCar=?,CarpersonName=?    where CarportNumber=? '

        let info=req.body
        
        let sql2='select *from 停车区域 where position=?'
        let data2=[info.position]

        //查询对应地区的费用一致
        db.base(sql2,data2,(result2)=>{
                console.log(result2[0].fare);
              //代替区域对应的金额
        let data=[info.HaveCar,info.position,result2[0].fare,info.FixCar,info.CarpersonName,info.CarportNumber]
        db.base(sql,data,(result)=>{
             
                
                res.json({result,
                        result2,
                'code':'1',
                'message':'修改成功'})
        
})
                
        })
       
}
//获取停车区域信息
exports.getposition = (req, res) => {
        let sql='select * from 停车区域'

        //数据操作
     
        db.base(sql,null,(result)=>{
                console.log(result);
                res.json({
                        "message":"获取停车区域信息成功",
                        "code":1,
                        "lists":result,

                })
        }) 
    
}
//增加停车区域
exports.addposition = (req, res) => {
        let sql='insert into  停车区域 set?'
        let info=req.body
        let data={position:info.position,
                  fare:info.fare,
                  decration:info.decration,
                  monthfare:info.monthfare,
                  fixedfare:info.fixedfare}
        
                //查重
                  let sql2='select *from 停车区域 where position=? '
                  let data2=[info.position]
                  db.base(sql2,data2,(result)=>{
                        console.log(result);
                        if(result.length==0)
                        {
                                db.base(sql,data,(result)=>{
                                        console.log(result);
                                        res.json({
                                                "message":"添加停车区域信息成功",
                                                "code":1,
                                                result
                                        })
                                })
                        }
                        else{
                                res.json({
                                        "message":"已存在相同名称车位信息",
                                        "code":0,
                                        result
                                })
                        }
                })
     
     
}

//对停车区域基本信息的修改
exports.editpositionbase=(req,res)=>{
        let info=req.body
        let sql='update 停车区域 set fare=? , decration=? , monthfare=? ,fixedfare=? where position=?'
        let data=[info.fare,info.decration,info.monthfare,info.fixedfare,info.position]

        db.base(sql,data,result=>{
                res.json({
                        'message':'修改停车区域基本信息成功',
                        'flag':1
                })
        })

}

//筛选停车区域停车位的信息
exports.selectpart= (req,res)=>{
        let info=req.body
        let position=info.position
        let haveCar=info.haveCar
        let sql='select *from 车位信息 where position=?  and  HaveCar=? and FixCar=1 '
        let data=[position,haveCar]
         //数据操作
         db.base(sql,data,(result)=>{
                console.log(result);
                res.json(result)
        })
}
       


//获取所有管理人员
exports.getallperson = (req, res) => {
        let sql='select * from 人员登录 where AdminId!=?'
        let data=req.query.AdminId
        //数据操作
        db.base(sql,data,(result)=>{
                console.log(result);
                res.json(result)
        })
}

