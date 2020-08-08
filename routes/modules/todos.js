// NOTE - 這個頁面放跟「首頁」相關的路由

const express = require('express')
// 用 express 的路由器來整理路由
const router = express.Router()

const Todo = require('../../models/todo')

//

// Create 新增資料
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name //先拿到使用者寫了什麼

  // const todo = new Todo({name}) //這個寫法的意思是先在伺服器先建立把使用者寫什麼，建立一個 todo 變數儲存起來，但尚未推進資料庫，所以還要記得再把東西 「存進」資料庫
  // return todo.save() // .save() 把東西存進資料庫

  return Todo.create({ name }) // 直接用 mongoose 把資料寫進資料庫 (跟 row 53-54 等價)
    .then(() => res.redirect('/')) // 存進資料庫後，讓使用者 redirect 到首頁
    .catch((error) => console.log(error))
})

// Read 單筆資料的詳細檢視頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error))
})

// Edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  // const name = req.body.name // 使用者新填寫的東西
  // const isDone = req.body.isDone // 使用者是否標注此 todo 為完成狀態
  const { name, isDone } = req.body // 用解構賦值來存取使用者資料 (與前兩行等價)

  return Todo.findById(id)
    .then((todo) => {
      todo.name = name //重新賦值 todo 資料裡的東西，改為使用者新填寫的東西
      todo.isDone = isDone === 'on' // isDone === 'on' 這段就會是一個 true false statement，所以不需要再寫一次 if 來判斷
      return todo.save()
    })
    .then(() => res.redirect(`/${id}`))
    .catch((error) => console.log(error))
})

//NOTE - http 的 method 其實不能直接用 PUT/DELETE 來設定，所以雖然我們改用 RESTFUL 的呈現方式，但需要用另外一個套件來幫助我們改路由設定 - method-override
// Delete
router.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(error))
})

//
module.exports = router
