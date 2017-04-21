import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

	constructor(private http: Http) { }

	getTodos() {
		return this.http.get('/api/v1/todos')
					.map(response => response.json());
	}
}
