//入口文件
const express=require('express')
const router=require('./router.js')
const app=express()
const path=require('path')

//启动静态资源服务
app.use(express.static( 'public'));

//引入socket.io
var server=app.listen(3002)

//放用户

const users=[]
var io=require('socket.io').listen(server)
io.on('connection',function(socket){
  console.log("新用户加入房间");


  //监听Login事件
  socket.on('login',(data)=>{
          // console.log(data);
      //放数据,顺便增加唯一id
      console.log(users.some(v=>{v.adminid==data.adminid}));
      
      data.id=socket.id
      

      if(users.some(v=>{ return v.adminid==data.adminid}))
      {
        data.usertotal=users.length
        console.log('已经进入');
        io.emit('loginback',{...data,users,flag:0})
      }else{
    
        data.usertotal=users.length+1
      // console.log(users.length);
      users.push({...data})
      io.emit('loginback',{...data,users,flag:1})
      // console.log(users.length);

      // console.log('id是'+socket.id);
      //所有人广播
      }
    
  })


  //接受消息
  socket.on('client',data2=>{
      // console.log(data2.value);
      data2.users=users.find(u=>u.id==socket.id)
  
      // console.log(data2.users);
      socket.broadcast.emit('sendmes',data2)
  })

  socket.on('disconnect',()=>{
    let data={}
    let index
     users.forEach((u,i)=>{
       if(u.id==socket.id)
       {
          console.log('我找到了'+i);
          data=u
          index=i
       }
     })
     console.log(data,index);
    console.log('有人离开');
    //需要把数组中这个人移除
    console.log('删除前'+users.length);
    users.splice(index,1)
    console.log('删除后'+users.length);
    io.emit('somelive',{...data,users,usertotal:users.length})
  })
  
})


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
