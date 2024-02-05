const express = require('express')
const app = express()
const cors = require('cors')
const { connectDB } = require('./db')
const apiRouter = require('./routes/index')


connectDB()


app.use(cors())
app.use(express.json())
app.use('/api/v1', apiRouter)

app.listen(3000)
