import {Component, OnInit} from '@angular/core';
import {PasswordService} from './password.service';

@Component({
	selector: 'app-password',
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

	public password: string = '';
	public strength: number;
	public unit: string;

	constructor(public passwordService: PasswordService) {
	}

	public ngOnInit(): void {
	}

	public Check(): void {

		const units: any[] = [
			[1000, "秒"],
			[1000 * 60, "分"],
			[1000 * 60 * 60, "時間"],
			[1000 * 60 * 60 * 24, "日"],
			[1000 * 60 * 60 * 24 * 30, "か月"],
			[1000 * 60 * 60 * 24 * 30 * 12, "年"],
			[1000 * 60 * 60 * 24 * 30 * 12 * 10000, "万年"],
			[1000 * 60 * 60 * 24 * 30 * 12 * 10000 * 10000, "億年"],
			[1000 * 60 * 60 * 24 * 30 * 12 * 10000 * 10000 * 10000, "兆年"],
			[1000 * 60 * 60 * 24 * 30 * 12 * 10000 * 10000 * 10000 * 10000, "京年"]
		]

		this.passwordService.strength(this.password, (error, result) => {
			if (!error) {
				let strength: number = 0;
				let unit: string = "";

				let digit:number = 0;
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

}
