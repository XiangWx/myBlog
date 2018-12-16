//业务处理
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

const fs = require('fs')
const path = require('path')

 
//注册body-parser 中间件 收集表单数据
app.use(bodyParser.urlencoded({extended:false}))

//设置默认使用的模板引擎ejs
app.set('views engine','ejs')
//设置模板引擎默认的存放位置
app.set('views','./views')

//静态资源托管
app.use('/node_modules',express.static('./node_modules'))

app.use(require('./router/index.js'))

app.use(require('./router/user.js'))



app.listen(8080,()=>{
    console.log('running at http://127.0.0.1:8080')
})
