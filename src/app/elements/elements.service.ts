import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {retry} from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})

/**
 * Tweetサービス
 *
 *
 */
export class ElementsService {

	public networkError: any = {code: 10000, message: 'network error. 7461'};

	public httpOptions: any;

	constructor(protected http: HttpClient) {
		this.httpOptions = {
			headers: new HttpHeaders({
				Accept: 'application/json; charset=utf-8',
				'Content-Type': 'application/json; charset=utf-8',
			}),
			withCredentials: true,
		};
	}

	public query(callback: any): void {
		this.http.get('/scraper/elements/query/{}', this.httpOptions).pipe(retry(3)).subscribe((container: any): void => {
			callback(null, container);
		}, (error: HttpErrorResponse): void => {
			callback(error, null);
		});
	}

	public get(id: string, callback: any): void {
		this.http.get('/scraper/elements/' + id, this.httpOptions).pipe(retry(3)).subscribe((container: any): void => {
			callback(null, container);
		}, (error: HttpErrorResponse): void => {
			callback(error, null);
		});
	}

	public delete(id: string, callback: any): void {
		this.http.delete('/scraper/elements/' + id, this.httpOptions).pipe(retry(3)).subscribe((container: any): void => {
			callback(null, container);
		}, (error: HttpErrorResponse): void => {
			callback(error, null);
		});
	}

}
