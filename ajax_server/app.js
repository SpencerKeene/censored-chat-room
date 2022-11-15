const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes to handle requests
const chatroomRoutes = require('./api/routes/chatrooms')

app.use('/chatrooms', chatroomRoutes)

// Error handling
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app