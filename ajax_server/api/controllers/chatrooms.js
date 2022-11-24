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

    // wait 5 seconds before sending response to ensure the websocket has enough time to start up
    setTimeout(() => {
        res.status(200).json({
            message: 'Chat room created successfully',
            chatroom: newRoom.toResponseObject()
        })
    }, 5000)
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

exports.get_one_chatroom = (req, res, next) => {
    const chatroomId = parseInt(req.params.chatroomId)
    const chatroom = chatrooms.get(chatroomId)

    if (!chatroom) return res.status(404).json({
        error: {
            message: `Error: Could not find chatroom with id ${chatroomId}`
        }
    })

    res.status(200).json({
        chatroom: chatroom.toResponseObject()
    })
}

exports.join_chatroom = (req, socket, head) => {
    const urlPrefix = "/chatrooms/"

    if (!req.url.startsWith(urlPrefix)) return

    const chatroomId = parseInt(req.url.slice(urlPrefix.length))

    if (!chatrooms.has(chatroomId)){
        socket.disconnect()
        return 
    }
    
    console.log(`connecting to room ${chatroomId}`)

    const chatroom = chatrooms.get(chatroomId)
    chatroom.forwardUpgrade(req, socket, head)
}