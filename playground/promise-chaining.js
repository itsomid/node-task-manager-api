require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('6186921c782908e5422399aa',{age: 1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result)=>{
//     console.log(result)
// })


const updateAgeAndCount = async (id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age: age})
    const count = await User.countDocuments({age: age})
    return count;
}

updateAgeAndCount('6182a28fc1cb3ac615c3613d',2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})