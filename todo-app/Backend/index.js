const express = require("express");
const app = express();
const port = 3000;
const { createTodo, updateTodo } = require("./types")
const { Todo } = require("./db");


app.use(express.json());

app.post('/todo', async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload)
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You've sent the wrong inputs"
    })
    return;
  }
  await Todo.create({
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

  if (!todo) {
    res.json({
      msg: "You've sent the wrong id"
    })
  }
  else {
    todo.completed = true;
    res.json("Todo item was successfully updated")
  }
});

app.listen(port)
