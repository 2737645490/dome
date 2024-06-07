//链接数据库
//导入mysql数据库
var mysql = require('mysql');
//
var connection = mysql.createConnection({
    //数据库主机名
    host: 'localhost',
    //数据库用户名
    user: 'root',
    //数据库密码
    password: 'admin123',
    //数据库
    database: 'goods'
});

connection.connect(); //建立数据链接
//导出链接
module.exports = connection;