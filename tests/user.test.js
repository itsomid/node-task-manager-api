const request = require('supertest')
const app = require('../src/app')

test('Should signup new user', async () => {
    await request(app).post('/users').send({
        name: 'Omid',
        email: 'o.shhabani@hotmail.com',
        password: 'Red123!'
    }).expect(201)
})