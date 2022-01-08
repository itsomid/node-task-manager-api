const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// app.use((req, res, next) => {
//     res.status(503).send('server is currently down. check back soon!')
// })

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)

module.exports = app