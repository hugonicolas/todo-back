const cache = require('../../utils/cache')
const gen_token = require('../../utils/token')

class AccessToken {
    constructor(userid = null, token = null) {
       if (userid) {
           this.userid = userid
           this.save()
       } else {
           this.token = token
           this.check_validity()
       }
    }

    save() {
        const key = gen_token(32)
        const token = {token: key, userid: this.userid}
        try {
            cache.set(key, token)
            this.token = key
        } catch (e) {
            throw "Error while saving Access Token in cache"
        }
    }

    check_validity() {
        try {
            const token = cache.get(this.token)
            if (!token) {
                throw "Error Invalid Access Token"
            }
            this.userid = token.userid
        } catch (e) {
            throw "Error Invalid Access Token"
        }
    }
}

module.exports = AccessToken