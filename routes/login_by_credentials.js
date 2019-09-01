const User = require('../models/user')
const sha1 = require('sha1')

async function loginByCredentials(req, res) {
    const username = req.params.username
    const password = req.params.password
    const user = new User()
    const responseLogin = await user.login({
        username, password
    })
    console.log(`User ${username} trying to connect`)
    res.send(JSON.stringify(responseLogin))
}

module.exports = loginByCredentials