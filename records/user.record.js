const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class UserRecord {
    constructor(obj) {
        this.id = obj.id;
        this.login = obj.login;
        this.password = obj.password;
    }

    static  async loginCheck(login) {
        const [results] = await pool.execute('SELECT * FROM `users` WHERE `login`= :login', {
            login,
        });
        return results;
    }

    async create(hash){
        if (typeof this.id === "undefined") {
            this.id = uuid();
        }
        await pool.execute('INSERT INTO `users` VALUES(:id, :login,:password)', {
            id: this.id,
            login: this.login,
            password: hash,
        });
    }

}

module.exports = {
    UserRecord,
}