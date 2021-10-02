import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {PasswordService} from './password.service';


import {Observable, Subject} from 'rxjs';

@Component({
	selector: 'app-password',
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

	public password: string = '';
	public strength: number;
	public unit: string;

	public testpass: string = '';
	public answers: string[] = [];
	public count: number;

	public candidate: string = "";


	constructor(
		public passwordService: PasswordService,
		private ngZone: NgZone) {
	}

	public ngOnInit(): void {
	}

	public Check(): void {

		const units: any[] = [
			[1000, '秒'],
			[1000 * 60, '分'],
			[1000 * 60 * 60, '時間'],
			[1000 * 60 * 60 * 24, '日'],
			[1000 * 60 * 60 * 24 * 30, 'か月'],
			[1000 * 60 * 60 * 24 * 30 * 12, '年'],
			[1000 * 60 * 60 * 24 * 30 * 12 * 10000, '万年'],
			[1000 * 60 * 60 * 24 * 30 * 12 * 10000 * 10000, '億年'],
			[1000 * 60 * 60 * 24 * 30 * 12 * 10000 * 10000 * 10000, '兆年'],
			[1000 * 60 * 60 * 24 * 30 * 12 * 10000 * 10000 * 10000 * 10000, '京年']
		];

		this.passwordService.strength(this.password, (error, result) => {
			if (!error) {
				let strength: number = 0;
				let unit: string = '';

				let digit: number = 0;
				while (Math.floor(result / units[digit][0])) {
					strength = Math.floor(result / units[digit][0]);
					unit = units[digit][1];
					digit++;
				}

				this.strength = strength;
				this.unit = unit;
			}
		});
	}

	private BaseNumber(target: number, dictionary: string[]): number[] {
		const base_number = dictionary.length;
		const results = [];
		while (target !== 0) {
			results.push(target % base_number);
			target = Math.floor(target / base_number);
		}
		return results;
	}

	private Substitute(source: number[], dictionary: string[]): string {
		let result = "";
		source.forEach((n) => {
			result = result + dictionary[n];
		})
		return result;
	}

	public Brute() {

		this.answers = [];

 		const dictionary = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
 			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
 			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
 			'~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '{', '}', '[', ']', '|', '\\', ':', ';', '\'', '"', '<', ',', '>', '.', '?', '/'];

		let i = 1;
		let unmatch = true;
 		while (unmatch) {
 			this.candidate = this.Substitute(this.BaseNumber(i++, dictionary), dictionary);
 			this.answers.push(this.candidate);

			if (this.candidate === this.testpass) {
				unmatch = false;
			}
		}
	}

	public Clear() {
		this.testpass = "";
		this.answers = [];
	}

	public test() {

	

		const observable = new Observable<number>(observer => {
			console.log('A:')
	//		throw 1;
		});



		observable.subscribe(
			(x) => console.log(x),                    // onNext
			(error: Error) => console.error(error),   // onError
			() => console.log('Completed!!')
		);


		/*
		const subject = new Subject<number>();

		subject.subscribe((x) => {console.log('A:', x)});

		subject.next(1);

		subject.next(10);

		subject.subscribe((x) => {console.log('B:', x)});

		subject.next(100);

		subject.next(1000);
		*/
	}

}
