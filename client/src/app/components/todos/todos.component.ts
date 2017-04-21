import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';

import { Todo } from '../../models/todo'

@Component({
	selector: 'todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
	todos: any[];

	constructor(private todoService: TodoService) { }

	ngOnInit() {
		this.todos = [];
		this.todoService.getTodos()
			.subscribe(todos => {
				this.todos = todos;
			});
	}

	addTodo(event, todoText) {
		var result;
		var newTodo: Todo = {
			text: todoText.value,
			isCompleted: false
		};

		result = this.todoService.saveTodo(newTodo);
		result.subscribe(x => {
			this.todos.push(newTodo);
			todoText.value = '';
		});
	}

	setEditMode(todo, mode) {
		if (mode) {
			todo.isEditMode = mode;
		} else {
			delete todo.isEditMode;
		}
	}

	/**
	 * Update the isCompleted status of the todo object
	 * @param todo
	 */
	updateStatus(todo) {
		var updatedTodo = {
			_id: todo._id,
			text: todo.text,
			isCompleted: !todo.isCompleted
		};

		this.todoService.updateTodo(updatedTodo)
			.subscribe(data => {
				todo.isCompleted = !todo.isCompleted;
			});
	}

	updateTodoText(event, todo) {
		if (event.which === 13) {
			todo.text = event.target.value;

			var updatedTodo = {
				_id: todo._id,
				text: todo.text,
				isCompleted: todo.isCompleted
			};

			this.todoService.updateTodo(updatedTodo)
				.subscribe(data => {
					this.setEditMode(todo, false);
				});
		}
	}

	deleteTodo(todo) {
		var todos = this.todos;

		this.todoService.deleteTodo(todo._id)
			.subscribe(data => {
				if (data.n == 1) {
					for (var i = 0; i < todos.length; i++) {
						if (todos[i]._id == todo._id) {
							todos.splice(i, 1);
						}
					}
				}
			})
	}

}
