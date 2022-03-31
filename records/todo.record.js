const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class TodoRecord {
    constructor(obj) {
        this.id = obj.id;
        this.createdAt = obj.createdAt;
        this.userId = obj.userId;
        this.taskTitle = obj.taskTitle;
        this.status = obj.status;
    }

    async create(){
        if (typeof this.id === "undefined") {
            this.id = uuid();
            this.status = 'Active'
        }
        await pool.execute('INSERT INTO `todos` VALUES(:id, :createdAt,:userId, :taskTitle, :status)', {
            id: this.id,
            createdAt: 'this.createdAt',
            userId: 'this.userId',
            taskTitle: this.taskTitle,
            status: this.status
        });
    }

    static async listAll() {
        const [results] = await pool.execute('SELECT * FROM `todos`');
        return results
    }

}

module.exports = {
    TodoRecord,
}