const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const sampleUserId = new mongoose.Types.ObjectId()
const sampleUser = {
    _id: sampleUserId,
    name: 'Sara',
    email: 'sara@example.com',
    password: 'Red123!!',
    tokens: [{
        token: jwt.sign({ _id: sampleUserId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Reza',
    email: 'reza@example.com',
    password: 'Red123@@',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {   
    description: 'First Task',
    completed: false,
    owner: sampleUser._id
}
const taskTwo = {   
    description: 'Second Task',
    completed: true,
    owner: sampleUser._id
}
const taskThree = {   
    description: 'Third Task',
    completed: true,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(sampleUser).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    sampleUserId,
    sampleUser,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}