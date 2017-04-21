import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

	constructor(private http: Http) { }

	getTodos() {
		return this.http.get('/api/v1/todos')
					.map(response => response.json());
	}

	saveTodo(todo) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/v1/todos', JSON.stringify(todo), { headers: headers })
					.map(response => response.json());
	}
}
