var express = require("express");
var users = require("./users.js");
var crypto = require("crypto");
var db = require("./db.js");
var checks = require("./checks.js");

var app = express();

app.use('/static', express.static(__dirname + '/static'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.all('/', function(req, res) {
	res.redirect('/checks/');	
});

app.get('/checks/', function(req, res) {
	users.login(req.cookies.number, req.cookies.password, function(err, user){
		console.log(err);
		if(err) {
			return res.redirect('/login/');
		}
		checks.list({
			number: user.number
		}, function(err, checks) {
			if(err){
				console.log(err);
				return;
			}
			res.render('checks', {
				checks: checks
			});
		});
	});
});

app.post('/checks/', function(req, res) {
	users.login(req.cookies.number, req.cookies.password, function(err, user){
		console.log(err);
		if(err) {
			return res.redirect('/login/');
		}
		checks.create({
			number: user.number
		}, function(err, check) {
			if(err){
				console.log(err);
				return;
			}
			res.redirect('/checks/' + check.id + '/');
			return;
		});
	});
});

app.get('/checks/:id/', function(req, res) {
	users.login(req.cookies.number, req.cookies.password, function(err, user){
		if(err) {
			return res.redirect('/login/');
		}
		checks.get({
			number: user.number,
			id: req.params.id
		}, function(err, checks) {
			var check = checks.pop();
			if(!check) {
				res.end();
				return;
			}
			res.render('check', {
				title: check.title,
				resource: check.resource,
				condition: check.condition,
				active: check.active
			});
		});
	});
});

app.post('/checks/:id/', function(req, res) {
	users.login(req.cookies.number, req.cookies.password, function(err, user){
		if(err) {
			return res.redirect('/login/');
		}
		checks.set({
			id: req.params.id,
			title: req.body.title,
			resource: req.body.resource,
			active: req.body.active,
			condition: req.body.condition
		}, function(err) {
			if(err){
				console.log(err);
				return;
			}
			res.redirect('back');
			return;
		});
	});
});

app.get('/login/', function(req, res) {
	res.cookie('number', '');
	res.cookie('password', '');
	res.render('login');
	return;
});

app.post('/login/', function(req, res) {
	var number = req.body.number;
	var password = crypto.createHash('md5').update(req.body.password || "").digest('hex');
	users.login(number, password, function(err, user) {
		console.log(err);
		if(err == 'NOT_CONFIRMED') {
			res.cookie('number', number);
			res.cookie('password', password);
			res.redirect('/activate/');
			return;
		}
		if(err){
			res.redirect('/login/');
			return;
		}
		
		res.cookie('number', number);
		res.cookie('password', password);
		res.redirect('/');
		return;
	});
});

app.get('/register/', function(req, res) {
	res.cookie('number', '');
	res.cookie('password', '');
	res.render('register');
	return;
});

app.post('/register/', function(req, res) {
	var number = req.body.number;
	var fullname = req.body.fullname;
	var password = crypto.createHash('md5').update(req.body.password || "").digest('hex');
	users.register(number, password, fullname, function(err){
		if(err){
			res.end();
			return;
		}	
		res.cookie('number', number);
		res.cookie('password', password);
		res.redirect('/activate/');
		return;
	});
});

app.get('/activate/', function(req, res) {
	res.render('activate');
	return;
});

app.post('/activate/', function(req, res) {
    users.login(req.cookies.number, req.cookies.password, function(err, user){
		if(err && err != 'NOT_CONFIRMED') {
			return res.redirect('/login/');
		}
		users.activate(user, req.body.confirm_code, function(err){
			if(err){
				console.log(err);
				res.redirect('/activate/');
				return;
			}
			res.redirect('/');
			return;
		});
    });
});

app.listen(8080);