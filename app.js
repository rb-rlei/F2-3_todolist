const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 拿 models 裡面的資料(之前在 schema 定義的東西)
const Todo = require('./models/todo')
const { countDocuments } = require('./models/todo')

const app = express()
const port = 3000

//NOTE - 將路由們拿進來使用
const routes = require('./routes')

// mongoose 的連線設定
// 連線位置：'mongodb://(本機)/(資料庫名字)'
mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// 取得資料庫連線狀態參數
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 引入模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 讓 app 使用總路由
app.use(routes)

// 啟動監聽
app.listen(port, (req, res) => {
  console.log('已完成監聽')
})
