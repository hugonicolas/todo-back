const db = require('../config/db')
const sha1 = require('sha1')
const RefreshToken = require('./tokens/refresh_token')
const AccessToken  = require('./tokens/access_token')

class User {

    //int id
    //varchar 255 username
    //varchar 255 password
    //varchar 255 email

    async create(args) {
        if (!args) {
            throw "Invalid arguments for create user"
        }
        const sql = `
        INSERT INTO users(username, password, email)
        VALUES ($1, $2, $3)
        RETURNING id
        `
        try {
            const values = [args.username, sha1(args.password), args.email]
            const rep = await db.query(sql, values)
            return {
                status: 0
            }
            //this.id = rep.rows[0].id
           // const refresh_token = new RefreshToken(this.id)
        } catch (e) {
            console.log(e)
            if (e.code == '23505') {
                return {
                    status: 420,
                    error: 'Username already exist'
                }
            }
            return {
                status: 420,
                error: "Cant create account"
            }
        }
    }

    async login(args) {
        //Two type of login : by refresh token or by username/password
        try {
            if (!args) {
                throw "Invalid arguments for login user"
            }

            if (args.refresh_token) {
                let refresh_token = new RefreshToken(null, args.refresh_token)
                await refresh_token.check_validity()
                this.id = refresh_token.userid
                return new AccessToken(this.id)
            } 
            
            if (args.username && args.password) {
                    const sql = `
                    SELECT id, email
                    FROM users
                    WHERE username = $1
                    AND password = $2
                    `
                    const values = [args.username, sha1(args.password)]
                    const rep = await db.query(sql, values)
                    if (rep.rowCount == 1) {
                        const u       = rep.rows[0]
                        this.id       = u.id
                        this.email    = u.email
                        this.username = args.username
                        //tokens
                        const refresh_token = new RefreshToken(this.id)
                        const access_token  = new AccessToken(this.id)

                        return {
                            user: {
                                username: this.username,
                                email: this.email,
                                userid: this.id,
                                access_token: access_token.token,
                                refresh_token: refresh_token.token
                            },
                            status: 0
                        }
                        //store token in cache
                    } else {
                        throw "Invalid user/password combination"
                    }
            }
            return false
        } catch (e) {
            return {
                status: 420,
                error: e
            }
        }
    }
}

module.exports = User
//const user = new User()
//user.create({username: 'hugo', password: 'test', email: 'laverité'})
//user.login({username: 'hugo', password: 'test', email: 'laverité'})
//user.login({refresh_token: 'BvYEng0jpH5Eohzn6su9hf95B7hmjnEp'})