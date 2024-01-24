const express = require("express");
const app = express();
const cors = require("cors")
const port = 3000;
const { createTodo, updateTodo } = require("./types")
const { Todo } = require("./db");


app.use(express.json());
app.use(cors())

app.post('/todo', async (req, res) => {
  const createPayload = req.body;
  console.log(createPayload)
  const parsedPayload = createTodo.safeParse(createPayload)
  console.log(parsedPayload)
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You've sent the wrong inputs"
    })
    return;
  }
  await Todo.create({
    id: createPayload.id,
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  })
  res.json({
    msg: "Todo item was successfully added"
  })
});

app.get('/todos', async (req, res) => {
  const todos = await Todo.find({})

  res.json({
    todos
  })

});

app.put('/completed', async (req, res) => {
  const updatedPayload = req.body
  console.log(updatedPayload)
  const parsedPayload = updateTodo.safeParse(updatedPayload)
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You've sent the wrong inputs"
    })
    return;
  }
  const todo = await Todo.findOne({
    _id: req.body.id
  })
  console.log(todo)
  if (!todo) {
    res.json({
      msg: "You've sent the wrong id"
    })
  }
  else {
    todo.completed = true;
    todo.save();
    res.json("Todo item was successfully updated")
  }
});

app.get('/todo', async (req, res) => {
  const id = req.query.id
  const todo = await Todo.findOne({
    id: id
  })
  res.json({
    todo: todo
  })
})

app.listen(port)
