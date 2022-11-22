const httpProxy = require('http-proxy')
const { exec } = require('child_process')
const portfinder = require('portfinder')

const Privacy = Object.freeze({
    PUBLIC: 0,
    PRIVATE: 1
})

class Chatroom {
    constructor(id, name, privacy) {
        this.id = id
        this.name = name
        this.privacy = Privacy[privacy.toUpperCase()]

        if (this.privacy === undefined) {
            const expected = Object.keys(Privacy).map(s => s.toLowerCase()).join('/')
            throw new Error(`Error: Invalid privacy type. Expected ${expected}, recieved ${privacy}`)
        }

        portfinder.getPort((err, port) => {
            if (err) {
                console.log(`Error creating chatroom: Unable to find port, ${err}`)
                throw new Error('Error: Problem occured while attempting to create chatroom')
            }

            // start child process running websocket
            const child = exec(`cd ../websocket_server & npm start -- PORT=${port}`)

            this.proxy = httpProxy.createProxyServer({
                target: {
                    host: 'localhost',
                    port: port
                }
            })

            console.log(`Created chatroom on port ${port} pid ${child.pid}`);
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
}

module.exports = Chatroom