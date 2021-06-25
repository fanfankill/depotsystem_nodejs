//获取其他服务器的内容
//通用天气模块
const http=require('http')

exports.getweather=(citycode,callback)=>{

let options={
    protocol:'http:',
    hostname:'www.weather.com.cn',
    port:80,
    path:'/data/sk/'+citycode+'.html',
    method:'get'
}

let req =http.request(options,(res)=>{
    let info =''

    res.on('data',(chunk)=>{
        info+=chunk
    })

    res.on('end',()=>{
        info=JSON.parse(info)
        callback(info)
    })
})

req.end()
}