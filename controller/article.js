const conn = require('../db')

const moment = require('moment')

//mditor 在服务器端解析 
const mditor = require("mditor");
const parser = new mditor.Parser();
//页面渲染


module.exports = {
    getArticleAddHandle:(req,res)=>{
        //没有登陆的情况下 重定向到首页 拦截
        if(!req.session.isLogin) return  res.redirect('/')
        //文章页面 渲染
        res.render('./article/add.ejs', {
            isLogin:req.session.isLogin,
            userInfo:req.session.userInfo 
          })
    },
    //新增文章
    postArticleAddHandle:(req,res)=>{
        //console.log(req.body) //获取到表单输入的内容
       
        const articleInfo = req.body
        articleInfo.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        articleInfo.authorld = req.session.userItem.id //获取到作者的id 也就是登陆者的id

        //执行sql语句 插入数据到数据库
        conn.query('insert into article set ?',articleInfo, (err,result)=>{
           if(err || result.affectedRows != 1) res.status(500).send({status:500,msg:'文章发表失败，请重试'})
           res.send({status:200,msg:'文章发表成功',articleId:result.insertId})
           //console.log(result) //对象
        })
    },
    //文章列表页面
    getArticleInfoHandle:(req,res)=>{
        //req:请求 //res：响应
       const articleId =  req.params.id
       //根据id查询数据库
       conn.query('select * from article where id = ?',articleId,(err,result)=>{
           if(err || result.length !== 1) return res.redirect('/')
            // 当用户使用get请求访问服务器并且需要看到页面时 应该用render渲染
            // 当用户使用ajax请求访问服务器 并且需要获取数据时  应该用send返回数据
            //mditor 自带的 解析markdown编辑器 编辑的内容 转换成html文本
           result[0].content = parser.parse(result[0].content)
           res.render('article/info',{
               isLogin:req.session.isLogin,
               userInfo:req.session.userInfo,
               articleInfo:result[0]
           })

       })
    },
    
    //文章修改
    getArticleEditHandle:(req,res)=>{
        //根据id查询数据库做修改操作
        //如果没有登陆
        if(!req.session.isLogin) return res.redirect('/')
        const articleId =  req.params.id //文章id
        conn.query('select * from article where id= ?',articleId,(err,result)=>{
        if(err || result.length != 1) return res.redirect('/')
        // 权限的控制: 如果当前登录的用户ID和作者ID不匹配 也不能渲染
        if(req.session.userInfo.id !== result[0].authorld) return res.redirect('/')

        res.send('article/edit.ejs',{
            isLogin:req.session.isLogin,
            userInfo:req.session.userInfo,
            articleInfo:result[0]
        })
        })
    },
    postArticleEditHandle:(req,res)=>{
        req.body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        conn.query('update article set ? where id = ?',[req.body,req.params.id],(err,result)=>{
            if(err) return res.status(500).send({status:500,msg:'更新失败'})
           res.send({status:200,msg:'文章修改成功'})

        })
    }
}