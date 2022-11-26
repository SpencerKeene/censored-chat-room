const express = require('express')
const http = require('http')
const app = express()
const ws = require('ws')

function getArgs() {
    const args = process.argv.slice(2);
    let params = {};

    args.forEach(a => {
        const nameValue = a.split("=");
        params[nameValue[0]] = nameValue[1];
    });

    return params;
}

const args = getArgs()

const port = args.PORT
if (!port) throw Error('Port number must be provided')

const server = http.createServer(app)

const fs = require('fs');
const blacklist = fs.readFileSync('blacklist.txt').toString().split("\r\n");
const blacklistRegex = new RegExp(`\\b(${blacklist.join('|')})\\b`, 'gi')

const wsServer = new ws.Server({ noServer: true })
wsServer.on('connection', socket => {

    socket.on('message', message => 
        console.log(JSON.parse(message.toString()))
    )

    socket.on('message', message =>
    wsServer.clients.forEach(function each(client) {
        const newMessage = {
            ...JSON.parse(message),
            fromSelf: client == socket
        }

        newMessage.message = newMessage.message.replace(blacklistRegex, "*****")

        client.send(JSON.stringify(newMessage), {binary: false})
    }))

    socket.on('close', () => {
        if (wsServer.clients.size === 0) {
            process.exit()
        }
    })
})

server.listen(port)
console.log(`Listening on port ${port}`);

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request)
    })
    
})



