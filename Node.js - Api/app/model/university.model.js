module.exports = (sequelize, Sequelize) => {
    const University = sequelize.define('university', {
        name: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });

    return University;
}