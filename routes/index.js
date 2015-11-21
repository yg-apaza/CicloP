var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

router.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

module.exports = router;