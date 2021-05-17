const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.university = require('../model/university.model.js')(sequelize, Sequelize);
db.student = require('../model/student.model.js')(sequelize, Sequelize);
db.admin = require('../model/admin.model.js')(sequelize, Sequelize);
db.department = require('../model/department.model.js')(sequelize, Sequelize);
db.file = require('../model/file.model.js')(sequelize, Sequelize);
db.student_info = require('../model/student_info.model.js')(sequelize, Sequelize);
db.application = require('../model/application.model.js')(sequelize, Sequelize);
db.log = require('../model/log.model.js')(sequelize, Sequelize);
db.student_list = require('../model/student_list.model.js')(sequelize, Sequelize);

db.application.belongsTo(db.student, { foreignKey: 'account_id', sourceKey: 'account_id' });
db.log.belongsTo(db.student, { foreignKey: 'account_id', sourceKey: 'account_id' });

module.exports = db;