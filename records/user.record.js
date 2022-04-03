const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class UserRecord {
    constructor(obj) {
        this.id = obj.id;
        this.email = obj.email;
        this.password = obj.password;
    }

    static  async loginCheck(email) {
        const [results] = await pool.execute('SELECT * FROM `users` WHERE `email`= :email', {
            email,
        });
        return results;
    }

    async create(hash){
        if (typeof this.id === "undefined") {
            this.id = uuid();
        }
        await pool.execute('INSERT INTO `users` VALUES(:id, :email, :password)', {
            id: this.id,
            email: this.email,
            password: hash,
        });
    }

    static async getOneByEmail(email) {
        const [results] = await pool.execute('SELECT `email` FROM `users` WHERE `email`= :email',{
            email,
        });
        return results;
    }

}

module.exports = {
    UserRecord,
}