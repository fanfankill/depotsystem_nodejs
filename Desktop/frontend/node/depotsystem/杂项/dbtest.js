const db=require('../db.js')

//插入
let sql='insert into 管理员 set?'
let data={
    AdminName:'数据库封装插入',
    AdminRange:'配合下'
}
/**db.base(sql,data,result=>{
    console.log(result);
}) */

//更新
let sql2='update  管理员 set AdminName=?,AdminRange=? where AdminId=?'
let data2=['天龙八部','更新操作',6]

/**db.base(sql2,data2,result=>{
    console.log(result);
}) */

//删除
let sql3='delete from  管理员  where AdminId=?'
let data3=[9]

/**db.base(sql3,data3,result=>{
    console.log(result);
})
 */


//查询
let sql4='select* from  管理员  where AdminId=?'
let data4=[6]

db.base(sql4,data4,result=>{
    console.log(result[0].AdminName);
})