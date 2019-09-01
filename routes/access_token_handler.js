const AccessToken = require('../models/tokens/access_token')

function AccessTokenHandler(req) {
    const token = req.header('x-todo-access-token')
    try {
        const access_token = new AccessToken(null, token)
        return access_token.userid
    } catch(e) {
        //send error message
    }
}

module.exports = AccessTokenHandler