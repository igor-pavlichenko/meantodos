var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://ng-meantodos-user:ng-meantodos-user@ds159880.mlab.com:59880/meantodos', ['todos'])

// Get todos route
router.get('/todos', function (request, response, next) {
	db.todos.find(function (err, todos) {
		if (err) {
			response.send(err);
		} else {
			response.json(todos);
		}
	});
});

module.exports = router;
