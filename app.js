const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

// mongoose 的連線設定
mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// 取得連線狀態參數
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, (req, res) => {
  console.log('已完成監聽')
})
