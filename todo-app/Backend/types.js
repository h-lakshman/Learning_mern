const zod = require('zod')

const createTodo = zod.object({
  id: zod.number(),
  title: zod.string(),
  description: zod.string(),
})

const updateTodo = zod.object({
  id: zod.string(),
})

module.exports = {
  createTodo,
  updateTodo

}
