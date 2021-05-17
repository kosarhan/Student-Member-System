const db = require('../config/db.config.js');
const University = db.university;
const Department = db.department;
const Student = db.student;

module.exports = (sequelize, Sequelize) => {
    const StudentInfo = sequelize.define('student_info', {
        ssn: {
            type: Sequelize.STRING
        },
        account_id: {
            type: Sequelize.INTEGER,

            references: {
                model: Student,
                key: 'id'
            }
        },
        phone_number: {
            type: Sequelize.STRING
        },
        university_id: {
            type: Sequelize.INTEGER,

            references: {
                model: University,
                key: 'id'
            }

        },
        department_id: {
            type: Sequelize.INTEGER,

            references: {
                model: Department,
                key: 'id'
            }

        },
        class_no: {
            type: Sequelize.INTEGER
        },
        student_number: {
            type: Sequelize.STRING
        },
        mother_name: {
            type: Sequelize.STRING
        },
        father_name: {
            type: Sequelize.STRING
        },
        birth_place: {
            type: Sequelize.STRING
        },
        birthdate: {
            type: Sequelize.DATE
        },
        city: {
            type: Sequelize.STRING
        },
        district: {
            type: Sequelize.STRING
        },
        cover_no: {
            type: Sequelize.INTEGER
        },
        family_serial_no: {
            type: Sequelize.INTEGER
        },
        serial_no: {
            type: Sequelize.INTEGER
        },
        neighborhood: {
            type: Sequelize.STRING
        },
        blood_type: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    }/*, {
        classMethods: {
            associate: function (models) {
                StudentInfo.hasOne(models.Department);
                StudentInfo.hasOne(models.University);
                StudentInfo.hasOne(models.Student);
            }
        }
    }*/);

    return StudentInfo;
}