const httpProxy = require('http-proxy')

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

        this.proxy = httpProxy.createProxyServer({
            target: 'localhost',
            port: 0
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
}

module.exports = Chatroom