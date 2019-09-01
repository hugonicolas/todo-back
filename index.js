const TodoList_Create = require('./routes/todolist_create')
const TodoList_List = require('./routes/todolist_list')
const TodoList_Get = require('./routes/todolist_get')
const Task_Create = require('./routes/tasks/Tasks_Create')
const Task_Delete = require('./routes/tasks/Tasks_Delete')
const Task_Toggle =  require('./routes/tasks/Tasks_Toggle')
const LoginByCredentials = require('./routes/login_by_credentials')
const Create_Account = require('./routes/users/create_account')

const express    = require('express')
const bodyParser = require("body-parser");
const https      = require("https")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/create/:username/:password/:email', function(req, res) {
  Create_Account(req, res)
})

app.get('/login/:username/:password', function(req, res) {
    LoginByCredentials(req, res)
})

app.get('/todolist/create/:name', function(req, res) {
    TodoList_Create(req, res)
})

app.get('/todolist/list', function(req, res) {
  TodoList_List(req,  res)
})

app.get('/todolist/:id', function (req, res) {
  TodoList_Get(req, res)
})

app.get('/task/create/:todolistid/:title', function(req, res) {
    Task_Create(req, res)
})

app.get('/task/delete/:id', function(req, res) {
  Task_Delete(req, res)
})

app.get('/task/toggle/:id', function(req, res) {
  Task_Toggle(req, res)
})

app.listen(3000, function () {
  console.log('Todobackend listening on port 3000!')
})
