//业务模块
const db = require('../db.js')
const moment = require('moment')


//获取所有车主信息
exports.getpersonmes=(req,res)=>{
    let sql='select * from 车主信息'
db.base(sql,null,(result)=>{
    res.json({
        result    
    })
})
}

//修改车主信息
exports.editpersonmes