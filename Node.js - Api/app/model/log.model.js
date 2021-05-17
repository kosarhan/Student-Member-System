const db = require('../config/db.config.js');
const Student = db.student;

module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define('log', {
        account_id: {
            type: Sequelize.INTEGER,

            references: {
                model: Student,
                key: 'id'
            }
        },
        log_message: {
            type: Sequelize.STRING
        },
    });

    return Log;
}