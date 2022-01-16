const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')


const sampleUserId = new mongoose.Types.ObjectId
sampleUser = {
    _id: sampleUserId,
    name: 'Sara',
    email: 'sara@example.com',
    password: 'Red123!!',
    tokens: [{
        token: jwt.sign({ _id: sampleUserId }, process.env.JWT_SECRET)
    }]
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(sampleUser).save()
}

module.exports = {
    sampleUserId,
    sampleUser,
    setupDatabase
}