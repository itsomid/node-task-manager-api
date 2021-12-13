const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {

//     res.status(503).send('server is currently down. check back soon!')

// })
app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


app.listen(port, () => {
    console.log('server is up on port:', port);
})


const Task = require('./models/task')
const User = require('./models/user')

const main = async ()=>{
    // const task = await Task.findById('61b5b971fd81b831029cb253').populate('owner')
    
    // console.log(task)

    const user = await User.findById('61b5b8104df8ea8cfa58c184')
    await user.populate('tasks')
    console.log(user.tasks);
}
main()
