const mysql=require('mysql');

//创建连接
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'depotsystem'
})
db.connect()

let sql='select* from 管理员 '
let data=7;
db.query(sql,data,function(err,res,fields){
    if(err) throw err;
    console.log(res);
    if(res.affectedRows==1)
    {console.log('插入数据库成功');}
})

db.end()
