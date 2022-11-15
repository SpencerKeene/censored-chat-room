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
    const chatroomsArray = Array.from(chatrooms.values())
    const publicChatrooms = chatroomsArray.filter(chatroom => chatroom.isPublic())
    const responseChatrooms = publicChatrooms.map(chatroom => chatroom.toResponseObject())
    res.status(200).json({
        chatrooms: responseChatrooms,
        count: responseChatrooms.length
    })
}

exports.join_chatroom = (req, res, next) => {
    const chatroomId = parseInt(req.params.chatroomId)
    console.log(chatrooms, chatroomId)
    if (req.get('Upgrade') !== 'websocket') return next()

    if (!chatrooms.has(chatroomId)){
        return res.status(404).json({
            "error": {
                "message": "chatroom not found!"
            }
        })
    }

    
    console.log(`connecting to room ${chatroomId}`)
    // TODO: implement join_chatroom
}