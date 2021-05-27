const expree=require('express');
const app=expree();
const mysql=require('mysql');


app.use('/node_modules', express.static('./node_modules'));
//注册body-parser中间件(body-parse用来专门处理post请求的数据)
const bp = require('body-parser');
app.use(bp.urlencoded({extended: false}));

//注册中间件
//配置模板引擎
app.engine('html', require('express-art-template'));

//4. 加载路由模块
const router = require('./router.js');
app.use(router);

//创建连接
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'depotsystem'
})

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('连接成功');
})


//访问路由添加数据
app.get('/addAdmin/:AdminId/:AdminName/:AdminRange',(req,res)=>{

    var  addSql = 'INSERT INTO 管理员(AdminId,AdminName,AdminRange) VALUES(?,?,?)';
    var  addSqlParams = [`${req.params.AdminId}`, `${req.params.AdminName}`,`${req.params.AdminRange}`];

    
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1');
    res.setHeader("Content-Type", "text/html"); 

    db.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }  
        console.log(result);
        res.end("post add")
    })
})
// 解析参数
const bodyParser = require('body-parser')
let login = true;
// json请求
app.use(bodyParser.json())
//登录
app.post('/login', (req, res) => {
    res.json('<div>hello login</div>')
})

//查询数据
app.get('/getAdmin',(req,res)=>{

    var  addSql = 'select*from 管理员';
    res.setHeader('content-type','text/html;charset=utf-8')


      res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1');
    res.setHeader("Content-Type", "text/html"); 

    db.query(addSql,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }  
        console.log(result);
        res.end("查询成功"+JSON.stringify(result))
    })
})

//更新内容
app.get('/updateAdmin/:AdminId',(req,res)=>{
    
    //把AdminName更新了
    var  newAdminName = 'xixixixi';

    let sql=`update 管理员 set AdminName ='${newAdminName}'where AdminId=${req.params.AdminId}`;
    res.setHeader('content-type','text/html;charset=utf-8')
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.end(`update ${req.params.AdminId} is success`)
        }
    })
})

//删除
app.get('/deleteAdmin/:AdminId',(req,res)=>{
    let sql=`delete from 管理员 where AdminId= ${req.params.AdminId}`;


    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1');
    res.setHeader("Content-Type", "text/html"); 
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.end(`删除了ID= ${req.params.AdminId} 的管理人员`)
        }
    })
})

app.listen(3000,()=>{
    console.log('服务器端口号为3000');
})
