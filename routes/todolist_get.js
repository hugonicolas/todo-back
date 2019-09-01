const AccessTokenHandler = require('./access_token_handler')
const TodoList = require('../models/todolist')

async function Todolist_Get(req, res) {

    let userid = AccessTokenHandler(req)
    let todoList = new TodoList()
    const app = await todoList.getTasksById(req.params.id)
    console.log(`Get todolist ${req.params.id} content: ${app.tasks.length}`)
    res.send(app)
}
module.exports = Todolist_Get