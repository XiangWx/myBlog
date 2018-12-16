module.exports = {
    getLogoutHandle:(req,res)=>{
        //没有登陆的情况下 重定向到首页 拦截
        if(!req.session.isLogin) return  res.redirect('/')
        //这是渲染页面 
        res.render('./article/add.ejs', {
            isLogin:req.session.isLogin,
            userItem:req.session.userItem 
          })
    }
}