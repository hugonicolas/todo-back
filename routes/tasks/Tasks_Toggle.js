const Task = require('../../models/task')
const AccessTokenHandler = require('../access_token_handler')

async function Task_Toggle(req, res) {
    const userid = AccessTokenHandler(req)
    console.log(userid)
    const task = new Task()
    const rep = await task.toggle(req.params.id)
    console.log(`Task Toggle: ${req.params.id} with status ${rep.status}`)
    res.send(rep)
}

module.exports = Task_Toggle