var mysql = require("mysql");

var db = mysql.createConnection({
  host     : '0.0.0.0',
  user     : 'mahnerak',
  password : '',
  database : 'c9'
});

db.connect();

exports = module.exports = db;