const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


const multer = require('multer')
const upload = multer({
    dest : 'images',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        // if(!file.originalname.endsWith('.pdf')){
        //     cb(new Error('file must be PDF'))
        // }
        if(!file.originalname.match(/\.(doc|docx)$/)){
            cb(new Error('file must be doc or docx'))
        }
        cb(undefined, true)
    }
})

// app.use((req, res, next) => {
//     res.status(503).send('server is currently down. check back soon!')
// })

app.post('/uploads', upload.single('upload'), (req, res)=>{
    res.send()
})

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


app.listen(port, () => {
    console.log('server is up on port:', port);
})


const Task = require('./models/task')
const User = require('./models/user')

// const main = async ()=>{
//     // const task = await Task.findById('61b5b971fd81b831029cb253').populate('owner')
    
//     // console.log(task)

//     const user = await User.findById('61b5b8104df8ea8cfa58c184')
//     await user.populate('tasks')
//     console.log(user.tasks);
// }
// main()
