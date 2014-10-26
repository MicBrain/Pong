var tester = require("./tester.js");
var checks = require("./checks.js");
var users = require("./users.js");

var map = [];


function update(check){
	console.log(check);
	var id = check.id;
	if(!map[id]) {
		map[id] = {};
	}
	var old = map[id];
	if(old.intervalId){
		clearInterval(old.intervalId);
	}
	
	for(var key in check){
		old[key] = check[key];
	}
	
	if(check.active == "0"){
		return;
	};
	map[id].intervalId = setInterval(function() {
		tester(map[id], function(err, status){
			checks.set({
				lastStatus: status,
				id: id
			}, function(err, result) {
				if(result.changedRows) {
					users.alert(map[id].number, map[id].title, status, console.log);
				}
			});
		});
	}, map[id].interval);
	
};
exports.update = update;
// Init

checks.actives(function(err, checks) {
	if (err) {
		console.log(err);
	}
	for (var i = 0; i < checks.length; ++i) {
		update(checks[i]);
	}
});

