const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../src/models/user')
const req = require('express/lib/request')

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
    const response = await request(app)
    .post('/users')
    .send({
        name: 'Omid',
        email: 'o.shabani@hotmail.com',
        password: 'Red123!'
    })
    .expect(201)

    //Assertion that database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertion about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Omid',
            email: 'o.shabani@hotmail.com',
        },
        token: user.tokens[0].token
    })

    // Assertion About Password stored correctly
    expect(user.password).not.toBe('Red123!')
})

test('Should login existing user', async () => {
    const response = await request(app)
    .post('/users/login')
    .send({
        email: sampleUser.email,
        password: sampleUser.password
    }).expect(200)

    // validate new token is saved
    const user = await User.findById(sampleUserId)
    expect(response.body.token).toBe(user.tokens[1].token)
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

test('should delete account for user', async () => {

    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${sampleUser.tokens[0].token}`)
        .send()
        .expect(200)

    // validate user is removed
    const user = await User.findById(sampleUserId)
    expect(user).toBeNull()
})


test('should not delete account for unuthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${sampleUser.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

})

test('should update valid user fields', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${sampleUser.tokens[0].token}`)
    .send({
        name: "Omid",
        age: 30,
    })
    .expect(200)

    const user = await User.findById(sampleUserId)
    expect(user.name).toEqual('Omid')
    
})

test('should not update invalid user fields', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${sampleUser.tokens[0].token}`)
    .send({
        location: "Omid",
    })
    .expect(400)
})