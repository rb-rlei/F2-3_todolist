// NOTE - 這個頁面放跟「首頁」相關的路由

const express = require('express')
// 用 express 的路由器來整理路由
const router = express.Router()

const Todo = require('../../models/todo')

// index 頁面路由
router.get('/', (req, res) => {
  // 拿到全部的 todo 資料
  Todo.find() // find 來尋找全部資料，括號裡放置參數。當參數為空時，會回傳全部的內容
    .lean() // 不要 mongoose 整理過的 model 所以用 lean() 拿到最原始/乾淨的東西 (會是一個資料陣列)
    .sort({ _id: 'asc' }) //依照 todo id 的排序
    .then((todos) => res.render('index', { todos })) //拿到東西後，接下來要把傳進 index 這個 view 當中
    .catch((error) => console.log(error))
})

module.exports = router
