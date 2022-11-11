const Chatroom = require('../models/Chatroom')

const chatrooms = new Map()

const randomId = () => {
    const maxId = 999999
    const minId = 111111

    const range = maxId - minId + 1
    return Math.floor(Math.random() * range) + minId
}

exports.create_chatroom = (req, res, next) => {
    let id = randomId()
    while (chatrooms.has(id)) {
        id = randomId()
    }

    const roomDetails = req.body
    const newRoom = new Chatroom(id, roomDetails.name, roomDetails.privacy)
    
    chatrooms.set(id, newRoom)

    res.status(200).json({
        message: 'Chat room created successfully',
        chatroom: newRoom.toResponseObject()
    })
}

exports.get_all_chatrooms = (req, res, next) => {
    // TODO: implement get_all_chatrooms
}

exports.join_chatroom = (req, res, next) => {
    if (req.get('Upgrade') !== 'websocket') return next()

    const chatroomId = req.params.chatroomId
    console.log(`connecting to room ${chatroomId}`)
    // TODO: implement join_chatroom
}