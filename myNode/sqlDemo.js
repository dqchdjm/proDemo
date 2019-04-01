//引用了一个module
const http = require('http');
const mysql = require('mysql');
const express = require('express');
var app = express();
app.use(express.static('static'));
const fs = require('fs');

//创建一个服务器
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', '3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
})
let conn  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'mysql',
    multipleStatements: true
});

var error = { err_code: 1, message: '资料不存在', affextedRows: 0 }
app.get('/api/getData', function (req, res) {
    let getSqlData = 'SELECT * FROM mydata WHERE id=?';
    const id = req.query.id;
    console.log(id)
    conn.query(getSqlData, [id], function (err, result) {
        res.status(200);
        if (err) {
            return res.json(error)
        }
        let data={
            id:result[0].id,
            name:result[0].name,
            title:result[0].title,
        }
        res.json({ error_code: 0, data, affextedRows: result.affextedRows });
    });
})

app.post('/api/postData', function (req, res) {
    let getSqlData = 'SELECT * FROM mydata WHERE id=?';
    const id = req.body;
    console.log(res)
    conn.query(getSqlData, [id], function (err, result) {
        res.status(200);
        if (err) {
            return res.json(error)
        }
        res.json({ error_code: 0, message: result, affextedRows: result.affextedRows });
    });
})

// client.connect();
// let addSqlData = "INSERT INTO mydata (id,title,NAME)VALUES(0,?,?);";
// let getSqlData = 'SELECT * FROM mydata WHERE id=?';
// let upSqlData = "UPDATE mydata SET NAME = ? WHERE id = ?";
// let delSqlData = "delete from mydata where id = ?";
// res.end('可以使用');
//增
// client.query(addSqlData,['第一次Add','myAdd'], function (err, result) {
//     if (err) {
//         console.log('[SELECT ERROR] - ', err.message);
//         return;
//     }
//     console.log('---------------SELECT----------------');
//     console.log(result);
//     res.end(JSON.stringify(result));
// });
//删
// client.query(delSqlData,[3], function (err, result) {
//     if (err) {
//         console.log('[SELECT ERROR] - ', err.message);
//         return;
//     }
//     console.log('---------------SELECT----------------');
//     console.log(result);
//     res.end(JSON.stringify(result));
// });
//改
// client.query(upSqlData,['第一次',1], function (err, result) {
//     if (err) {
//         console.log('[SELECT ERROR] - ', err.message);
//         return;
//     }
//     console.log('---------------SELECT----------------');
//     console.log(result);
//     res.end(JSON.stringify(result));
// });
//查 query
// client.query(getSqlData, function (err, result) {
//     if (err) {
//         console.log('[SELECT ERROR] - ', err.message);
//         return;
//     }
//     console.log('---------------SELECT----------------');
//     console.log(result);
//     res.end(JSON.stringify(result));
// });

// client.end();

var server = app.listen(1339, function () {
    console.log('Server running at http://127.0.0.1:1339/');

})