//路由板块 用户信息部分
const express = require('express')
const router = express.Router()

//使用模板引擎渲染页面
const ctr = require('../controller/user.js')

router.get('/register',ctr.getRegisterHandle)
router.get('/login',ctr.getLoginHandle)

router.get('/login/reauth', ctr.getLoginHandle)
//客户端发送请求
//注册
router.post('/register',ctr.postRegisterHandle)
//登陆
router.post('/login',ctr.postLoginHandle)
//注销退出
router.get('/logout',ctr.getLogoutHandle)

module.exports = router