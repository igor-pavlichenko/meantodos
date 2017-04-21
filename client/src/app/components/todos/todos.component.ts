import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';

import { Todo } from '../../models/todo'

@Component({
	selector: 'todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
	todos: Todo[];

	constructor(private todoService: TodoService) { }

	ngOnInit() {
		this.todos = [];
		this.todoService.getTodos()
			.subscribe(todos => {
				this.todos = todos;
			})
	}

	addTodo(event, todoText) {
		var result;
		var newTodo: Todo = {
			text: todoText.value,
			isCompleted: false
		};

		result = this.todoService.saveTodo(newTodo);
		result.subscribe(() => {
			this.todos.push(newTodo);
			todoText.value = '';
		})
	}

}
