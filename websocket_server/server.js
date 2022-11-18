const express = require('express')
const http = require('http')
const app = express()
const ws = require('ws')

// const port = process.env.port
// if (!port) throw Error('Port number must be provided')

const port = 5000

const server = http.createServer(app)

const wsServer = new ws.Server({ noServer: true })
wsServer.on('connection', socket => {

  socket.on('message', message => 
    console.log(JSON.parse(message.toString()))
    )
  
  socket.on('message', message =>
    wsServer.clients.forEach(function each(client) {
        if(client != socket){
            client.send(message, {binary: false})
        } 
    }))
})
server.listen(port)

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request)
    })
})