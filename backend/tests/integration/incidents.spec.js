const request = require('supertest')
const app = require('../../src/app')
const testsBeforeAndAfter = require('../testsBeforeAndAfter')

describe('Incidents', () => {
    testsBeforeAndAfter()

    it('should not be able to get incidents without Authorization', async () => {
        const response = await request(app).get('/incidents')

        expect(response.status).toBe(400)
    })

    it('should be able to get incidents', async () => {
        const { body: newOng } = await request(app)
            .post('/ongs')
            .send({
                name: 'APAD',
                email: 'apad@ong.com',
                whatsapp: '1122223333',
                city: 'Hyrule',
                uf: 'HY'
            })

        const response = await request(app)
            .get('/incidents')
            .set('Authorization', newOng.id)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        
        if(response.body.length) {
            expect(response.body).toHaveProperty('id')
            expect(response.body).toHaveProperty('ong_id')
        }
    })
})