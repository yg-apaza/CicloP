var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

/** Registro */
router.post('/register', function(req, res) {
	User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
		if(err) {
			return res.status(500).json({err: err});
	    }
		passport.authenticate('local')(req, res, function () {
			return res.status(200).json({status: 'Registro exitoso !'});
		});
	});
});

/** Login */
router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return res.status(500).json({err: err});
		}
	    if (!user) {
	    	return res.status(401).json({err: info});
	    }
	    req.logIn(user, function(err) {
	    	if (err) {
	    		return res.status(500).json({err: 'Usuario no existe'});
	    	}
	    	res.status(200).json({status: 'Login exitoso !'});
	    });
	})(req, res, next);
});

/** Logout */
router.get('/logout', function(req, res) {
	req.logout();
	res.status(200).json({status: 'Bye!'});
});

module.exports = router;
