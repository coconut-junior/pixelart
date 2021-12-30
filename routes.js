var express = require('express');
var router = express.Router();
router.get('/',function(req,res) {
	console.log('start page loaded');
	res.sendFile('index.html', {
        root: path.join(__dirname, './')
    });
});

module.exports = router;