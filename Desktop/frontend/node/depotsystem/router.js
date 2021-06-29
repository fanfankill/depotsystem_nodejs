const express=require('express')
const router=express.Router();

const service=require('./service/service.js')
const carjoin=require('./service/carjoin.js')
const gettotal=require('./service/gettotal.js')
const carperson=require('./service/carperson')


router.post('/login',service.login);

router.get('/getallperson',service.getallperson);

//获取所有车位信息+分页
router.get('/getallparking',service.getallparking)
//新增车位
router.post('/addparking',service.addnewparking)
//根据车位编号搜索
router.post('/searchId',service.searchId)
//根据车位编号删除车位
router.post('/deleteparking',service.deleteparking)
//根据车位编号修改车位
router.post('/editparking',service.editparking)
//获取车位区域信息
router.get('/getposition',service.getposition)
//增加停车区域
router.post('/addposition',service.addposition)
//通过区域筛选剩余车位
router.post('/selectpart',service.selectpart)

/**进出车位记录*/
router.post('/addcarjoin',carjoin.addcarjoin)
//获取所有进出车辆
router.get('/getallcarjoin',carjoin.getallcarjoin)
//查询车辆出库时的小时和价格
router.get('/searchcarjoin',carjoin.searchcarjoin)
//驶出车辆计费登记
router.post('/removecarjoin',carjoin.removecarjoin)

//获取车位总数 空闲车位数目 固定车位数
router.get('/gettotalcar',gettotal.gettotalcar)
//圆圈数据
router.get('/getciclemes',gettotal.getciclemes)
//折线图数据
router.get('/getxianmes',gettotal.getxianmes)

//获取车主信息
router.get('/getpersonmes',carperson.getpersonmes)
//新增车主信息
router.post('/addpersonmes',carperson.addpersonmes)
//删除车主信息
router.post('/deletepersonmes',carperson.deletepersonmes)
//修改车主信息
router.post('/editpersonmes',carperson.editpersonmes)
//查找不是固定车位的信息
router.get('/getnotfixport',carperson.getnotfixport)
//收费表记录
router.post('/getfare',carperson.getfare)

//获取停车区域
router.get('/getallposition',carperson.getallposition)
//删除停车区域
router.post('/deleteposition',carperson.deleteposition)



//天气
router.get('/getweather',gettotal.getweather)

module.exports=router;