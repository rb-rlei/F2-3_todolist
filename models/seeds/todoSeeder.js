// 建立種子資料
// 1.載入 mongoose (因為需要 mongoose 幫我們連線)
// 2.(row 23-31)如果 db 成功連線，要幫我建立 10 筆資料
// 3.用終端機執行這個檔案，讓 db 連線，才會真的完成建立資料的動作

// 在 todo.js 中，我們已經透過 module.exports 把 schema 輸出，並且將 schema 命名為 Todo，所以此處是載入這個名叫 Todo 的 model
const Todo = require('../todo')

// mongoose 的連線設定
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
})
