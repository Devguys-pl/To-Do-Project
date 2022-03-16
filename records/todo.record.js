const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class TodoRecord {
    constructor(obj) {
        this.id = obj.id;
        this.createdAt = obj.createdAt;
        this.userId = obj.userId;
        this.task = obj.task;
    }

    async create(){
        if (typeof this.id === "undefined") {
            this.id = uuid();
        }
        await pool.execute('INSERT INTO `todos` VALUES(:id, :createdAt,:userId, :task)', {
            id: this.id,
            createdAt: this.createdAt,
            userId: this.userId,
            task: this.task
        });
    }

}

module.exports = {
    TodoRecord,
}