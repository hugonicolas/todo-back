const User = require('../../models/user')
const sha1 = require('sha1')

async function Create_Account(req, res) {
    const username = req.params.username
    const password = req.params.password
    const email    = req.params.email
    const user = new User()
    const responseCreate = await user.create({
        username, password, email
    })
    console.log(`User ${username} create`)
    res.send(responseCreate)
}

module.exports = Create_Account