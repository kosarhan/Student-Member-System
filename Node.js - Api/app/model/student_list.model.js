module.exports = (sequelize, Sequelize) => {
    const StudentList = sequelize.define('student_list', {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        university_name: {
            type: Sequelize.STRING
        },
        department_name: {
            type: Sequelize.STRING
        },
    });

    return StudentList;
}