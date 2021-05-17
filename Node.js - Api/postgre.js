var express = require('express');
var app = express();
var path = require('path');
var multer = require('multer');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use("/uploads", express.static(__dirname + '/uploads'));


const db = require('./app/config/db.config.js');

require('./app/route/university.route.js')(app);
require('./app/route/student.route.js')(app);
require('./app/route/admin.route.js')(app);
require('./app/route/department.route.js')(app);
require('./app/route/student_info.route.js')(app);
require('./app/route/file.route.js')(app, path, multer);
require('./app/route/application.route.js')(app);
require('./app/route/log.route.js')(app);
require('./app/route/student_list.route.js')(app);

// Create a Server
var server = app.listen(8080, function() {

    let host = server.address().address
    let port = server.address().port

    console.log("App listening at http://%s:%s", host, port);
})