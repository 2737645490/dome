var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js')

// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });

router.get('/goods', function(req, res, next) {
    const sql = 'select * from goods'
    connection.query(sql, (error, results, fields) => {
        if (results) {
            res.json({
                code: 200,
                msg: '请求成功',
                data: results
            })
        }
    })
});

router.post('/add', (req, res, next) => {
    // req：请求体对象,包括前端给后端发送请求众携带的参数
    // res：响应体对象,可以给前端返回值
    // next：是否放行
    // 结构赋值(ES6中的方法)
    const { name, price, num, status, remark } = req.body
    const sql = 'insert into goods value(null,?,?,?,?,?)'
    connection.query(sql, [name, num, price, status, remark], (error, results, fields) => {
        if (results) {
            res.json({
                code: 200,
                msg: '新增成功',
            })
        }
    })
})

module.exports = router;