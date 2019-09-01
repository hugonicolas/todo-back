const Task = require('../../models/task')
const AccessTokenHandler = require('../access_token_handler')

async function Task_Create(req, res) {
    const userid = AccessTokenHandler(req)
    console.log(userid)
    const task = new Task()
    const rep = await task.create(req.params.title, userid, req.params.todolistid)
    console.log(`Task Create: ${req.params.title} with status ${rep.status}`)
    res.send(rep)
}

module.exports = Task_Create