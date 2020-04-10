const knex = require('knex')
const configuration = require('../../knexfile')

const config = process.env.NODE_ENV == 'test' ? 'testing' : 'development'

const connection = knex(configuration[config])

module.exports = connection