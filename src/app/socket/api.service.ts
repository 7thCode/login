import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class APIService {

	private httpOptions = {
		headers: new HttpHeaders({
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		}),
		withCredentials: true,
	};

	constructor(
		protected http: HttpClient
	) {
	}

	/**
	 *
	 */
	public broadcast(data:string , callback: (error: any, results: any) => void): void {
		this.http.get('/socket/broadcast/' + encodeURIComponent(data), this.httpOptions).subscribe((result: any): void => {
			if (result) {
				if (result.code === 0) {
					callback(null, result);
				} else {
					callback(result, null);
				}
			} else {
				callback({code: 10000, message: 'network error.'}, null);
			}
		}, (error): void => {
			callback({code: -1, message: error.message + ' 8499'}, null);
		});
	}

}
