const http = require('http')
const app = require('./app')

// const port = process.env.port
// if (!port) throw Error('Port number must be provided')

const port = 5000

const server = http.createServer(app)

server.listen(port)