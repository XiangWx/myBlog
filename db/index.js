const moment = require('moment')
const mysql = require('mysql')
//连接数据库
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog',
    multipleStatements:true 
    //multipleStatements:true  这一句文档参数里面有  如果同时执行多条sql语句 要设置为true
  })

  module.exports = conn