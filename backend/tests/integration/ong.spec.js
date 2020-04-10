const request = require('supertest')
const app = require('../../src/app')
const testsBeforeAndAfter = require('../testsBeforeAndAfter')

describe('ONGs', () => {
    testsBeforeAndAfter()

    it('should be able to list all the ONGs', async () => {
        const response = await request(app).get('/ongs')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: 'APAD',
                email: 'apad@ong.com',
                whatsapp: '1122223333',
                city: 'Hyrule',
                uf: 'HY'
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})