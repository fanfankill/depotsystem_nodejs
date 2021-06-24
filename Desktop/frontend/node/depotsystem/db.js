//封装数据库通用API
const mysql=require('mysql')

exports.base=(sql,data,callback)=>{
    //创建连接
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'depotsystem'
})
connection.connect()

//数据库的操作也是异步的
connection.query(sql,data,function(err,result,fields){
    if(err) throw err;


    callback(result)
    
})

connection.end()
}
