import { Injectable } from '@angular/core';
import {retry} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GensimService {

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

	public similar(positive_words: string, negative_words: string): Promise<string[]> {
		return new Promise<string[]>((resolve, reject) => {
			this.http.get('/gensim/similar?p=' + positive_words + "&n=" + negative_words, this.httpOptions).pipe(retry(3)).subscribe((result: any): void => {
				if (result) {
					resolve(result);
				} else {
					reject(this.networkError);
				}
			}, (error: HttpErrorResponse): void => {
				reject({code: -1, message: error.message});
			});
		})
	}
}
