var express = require('express');
var router = express.Router();

router.get('/todos', function (request, response, next) {
	response.send('TODOS API');
});

module.exports = router;
