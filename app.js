//业务处理
const express = require('express')

const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()

//node 的核心模块 读取文件
const fs = require('fs')
const path = require('path')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // 如果不设置过期时间  默认 关闭浏览器即过期, 无法存储有效的cookie
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
  }))
//注册body-parser 中间件 收集表单数据
app.use(bodyParser.urlencoded({extended:false}))

//设置默认使用的模板引擎ejs
app.set('views engine','ejs')
//设置模板引擎默认的存放位置
app.set('views','./views')

//静态资源托管
app.use('/node_modules',express.static('./node_modules'))

//导入自己分离的模块 使用fs读取路由模块router目录下面的文件
//循环读取  fs.readdir() 读取目录的内容。  fs.readFile() 读取文件的内容。
fs.readdir('./router',(err,files)=>{
   // console.log(filename) 得到数组 [ 'article.js', 'index.js', 'user.js' ]
   files.forEach(filename =>{
    //console.log('./router/'+filename) ./router/article.js  ./router/index.js   ./router/user.js
    const filepath = path.join(__dirname,'./router/'+filename)
    app.use(require(filepath))
   
   })
})

// app.use(require('./router/index.js'))

// app.use(require('./router/user.js'))

// app.use(require('./router/article.js'))



app.listen(8090,()=>{
    console.log('running at http://127.0.0.1:8090')
})
