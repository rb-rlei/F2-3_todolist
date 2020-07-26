const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Todo = require('./models/todo')
const { countDocuments } = require('./models/todo')

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

// 引入模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  // 拿到全部的 todo 資料
  Todo.find() // find 來尋找全部資料，括號裡放置參數。當參數為空時，會回傳全部的內容
    .lean() // 不要 mongoose 整理過的 model 所以用 lean() 拿到最原始/乾淨的東西 (會是一個資料陣列)
    .then((todos) => res.render('index', { todos })) //拿到東西後，接下來要把傳進 index 這個 view 當中
    .catch((error) => console.log(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name

  return Todo.create({ name }) // 直接用 mongoose 把資料寫進資料庫
    .then(() => res.redirect('/')) // 存進資料庫後，讓使用者 redirect 到首頁
    .catch((error) => console.log(error))
})

app.listen(port, (req, res) => {
  console.log('已完成監聽')
})
