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
				console.log(todos);
			})
	}

}
