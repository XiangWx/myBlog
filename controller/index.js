module.exports = {
    getIndexHandle : (req,res)=>{
        res.render('index.ejs',{
            isLogin:req.session.isLogin,
            userItem:req.session.userItem
        })
    
    }
}