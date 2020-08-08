const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 定義資料格式
const todoSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
})

// 透過 module.exports 把這個 schema 輸出，匯出的時候我們把這份 schema 命名為 Todo，以後在其他的檔案直接使用 Todo 就可以操作和「待辦事項」有關的資料了！

module.exports = mongoose.model('Todo', todoSchema)
