const db = require('../config/db')

class Todolist {
    /* 
    CREATE TABLE todolists(
	id serial primary key,
	name varchar(255),
	userid integer REFERENCES users(id),
	created timestamptz
    )
    */

    async create(name, userid) {
        const sql = `
        INSERT INTO todolists(name, userid, created)
        VALUES($1, $2, NOW())
        `
        const values = [name, userid]
        await db.query(sql, values)
    }

    async list(userid) {
        const sql = `
        SELECT id, name, created FROM todolists
        WHERE userid = $1
        `
        const values = [userid]
        try {
            const rep = await db.query(sql, values)
            return {status: 0, todolists: rep.rows}
        } catch (e) {
            return {status: 420, error: "Cant list todolists"}
        }
    }

    async deleteById(id) {
        const sql = `
        DELETE FROM todolists
        WHERE id = $1
        `
        const values = [id]
        await db.query(sql, values)
    }

    async getTasksById(id) {
        const sql = `
        SELECT * FROM tasks
        WHERE todolistid = $1
        ORDER BY index
        `
        const values = [id]
        const rep = await db.query(sql, values)
        return {status: 0, tasks: rep.rows}
    }

    share() {

    }
}

module.exports = Todolist