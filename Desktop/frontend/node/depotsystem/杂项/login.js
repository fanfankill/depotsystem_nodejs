//登录验证
//入口文件
const express=require('express')
const bodyParser=require('body-parser')
const db=require('./db.js');
const { param } = require('./router.js');
const app=express()

//处理请求参数
app.use(bodyParser.urlencoded({extended:false}));

//启动静态资源服务
app.use('/www',express.static('public'));


//设置跨域请求
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

app.post('/login',(req,res)=>{
    let parma=req.body;
     
    let sql='select count(*) as total from 管理员 where username=? and password=?'
    let data=[param.username,param.password];

    db.base(sql,data,result=>{
       console.log(result);
        //返回前端json格式数据  
        //res.sendStatus(201)  修改返回的状态码
        res.json(result)
    })
   
})

//restful传参风格

app.get('/login2/:id',(req,res)=>{
    let id=req.params.id
    let sql='select * from 管理员 where AdminId=?'
    let data=[id]
    db.base(sql,data,(result)=>{
        res.json(result)
    })
})


//启动服务器
//配置路由

//监听端口
app.listen(3000,()=>{
    console.log('服务器启动成功 端口为3000');
})


