const express=require('express')
const router=express.Router();

const service=require('./service.js')


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

module.exports=router;