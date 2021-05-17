const db = require('../config/db.config.js');
const Student = db.student;

module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define('file', {
        registration_form: {
            type: Sequelize.STRING
        },
        passport_photo: {
            type: Sequelize.STRING
        },
        student_certificate: {
            type: Sequelize.STRING
        },
        account_id: {
            type: Sequelize.INTEGER,

            references: {
                model: Student,
                key: 'id'
            }

        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
        }
    }/*, {
        classMethods: {
            associate: function (models) {
                Student.hasOne(models.File);
            }
        }
    }*/);

    return File;
}