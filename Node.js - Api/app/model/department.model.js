const db = require('../config/db.config.js');
const University = db.university;

module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define('department', {
        university_id: {
            type: Sequelize.INTEGER,

            references: {
                model: University,
                key: 'id'
            }

        },
        name: {
            type: Sequelize.STRING
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    }/*, {
        classMethods: {
            associate: function(models) {
                Department.hasMany(models.University);
            }
        }
    }*/);

    return Department;
}