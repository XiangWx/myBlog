//业务处理
const express = require('express')
const app = express()

// app.get('/',(req,res)=>{
//     res.send('ok')
// }) 

//设置默认使用的模板引擎ejs
app.set('views engine','ejs')
//设置模板引擎默认的存放位置
app.set('views','./views')
app.use('/node_modules',express.static('./node_modules'))

//使用模板引擎渲染页面
app.get('/',(req,res)=>{
    res.render('index.ejs',{})
})


app.listen(8080,()=>{
    console.log('running at http://127.0.0.1:8080')
})
