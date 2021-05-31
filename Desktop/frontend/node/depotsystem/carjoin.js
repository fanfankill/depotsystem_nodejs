//业务模块
const db = require('./db.js')
const moment = require('moment')


//添加进出车位信息
exports.addcarjoin = (req, res) => {
    let sql = 'insert into 进出记录表 set?'
    let info = req.body
    let nowtime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    console.log(nowtime);
    let data = {
        CarNumber: info.CarNumber,
        ComeTime: nowtime,
        position: info.position,
        CarportNumber: info.CarportNumber
    }

    let sql2 = 'select * from 进出记录表 where CarNumber=?'
    let data2 = [info.CarNumber]
    db.base(sql2, data2, (result => {

        if (result.length == 0) {
            //修改车位信息的车位状态
            let sql3 = 'update 车位信息 set HaveCar=? ,CarNumber=? where CarportNumber=?'
            let data3 = [0,info.CarNumber, info.CarportNumber]
            db.base(sql3, data3, (result3 => {
                console.log(result3);
                //录入进出记录表中
                db.base(sql, data, (result2 => {
                    if (result2.affectedRows == 1) {
                        res.json({
                            "code": 1,
                            "message": "录入信息成功"
                        })
                    }
                }))
            }))

        }
        else {
            res.json({
                "code": 0,
                "message": "记录失败，该车牌号已在库中"
            })
        }

    }))
}