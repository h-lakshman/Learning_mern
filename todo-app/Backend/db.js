const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/todo-app")


const todoSchema = mongoose.Schema({
  id: Number,
  title: String,
  desription: String,
  completed: Boolean
})

const Todo = mongoose.model("todos", todoSchema)

module.exports = {
  Todo
}
