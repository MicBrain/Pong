var db = require("./db.js");

exports.actives = function(callback) {
	db.query("SELECT * FROM `checks` WHERE `active`", function(err, results) {
        if(err) {
            process.nextTick(function() {
                callback(err); 
            });
            return;
        }
        process.nextTick(function() {
            callback(null, results); 
        });
    });
};


var daemon = require("./daemon.js");

exports.list = function(options, callback) {
    console.log(db.query("SELECT * FROM `checks` WHERE `number` = ?", [
    	options.number	
    ], function(err, results) {
        if(err) {
            process.nextTick(function() {
                callback(err); 
            });
            return;
        }
        process.nextTick(function() {
            callback(null, results); 
        });
    }).sql);
};

exports.get = function(options, callback) {
    console.log(db.query("SELECT * FROM `checks` WHERE `id` = ? AND `number` = ?", [
    	options.id, options.number	
    ], function(err, results) {
        if(err) {
            process.nextTick(function() {
                callback(err); 
            });
            return;
        }
        process.nextTick(function() {
            callback(null, results); 
        });
    }).sql);
};

exports.set = function(options, callback) {
    db.query("UPDATE `checks` SET ? WHERE `id` = ?", [
        options, options.id
    ], function(err, results) {
        if (err) {
            process.nextTick(function() {
                callback(err);
            });
            return;
        }
        process.nextTick(function() {
            callback(null, results);
        });
        daemon.update(options);
        return;
    });
};

exports.create = function(options, callback) {
    db.query("INSERT INTO `checks` SET ?", options, function(err, results) {
        if (err) {
            process.nextTick(function() {
                callback(err);
            });
            return;
        }
        exports.get({
        	number: options.number,
        	id: results.insertId
        }, function(err, results){
        	daemon.update(results.pop());
        });
        process.nextTick(function() {
            callback(null, {id: results.insertId});
        });
        return;
    });
};
