// pages/good_list/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabs:[
        {
          id:0,
          value:"综合",
          isactive:true
        },  {
          id:1,
          value:"销量",
          isactive:false
        },  {
          id:2,
          value:"价格",
          isactive:false
        }
      ],
      //商品数据
      goodslist:[]
  },
  //接口要从参数
  qureyparams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10,
  },
  totalpagesize:1,

  onLoad: function (options) {
      console.log(options);
      this.qureyparams.cid=options.cid
      console.log(this.qureyparams);
      this.getgoodslist()
  },

  //页面滚动条触底事件 要判断是否有下一页数据 总页数 页码   页码*获取条数>=总数据 没有下一页
  onReachBottom()
  {
      //判断是否还有下一页
      if(this.qureyparams.pagenum>=this.totalpagesize)
      {
        //给个提示
        wx.showToast({
          title:'',
          icon:'none',
          duration:1500,
         
        })
      }
      else{
     
         this.qureyparams.pagenum++
        console.log(this.qureyparams.pagenum);
        this.getgoodslist()
      }
  },
  //下拉刷新触发函数 
  onPullDownRefresh(){
      //1 重置数组
      this.setData({
        goodslist:[]
      })
      //重置页数
      this.qureyparams.pagenum=1
      //重新发请求
      this.getgoodslist()
      //手动关闭下拉刷新等待效果
  },

//tab子组件点击事件
handitemchange(e)
{
  console.log(e);
  //获取被点击的标题索引
  const {index}=e.detail;
  let {tabs}=this.data
  tabs.forEach((value,i)=>i==index?value.isactive=true:value.isactive=false)
  this.setData({
    tabs
  })
  
},
  
//获取商品列表数据
 getgoodslist()
 {
  request({url:'/goods/search',data:this.qureyparams}).then(res=>{
    console.log(res);
    //获取总条数
    const total=res.data.message.total
    

    //总页数赋值 算出最大页数
    this.totalpagesize=Math.ceil(total/this.qureyparams.pagesize)
    console.log(this.totalpagesize);
    this.setData({
      goodslist:[...this.data.goodslist,...res.data.message.goods]
    })
    //关闭下拉刷新效果
    wx.stopPullDownRefresh()
  })
 },
 
})