import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {retry} from 'rxjs/operators';

import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})

/**
 * Tweetサービス
 *
 *
 */
export class TweetService {

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

	public tweet(content: any, callback: any): void {
		this.http.post( '/tweets', content, this.httpOptions).pipe(retry(3)).subscribe((result: any): void => {
			if (result) {
				if (result.status === 0) {
					callback(null, result.value);
				} else {
					callback(result, null);
				}
			} else {
				callback(this.networkError, null);
			}
		}, (error: HttpErrorResponse): void => {
			callback({code: -1, message: error.message}, null);
		});
	}

	public tweets(option:any, callback: any): void {

		const option_string: string = JSON.stringify(option);

		this.http.get( '/tweets/query/{}/' + option_string, this.httpOptions).pipe(retry(3)).subscribe((result: any): void => {
			if (result) {
				if (result.status === 0) {
					callback(null, result);
				} else {
					callback(null, null);
				}
			} else {
				callback(this.networkError, null);
			}
		}, (error: HttpErrorResponse): void => {
			callback({code: -1, message: error.message}, null);
		});
	}

}
