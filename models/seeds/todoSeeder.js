const mongoose = require('mongoose')

const Todo = require('../todo')

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

  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }

  console.log('done.')
})
