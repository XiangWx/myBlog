const express = require('express')
const router = express.Router()

const ctrl = require('../controller/index.js')

router.get('/',ctrl.getIndexHandle) 
module.exports = router