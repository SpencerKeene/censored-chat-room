const express = require('express')
const router = express.Router()
var favicon = require('serve-favicon')
const path = require('path')

const clientDir = path.join(__dirname, '../../..', 'client')

router.get(favicon(path.join(clientDir, 'public', 'favicon.ico')))

router.get('/', (req, res, next) => {
    res.sendFile(path.join(clientDir, 'index.html'))
})

router.get('/chat', (req, res, next) => {
    res.sendFile(path.join(clientDir, 'chat-page.html'))
})

router.get('*', (req, res, next) => {
    res.sendFile(path.join(clientDir, req.url))
})

module.exports = router