// pages/category/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //左侧菜单数据
      leftmenuslist:[],
      //右侧商品数据
      rightmenuslist:[],

      //当前选中值
      currentindex:0,
      //每次点击回到顶部
      scrollTop:0,
    
  },
    //接口返回数据
  cates:[],

   //获取分类数据
   getcates(){
    request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'
    }).then(res=>{
      //这个不在data里面所有可以this去获取
      this.cates=res.data.message 
      console.log(res);

          //把接口数据存储
         
        wx.setStorageSync("cates",{time:Date.now(),data:this.cates});

        //过滤获取cate_name属性
        let leftmenuslist=this.cates.map(v=>v.cat_name);
        
        //默认获取第一个值
        let rightmenuslist=this.cates[0].children

        this.setData({
          leftmenuslist:leftmenuslist,
          rightmenuslist:rightmenuslist,
          
        })
    })
   },

   //左侧菜单的点击事件
   handleitemtap(e){
      console.log(e);

      const {index}=e.currentTarget.dataset

      //根据不同的索引改变右边内容
      let rightmenuslist=this.cates[index].children

      this.setData({
        currentindex:index,
        rightmenuslist:rightmenuslist,
        //每次点击都回到顶部
        scrollTop:0
      })
   },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先判断本地储存中有没有旧的数据 没有重新发送请求 有的话用旧数据
    const Cates=wx.getStorageSync("cates");
    console.log(Cates);
    if(!Cates)
    {
      //不存在 发送请求
      this.getcates()
    }else{
      //存了旧数据 定义过期时间 500s测试时间
      if(Date.now()-Cates.time>500000){
        this.getcates()
      }else{
        //使用缓存数据
        this.cates=Cates.data

         //过滤获取cate_name属性
         let leftmenuslist=this.cates.map(v=>v.cat_name);
        
         //默认获取第一个值
         let rightmenuslist=this.cates[0].children
 
         this.setData({
           leftmenuslist:leftmenuslist,
           rightmenuslist:rightmenuslist,
          
         })

      }

    }
     
  },  

 
})