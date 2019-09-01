const Task = require('../../models/task')
const AccessTokenHandler = require('../access_token_handler')

async function Task_Delete(req, res) {
    const userid = AccessTokenHandler(req)
    const task = new Task()
    console.log(`Task Delete: ${req.params.id}`)
    const rep = await task.delete(req.params.id)
    res.send(rep)
}

module.exports = Task_Delete