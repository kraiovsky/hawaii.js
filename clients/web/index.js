require('dotenv').config()
const config = require('config')
const server = require('./src/server')

const PORT = config.get('port') || 5000
server.listen(PORT, () => console.log(`Web client started on ${PORT}`))
