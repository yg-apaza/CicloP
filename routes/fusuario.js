var express = require('express');
var passport = require('passport');
var Usuario = require('../models/usuario');
var router = express.Router();

router.get('/', function(req, res) {
	console.log(req.user);
});

router.post('/validar', function(req, res) {
	
});

/** Registro */
router.post('/register', function(req, res) {
	Usuario.register(new Usuario({username: req.body.username, email: req.body.email}), req.body.password, function(err, usuario) {
		if(err) {
			return res.json({status: false});
	    }
		passport.authenticate('local')(req, res, function () {
			return res.json({status: true});
		});
	});
});

/** Login */
router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return res.json({status: false});
		}
	    if (!user) {
	    	return res.json({status: false});
	    }
	    req.logIn(user, function(err) {
	    	if (err) {
	    		return res.json({status: false});
	    	}
	    	res.json({status: true}) 	
	    });
	})(req, res, next);
});

/** Logout */
router.post('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;