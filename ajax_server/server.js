const http = require('http')
const app = require('./app')
const ChatroomController = require('./api/controllers/chatrooms')

const port = process.env.PORT || 80

const server = http.createServer(app)

server.on('upgrade', (req, socket, head) => {
    ChatroomController.join_chatroom(req, socket, head)
})

server.listen(port)