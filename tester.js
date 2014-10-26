var Contextify = require("contextify");
var request = require("request");

exports = module.exports = function(check, callback){
    request({
        url: check.resource,
        timeout: 8000
    }, function(err, response, body) {
        var sandbox = Contextify();
        
        sandbox.err = err;
        sandbox.response = response || {};
        sandbox.body = body || "";
        
        var status = sandbox.run(check.condition);
        sandbox.dispose();
        
        process.nextTick(function() {
           callback(null, status); 
        });
    });
};