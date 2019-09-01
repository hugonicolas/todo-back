const { Client, Pool } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: 'root',
    port: 5432
  })

try {
    client.connect()
}  catch (e) {
    console.log(e)
}



module.exports = client
