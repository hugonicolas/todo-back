const db = require('../config/db')

const TASK_STATUS_UNDONE = 0;

class Task {

    /* 
    CREATE TABLE tasks(
	id serial primary key,
	index integer,
	title varchar(255),
	status integer,
	userid integer REFERENCES users(id) ON DELETE CASCADE,
	todolistid integer REFERENCES todolists(id) ON DELETE CASCADE,
	created timestamptz)
    */

    constructor() { 

    }

    async create(title, userid, todolistid) {
        try {
            //Check for task in db
            const sql = `SELECT index 
            FROM tasks 
            WHERE userid = ${userid}
            and todolistid = ${todolistid} 
            ORDER BY index DESC LIMIT 1`
            const rep = await db.query(sql)
            if (rep.rowCount == 1) {
                const sql = `
                WITH last_index_table AS (
                    SELECT index 
                    FROM tasks 
                    WHERE userid = ${userid}
                    and todolistid = ${todolistid} 
                    ORDER BY index DESC LIMIT 1),
                to_insert AS (
                    SELECT
                    (index + 1)::int as index,
                    $1 as title,
                    0 as status,
                    ${userid} as userid,
                    ${todolistid} as todolistid,
                    NOW() as created
                    FROM last_index_table
                )
                INSERT INTO tasks(index, title, status, userid, todolistid, created)
                SELECT * FROM to_insert
                `
                const values = [title]
                await db.query(sql, values)
            } else {
                const sql = `
                 INSERT INTO tasks(index, title, status, userid, todolistid, created)
                 VALUES (0, '${title}', 0, ${userid}, ${todolistid}, NOW())
                `
                await db.query(sql)
            }

        return {
            status: 0
        }

        } catch(e) {
            console.log(e)
            return {
                status: 420,
                error: 'Cant create task'
            }
        }
    }

    async delete(id) {
        try {
            const sql = `DELETE FROM tasks WHERE id = $1`
            const values = [id]
            await db.query(sql, values)
            return {
                status: 0
            }
        } catch (e) {
            return {
                status: 420,
                error: "Cant delete task"
            }
        }
    }


    async toggle(id) {
        try {
            const sql = `UPDATE tasks SET status = (CASE status WHEN 0 THEN 1 ELSE 0 END)
            WHERE id = $1
            `
            const values = [id]
            await db.query(sql, values)
            return {
                status: 0
            }
        } catch (e) {
            console.log(e)
            return {
                status: 420
            }
        }
    }

    
}

module.exports = Task