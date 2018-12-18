const conn = require('../db/index')
const moment = require('moment')
//内置加密模块
const bcrypt = require('bcryptjs')


module.exports = {
    getRegisterHandle:(req,res)=>{
        res.render('./user/register.ejs',{});
    },
    getLoginHandle:(req,res)=>{
        res.render('./user/login.ejs',{});
    },
    postRegisterHandle:(req,res)=>{
        //获取表单提交的数据
        const userInfo = req.body
     
        //判断表单数据提交的是否完整
        if(userInfo.username.trim().length<=0 || userInfo.password.trim().length<=0 || userInfo.nickname.trim().length<=0){
            return res.send({msg:'请填写完整的注册信息！',status:500})
        }
   
        //执行sql语句 查询用户名之前是否注册过
        const sql1 = 'select count(*) as count  from user where username=?'
        conn.query(sql1,userInfo.username,(err,result)=>{
            //   console.log(result[0].count) 
                
                if(err) return res.status(500).send({msg:'查询失败，请重试！',status:500})
                //查重  result[0].count=0 说明没被注册
                if(result[0].count !=0) return res.status(500).send({msg:'用户名已重复，请重新输入',status:500})
    
                //设置提交时间 导入moment
                userInfo.ctime = moment().format('YYYY-MM-DD hh:mm:ss')
                //密码进行加密 再保存到数据库
                const  salt  = bcrypt.genSaltSync(10)
                //对密码进行加密
                const  hash  = bcrypt.hashSync(userInfo.password,salt); 
                //加密之后的密码再赋值给password
                userInfo.password = hash
            //执行下面说明没有被注册过
           
            const sql2 = 'insert into user set ?'
            conn.query(sql2,userInfo,(err,result)=>{
                if(err)  return res.status(500).send({msg:'注册失败，请重试！',status:500})
                 res.send({msg:'注册成功',status:200})
                //  console.log(result)
            })
    
           
        })
    },
    postLoginHandle:(req,res)=>{
        //用户登陆的时候 需要去数据库查询用户名和密码是否匹配
        const sql3 = 'select * from user where username=? and password=?'
        conn.query(sql3,[req.body.username,req.body.password],(err,result)=>{
            //如果有报错或者查询结果为空 都是无法登陆的
            if(err || result.length == 0)  return res.status(400).send({msg:'登陆失败，请重试！',status:400})
          
            //登陆成功之后 数据存储在session中
            //console.log(req.session)

            //保存到数据是加密处理之后的密码
            //使用bcrypt进行验证
            if(bcrypt.compareSync(req.body.password,result[0].password)) return res.status(400).send({ status: 400, msg: '登录失败!请重试!' }) 

            req.session.userInfo = result[0]
            //判断是否登陆 true为已经登陆
            req.session.isLogin = true

            res.send({msg:'登陆成功',status:200})
        })
    },
    getLogoutHandle:(req,res)=>{
        req.session.destroy((err) => {
            // res.send({msg:'退出成功', status:200})
            //重定向
            res.redirect('/')
        })
    }

}