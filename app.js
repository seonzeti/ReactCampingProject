const express = require('express');
const app = express();
const router = require('./router/router');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const session = require('express-session');
const session_mysql_save = require('express-mysql-session');
const path = require('path')

let dbInfo = {
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    port: '3306',
    database: 'nodejs'
}

let SMS = new session_mysql_save(dbInfo);

app.use(session({
    secret: 'smart',
    resave: false,
    saveUninitializedt: true,
    store: SMS
}))
// 이 폴더 안에 있는 static 파일을 쓸게용 
app.use(express.static(path.join(__dirname, 'react-project', 'build')))

// axios 값 주고 받을 때 필요함 
app.use(express.json())
let cors = require('cors')
app.use(cors())

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.listen(3001);