const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// 拿 models 裡面的資料(之前在 schema 定義的東西)
const Todo = require('./models/todo')
const { countDocuments } = require('./models/todo')

const app = express()
const port = 3000

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

app.get('/', (req, res) => {
  // 拿到全部的 todo 資料
  Todo.find() // find 來尋找全部資料，括號裡放置參數。當參數為空時，會回傳全部的內容
    .lean() // 不要 mongoose 整理過的 model 所以用 lean() 拿到最原始/乾淨的東西 (會是一個資料陣列)
    .then((todos) => res.render('index', { todos })) //拿到東西後，接下來要把傳進 index 這個 view 當中
    .catch((error) => console.log(error))
})

// Create 新增資料
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name //先拿到使用者寫了什麼

  // const todo = new Todo({name}) // 這個寫法的意思是先在伺服器先建立把使用者寫什麼，建立一個 todo 變數儲存起來，但尚未推進資料庫，所以還要記得再把東西 「存進」資料庫
  // return todo.save() // .save() 把東西存進資料庫

  return Todo.create({ name }) // 直接用 mongoose 把資料寫進資料庫 (跟 row 53-54 等價)
    .then(() => res.redirect('/')) // 存進資料庫後，讓使用者 redirect 到首頁
    .catch((error) => console.log(error))
})

// Read 單筆資料的詳細檢視頁面
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error))
})

// Edit
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name // 使用者新填寫的東西
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name //重新賦值 todo 資料裡的東西，改為使用者新填寫的東西
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.log(error))
})

// Delete
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(error))
})

// 啟動監聽
app.listen(port, (req, res) => {
  console.log('已完成監聽')
})
