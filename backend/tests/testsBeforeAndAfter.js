const connection = require('../src/database/connection')

function run() {
    beforeEach(async () => {
        await connection.migrate.latest()
        await connection.migrate.latest()
    })
    
    afterAll(async () => {
        await connection.destroy()
    })
}

module.exports = run