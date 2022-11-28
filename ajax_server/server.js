const http = require('http')
const app = require('./app')
const ChatroomController = require('./api/controllers/chatrooms')
const ws = require('ws')

const port = process.env.PORT || 3000

const server = http.createServer(app)

let upgradeReq = {}

server.on('upgrade', (req, socket, head) => {
    upgradeReq = {req, socket, head}
    wsServer.handleUpgrade(req, socket, head, () => {})
})

const wsServer = new ws.Server({ 
    noServer: true,
    verifyClient: async (info, cb) => {
        const {req, socket, head} = upgradeReq
        try {
            await ChatroomController.join_chatroom(req, socket, head)
        } catch (error) {
            cb(false, error.code, error.message)
        }            
    }
})

server.listen(port)