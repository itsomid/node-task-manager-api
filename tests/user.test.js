const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

sampleUser = {
    name: 'Sara',
    email: 'sara@example.com',
    password: 'Red123!!'
}
beforeEach(async ()=>{
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

test('Should login existing user', async ()=>{
    await request(app).post('/users/login').send({
        email: sampleUser.email,
        password: 'Red123!!'
    }).expect(200)
})

test('should not login nonexistent user', async ()=>{
    await request(app).post('/users/login').send({
        email: sampleUser.email,
        password: 'thisisnotmypassword'
    }).expect(400)
})