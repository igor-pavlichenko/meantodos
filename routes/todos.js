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


// Get single todo
router.get('/todos/:id', function (request, response, next) {
	db.todos.findOne({
		_id: mongojs.ObjectId(request.params.id)
	}, function (err, todo) {
		if (err) {
			response.send(err);
		} else {
			response.json(todo);
		}
	});
});


// Save/Create todo
router.post('/todo', function (request, response, next) {
	var todo = request.body;
	// check for error
	if (!todo.text || !(todo.isCompleted + '')) {
		response.status(400);
		response.json({
			"error": "Invalid Date"
		});
	} else {
		db.save(todo, function (err, result) {
			if (err) {
				response.send(err);
			} else {
				response.json(result);
			}
		});
	}
});

module.exports = router;
