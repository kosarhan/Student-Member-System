const db = require('../config/db.config.js');
const Application = db.application;

module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('student', {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        verification_status: {
            type: Sequelize.BOOLEAN
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });
    
    /*Student.associate = (models) => {
        // associations can be defined here
        Student.hasOne(models.Application, {foreignKey: 'account_id', as: 'id' });
    };*/

    return Student;
}