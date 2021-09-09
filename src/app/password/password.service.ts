import {Injectable} from '@angular/core';
import {retry} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class PasswordService {

	public networkError: any = {code: 10000, message: 'network error. 7461'};

	public httpOptions: any;

	constructor(
		protected http: HttpClient
	) {
		this.httpOptions = {
			headers: new HttpHeaders({
				Accept: 'application/json; charset=utf-8',
				'Content-Type': 'application/json; charset=utf-8',
			}),
			withCredentials: true,
		};
	}

	public strength(password: any, callback: any): void {
		this.http.get('/password/strength/' + password, this.httpOptions).pipe(retry(3)).subscribe((result: any): void => {
			if (result) {
				if (result.status === 0) {
					callback(null, result.value);
				} else {
					callback({code: 1, message: 'server error. 4324'}, null);
				}
			} else {
				callback(this.networkError, null);
			}
		}, (error: HttpErrorResponse): void => {
			callback({code: -1, message: error.message}, null);
		});
	}
}
