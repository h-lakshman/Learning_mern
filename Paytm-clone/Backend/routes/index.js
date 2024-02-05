const { Router } = require("express");
const userRouter = require('./user')
const accountRouter = require('./accounts')
const router = Router()

router.use('/user', userRouter)


module.exports = router
