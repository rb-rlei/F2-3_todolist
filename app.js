const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 將路由們拿進來使用
const routes = require('./routes')

// 將 mongoose 統一設定
require('./config/mongoose')

const app = express()
const port = 3000

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
