var sms = require("./sms.js");
var db = require("./db.js");

exports.login = function(number, password, callback) { 
    db.query("SELECT * FROM `users` WHERE `number` = ? AND `password` = ?", [
        number, password    
    ], function(err, results) {
        if(err){
            console.log(err);
            process.nextTick(function(){
                callback(err); 
            });
            return;
        }
        if(results.length < 1) {
            process.nextTick(function(){
                callback('No user found!');
            });
            return;
        }
        if(results.length > 1) {
            process.nextTick(function() {
                callback('More than 1 users found!');
            });
            return;
        }
        var user = results.pop();
        if(user['confirm_code']) {
            process.nextTick(function() {
               callback('NOT_CONFIRMED', user); 
            });
            return;
        }
        process.nextTick(function() {
           callback(null, user); 
        });
    });
};


exports.activate = function(user, confirm_code, callback){
    console.log(confirm_code, user.confirm_code);
    if(confirm_code != user.confirm_code) {
        process.nextTick(function() {
            callback('CONFIRM_CODE_INVALID');
        });
        return;
    }
    db.query("UPDATE `users` SET `confirm_code` = 0 WHERE `number` = ? AND `password` = ?", [
        user.number, user.password    
    ], function(err, results) {
        if(err){
            process.nextTick(function() {
               callback(err); 
            });
            return;
        }
        process.nextTick(function() {
            callback(null);
        });
    });
};

exports.register = function(number, password, fullname, callback){
    var confirm_code = 1000 + Math.floor(Math.random() * 9000);
    db.query("SELECT `id` FROM `users` WHERE `number` = ?", number, function(err, results) {
       if(err){
           process.nextTick(function(){
               callback(err);
           });
           return;
       }
       if(results.length > 0) {
           process.nextTick(function() {
              callback('Number already registered!'); 
           });
           return;
       }
       
           
        sms.send({
            to: number,  
            text: 'Pong!\nYour confirmation code: ' + confirm_code + '\n'
        }, function(err, results) {
            if(err){
                process.nextTick(function() {
                   callback('Invalid Number'); 
                });
                return;
            }
            // OK
            db.query("INSERT INTO `users` (`number`, `password`, `fullname`, `confirm_code`) VALUES (?, ?, ?, ?)", [
                number, password, fullname, confirm_code
            ], function(err, results) {
                if(err) {
                    process.nextTick(function() {
                        callback(err);
                    });
                    return;
                }
                process.nextTick(function() {
                    callback(null); 
                });
            });
        });
    
    
    });
};

exports.alert = function(number, title, status, callback) {
    console.log(number, title, status);
    sms.send({
        to: number,
        text: 'The status of "$TITLE" is changed to "$STATUS".\nPong!\n'
            .replace('$TITLE', title)
            .replace('$STATUS', status)
    }, callback);
};