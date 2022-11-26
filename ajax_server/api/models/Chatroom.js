const httpProxy = require('http-proxy')
const { exec } = require('child_process')
const portfinder = require('portfinder')

const serverIP = 'localhost'

const chatroomMap = new Map()
exports.chatrooms = chatroomMap

const Privacy = Object.freeze({
    PUBLIC: 0,
    PRIVATE: 1
})

function randomId() {
    const maxId = 999999
    const minId = 111111

    const range = maxId - minId + 1
    return Math.floor(Math.random() * range) + minId
}

function generateId() {
    let id = randomId()
    while (chatroomMap.has(id)) {
        id = randomId()
    }
    return id
}

function isPortAvailable(port) {
    return new Promise(resolve => {
        portfinder.getPort({port: port, stopPort: port}, (err, port) => {
            resolve(!err)
        })
    })
}

class Chatroom {
    static chatroomMap = chatroomMap

    constructor(name, privacy) {
        this.id = generateId()
        this.name = name
        this.privacy = Privacy[privacy.toUpperCase()]

        if (this.privacy === undefined) {
            const expected = Object.keys(Privacy).map(s => s.toLowerCase()).join('/')
            throw new Error(`Error: Invalid privacy type. Expected ${expected}, recieved ${privacy}`)
        }

        portfinder.getPort((err, port) => {
            if (err) {
                console.log(`Error creating chatroom: Unable to find port, ${err}`)
                throw new Error('Problem occured while attempting to create chatroom')
            }

            this.port = port

            // start child process running websocket
            const child = exec(`cd ../websocket_server & npm start -- PORT=${port}`)

            this.proxy = httpProxy.createProxyServer({
                target: {
                    host: serverIP,
                    port: port
                }
            })

            // check every 5 seconds (starting 10 seconds from now) to make sure room is still open
            const checkRoomStatus = async () => {
                if (!await this.isOpen()) {
                    console.log(`Deleting chatroom ${this.id}`);
                    chatroomMap.delete(this.id)
                    return
                }
                setTimeout(checkRoomStatus, 5000)
            }
            setTimeout(checkRoomStatus, 10000)

            console.log(`Created chatroom ${this.id} on port ${port} pid ${child.pid}`);
            chatroomMap.set(this.id, this)
        })
    }

    get privacyString() {
        return Object.keys(Privacy)[this.privacy].toLowerCase()
    }

    isPublic() {
        return this.privacy === Privacy.PUBLIC
    }

    toResponseObject() {
        return {
            id: this.id,
            name: this.name,
            privacy: this.privacyString
        }
    }

    forwardUpgrade(req, socket, head) {
        this.proxy.ws(req, socket, head)
    }

    async isOpen() {
        return !await isPortAvailable(this.port)
    }
}

module.exports = Chatroom