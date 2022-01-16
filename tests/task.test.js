const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { sampleUser, sampleUserId, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization',`Bearer ${sampleUser.tokens[0].token}`)
        .send({
            description: 'New test Task'
        })
        .expect(201)
        
        const task = await Task.findById(response.body._id)
        expect(task).not.toBeNull()
        expect(task.completed).toEqual(false)
})

