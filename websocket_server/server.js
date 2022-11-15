const http = require('http')
const app = require('./app')

const port = process.env.PORT
if (!port) throw Error('Port number must be specified')

const server = http.createServer(app)

server.listen(port)