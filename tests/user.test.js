const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../src/models/user')

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

beforeEach(async () => {
    await User.deleteMany()
    await new User(sampleUser).save()
})


test('Should signup new user', async () => {
    await request(app).post('/users').send({
        name: 'Omid',
        email: 'o.shabani@hotmail.com',
        password: 'Red123!'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: sampleUser.email,
        password: 'Red123!!'
    }).expect(200)
})

test('should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: sampleUser.email,
        password: 'thisisnotmypassword'
    }).expect(400)
})


test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${sampleUser.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile for unuthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer 123`)
        .send()
        .expect(401)
})


