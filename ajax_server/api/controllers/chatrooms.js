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
        console.log('Error: Invalid url for websocket connection')
        return false
    }

    const chatroomId = parseInt(req.url.slice(urlPrefix.length))
    const chatroom = chatroomMap.get(chatroomId)

    if (!await chatroom?.isOpen()) {
        console.log('Error: Could not connect to chatroom because the chatroom either does not exist or is no longer open');
        return false
    }
    
    console.log(`connecting to room ${chatroomId}`)
    chatroom.forwardUpgrade(req, socket, head)
    return true
}