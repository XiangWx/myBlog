const  conn = require('../db')
const moment = require('moment')

module.exports = {
    getIndexHandle : (req,res)=>{
        //做分页部分
        const pageSize = 3
        const currentPage = parseInt(req.query.page) || 1

        const sql = `select a.id,a.title,a.ctime,u.nickname from article as a 
        left join user as u 
        on a.authorld = u.id
         order by a.ctime desc
        limit ?,${pageSize};
        select count(*) as count from article`
       


        conn.query(sql,(currentPage-1)*pageSize,(err,result)=>{
            console.log(result)
            if(err) return res.send(err.message)
            //同时执行两条sql语句 得到一个数组 result[0] result[1]
            //文章得总条数
            const totalCount = result[1][0].count
            //总的页数
            const totalPage = Math.ceil(totalCount /pageSize)

            res.render('index.ejs',{
                isLogin:req.session.isLogin,
                userInfo:req.session.userInfo,
                articleInfos:result[0],
                totalPage,
                currentPage

            })
        })

    
    }
}