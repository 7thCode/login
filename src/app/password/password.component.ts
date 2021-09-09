import {Component, OnInit} from '@angular/core';
import {TweetService} from '../tweet/tweet.service';
import {PasswordService} from './password.service';

@Component({
	selector: 'app-password',
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

	public password: string = '';
	public strength: number;

	public sec: number = 0;
	public min: number = 0;
	public hour: number = 0;
	public days: number = 0;
	public mon: number = 0;
	public year: number = 0;
	public myear: number = 0;
	public byear: number = 0;
	public tyear: number = 0;
	public qyear: number = 0;

	constructor(public passwordService: PasswordService) {
	}

	public ngOnInit(): void {
	}

	public Check(): void {
		this.passwordService.strength(this.password, (error, result) => {
			this.strength = result;
			this.sec = Math.floor(this.strength / 1000);
			this.min  = Math.floor(this.sec / 60)
			this.hour =  Math.floor(this.min / 60)
			this.days =  Math.floor(this.hour / 24)
			this.mon =  Math.floor(this.days / 30)
			this.year =  Math.floor(this.mon / 12)
			this.myear =  Math.floor(this.year / 10000)
			this.byear =  Math.floor(this.myear / 10000)
			this.tyear =  Math.floor(this.byear / 10000)
			this.qyear =  Math.floor(this.tyear / 10000)



		});
	}




}
