require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('6182a1fcc1cb3ac615c36139').then((task) => {
//   console.log(task)
//   return Task.countDocuments({ completed: false })
// }).then((uncompletedTaskCount) => {
//   console.log(uncompletedTaskCount)
// }).catch((e) => {
//   console.log(e)
// })

const deleteTaskAndCount = async (id)=>{
  const task = await Task.findByIdAndDelete(id)
  console.log(task)

  const count = await Task.countDocuments({completed: false})
  return count
}

deleteTaskAndCount('6182a27cc1cb3ac615c3613b').then((count)=>{
  console.log(count)
}).catch((e)=>{
  console.log(e)
})