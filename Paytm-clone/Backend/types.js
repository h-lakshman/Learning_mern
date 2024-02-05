const zod = require('zod')

const userSchema = zod.object({
  firstName: zod.string().max(50, { message: "First Name is too long" }),
  lastName: zod.string().max(50, { message: "Last Name is too long" }),
  username: zod.string().email(),
  password: zod.string().min(6, { message: "Password needs to be minimum of 6 characters" })
})


const signinBody = zod.object({
  username: zod.string().email().max(50),
  password: zod.string().min(6)
})

const updateBody = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().max(50).optional(),
  lastName: zod.string().max(50).optional()
})
module.exports = {
  userSchema,
  signinBody,
  updateBody,
}

