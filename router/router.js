const express = require('express');
const router = express.Router();
const mysql = require("mysql");//설치한 mysql기능 
//사용자가 보낸 값이 post방식일때 분석해주는 express기능

const path = require('path');

let conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    port: '3306',
    database: 'nodejs'
})



// 회원가입
router.post("/joinData", (request, response) => {
    console.log('join router!', request.body.user)

    let id = request.body.user.id
    let pw = request.body.user.pw
    let add = request.body.user.add
    let like = request.body.user.like

    let sql = 'insert into camping_member values (?,?,?,?)'
    conn.query(sql, [id, pw, add, like], (err, rows) => {

        if (rows) {
            console.log('등록 성공!')
            response.json({ result: 'success' })
        } else {
            console.log('등록 실패')
            response.json({ result: 'failed' })
        }
    })

    response.end()

})

router.post('/loginData', (request, response) => {
    console.log('login router', request.body.user)

    let id = request.body.user.id
    let pw = request.body.user.pw

    let sql = 'select * from camping_member where email=? and pw=?'
    conn.query(sql, [id, pw], (err, rows) => {
        console.log(rows)
        if (rows.length > 0) {
            // 로그인 성공
            response.send('success')
        } else {
            // 로그인 실패 
            response.send('failed')
        }
    })
})

router.get("*", function (request, response) {
    console.log("hello");
    response.sendFile(path.join(__dirname, '..', 'react-project', 'build', 'index.html'))
});


module.exports = router;