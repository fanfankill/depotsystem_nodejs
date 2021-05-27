//入口文件
const express=require('express')
const router=require('./router.js')
const app=express()

//启动静态资源服务
app.use('/www',express.static('public'));

//处理请求参数
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//设置跨域请求
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

//启动服务器
//配置路由
app.use(router);
//监听端口
app.listen(3000,()=>{
    console.log('服务器启动成功 端口为3000');
})


