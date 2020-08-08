const express = require('express')

// 用 express 的路由器來整理路由
const router = express.Router()

// 將其他檔案裡的路由拿進來
const home = require('./modules/home')
const todos = require('./modules/todos')

router.use('/', home)
router.use('/todos', todos)

module.exports = router
