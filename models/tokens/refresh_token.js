const db = require('../../config/db')
const gen_token = require('../../utils/token')

class RefreshToken {
    //int it
    //int userid
    //string token
    constructor(userid = null, token = null) {
        if (token) {
            this.token = token
        } else {
            this.userid = userid
            this.token = gen_token(32)
            this.save()
            return this.token
        }
    }

    async save() {
        //save refresh token in db
        const sql = `
        INSERT INTO refresh_tokens(token, userid, created)
        VALUES($1, $2, NOW())
        `
        const values = [this.token, this.userid]
        await db.query(sql, values)
    }

    async check_validity() {
        //check if refresh token exist in db
        if (!this.token) {
            throw "Error token undefined"
        }
        try {
            const sql = `
                SELECT userid
                FROM refresh_tokens
                WHERE token = $1
            `
            const values = [this.token]
            const rep = await db.query(sql, values)
            if (rep.rowCount == 1) {
                this.userid = rep.rows[0].userid
            } else {
                throw "Error invalid refresh token"
            }

        } catch (e) {
            throw e
        }
        
    }
}

module.exports = RefreshToken