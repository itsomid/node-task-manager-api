const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {
    sampleUser,
    sampleUserId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${sampleUser.tokens[0].token}`)
        .send({
            description: 'New test Task'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should fetch user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${sampleUser.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toEqual(2)
})


test('should not delete other users task', async () => {
    const response = await request(app)
        .delete(`/task/${taskOne._id}`)
        .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
        const task = Task.findById(taskOne._id)
        expect(task).not.toBeNull()
})
