const db = require('../config/db.config.js');
const Student = db.student;

module.exports = (sequelize, Sequelize) => {
    const Application = sequelize.define('application', {
        account_id: {
            type: Sequelize.INTEGER,

            references: {
                model: Student,
                key: 'id'
            }
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });

    return Application;
}