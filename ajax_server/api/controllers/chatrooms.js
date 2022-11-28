const Chatroom = require('../models/Chatroom')
const chatroomMap = Chatroom.chatroomMap

exports.create_chatroom = (req, res, next) => {
    const roomDetails = req.body
    const newRoom = new Chatroom(roomDetails.name, roomDetails.privacy)

    // wait 5 seconds before sending response to ensure the websocket has enough time to start up
    setTimeout(() => {
        res.status(200).json({
            message: 'Chat room created successfully',
            chatroom: newRoom.toResponseObject()
        })
    }, 5000)
}

exports.get_all_chatrooms = (req, res, next) => {
    const chatroomsArray = Array.from(chatroomMap.values())
    const publicChatrooms = chatroomsArray.filter(chatroom => chatroom.isPublic())
    const responseChatrooms = publicChatrooms.map(chatroom => chatroom.toResponseObject())
    res.status(200).json({
        chatrooms: responseChatrooms,
        count: responseChatrooms.length
    })
}

exports.get_one_chatroom = (req, res, next) => {
    const chatroomId = parseInt(req.params.chatroomId)
    const chatroom = chatroomMap.get(chatroomId)

    if (!chatroom) return res.status(404).json({
        error: {
            message: `Error: Could not find chatroom with id ${chatroomId}`
        }
    })

    res.status(200).json({
        chatroom: chatroom.toResponseObject()
    })
}

exports.join_chatroom = async (req, socket, head) => {
    const urlPrefix = "/chatrooms/"

    if (!req.url.startsWith(urlPrefix)) {
        const error = new Error('Invalid url for websocket connection')
        error.code = 400
        console.log(`Error ${error.code}: ${error.message}`);
        throw error
    }

    const chatroomId = parseInt(req.url.slice(urlPrefix.length))
    const chatroom = chatroomMap.get(chatroomId)

    if (!chatroom) {
        const error = new Error(`Could not find chatroom with id ${chatroomId}`)
        error.code = 404
        console.log(`Error ${error.code}: ${error.message}`);
        throw error
    }

    if (!await chatroom.isOpen()) {
        const error = new Error('An error occured while connecting to chatroom, the websocket is not open for connection')
        error.code = 500
        console.log(`Error ${error.code}: ${error.message}`);
        throw error
    }
    
    console.log(`connecting to room ${chatroomId}`)
    chatroom.forwardUpgrade(req, socket, head)
}