const express = require('express')
const router = express.Router()

const ChatroomsController = require('../controllers/chatrooms')

router.get('/', ChatroomsController.get_all_chatrooms)

router.post('/', ChatroomsController.create_chatroom)

module.exports = router