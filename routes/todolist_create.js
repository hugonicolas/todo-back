const AccessTokenHandler = require('./access_token_handler')
    const TodoList = require('../models/todolist')

function Todolist_Create(req, res) {

    if ((req.params.name)) {
        let userid = AccessTokenHandler(req)
        let todoList = new TodoList()
        todoList.create(req.params.name, userid)
        console.log(`Create Todolist ${req.params.name} for ${userid}`)
        res.send({status: 0})
    } else {
        res.send({status: 420, error: "Invalid Params"})
    }
}
module.exports = Todolist_Create