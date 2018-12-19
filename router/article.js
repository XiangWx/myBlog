const express = require('express')
const router = express.Router()

const ctrl = require('../controller/article.js')

router.get('/article/add', ctrl.getArticleAddHandle)

router.post('/article/add', ctrl.postArticleAddHandle)

router.get('/article/info/:id',ctrl.getArticleInfoHandle)

router.get('/article/edit/:id',ctrl.getArticleEditHandle)

router.post('/article/edit/:id',ctrl.postArticleEditHandle)


module.exports = router