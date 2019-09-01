const TodoList = require('../models/todolist')
const AccessTokenHandler = require('./access_token_handler')

async function TodoList_List(req, res) {
    const userid = AccessTokenHandler(req)
    const todoList = new TodoList()
    const TodoListCollection = await todoList.list(userid)
    console.log(`Get todolist : status: ${TodoListCollection.status} nb_todolist: ${TodoListCollection.todolists.length}`)
    res.send(JSON.stringify(TodoListCollection))
}

module.exports = TodoList_List